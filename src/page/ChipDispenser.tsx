import React, {useEffect, useRef, useState} from 'react';
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
import {OtherComp} from "../component/OtherComp";

const ChipDispenser = () => {
    // 호스트 설정
    const [host, setHost] = useState<string>('http://127.0.0.1:7000');  // API 서버 주소

    const [logs, setLogs] = useState<string[]>(() => {
        const savedLogs = localStorage.getItem('logs');
        return savedLogs ? JSON.parse(savedLogs) : [];
    });
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
        "Chip Check",
        "Cassette Channel",
        "Other"
    ];

    // 탭 컨텐츠 배열
    const tabContents = [
        <ChipTestComp host={host} key={0} setHost={setHost} textareaRef={textareaRef} logs={logs} setLogs={setLogs}/>,
        <LogComp key={1} textareaRef={textareaRef} logs={logs}/>,
        <FillChipComp host={host}/>,
        <ShutterTestComp host={host} shutterLogs={shutterLogs} shutterLogTextAreaRef={shutterLogTextAreaRef} setShutterLogs={setShutterLogs}/>,
        <ConveyorTestComp host={host} shutterLogs={shutterLogs} shutterLogTextAreaRef={shutterLogTextAreaRef}/>,
        <ChipCheckComp host={host}/>,
        <CassetteComp host={host}/>,
        <OtherComp host={host}/>
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