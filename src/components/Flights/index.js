import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import { get } from "lodash";

import { formatDuration } from "modules/dateAndTime";

import AccordionBody from "./AccordionBody";
import AccordionHeader from "./AccordionHeader";
import { Accordion, AccordionDetails, AccordionSummary } from "./styles";

const Flights = ({ flights = [], error = null }) => {
    const [expanded, setExpanded] = useState(null);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    if (error) {
        return <div>error</div>;
    }

    function getLayoverTime(firstDateTime, secondsDateTime) {
        const timeDiff = dayjs(secondsDateTime).diff(firstDateTime);
        const timeDiffInMinutes = Math.floor(timeDiff / 60000);
        return formatDuration(timeDiffInMinutes);
    }

    return (
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
                                flightsInRoute={flightsInRoute}
                                flightRoute={flightRoute}
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                            <AccordionBody flightsInRoute={flightsInRoute} />
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </Box>
    );
};

Flights.propTypes = {
    flights: PropTypes.array,
    error: PropTypes.object,
};

export default Flights;
