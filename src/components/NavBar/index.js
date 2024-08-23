import React, { useContext, useState } from "react";

import Button from "@mui/material/Button";

import LoginModal from "components/LoginModal";

import { AuthContext } from "contexts/AuthContext";

import { NavBarWrapper } from "./styles";

const NavBar = () => {
    const [showModal, setShowModal] = useState(false);

    const { user, logout } = useContext(AuthContext);

    return (
        <NavBarWrapper>
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
        </NavBarWrapper>
    );
};

export default NavBar;
