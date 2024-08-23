import React, { useContext, useState } from "react";

import Button from "@mui/material/Button";

import LoginModal from "components/LoginModal";

import { AuthContext } from "contexts/AuthContext";

const NavBar = () => {
    const [showModal, setShowModal] = useState(false);

    const { user, logout } = useContext(AuthContext);
    console.log("user", user);

    return (
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "5px 10px" }}>
            {showModal && (
                <LoginModal
                    onClose={() => setShowModal(false)}
                    onComplete={() => setShowModal(false)}
                />
            )}

            {user.token ? (
                <Button onClick={() => logout()}>Log Out</Button>
            ) : (
                <Button onClick={() => setShowModal(true)}>Log In</Button>
            )}
        </div>
    );
};

export default NavBar;
