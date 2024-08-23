import React, { useState } from "react";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import dayjs from "dayjs";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import FullPageLoader from "components/FullPageLoader";
import LoginPage from "components/LoginPage";
import Modal from "components/Modal";
import PageNotFound from "components/PageNotFound";

import { axiosMethods } from "constant/axiosMethods";

import useFlightBookingApi from "hooks/useFlightBookingApi";
import useFlightBookingApiMutation from "hooks/useFlightBookingApiMutation";

import { sanitize } from "modules/text";

import ContactDetails from "./ContractDetails";
import PassengerDetails from "./PassengerDetails";
import PaymentDetails from "./PaymentDetails";
import RouteDetail from "./RouteDetail";
import {
    Content,
    ContentWrapper,
    ButtonWrapper,
    LeftBoxWrapper,
    ModalButtonWrapper,
    ModalTextWrapper,
    RightBoxWrapper,
} from "./styles";

const VALID_EMAIL_FORMAT = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const Booking = () => {
    const [contact, setContact] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
    });
    const [passenger, setPassenger] = useState({
        title: "",
        firstName: "",
        lastName: "",
        dateOfBirth: null,
        nationality: "",
    });
    const [payment, setPayment] = useState({
        cardNumber: "",
        cardHolderName: "",
        expDate: null,
        cvv: "",
    });
    const [pageError, setPageError] = useState({ isError: false, error: null });
    const [showModal, setShowModal] = useState(false);
    const [showError, setShowError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [dateOfBirthError, setDateOfBirthError] = useState(false);
    const [cardNumberError, setCardNumberError] = useState(false);
    const [expDateError, setExpDateError] = useState(false);
    const [cvvError, setCvvError] = useState(false);

    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const selectedFlights = searchParams.get("flights") || "";
    const flights = selectedFlights.split(",");

    // book flight route
    const { trigger: submitForm, isMutating } = useFlightBookingApiMutation({
        route: "/booking/book",
        method: axiosMethods.POST,
        body: {
            contact: {
                firstName: sanitize(contact.firstName),
                lastName: sanitize(contact.lastName),
                email: sanitize(contact.email),
                phoneNumber: sanitize(contact.phoneNumber),
            },
            passengers: [
                {
                    title: sanitize(passenger.title),
                    firstName: sanitize(passenger.firstName),
                    lastName: sanitize(passenger.lastName),
                    dateOfBirth: passenger.dateOfBirth,
                    nationality: sanitize(passenger.nationality),
                },
            ],
            payment: {
                cardNumber: sanitize(payment.cardNumber),
                cardHolderName: sanitize(payment.cardHolderName),
                expDate: payment.expDate,
                cvv: sanitize(payment.cvv),
            },
            flights,
        },
        options: {
            onComplete: () => setShowModal(true),
        },
    });

    // get route detail
    const { data, isLoading } = useFlightBookingApi({
        route: "/flights/route",
        method: axiosMethods.GET,
        body: {
            flights,
        },
        options: {
            onError: (err) => setPageError({ isError: true, error: err }),
            onComplete: () => setPageError({ isError: false, error: null }),
        },
    });

    if (isLoading) {
        return <FullPageLoader />;
    }

    if (pageError.isError) {
        const errorStatus = get(pageError, "error.response.status");

        if (errorStatus === 401) {
            return <LoginPage onComplete={() => window.location.reload()} />;
        }

        return <PageNotFound />;
    }

    const routeData = get(data, "routeData", {});

    const validatePhoneNumber = (phoneNumber) => {
        if (phoneNumber && phoneNumber.length === 10) {
            setPhoneNumberError(false);
            return true;
        } else {
            setShowError(true);
            setPhoneNumberError(true);
            return false;
        }
    };
    const validateEmail = (email) => {
        if (email && email.match(VALID_EMAIL_FORMAT)) {
            setEmailError(false);
            return true;
        } else {
            setShowError(true);
            setEmailError(true);
            return false;
        }
    };
    const validateDateOfBirth = (dateOfBirth) => {
        if (dateOfBirth && dayjs(dateOfBirth).isBefore(dayjs(new Date()))) {
            setDateOfBirthError(false);
            return true;
        } else {
            setShowError(true);
            setDateOfBirthError(true);
            return false;
        }
    };
    const validateCardNumber = (cardNumber) => {
        if (cardNumber && cardNumber.length === 16) {
            setCardNumberError(false);
            return true;
        } else {
            setShowError(true);
            setCardNumberError(true);
            return false;
        }
    };
    const validateExpDate = (expDate) => {
        if (expDate && dayjs(new Date()).isBefore(dayjs(expDate))) {
            setExpDateError(false);
            return true;
        } else {
            setShowError(true);
            setExpDateError(true);
            return false;
        }
    };
    const validateCvv = (cvv) => {
        if (cvv && cvv.length === 3) {
            setCvvError(false);
            return true;
        } else {
            setShowError(true);
            setCvvError(true);
            return false;
        }
    };
    const validateOther = () => {
        const validContact =
            !!contact.firstName && !!contact.lastName && !!contact.email && !!contact.phoneNumber;
        const validPassenger =
            !!passenger.title &&
            !!passenger.firstName &&
            !!passenger.lastName &&
            !!passenger.dateOfBirth &&
            !!passenger.nationality;
        const validPayment =
            !!payment.cardNumber && !!payment.cardHolderName && !!payment.expDate && !!payment.cvv;

        return validContact && validPassenger && validPayment;
    };

    const validate = () => {
        setShowError(false);
        const validPhoneNumber = validatePhoneNumber(contact.phoneNumber);
        const validEmail = validateEmail(contact.email);
        const validDateOfBirth = validateDateOfBirth(passenger.dateOfBirth);
        const validCardNumber = validateCardNumber(payment.cardNumber);
        const validExpDate = validateExpDate(payment.expDate);
        const validCvv = validateCvv(payment.cvv);
        const validOther = validateOther();

        if (
            validPhoneNumber &&
            validEmail &&
            validDateOfBirth &&
            validCardNumber &&
            validExpDate &&
            validCvv &&
            validOther
        ) {
            submitForm();
        } else {
            setShowError(true);
        }
    };

    return (
        <ContentWrapper>
            <Content>
                {showModal && (
                    <Modal open onClose={() => setShowModal(false)}>
                        <ModalTextWrapper>Booking details is stored in database.</ModalTextWrapper>
                        <ModalButtonWrapper>
                            <Button size="small" variant="contained" onClick={() => navigate("/")}>
                                Return to home page
                            </Button>
                        </ModalButtonWrapper>
                        <ModalButtonWrapper>
                            <Button size="small" variant="text" onClick={() => setShowModal(false)}>
                                Stay on this page
                            </Button>
                        </ModalButtonWrapper>
                    </Modal>
                )}
                <Backdrop
                    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isMutating}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                {/* Left column */}
                <LeftBoxWrapper>
                    {/* Contact */}
                    <ContactDetails
                        contact={contact}
                        setContact={setContact}
                        showError={showError}
                        phoneNumberError={phoneNumberError}
                        validatePhoneNumber={validatePhoneNumber}
                        emailError={emailError}
                        validateEmail={validateEmail}
                    />
                    {/* Passenger */}
                    <PassengerDetails
                        passenger={passenger}
                        setPassenger={setPassenger}
                        showError={showError}
                        validateDateOfBirth={validateDateOfBirth}
                        dateOfBirthError={dateOfBirthError}
                    />

                    {/* Payment */}
                    <PaymentDetails
                        payment={payment}
                        setPayment={setPayment}
                        showError={showError}
                        validateCardNumber={validateCardNumber}
                        validateExpDate={validateExpDate}
                        validateCvv={validateCvv}
                        cardNumberError={cardNumberError}
                        expDateError={expDateError}
                        cvvError={cvvError}
                    />
                    {/* Submit */}
                    <Box
                        sx={{
                            borderRadius: 1,
                            borderStyle: "solid",
                            borderColor: "divider",
                            backgroundColor: "rgb(30, 30, 30)",
                            marginTop: "20px",
                        }}
                    >
                        <ButtonWrapper>
                            <Button variant="contained" onClick={validate}>
                                Submit
                            </Button>{" "}
                            <Button
                                onClick={() => {
                                    window.scroll({ top: 0, left: 0, behavior: "smooth" });
                                }}
                            >
                                Go to top
                            </Button>
                        </ButtonWrapper>
                    </Box>
                </LeftBoxWrapper>

                {/* Right column */}
                <RightBoxWrapper>
                    <RouteDetail routeData={routeData} />
                </RightBoxWrapper>
            </Content>
        </ContentWrapper>
    );
};

export default Booking;
