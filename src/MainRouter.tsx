import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChipDispenser from "./page/ChipDispenser";
import Header from "./layout/Header";
import {Main} from "./page/Main";

import { ToastContainer } from 'react-toastify';


export default  function MainRouter() {
    return (
        <div className="app-container">
            <BrowserRouter basename={""}>
                <ToastContainer />
                <Header/>
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Main/>}/>
                        <Route path="/ChipDispenser" element={<ChipDispenser/>}/>
                    </Routes>
                </main>

            </BrowserRouter>
        </div>
    );
}