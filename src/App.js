import CssBaseline from "@mui/material/CssBaseline";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import PageNotFound from "components/PageNotFound";

import { AuthProvider } from "contexts/AuthContext";

import Admin from "pages/Admin";
import Booking from "pages/Booking";
import Search from "pages/Search";

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
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<Search />} />
                        <Route path="/booking/*" element={<Booking />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </AuthProvider>
            </LocalizationProvider>
        </ThemeProvider>
    );
}

export default App;
