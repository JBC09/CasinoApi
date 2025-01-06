import {useRef,useEffect} from "react";
import {toast} from "react-toastify";

interface CassetteInterface {
    host:string
}

export const CassetteComp : React.FC<CassetteInterface> = ({host}) => {

    const selectRef = useRef<HTMLSelectElement>(null);

    const allEnableCassette = async () => {
        fetch(`${host}/chd/channel/enable/all`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        }).then((res) => res.json())
            .then((data) => {
                if(data["status"] == 0) {
                    toast.success("OK");
                }
                else {
                    toast.error("Error");
                }
            })

    }
    const enableCassette = async () => {
        fetch(`${host}/chd/channel/enable`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: selectRef.current?.value,
                channel: selectRef.current?.value
            })

        }).then((res) => res.json())
        .then((data) => {
            if(data["status"] == 0) {
                toast.success("OK");
            }
            else {
                toast.error("Error");
            }
        })
    }

    const disableCassette = async () => {
        fetch(`${host}/chd/channel/disable`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: selectRef.current?.value,
                channel: selectRef.current?.value
            })
        }).then((res) => res.json())
        .then((data) => {
            if(data["status"] == 0) {
                toast.success("OK");
            }
            else {
                toast.error("Error");
            }
        })
    }




    return (
        <div className={"form"}>
            <h1>Cassette Status</h1>

            <div className={"flex"}>

                <select ref={selectRef}>
                    <option value={1}>Channel 1</option>
                    <option value={2}>Channel 2</option>
                    <option value={3}>Channel 3</option>
                    <option value={4}>Channel 4</option>
                </select>

            </div>

            <div className={"flex"}>
                <button className={"button"} onClick={enableCassette}>Enable Cassette</button>
                <button className={"button"} onClick={disableCassette}>Disable Cassette</button>
                <button className={"button"} onClick={allEnableCassette}>All Enable Cassette</button>
            </div>
        </div>
    )
}