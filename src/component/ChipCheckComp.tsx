import { useRef, useEffect } from "react";
import {toast} from "react-toastify";

interface CollectionChipInterface {
    host: string
}
export  const ChipCheckComp : React.FC<CollectionChipInterface> = ({host}) => {

    const collectionRef = useRef<HTMLTextAreaElement>(null);
    const chipCountByPriceRef = useRef<HTMLTextAreaElement>(null);
    const chipCountByCassetteRef = useRef<HTMLTextAreaElement>(null);
    const getData = async () => {

        // get Collection
        await fetch(`${host}/chd/collection`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        }).then((response) => response.json()).then((data) => {
            // null 체크 추가
            if (collectionRef.current) {
                collectionRef.current.value = data.toString()
            }
        })
        .catch((error) => {
            if (collectionRef.current) {
                collectionRef.current.value = "Error"
            }
            toast.error('Collection Chip Error:', error)
        });


        // Get Chip Count By Price
        await fetch(`${host}/chd/chipcountbyprice`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        }).then((response) => response.json()).then((data) => {
            // null 체크 추가
            if (chipCountByPriceRef.current) {
                chipCountByPriceRef.current.value = data.toString()
            }
        })
        .catch((error) => {
            if (chipCountByPriceRef.current) {
                chipCountByPriceRef.current.value = "Error"
            }
            toast.error('Chip Count By Price Error:', error)
        });

        // Get Chip Count By Cassette
        await fetch(`${host}/chd/chipcountbycassette`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        }).then((response) => response.json()).then((data) => {
            // null 체크 추가
            if (chipCountByCassetteRef.current) {
                chipCountByCassetteRef.current.value = data.toString()
            }
        })
        .catch((error) => {
            if (chipCountByCassetteRef.current) {
                chipCountByCassetteRef.current.value = "Error"
            }
            toast.error('Chip Count By Cassette Error:', error)
        });
    }

    useEffect(() => {
        getData();
    },[]);


    return(
        <div className={"form"}>
            <h1>Collection Chip</h1>
            <textarea ref={collectionRef}>
            </textarea>

            <h1>Get Chip Count By Price</h1>
            <textarea ref={chipCountByPriceRef}>
            </textarea>

            <h1>Get Chip Count By Cassette</h1>
            <textarea ref={chipCountByCassetteRef}>
            </textarea>
        </div>
    )
}