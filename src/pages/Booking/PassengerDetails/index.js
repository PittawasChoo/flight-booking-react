import React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import dayjs from "dayjs";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { DatePicker } from "@mui/x-date-pickers";

import { BoxBodyWrapper, BoxHeader, GuideText, Label } from "./styles";

dayjs.extend(utc);
dayjs.extend(timezone);

const PassengerDetails = ({
    passenger,
    setPassenger,
    showError,
    dateOfBirthError,
    validateDateOfBirth,
}) => {
    const showDateOfBirthError =
        (showError && !passenger.dateOfBirth) || (showError && dateOfBirthError);

    const getDateOfBirthInputHelperText = () => {
        if (!showDateOfBirthError) return;

        if (!passenger.dateOfBirth) return "Require";

        return "Invalid date input";
    };

    return (
        <Box
            sx={{
                borderRadius: 1,
                borderStyle: "solid",
                borderColor: "divider",
                backgroundColor: "rgb(30, 30, 30)",
                marginTop: "20px",
            }}
        >
            <BoxBodyWrapper>
                <BoxHeader>Passenger Details</BoxHeader>
                <GuideText>Passenger details must match the passport</GuideText>
                <Label>Title</Label>
                <FormControl error={showError && !passenger.title}>
                    <Select
                        sx={{ width: 570, marginTop: "8px" }}
                        value={passenger.title}
                        onChange={(e) => {
                            setPassenger({ ...passenger, title: e.target.value });
                        }}
                        error={showError && !passenger.title}
                    >
                        <MenuItem value="Mr.">Mr.</MenuItem>
                        <MenuItem value="Mrs.">Mrs.</MenuItem>
                        <MenuItem value="Ms.">Ms.</MenuItem>
                        <MenuItem value="Dr.">Dr.</MenuItem>
                        <MenuItem value="Prof.">Prof.</MenuItem>
                    </Select>
                    {showError && !passenger.title && <FormHelperText>Require</FormHelperText>}
                </FormControl>
                <Label>First name</Label>
                <TextField
                    sx={{ width: 570, marginTop: "8px" }}
                    value={passenger.firstName}
                    onChange={(e) => {
                        setPassenger({
                            ...passenger,
                            firstName: e.target.value.replace(/[^a-zA-Z@]+/, ""),
                        });
                    }}
                    error={showError && !passenger.firstName}
                    helperText={showError && !passenger.firstName && "Require"}
                    label="First name"
                />
                <Label>Last name</Label>
                <TextField
                    sx={{ width: 570, marginTop: "8px" }}
                    value={passenger.lastName}
                    onChange={(e) => {
                        setPassenger({
                            ...passenger,
                            lastName: e.target.value.replace(/[^a-zA-Z@]+/, ""),
                        });
                    }}
                    error={showError && !passenger.lastName}
                    helperText={showError && !passenger.lastName && "Require"}
                    label="Last name"
                />
                <Label>Date of birth</Label>
                <DatePicker
                    label="Date of birth"
                    sx={{ width: 570, marginTop: "8px" }}
                    value={passenger.dateOfBirth}
                    onChange={(date) => {
                        setPassenger({ ...passenger, dateOfBirth: date });
                        if (showError) validateDateOfBirth(date);
                    }}
                    timezone="UTC"
                    disableFuture
                    slotProps={{
                        textField: {
                            error: showDateOfBirthError,
                            helperText: getDateOfBirthInputHelperText(),
                        },
                    }}
                />
                <Label>Nationality</Label>
                <TextField
                    sx={{ width: 570, marginTop: "8px" }}
                    value={passenger.nationality}
                    onChange={(e) => {
                        setPassenger({
                            ...passenger,
                            nationality: e.target.value.replace(/[^a-zA-Z@]+/, ""),
                        });
                    }}
                    error={showError && !passenger.nationality}
                    helperText={showError && !passenger.nationality && "Require"}
                    label="Nationality"
                />
            </BoxBodyWrapper>
        </Box>
    );
};

PassengerDetails.propTypes = {
    passenger: PropTypes.object.isRequired,
    setPassenger: PropTypes.func.isRequired,
    showError: PropTypes.bool.isRequired,
    dateOfBirthError: PropTypes.bool.isRequired,
    validateDateOfBirth: PropTypes.func.isRequired,
};

export default PassengerDetails;
