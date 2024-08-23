import React from "react";

import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const NoPermission = () => {
    const navigate = useNavigate();

    return (
        <div style={{ fontSize: "20px", textAlign: "center", paddingTop: "200px" }}>
            <div style={{ fontSize: "30px", marginBottom: "40px" }}>
                <b>No permission</b>
            </div>

            <div>You have no permission to access this page</div>
            <div style={{ marginBottom: "40px" }}>
                Please contact support team for more information
            </div>
            <Button variant="contained" size="md" onClick={() => navigate("/")}>
                Back to main page
            </Button>
        </div>
    );
};

export default NoPermission;
