import React, {useEffect, useRef, useState, useCallback} from 'react';
import "../styles/chipDispenser.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ChipTestComp} from "../component/ChipTestComp";
import {FillChipComp} from "../component/FillChipComp";
import {LogComp} from "../component/LogComp";
import {ConveyorTestComp} from "../component/ConveyorTestComp";
import {ShutterTestComp} from "../component/ShutterTestComp";
import {ChipCheckComp} from "../component/ChipCheckComp";
import {CassetteComp} from "../component/CassetteComp";
import {ChipFromCassette} from "../component/ChipFromCassette";
import {LockComp} from "../component/LockComp";
// @ts-ignore
import {LedComp} from "../component/Led.tsx";
import {OtherComp} from "../component/OtherComp";

const ChipDispenser = () => {
    // 호스트 설정
    const [host, setHost] = useState<string>('http://127.0.0.1:7000');  // API 서버 주소

    // 셔터 작동 로그 (로컬 스토리지에서 복원)
    const [shutterLogs, setShutterLogs] = useState<string[]>(() => {
        const savedLogs = localStorage.getItem('shutterLogs');
        return savedLogs ? JSON.parse(savedLogs) : [];
    });


    // Ref 설정
    const textareaRef = useRef<HTMLTextAreaElement>(null);            // 로그 텍스트영역 ref
    const shutterLogTextAreaRef = useRef<HTMLTextAreaElement>(null);  // 셔터 로그 텍스트영역 ref


    // 탭 관련 상태
    const [activeTab, setActiveTab] = useState(0);  // 현재 활성화된 탭 인덱스

    // 탭 목록
    const tabs = [
        "Chip Test",
        "Log",
        "Fill Chips",
        "Shutter Test",
        "Conveyor Test",
        "Chip Count",
        "Cassette Status",
        "Chip Spout",
        "Led",
        "LockComp",
        "Jamrevory"
    ];

    const oneDaysAgoLogDownload = () => {
        let today = new Date();
        let oneDaysAgo = new Date(today);
        oneDaysAgo.setDate(today.getDate() - 1);

        let fileName = oneDaysAgo.toISOString().split("T")[0]+"logs";

        console.log(fileName + " 다운로드 시도")
        try {
            // localStorage에서 데이터 가져오기
            const data = localStorage.getItem(fileName);

            if (!data) {
                console.log(fileName + ' 으로 저장된 데이터가 없습니다.');
                return;
            }

            // Blob 객체 생성
            const blob = new Blob([data], { type: 'application/json' });
            const url = window.URL.createObjectURL(blob);

            // 다운로드 링크 생성 및 클릭
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName+".json";
            document.body.appendChild(link);
            link.click();

            // cleanup
            localStorage.removeItem(fileName);
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('다운로드 중 오류 발생:', error);
            alert('다운로드 중 오류가 발생했습니다.');
        }
    }

    useEffect(() => {
        oneDaysAgoLogDownload()
    }, []);


    const fetchData = useCallback( async (url : string, method : string, body : object) => {
        await fetch(`${host}/${url}`, {
            method: method,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({body})
        }).then((res) => res.json())
            .then((data)=>{
                if(data["errorcode"] != 0) throw new Error(data["message"]);
                toast.success("success");
            }).catch((error)=>{
                toast.error(`${error.message}.`)
            })
    },[host])

    // 탭 컨텐츠 배열
    const tabContents = [
        <ChipTestComp host={host} key={0} setHost={setHost}/>,
        <LogComp key={1} textareaRef={textareaRef}/>,
        <FillChipComp host={host}/>,
        <ShutterTestComp host={host} shutterLogs={shutterLogs} shutterLogTextAreaRef={shutterLogTextAreaRef} setShutterLogs={setShutterLogs}/>,
        <ConveyorTestComp host={host} shutterLogs={shutterLogs} shutterLogTextAreaRef={shutterLogTextAreaRef}/>,
        <ChipCheckComp host={host}/>,
        <CassetteComp host={host}/>,
        <ChipFromCassette host={host}/>,
        <LedComp fetchData={fetchData} host={host}/>,
        <LockComp fetchData={fetchData}/>,
        <OtherComp host={host} fetchData={fetchData}/>
    ];

    // 메인 렌더링
    return (
        <div>
            <div id={"chipDispenserWrap"}>
                {/* 탭 네비게이션 */}
                <div id="tabWrap">
                    {tabs.map((tab, index) => (
                        <div
                            key={index}
                            className={activeTab === index
                                ? 'active'
                                : 'notActive'
                            }
                            onClick={() => setActiveTab(index)}
                        >
                            {tab}
                        </div>
                    ))}
                </div>

                {/* 현재 선택된 탭의 컨텐츠 표시 */}
                <div id={"chipDispenserContents"}>
                    {tabContents[activeTab]}
                </div>
            </div>
        </div>
    )
};

export default ChipDispenser;