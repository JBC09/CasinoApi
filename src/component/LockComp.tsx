
interface LockCompInterface {
    fetchData: (url: string, method: string, body: object) => void
}

export const LockComp : React.FC<LockCompInterface> = ({fetchData}) => {

    return (
        <div className={"form"}>
            <h1>Lock Option</h1>

            <div className={"flex"}>
                <button onClick={() => fetchData("chd/locksafe", "POST", {
                    lock: true
                })}>Lock On
                </button>
                <button onClick={() => fetchData("chd/locksafe", "POST", {
                    lock: false
                })}>Lock Off
                </button>
            </div>
        </div>
    )
}