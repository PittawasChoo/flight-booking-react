import React from "react";

import CircularProgress from "@mui/material/CircularProgress";

import { CircularProgressWrapper } from "./styles";

const Loading = () => {
    return (
        <CircularProgressWrapper>
            <CircularProgress size={40} color="inherit" />
        </CircularProgressWrapper>
    );
};

export default Loading;
