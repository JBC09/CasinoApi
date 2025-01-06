
import React, {useEffect} from 'react'
import {toast} from "react-toastify";

interface LogInterface {
    textareaRef: React.RefObject<HTMLTextAreaElement>;
}

export  const LogComp : React.FC<LogInterface> = ({textareaRef}) => {

    useEffect(() => {

        const textarea = textareaRef.current;
        if (textarea) {
            const savedLogs = localStorage.getItem('logs');
            textareaRef.current.value = savedLogs
                ? JSON.stringify(JSON.parse(savedLogs), null, 2)  // 들여쓰기 2칸
                : "[]";
            textarea.scrollTop = textarea.scrollHeight;

            toast.success("로그를 불러옵니다.");
        }
    });
    return (
        <div className="form">
            <h1>Log</h1>
            <textarea
                readOnly
                ref={textareaRef}
            />
        </div>
    )
}