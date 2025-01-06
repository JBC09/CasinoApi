import React , {useRef} from "react";
import {toast} from "react-toastify";

interface ChipFromCassetteInterface {
    host: string
}
export  const ChipFromCassette : React.FC<ChipFromCassetteInterface> = ({host}) => {

    const selectRef = useRef<HTMLSelectElement>(null);
    const countRef = useRef<HTMLInputElement>(null);


    const chipFromSelectChannel = async () => {
        fetch(`${host}/chd/channel/enable`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: selectRef.current?.value,
                channel: selectRef.current?.value,
                count: countRef.current?.value
            })

        }).then((res) => res.json())
            .then((data) => {
                toast(data["result"]);
            })
    }


    return (
        <div className={"form"}>
            <h1>Chip From Cassette</h1>
            

            <div className={"flex"}>
                <div>
                    <label>Count : </label>
                    <input type={"number"} ref={countRef} defaultValue={10}/>
                </div>

                <select ref={selectRef}>
                    <option value={1}>Channel 1</option>
                    <option value={2}>Channel 2</option>
                    <option value={3}>Channel 3</option>
                    <option value={4}>Channel 4</option>
                </select>
            </div>

            <button className={"button"} onClick={chipFromSelectChannel}>Chip Spout</button>

        </div>
    )
}