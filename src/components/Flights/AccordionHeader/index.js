import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import pluralize from "pluralize";
import { createSearchParams } from "react-router-dom";
import { uniq } from "lodash";
import { useNavigate } from "react-router-dom";

import { formatDuration, formatToTime } from "modules/dateAndTime";

import {
    AccordionTopicAirlineLogoWrapper,
    AccordionTopicAirlines,
    AccordionTopicColumnWrapper,
    AccordionTopicFirstColumnWrapper,
    AccordionTopicTravelTime,
    AccordionTopicWrapper,
} from "./styles";

const AccordionHeader = ({ flightsInRoute, flightRoute }) => {
    const navigate = useNavigate();

    function getAirlineLogo(flightsInRoute) {
        const allFlightLogos = flightsInRoute.map((flight) => flight.airlineLogo);
        const uniqLogos = uniq(allFlightLogos);

        if (uniqLogos.length === 1) {
            // if all flights in this route are from same airline
            return uniqLogos[0];
        } else {
            // if flights are from different airlines
            return "/icons/multiple-airlines.jpg";
        }
    }

    function getAirlineNames(flightsInRoute) {
        const allAirlineNames = flightsInRoute.map((flight) => flight.airlineName);
        return uniq(allAirlineNames).join(", ");
    }

    return (
        <AccordionTopicWrapper>
            <AccordionTopicFirstColumnWrapper>
                <AccordionTopicAirlineLogoWrapper>
                    <img src={getAirlineLogo(flightsInRoute)} alt="airline-logo" width={50} />
                </AccordionTopicAirlineLogoWrapper>

                <div>
                    <AccordionTopicTravelTime>{`${formatToTime(
                        flightRoute.departure
                    )} - ${formatToTime(flightRoute.arrival)}`}</AccordionTopicTravelTime>

                    <AccordionTopicAirlines>
                        {getAirlineNames(flightsInRoute)}
                    </AccordionTopicAirlines>
                </div>
            </AccordionTopicFirstColumnWrapper>

            <AccordionTopicColumnWrapper>
                {formatDuration(flightRoute.duration)}
            </AccordionTopicColumnWrapper>

            <AccordionTopicColumnWrapper>
                {flightsInRoute.length === 1
                    ? "Direct Flight"
                    : pluralize("Stop", flightsInRoute.length - 1, true)}
            </AccordionTopicColumnWrapper>

            <AccordionTopicColumnWrapper>
                {flightRoute.price.toLocaleString()} THB
            </AccordionTopicColumnWrapper>

            <AccordionTopicColumnWrapper>
                <Button
                    variant="outlined"
                    size="sm"
                    onClick={(event) => {
                        event.stopPropagation();
                        const path = {
                            pathname: "/booking",
                            search: createSearchParams({
                                flights: flightsInRoute.map((flight) => flight.id).join(","),
                            }).toString(),
                        };
                        navigate(path);
                    }}
                >
                    Select Flight
                </Button>
            </AccordionTopicColumnWrapper>
        </AccordionTopicWrapper>
    );
};

AccordionHeader.propTypes = {
    flightsInRoute: PropTypes.array,
    flightRoute: PropTypes.object,
};

export default AccordionHeader;
