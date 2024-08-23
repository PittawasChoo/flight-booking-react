import React, { useState } from "react";

import Button from "@mui/material/Button";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";

import FullPageLoader from "components/FullPageLoader";
import NoPermission from "components/NoPermission/indexl";
import PageNotFound from "components/PageNotFound";

import { axiosMethods } from "constant/axiosMethods";

import useFlightBookingApi from "hooks/useFlightBookingApi";

import { Header, LastRow, Root } from "./styles";

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
        <Root>
            <Header>
                <b>Admin page</b>
            </Header>

            <div>Only user with admin role can access this page</div>
            <div>The permission to access this page was defined from backend</div>
            <LastRow>
                No permission condition logic in front-end code and no role encrypted in token
            </LastRow>
            <Button variant="contained" size="md" onClick={() => navigate("/")}>
                Back to main page
            </Button>
        </Root>
    );
};

export default Admin;
