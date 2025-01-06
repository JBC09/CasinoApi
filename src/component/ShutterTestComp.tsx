
import {useEffect, useRef, useState} from "react";

import  {toast} from "react-toastify";

interface ShutterTestCompInterface {
    host: string
    shutterLogs: string[]
    shutterLogTextAreaRef: React.RefObject<HTMLTextAreaElement>
    setShutterLogs: React.Dispatch<React.SetStateAction<string[]>>
}

export const ShutterTestComp : React.FC<ShutterTestCompInterface> = ({host, shutterLogs, setShutterLogs, shutterLogTextAreaRef}) => {

    // 셔터 테스트 총 횟수 (로컬 스토리지에서 복원)
    const [shutterCount, setShutterCount] = useState<number>(() => {
        const savedLogs = Number(localStorage.getItem('shutterTotalCount'));
        return savedLogs ? savedLogs : 1;
    });


    const [isShutterRunning, setIsShutterRunning] = useState<boolean>(false);  // 셔터 테스트 실행 상태

    const isShutterRunningRef = useRef(isShutterRunning);            // 셔터 실행 상태 ref
    const shutterCountRef = useRef(shutterCount);                     // 셔터 카운트 ref


    // 셔터 로그 저장 및 스크롤 위치 조정
    useEffect(() => {
        localStorage.setItem('shutterLogs', JSON.stringify(shutterLogs));
        const textarea = shutterLogTextAreaRef.current;
        if (textarea) {
            textarea.scrollTop = textarea.scrollHeight;
        }
    }, [shutterLogs]);


    // ref 값들 업데이트
    useEffect(() => {
        isShutterRunningRef.current = isShutterRunning;
    }, [isShutterRunning]);

    useEffect(() => {
        shutterCountRef.current = shutterCount;
    }, [shutterCount]);


    // 셔터 테스트 시작/중지 처리
    useEffect(() => {
        if (isShutterRunning) {
            performShutterAction();
        }
    }, [isShutterRunning]);

    const startShutter = () => setIsShutterRunning(true);
    const stopShutter = () => setIsShutterRunning(false);

    const performShutterAction = async () => {

        while (isShutterRunningRef.current) {
            // 셔터 카운트 증가
            setShutterCount(prevState => prevState + 1);

            // 셔터 열기
            await openShutter()
            setShutterLogs(prevState => [...prevState, `[${shutterCountRef.current}] shutter open`]);

            await new Promise((resolve) => setTimeout(resolve, 3000));

            // 셔터 닫기
            await closeShutter()

            setShutterLogs(prevState => [...prevState, `[${shutterCountRef.current}] shutter close`]);
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }

    };

    const openShutter = async () => {
        // 셔터 열기
        await fetch(`${host}/chd/openshutter`, {
            method: 'POST',
            body: JSON.stringify({open: true}),
            headers: {'Content-Type': 'application/json'},
        }).catch(()=>{
            toast.error("failed to shutter");
            isShutterRunningRef.current = false;
        })
    }

    const closeShutter = async () => {
        // 셔터 열기
        await fetch(`${host}/chd/openshutter`, {
            method: 'POST',
            body: JSON.stringify({open: false}),
            headers: {'Content-Type': 'application/json'},
        }).catch(()=>{
            toast.error("failed to shutter");
            isShutterRunningRef.current = false;
        })
    }

    return (
        <div className="form">
            <h1>Shutter Test</h1>
            {/* 셔터 테스트 제어 버튼 */}

            <div className={"flex"}>
                <button onClick={openShutter}>Open Shutter</button>
                <button onClick={closeShutter}>Close Shutter</button>
            </div>
            
            <div className={"flex"}>
                <button onClick={startShutter}>Start Test</button>
                <button onClick={stopShutter}>Cancel</button>
            </div>

            <textarea
                readOnly
                value={shutterLogs.join('\n')}
                ref={shutterLogTextAreaRef}
            />

        </div>
    )
}