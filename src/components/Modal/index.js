import React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import MuiModal from "@mui/material/Modal";

const MODAL_BOX_STYLES = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
};

const Modal = ({ onClose = () => {}, children }) => {
    return (
        <MuiModal
            open
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={MODAL_BOX_STYLES}>{children}</Box>
        </MuiModal>
    );
};

Modal.propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.node.isRequired,
};

export default Modal;
