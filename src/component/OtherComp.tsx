import {toast} from "react-toastify";
import React from "react";

interface OtherCompInterface {
    host: string
}

export const OtherComp : React.FC<OtherCompInterface> = ({host}) => {

    const fetchData = async (url : string, method : string, body : object) => {
        const response = await fetch(`${host}/${url}`, {
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
    }

    return (
        <div className={"form"}>
            <h1>Other</h1>

            <div className={"flex"}>
                <button onClick={() => fetchData("chd/jamrecovery", "POST",{})}>Jamrecovery</button>
                <button onClick={() => fetchData("led/on", "POST",{})}>Led On</button>
                <button onClick={() => fetchData("led/off", "POST",{})}>Led Off</button>
                <button onClick={() => fetchData("led/flashon", "POST",{})}>Lef Flash On</button>
                <button onClick={() => fetchData("led/flashoff", "POST",{})}>Lef Flash Off</button>
                <button onClick={() => fetchData("chd/locksafe", "POST",{
                    lock: true
                })}>Lock On</button>
                <button onClick={() => fetchData("chd/locksafe", "POST",{
                    lock: false
                })}>Lock Off</button>
            </div>

        </div>
    )
}