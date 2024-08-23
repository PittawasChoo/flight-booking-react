import React, { useState } from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import { createSearchParams, useNavigate } from "react-router-dom";
import { get } from "lodash";

import LoginModal from "components/LoginModal";

import AccordionBody from "./AccordionBody";
import AccordionHeader from "./AccordionHeader";
import Error from "./Error";
import NoFlights from "./NoFlights";
import { Accordion, AccordionDetails, AccordionSummary } from "./styles";

const Flights = ({ flights = [], error = null }) => {
    const [expanded, setExpanded] = useState(null);
    const [selectedFlights, setSelectedFlights] = useState([]);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const navigate = useNavigate();

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    if (error) {
        return <Error />;
    }

    if (flights.length === 0) {
        return <NoFlights />;
    }

    const navigateToBookingPage = () => {
        const path = {
            pathname: "/booking",
            search: createSearchParams({
                flights: selectedFlights.map((flight) => flight.id).join(","),
            }).toString(),
        };
        navigate(path);
    };

    const handleSelectFlight = (flightsInRoute) => {
        setSelectedFlights(flightsInRoute);
        const authToken = localStorage.getItem("authToken");

        // if user is logged in
        if (authToken) {
            const path = {
                pathname: "/booking",
                search: createSearchParams({
                    flights: flightsInRoute.map((flight) => flight.id).join(","),
                }).toString(),
            };
            navigate(path);
        }

        setShowLoginModal(true);
    };

    return (
        <>
            {/* Show login modal if user never logged in */}
            {showLoginModal && (
                <LoginModal
                    onClose={() => setShowLoginModal(false)}
                    onComplete={navigateToBookingPage}
                />
            )}

            {/* Show flights detail */}
            <Box
                sx={{
                    borderRadius: 1,
                    borderStyle: "solid",
                    borderColor: "divider",
                }}
            >
                {flights.map((flightRoute, index) => {
                    const flightsInRoute = get(flightRoute, "flights", []);
                    return (
                        <Accordion
                            key={index}
                            expanded={expanded === `option${index}`}
                            onChange={handleChange(`option${index}`)}
                        >
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <AccordionHeader
                                    flightRoute={flightRoute}
                                    onSelectRoute={() => handleSelectFlight(flightsInRoute)}
                                />
                            </AccordionSummary>
                            <AccordionDetails>
                                <AccordionBody
                                    flightsInRoute={flightsInRoute}
                                    onSelectRoute={() => handleSelectFlight(flightsInRoute)}
                                />
                            </AccordionDetails>
                        </Accordion>
                    );
                })}
            </Box>
        </>
    );
};

Flights.propTypes = {
    flights: PropTypes.array,
    error: PropTypes.object,
};

export default Flights;
