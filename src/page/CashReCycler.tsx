import React, { useState, useCallback} from "react";
import {  toast } from 'react-toastify';
import "../styles/chipDispenser.css"

export  default  function CashReCycler() {

    const host : string = "http://127.0.0.1:7000";

    const [active, activeSet] = useState<number>(0);

    const fetchData = useCallback(async (url : string, method : string, body : object) => {
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
    },[]);

    const fcNameList = [
        "Shutter",
        "Deposit",
        "Store Money & Init"
    ];

    const fcList = [
        <React.Fragment>
            <h1>Shutter</h1>

            <div className={"flex"}>
                <button onClick={() => fetchData("car/openshutter", "POST", {})}>Open Shutter</button>
                <button onClick={() => fetchData("car/closeshutter", "POST", {})}>Close Shutter</button>
            </div>
        </React.Fragment>,

        <React.Fragment>
            <h1>Deposit</h1>

            <div className={"flex"}>
                <button onClick={() => fetchData("car/preparedeposit", "POST", {})}>Prepare Deposit</button>
                <button onClick={() => fetchData("car/cancledeposit", "POST", {})}>Cancle Deposit</button>
            </div>
        </React.Fragment>,

        <React.Fragment>
            <h1>Store Money & Init </h1>

            <div className={"flex"}>
                <button onClick={() => fetchData("car/storemoney", "POST", {})}>Store Money</button>
                <button onClick={() => fetchData("car/init", "POST", {})}>Init</button>
            </div>

        </React.Fragment>
        ]
    ;

    return (
        <div id={"chipDispenserWrap"}>
            <div id={"tabWrap"}>

                {fcList.map((index, key) => {
                    return (
                        <div key={key} className={active === key ? "active" : ""} onClick={() => activeSet(key)}>
                            {fcNameList[key]}
                        </div>
                    )
                })}
            </div>

            <div className={"form"}>
                <div id={"chipDispenserContents"}>
                    {fcList[active]}
                </div>
            </div>

        </div>
    )
}