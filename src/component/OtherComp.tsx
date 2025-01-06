import {toast} from "react-toastify";
import React from "react";

interface OtherCompInterface {
    host: string
    fetchData: (url : string, method : string, body : object) => void
}

export const OtherComp : React.FC<OtherCompInterface> = ({host, fetchData}) => {


    return (
        <div className={"form"}>
            <h1>Jamrecovery</h1>

            <div className={"flex"}>
                <button onClick={() => fetchData("chd/jamrecovery", "POST",{})}>Jamrecovery</button>
            </div>

        </div>
    )
}