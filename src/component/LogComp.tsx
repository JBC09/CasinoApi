
import React from 'react'

interface LogInterface {
    textareaRef: React.RefObject<HTMLTextAreaElement>;
    logs: string[]
}

export  const LogComp : React.FC<LogInterface> = ({textareaRef, logs}) => {
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