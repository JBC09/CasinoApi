
export const Main = () => {
    return (
        <div>
            <div className={"form"}>
                <h1>File</h1>
                <div className={"flex"}>
                    <a href={"/워커힐_ChipDispenser_인터페이스정의서_API_v1.6.xlsx"}
                       download={"워커힐_ChipDispenser_인터페이스정의서_API_v1.xlsx"}>
                        <button className={"button"}>워커힐_ChipDispenser_인터페이스정의서_API_v1 파일 다운로드</button>
                    </a>

                    <a href={"/Clonix Casino Service.postman_collection.json"}
                       download={"Clonix Casino Service.postman_collection.json"}>
                        <button className={"button"}>Clonix Casino API Collection 파일 다운로드</button>
                    </a>
                </div>
            </div>
        </div>
    )
}