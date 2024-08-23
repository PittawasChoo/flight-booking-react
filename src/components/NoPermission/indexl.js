import React from "react";

import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import { Header, LastRow, Root } from "./styles";

const NoPermission = () => {
    const navigate = useNavigate();

    return (
        <Root>
            <Header>
                <b>No permission</b>
            </Header>

            <div>You have no permission to access this page</div>
            <LastRow>Please contact support team for more information</LastRow>
            <Button variant="contained" size="md" onClick={() => navigate("/")}>
                Back to main page
            </Button>
        </Root>
    );
};

export default NoPermission;
