import { Routes, Route } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Booking from "./pages/Booking";
import Search from "./pages/Search";

const DARK_THEME = createTheme({
    palette: {
        mode: "dark",
    },
});

function App() {
    return (
        <ThemeProvider theme={DARK_THEME}>
            <CssBaseline />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Routes>
                    <Route path="/" element={<Search />} />
                    <Route path="/booking/*" element={<Booking />} />
                </Routes>
            </LocalizationProvider>
        </ThemeProvider>
    );
}

export default App;
