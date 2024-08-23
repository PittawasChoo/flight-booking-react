import React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { DatePicker } from "@mui/x-date-pickers";

import { BoxBodyWrapper, BoxHeader, InputGroupWrapper, Label } from "./styles";

dayjs.extend(utc);
dayjs.extend(timezone);

const PaymentDetails = ({
    payment,
    setPayment,
    showError,
    cardNumberError,
    validateCardNumber,
    expDateError,
    validateExpDate,
    cvvError,
    validateCvv,
}) => {
    const showCardNumberError =
        (showError && !payment.cardNumber) || (showError && cardNumberError);
    const getCardNumberInputHelperText = () => {
        if (!showCardNumberError) return;

        if (!payment.cardNumber) return "Require";

        return "Invalid input";
    };

    const showExpDateError = (showError && !payment.expDate) || (showError && expDateError);
    const getExpDateInputHelperText = () => {
        if (!showExpDateError) return;

        if (!payment.expDate) return "Require";

        return "Invalid expiry date input";
    };

    const showCvvError = (showError && !payment.cvv) || (showError && cvvError);
    const getCvvInputHelperText = () => {
        if (!showCvvError) return;

        if (!payment.cvv) return "Require";

        return "Invalid input";
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
                <BoxHeader>Payment Details</BoxHeader>
                <Label>Card number</Label>
                <TextField
                    sx={{ width: 570, marginTop: "8px" }}
                    value={payment.cardNumber}
                    onChange={(e) => {
                        const cardNumber = e.target.value.replace(/[^0-9@]+/, "");
                        setPayment({ ...payment, cardNumber: cardNumber });
                        if (showError) validateCardNumber(cardNumber);
                    }}
                    error={showCardNumberError}
                    helperText={getCardNumberInputHelperText()}
                    label="Card number"
                    type="tel"
                    inputProps={{ maxLength: 16 }}
                />
                <Label>Cardholder name</Label>
                <TextField
                    sx={{ width: 570, marginTop: "8px" }}
                    value={payment.cardHolderName}
                    onChange={(e) => {
                        setPayment({
                            ...payment,
                            cardHolderName: e.target.value.replace(/[^a-zA-Z@]+/, ""),
                        });
                    }}
                    error={showError && !payment.cardHolderName}
                    helperText={showError && !payment.cardHolderName && "Require"}
                    label="Cardholder name"
                />
                <InputGroupWrapper>
                    <div>
                        <Label>Expiry Date</Label>
                        <DatePicker
                            format="MM/YY"
                            views={["month", "year"]}
                            label="Expiry Date"
                            sx={{ width: 275, marginTop: "8px" }}
                            value={payment.expDate}
                            onChange={(date) => {
                                setPayment({ ...payment, expDate: date });
                                if (showError) validateExpDate(date);
                            }}
                            timezone="UTC"
                            disablePast
                            slotProps={{
                                textField: {
                                    error: showExpDateError,
                                    helperText: getExpDateInputHelperText(),
                                },
                            }}
                        />
                    </div>
                    <div>
                        <Label>CVV</Label>
                        <TextField
                            sx={{ width: 275, marginTop: "8px" }}
                            value={payment.cvv}
                            onChange={(e) => {
                                const newValue = e.target.value.replace(/[^0-9@]+/, "");
                                setPayment({
                                    ...payment,
                                    cvv: newValue,
                                });
                                if (showError) validateCvv(newValue);
                            }}
                            error={showCvvError}
                            helperText={getCvvInputHelperText()}
                            label="CVV"
                            inputProps={{ maxLength: 3 }}
                        />
                    </div>
                </InputGroupWrapper>
            </BoxBodyWrapper>
        </Box>
    );
};

PaymentDetails.propTypes = {
    payment: PropTypes.object.isRequired,
    setPayment: PropTypes.func.isRequired,
    showError: PropTypes.bool.isRequired,
    cardNumberError: PropTypes.bool.isRequired,
    validateCardNumber: PropTypes.func.isRequired,
    expDateError: PropTypes.bool.isRequired,
    validateExpDate: PropTypes.func.isRequired,
    cvvError: PropTypes.bool.isRequired,
    validateCvv: PropTypes.func.isRequired,
};

export default PaymentDetails;
