
import React from "react";
import {useRef, useState, useEffect, useCallback} from "react";
import {toast} from "react-toastify";

// 타입 정의
// 가격과 수량을 포함하는 세트 인터페이스
interface PriceCountSet {
    price: number;  // 칩 가격
    count: number;  // 칩 수량
}


interface ChipTestProps {
    host: string;
    setHost: (host: string) => void;
}

function nowDate() : string {
    return new Date().toLocaleDateString();
}

export  const ChipTestComp : React.FC<ChipTestProps> = ({host, setHost}) => {
    // 디스펜서 테스트 관련 상태
    const [sets, setSets] = useState<PriceCountSet[]>([{price: 10000, count: 20}]);  // 디스펜스할 칩 세트 목록
    const [period, setPeriod] = useState<number>(1);      // 테스트 반복 주기
    const [delay, setDelay] = useState<number>(7000);     // 작업 간 지연 시간(ms)


    // 총 테스트 횟수 (로컬 스토리지에서 복원)
    const [totalCount, setTotalCount] = useState<number>(() => {
        const savedLogs = Number(localStorage.getItem('totalCount'));
        return savedLogs ? savedLogs : 1;
    });

    let isCancel : boolean = false;                                              // 테스트 취소 플래그
    const isCancelRef = useRef(isCancel);                             // 취소 플래그 ref

    const addSet = () => {
        if (sets.length < 4) {
            setSets([...sets, {price: 10000, count: 20}]);
            toast.success("세트를 추가하였습니다.");
        }
        else {
            toast.error("세트는 4개까지만 가능합니다.");
        }
    };





    // 총 테스트 횟수 저장
    useEffect(() => {
        localStorage.setItem('totalCount', totalCount.toString());
    }, [totalCount]);


    // 취소 플래그 ref 업데이트
    useEffect(() => {
        isCancelRef.current = isCancel;
    }, [isCancel]);


    const removeSet = () => {
        const newSets = sets.slice();
        if(newSets.length > 1) {
            newSets.splice(1, 1);
            setSets(newSets);
            toast.success("세트를 삭제하였습니다.");
        }
        else {
            toast.error("세트는 최소 1개 이상이어야 합니다.");
        }
    };



    const startTest = useCallback(async () => {
        try {
            toast.success("API 테스트를 시작합니다.");
            isCancel = false;
            for (let i = 0; i < period; i++) {
                // 총 테스트 횟수 증가 및 로깅
                setTotalCount((prevCount) => {
                    const newCount = prevCount + 1;
                    logResponse('', 0, `전체 회수 : ${newCount}`);
                    return newCount;
                });
                logResponse('', 0, `회수 : ${i + 1}/${period}`);

                // 셔터 닫기
                const closeResponse = await fetch(`${host}/chd/openshutter`, {
                    method: 'POST',
                    body: JSON.stringify({open: false}),
                    headers: {'Content-Type': 'application/json'},
                });
                logResponse('/chd/openshutter (open: false)', closeResponse.status);
                if (isCancelRef.current) return;

                // 칩 디스펜스 요청
                const dispenseResponse = await fetch(`${host}/chd/dispense`, {
                    method: 'POST',
                    body: JSON.stringify(sets),
                    headers: {'Content-Type': 'application/json'},
                });

                if (isCancelRef.current) return;
                const dispenseResult = await dispenseResponse.json();
                logResponse('/chd/dispense', dispenseResponse.status, JSON.stringify(dispenseResult));

                if (dispenseResponse.status !== 200) {
                    throw new Error('Dispense failed');
                }
                if (isCancelRef.current) return;

                // 디스펜스 상태 확인 (status가 2가 될 때까지)
                let status: number | null = null;
                while (status !== 2) {
                    const statusResponse = await fetch(`${host}/chd/dispensestatus`);
                    const statusResult = await statusResponse.json();
                    logResponse('/chd/dispensestatus', statusResponse.status, JSON.stringify(statusResult));

                    if (isCancelRef.current) return;
                    status = statusResult.status;

                    if (status == 3) {
                        throw new Error('DispenseStatus failed');
                    }

                    await new Promise((resolve) => setTimeout(resolve, 1000));
                }

                // 셔터 열기
                const openResponse = await fetch(`${host}/chd/openshutter`, {
                    method: 'POST',
                    body: JSON.stringify({open: true}),
                    headers: {'Content-Type': 'application/json'},
                });
                logResponse('/chd/openshutter (open: true)', openResponse.status);
                if (isCancelRef.current) return;

                // 지정된 딜레이만큼 대기
                await new Promise((resolve) => setTimeout(resolve, delay));

                if (isCancelRef.current) return;
            }
        } catch (error) {
            toast.error("API 테스트를 실패하였습니다.");
            logResponse('Error', 500, (error as Error).message);
        }
    },[]);

    // 테스트 취소
    const cancelTest = async () => {
        logResponse('Cancel', -1, 'Cancel');
        isCancel = true;
        toast.info("API 테스트를 취소하였습니다.");
    };

    const logResponse = useCallback((endpoint: string, status: number, result: string = '') => {
        const newLog = `[${nowDate()} - ${new Date().toLocaleTimeString()}] ${endpoint} - ${status}: ${result}`;

        const dateStr = new Date().toISOString().split('T')[0];

        // localStorage에서 기존 로그를 가져옴
        const existingLogs = JSON.parse(localStorage.getItem(`${dateStr}logs`) || "[]");

        // 새로운 로그 추가
        const updatedLogs = [...existingLogs, newLog];

        // localStorage 업데이트
        localStorage.setItem(`${dateStr}logs`, JSON.stringify(updatedLogs));

    }, []);


    // 칩 세트 입력값 변경 처리
    const handleInputChange = (index: number, key: keyof PriceCountSet, value: number) => {
        const newSets = sets.slice();
        newSets[index][key] = value;
        setSets(newSets);
    };

    return (
        <div className="form">
            <h1>Chip Test - Total Count : {totalCount}</h1>
            {/* 호스트 주소 입력 */}


            <div>
                <label>Host Adress: </label>
                <input value={host} onChange={(e) => setHost(e.target.value)}/>
            </div>

            {/* 테스트 주기 설정 */}
            <div>
                <label>Cycle: </label>
                <input
                    type="number"
                    value={period}
                    onChange={(e) => setPeriod(Number(e.target.value))}
                />
            </div>

            {/* 딜레이 설정 */}
            <div>
                <label>Delay: </label>
                <input
                    type="number"
                    value={delay}
                    onChange={(e) => setDelay(Number(e.target.value))}
                />
            </div>
            
            {/* 칩 세트 설정 */}
            <div className={"chipSets"}>
                {sets.map((set, index) => (
                    <div key={index}>
                        <div className={"flex"}>

                            <div>
                                <label>Price: </label>
                                <input
                                    value={set.price}
                                    onChange={(e) => handleInputChange(index, 'price', Number(e.target.value))}
                                />
                            </div>
                            <div>
                                <label>Count: </label>
                                <input
                                    value={set.count}
                                    onChange={(e) => handleInputChange(index, 'count', Number(e.target.value))}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>




            {/* 테스트 제어 버튼 */}
            <div className={"flex"}>
                <button onClick={addSet}>Add Set</button>
                <button onClick={removeSet}>Remove Set</button>
                <button onClick={startTest}>Start Test</button>
                <button onClick={cancelTest}>Cancel</button>
            </div>
        </div>
    )
}