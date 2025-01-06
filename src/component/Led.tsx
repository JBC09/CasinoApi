import {toast} from "react-toastify";
import {useRef} from "react";

interface LedInterface {
    host: string
    fetchData: (url: string, method: string, body: object) => void
}

export const LedComp: React.FC<LedInterface> = ({host, fetchData}) => {

    const LedIdRef = useRef<HTMLSelectElement>(null);

    return (
        <div className="form led">
            <h1>Led Option</h1>

            <select name="id" id="id" ref={LedIdRef}>
                <option value="0">LED ID: 0</option>
                <option value="1">LED ID: 1</option>
                <option value="2">LED ID: 2</option>
                <option value="3">LED ID: 3</option>
                <option value="4">LED ID: 4</option>
            </select>

            <div className={"flex"}>
                <button onClick={() => fetchData("led/on", "POST", {
                    id: LedIdRef.current?.value
                })}>Led On</button>
                <button onClick={() => fetchData("led/off", "POST", {
                    id: LedIdRef.current?.value
                })}>Led Off</button>
                <button onClick={() => fetchData("led/flashon", "POST", {
                    id: LedIdRef.current?.value
                })}>Led Flash On</button>
                <button onClick={() => fetchData("led/flashoff", "POST", {
                    id: LedIdRef.current?.value
                })}>Led Flash Off</button>
            </div>
        </div>
    )
}