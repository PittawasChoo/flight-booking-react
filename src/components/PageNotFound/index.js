import React from "react";

import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import { Background, BackgroundWrapper, ButtonWrapper, Root } from "./styles";

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <Root>
            <BackgroundWrapper>
                <Background />

                <ButtonWrapper>
                    <Button variant="contained" size="md" onClick={() => navigate("/")}>
                        Back to main page
                    </Button>
                </ButtonWrapper>
            </BackgroundWrapper>
        </Root>
    );
};

export default PageNotFound;
