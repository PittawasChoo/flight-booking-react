import { Routes, Route } from "react-router-dom";

import Booking from "./pages/Booking";
import Search from "./pages/Search";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <div style={{ backgroundColor: "grey", minHeight: "100vh" }}>
            <Routes>
                <Route path="/" element={<Search />} />
                <Route path="/booking/*" element={<Booking />} />
            </Routes>
        </div>
    );
}

export default App;
