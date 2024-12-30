
import React, {useEffect} from 'react'


interface LogInterface {
    textareaRef: React.RefObject<HTMLTextAreaElement>;
    logs: string[]
}

export  const LogComp : React.FC<LogInterface> = ({textareaRef, logs}) => {

    useEffect(() => {

        const textarea = textareaRef.current;
        if (textarea) {
            textarea.scrollTop = textarea.scrollHeight;
        }
    });
    return (
        <div className="form">
            <h1>Log</h1>
            <textarea
                value={logs.join('\n')}
                readOnly
                ref={textareaRef}
            />
        </div>
    )
}