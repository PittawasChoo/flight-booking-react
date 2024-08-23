import React from "react";
import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import pluralize from "pluralize";
import { get, uniq } from "lodash";

import { formatDuration, formatToTime } from "modules/dateAndTime";

import {
    AccordionTopicAirlineLogoWrapper,
    AccordionTopicAirlines,
    AccordionTopicColumnWrapper,
    AccordionTopicFirstColumnWrapper,
    AccordionTopicTravelTime,
    AccordionTopicWrapper,
} from "./styles";

const AccordionHeader = ({ flightRoute, onSelectRoute }) => {
    const flightsInRoute = get(flightRoute, "flights", []);

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
                        onSelectRoute();
                    }}
                >
                    Select Flight
                </Button>
            </AccordionTopicColumnWrapper>
        </AccordionTopicWrapper>
    );
};

AccordionHeader.propTypes = {
    flightRoute: PropTypes.object.isRequired,
    onSelectRoute: PropTypes.func.isRequired,
};

export default AccordionHeader;
