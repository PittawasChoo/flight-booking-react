import React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { BoxBodyWrapper, BoxHeader, GuideText, Label } from "./styles";

const ContactDetails = ({
    contact,
    setContact,
    showError,
    phoneNumberError,
    validatePhoneNumber,
    emailError,
    validateEmail,
}) => {
    const showEmailError = (showError && !contact.email) || (showError && emailError);
    const getEmailInputHelperText = () => {
        if (!emailError) return;

        if (!contact.email) return "Require";

        return "Invalid email input";
    };

    const showPhoneNumberError =
        (showError && !contact.phoneNumber) || (showError && phoneNumberError);
    const getPhoneNumberInputHelperText = () => {
        if (!phoneNumberError) return;

        if (!contact.phoneNumber) return "Require";

        return "Invalid phone number input";
    };

    return (
        <Box
            sx={{
                borderRadius: 1,
                borderStyle: "solid",
                borderColor: "divider",
                backgroundColor: "rgb(30, 30, 30)",
            }}
        >
            <BoxBodyWrapper>
                <BoxHeader>Contact Details</BoxHeader>
                <GuideText>This is where your E-Ticket will be sent</GuideText>
                <Label>First name</Label>
                <TextField
                    sx={{ width: 570, marginTop: "8px" }}
                    value={contact.firstName}
                    onChange={(e) => {
                        setContact({
                            ...contact,
                            firstName: e.target.value.replace(/[^a-zA-Z@]+/, ""),
                        });
                    }}
                    error={showError && !contact.firstName}
                    helperText={showError && !contact.firstName && "Require"}
                    label="First name"
                />
                <Label>Last name</Label>
                <TextField
                    sx={{ width: 570, marginTop: "8px" }}
                    value={contact.lastName}
                    onChange={(e) => {
                        setContact({
                            ...contact,
                            lastName: e.target.value.replace(/[^a-zA-Z@]+/, ""),
                        });
                    }}
                    error={showError && !contact.lastName}
                    helperText={showError && !contact.lastName && "Require"}
                    label="Last name"
                />
                <Label>Phone number</Label>
                <TextField
                    sx={{ width: 570, marginTop: "8px" }}
                    value={contact.phoneNumber}
                    onChange={(e) => {
                        const phoneNumber = e.target.value.replace(/[^0-9@]+/, "");
                        setContact({
                            ...contact,
                            phoneNumber,
                        });
                        if (showError) validatePhoneNumber(phoneNumber);
                    }}
                    error={showPhoneNumberError}
                    helperText={getPhoneNumberInputHelperText()}
                    label="Phone number"
                    inputProps={{ maxLength: 10 }}
                />
                <Label>Email</Label>
                <TextField
                    sx={{ width: 570, marginTop: "8px" }}
                    value={contact.email}
                    onChange={(e) => {
                        const email = e.target.value;
                        setContact({ ...contact, email });
                        if (showError) validateEmail(email);
                    }}
                    error={showEmailError}
                    helperText={getEmailInputHelperText()}
                    label="Email"
                    type="email"
                />
            </BoxBodyWrapper>
        </Box>
    );
};

ContactDetails.propTypes = {
    contact: PropTypes.object.isRequired,
    setContact: PropTypes.func.isRequired,
    showError: PropTypes.bool.isRequired,
    phoneNumberError: PropTypes.bool.isRequired,
    validatePhoneNumber: PropTypes.func.isRequired,
    emailError: PropTypes.bool.isRequired,
    validateEmail: PropTypes.func.isRequired,
};

export default ContactDetails;
