import React from "react";
import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import { ButtonBodyWrapper, SpinnerWrapper } from "./styles";

const SpinnerButton = ({ onClick, loading = false, buttonlabel = "Search" }) => {
    return (
        <Button variant="outlined" onClick={onClick}>
            <ButtonBodyWrapper>
                {loading && (
                    <SpinnerWrapper>
                        <CircularProgress size={12} />
                    </SpinnerWrapper>
                )}
                {buttonlabel}
            </ButtonBodyWrapper>
        </Button>
    );
};

SpinnerButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    buttonlabel: PropTypes.string,
};

export default SpinnerButton;
