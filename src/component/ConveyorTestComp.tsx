import {useEffect, useRef, useState} from "react";
import {toast} from "react-toastify";

interface ConveyorTestCompInterface {
    host: string
    shutterLogs: string[]
    shutterLogTextAreaRef: React.RefObject<HTMLTextAreaElement>
}

export  const ConveyorTestComp : React.FC<ConveyorTestCompInterface> = ({host, shutterLogs, shutterLogTextAreaRef}) => {

    // 컨베이어 테스트 관련 상태
    const [isConveyorRunning, setIsConveyorRunning] = useState<boolean>(false);  // 컨베이어 테스트 실행 상태
    const isConveyorRunningRef = useRef(isConveyorRunning);          // 컨베이어 실행 상태 ref


    useEffect(() => {

        const textarea = shutterLogTextAreaRef.current;
        if (textarea) {
            textarea.scrollTop = textarea.scrollHeight;
        }
    });


    useEffect(() => {
        isConveyorRunningRef.current = isConveyorRunning;
    }, [isConveyorRunning]);

    // 컨베이어 테스트 시작/중지 처리
    useEffect(() => {
        if (isConveyorRunning) {
            performConveyorAction();
        }
    }, [isConveyorRunning]);


    const performConveyorAction = async () => {
        while (isConveyorRunningRef.current) {
            // 컨베이어 켜기
            await fetch(`${host}/chd/conveyor/on`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
            }).then(()=>{
                toast.success("success to conveyor");
            }).catch(()=>{
                toast.error("failed to conveyor");
            })
            await new Promise((resolve) => setTimeout(resolve, 5000));

            if (!isConveyorRunningRef.current) return;

            // 컨베이어 끄기
            await fetch(`${host}/chd/conveyor/off`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
            }).then(()=>{
                toast.success("success to conveyor");
            }).catch(()=>{
                toast.error("failed to conveyor");
            })
            await new Promise((resolve) => setTimeout(resolve, 5000));
        }
    };

    // 컨베이어 테스트 시작/중지 함수
    const startConveyor = () => setIsConveyorRunning(true);
    const stopConveyor = () => setIsConveyorRunning(false);

    // 컨베이어 수동 제어 함수
    const conveyorOn = async () => {
        await fetch(`${host}/chd/conveyor/on`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        }).then(()=>{
            toast.success("success to conveyor");
        }).catch(()=>{
            toast.error("failed to conveyor");
        })
    };

    const conveyorOff = async () => {
        await fetch(`${host}/chd/conveyor/off`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        }).then(()=>{
            toast.success("success to conveyor");
        }).catch(()=>{
            toast.error("failed to conveyor");
        })
    };


    return (
        <div className="form">
            <h1>Conveyor Test</h1>
            {/* 컨베이어 수동 제어 */}
            <div className={"flex"}>
                <button onClick={conveyorOn}>Open Conveyor</button>
                <button onClick={conveyorOff}>Close Conveyor</button>
            </div>
            {/* 컨베이어 자동 테스트 제어 */}
            <div className={"flex"}>
                <button onClick={startConveyor}>Start Test</button>
                <button onClick={stopConveyor}>Cancel</button>
            </div>

             <textarea
                readOnly
                value={shutterLogs.join('\n')}
                ref={shutterLogTextAreaRef}
             />

        </div>
    )
}