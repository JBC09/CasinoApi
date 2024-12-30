
interface CassetteInterface {
    host:string
}


export const CassetteComp : React.FC<CassetteInterface> = ({host}) => {
    return (
        <div className={"form"}>
            <h1>Cassette</h1>
        </div>
    )
}