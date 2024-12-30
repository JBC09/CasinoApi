import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChipDispenser from "./page/ChipDispenser";
import Header from "./layout/Header";

import { ToastContainer } from 'react-toastify';


export default  function MainRouter() {
    return (
        <div className="app-container">
            <BrowserRouter>
                <ToastContainer />
                <Header/>
                <main className="main-content">
                    <Routes>
                        <Route path="/ChipDispenser" element={<ChipDispenser/>}/>
                    </Routes>
                </main>

            </BrowserRouter>
        </div>
    );
}