import React, { createContext, useState } from "react";

const AuthContext = createContext();

// Create a Provider Component
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        token: localStorage.getItem("authToken") || null,
    });

    const login = (token) => {
        localStorage.setItem("authToken", token);
        setUser((prev) => ({ ...prev, token }));
    };
    const logout = () => {
        localStorage.removeItem("authToken");
        setUser((prev) => ({ ...prev, token: null }));
    };

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
