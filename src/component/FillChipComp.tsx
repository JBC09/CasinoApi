import React, { useState } from 'react';
import {toast} from "react-toastify";

// 각 채널별 수량을 나타내는 타입
type ChannelCount = {
    ch1: number;
    ch2: number;
    ch3: number;
    ch4: number;
};

// 카세트 정보를 나타내는 타입
type Cassette = {
    id: number;           // 카세트 고유 ID
    price: number;        // 칩 가격
    count: ChannelCount;  // 각 채널별 수량
};


interface  FillChipInterface{
    host: string;
}

export  const FillChipComp : React.FC<FillChipInterface> = ({host}) => {


    const initialCassetteState: Cassette[] = [
        {
            id: 1,
            price: 10000,
            count: {ch1: 125, ch2: 125, ch3: 125, ch4: 125},
        },
        {
            id: 2,
            price: 10000,
            count: {ch1: 125, ch2: 125, ch3: 125, ch4: 125},
        },
        {
            id: 3,
            price: 10000,
            count: {ch1: 125, ch2: 125, ch3: 125, ch4: 125},
        },
        {
            id: 4,
            price: 10000,
            count: {ch1: 125, ch2: 125, ch3: 125, ch4: 125},
        },
    ];

    const handleChange = (cassetteIndex: number, field: 'price' | 'count', channel: keyof ChannelCount | null, value: string) => {
        const newCassettes = [...cassettes];
        if (field === 'price') {
            newCassettes[cassetteIndex][field] = parseInt(value) || 0;
        } else if (channel) {
            newCassettes[cassetteIndex].count[channel] = parseInt(value) || 0;
        }
        setCassettes(newCassettes);
    };

    // 칩 채우기 요청 처리
    const handleSubmit = async () => {
        const jsonData = JSON.stringify(cassettes);
        console.log('Submitted JSON:', jsonData);
        try {
            const response = await fetch(`${host}/chd/fillchips`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonData,
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Server Response:', responseData);
                toast.success('Data successfully submitted!');
            } else {
                console.error('Error submitting data:', response.statusText);
                toast.error('Failed to submit data. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred. Please check the console for details.');
        }
    };

    const [cassettes, setCassettes] = useState<Cassette[]>(initialCassetteState);

    return (
        <div className="form">
            <h1>Fill Chips Configuration</h1>
            {/* 카세트 설정 폼 */}
            <div className={"cassetteWrap"}>
                {cassettes.map((cassette, index) => (
                    <div key={cassette.id} className="cassette">
                        <h2>Cassette ID: {cassette.id}</h2>
                        <div>
                            <label>Price: </label>
                            <input
                                type="number"
                                value={cassette.price}
                                onChange={(e) => handleChange(index, 'price', null, e.target.value)}
                            />
                        </div>
                        {/* 각 채널별 수량 설정 */}
                        {Object.keys(cassette.count).map((channel) => (
                            <div key={channel}>
                                <label>{channel.toUpperCase()}: </label>
                                <input
                                    type="number"
                                    value={cassette.count[channel as keyof ChannelCount]}
                                    onChange={(e) => handleChange(index, 'count', channel as keyof ChannelCount, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>)
}