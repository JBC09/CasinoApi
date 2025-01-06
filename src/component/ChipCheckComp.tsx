import React, {useEffect, useRef, useMemo} from "react";
import {toast} from "react-toastify";


interface CollectionChipInterface {
    host: string
}

export const ChipCheckComp: React.FC<CollectionChipInterface> = ({host}) => {

    const [activeTab, setActiveTab] = React.useState(0);


    const collectionRef = useRef<HTMLTextAreaElement>(null);
    const chipCountByPriceRef = useRef<HTMLTextAreaElement>(null);
    const chipCountByCassetteRef = useRef<HTMLTextAreaElement>(null);


    const fcNameList = ["Collection Chip", "Get Chip Count By Price", "Get Chip Count By Cassette"];
    const fcList = [
        <React.Fragment>
            <h1>Collection Chip</h1>
            <textarea ref={collectionRef}>
            </textarea>
        </React.Fragment>,
        <React.Fragment>
            <h1>Get Chip Count By Price</h1>
            <textarea ref={chipCountByPriceRef}>
            </textarea>
        </React.Fragment>,
        <React.Fragment>
            <h1>Get Chip Count By Cassette</h1>
            <textarea ref={chipCountByCassetteRef}>
            </textarea>
        </React.Fragment>
    ]

    const fetchFunctions = useMemo(() => ({

        fetchCollection: async () => {
            try {
                const response = await fetch(`${host}/chd/collection`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                });
                const data = await response.json();
                if (collectionRef.current) {
                    collectionRef.current.value = JSON.stringify(data, null, 2);
                }
            } catch (error: any) {
                if (collectionRef.current) {
                    collectionRef.current.value = "Error";
                }
                toast.error('Collection Chip Error:', error);
            }
        },

        fetchChipCountByPrice: async () => {
            try {
                const response = await fetch(`${host}/chd/chipcountbyprice`, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                });
                const data = await response.json();
                if (chipCountByPriceRef.current) {
                    chipCountByPriceRef.current.value = JSON.stringify(data, null, 2);
                }
            } catch (error: any) {
                if (chipCountByPriceRef.current) {
                    chipCountByPriceRef.current.value = "Error";
                }
                toast.error('Chip Count By Price Error:', error);
            }
        },

        fetchChipCountByCassette: async () => {
            try {
                const response = await fetch(`${host}/chd/chipcountbycassette`, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                });
                const data = await response.json();
                if (chipCountByCassetteRef.current) {
                    chipCountByCassetteRef.current.value = JSON.stringify(data, null, 2);
                }
            } catch (error: any) {
                if (chipCountByCassetteRef.current) {
                    chipCountByCassetteRef.current.value = "Error";
                }
                toast.error('Chip Count By Cassette Error:', error);
            }
        }

    }), [host])
    const getData = async () => {
        switch (activeTab) {
            case 0:
                await fetchFunctions.fetchCollection();
                break;
            case 1:
                await fetchFunctions.fetchChipCountByPrice();
                break;
            case 2:
                await fetchFunctions.fetchChipCountByCassette();
                break;
        }
    };

    useEffect(() => {
        getData();
    }, [activeTab]);


    return (
        <div className={"form"}>
            <h1>Chip Check Tab</h1>
            <div id={"chipDispenserWrap"}>
                {/* 서브 탭 네비게이션 */}
                <div id="tabWrap" className={"subTab"}>
                    {fcNameList.map((tab, index) => (
                        <div
                            key={index}
                            className={activeTab === index
                                ? 'active'
                                : 'notActive'
                            }
                            onClick={() => setActiveTab(index)}
                        >
                            {tab}
                        </div>
                    ))}
                </div>

                {/* 현재 선택된 탭의 컨텐츠 표시 */}
                <div id={"chipDispenserContents"}>
                    {fcList[activeTab]}
                </div>
            </div>
        </div>
    )
}