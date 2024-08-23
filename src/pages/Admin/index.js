import React, { useState } from "react";

import Button from "@mui/material/Button";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";

import FullPageLoader from "components/FullPageLoader";
import NoPermission from "components/NoPermission/indexl";
import PageNotFound from "components/PageNotFound";

import { axiosMethods } from "constant/axiosMethods";

import useFlightBookingApi from "hooks/useFlightBookingApi";

const Admin = () => {
    const [error, setError] = useState({ isError: false, err: null });

    const navigate = useNavigate();

    // get permission
    const { data, isLoading } = useFlightBookingApi({
        route: "/permission/admin-page",
        method: axiosMethods.GET,
        options: {
            onError: (err) => {
                setError({ isError: true, err });
            },
            onComplete: () => setError({ isError: false, err: null }),
        },
    });

    if (isLoading) {
        return <FullPageLoader />;
    }

    if (error.isError) {
        return <PageNotFound />;
    }

    const allowAccess = get(data, "allowAccess", false);

    if (!allowAccess) {
        return <NoPermission />;
    }

    return (
        <div style={{ fontSize: "20px", textAlign: "center", paddingTop: "200px" }}>
            <div style={{ fontSize: "30px", marginBottom: "40px" }}>
                <b>Admin page</b>
            </div>

            <div>Only user with admin role can access this page</div>
            <div>The permission to access this page was defined from backend</div>
            <div style={{ marginBottom: "40px" }}>
                No permission condition logic in front-end code and no role encrypted in token
            </div>
            <Button variant="contained" size="md" onClick={() => navigate("/")}>
                Back to main page
            </Button>
        </div>
    );
};

export default Admin;
