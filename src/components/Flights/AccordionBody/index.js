import React from "react";
import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import dayjs from "dayjs";

import { formatDuration, formatToTime } from "modules/dateAndTime";

import {
    AirlineLogoWrapper,
    ArrivalWrapper,
    ButtonWrapper,
    DepartureWrapper,
    FlightDetailSeparator,
    FlightDetailWrapper,
    FlightWrapper,
    LayOver,
    LayOverSeparator,
    RouteDetailWrapper,
    TextSeparator,
    TravelTimeDot,
    TravelTimeText,
    TravelTimeWrapper,
} from "./styles";

const AccordionBody = ({ flightsInRoute, onSelectRoute }) => {
    function getLayoverTime(firstDateTime, secondsDateTime) {
        const timeDiff = dayjs(secondsDateTime).diff(firstDateTime);
        const timeDiffInMinutes = Math.floor(timeDiff / 60000);
        return formatDuration(timeDiffInMinutes);
    }

    return (
        <RouteDetailWrapper>
            {flightsInRoute.map((flight, index) => {
                return (
                    <div key={index}>
                        {index > 0 && (
                            <LayOver>
                                <div>
                                    {getLayoverTime(
                                        flightsInRoute[index - 1].arrivalDateTime,
                                        flight.departureDateTime
                                    )}{" "}
                                    Layover
                                </div>
                                <LayOverSeparator />{" "}
                                <div>
                                    {flight.originalAirportCity}, {flight.originalAirportCountry}
                                </div>
                            </LayOver>
                        )}
                        <FlightWrapper>
                            <AirlineLogoWrapper>
                                <img src={flight.airlineLogo} alt="airline-logo" width={50} />
                            </AirlineLogoWrapper>

                            <div>
                                <DepartureWrapper>
                                    <div>{formatToTime(flight.departureDateTime)}</div>
                                    <TextSeparator />
                                    <div>
                                        {flight.originalAirportName} ({flight.originalAirportCode})
                                    </div>
                                </DepartureWrapper>

                                <TravelTimeWrapper>
                                    <div>
                                        <TravelTimeDot />
                                        <TravelTimeDot />
                                        <TravelTimeDot />
                                        <TravelTimeDot />
                                        <TravelTimeDot />
                                    </div>
                                    <TravelTimeText>
                                        Travel Time: {formatDuration(flight.duration)}
                                    </TravelTimeText>
                                </TravelTimeWrapper>
                                <ArrivalWrapper>
                                    <div>{formatToTime(flight.arrivalDateTime)}</div>
                                    <TextSeparator />
                                    <div>
                                        {flight.destinationAirportName} (
                                        {flight.destinationAirportCode})
                                    </div>
                                </ArrivalWrapper>
                                <FlightDetailWrapper>
                                    <div>{flight.airlineName}</div>
                                    <FlightDetailSeparator />
                                    <div>{flight.flightCode}</div>
                                </FlightDetailWrapper>
                            </div>
                        </FlightWrapper>
                    </div>
                );
            })}
            <ButtonWrapper>
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
            </ButtonWrapper>
        </RouteDetailWrapper>
    );
};

AccordionBody.propTypes = {
    flightsInRoute: PropTypes.array.isRequired,
    onSelectRoute: PropTypes.func.isRequired,
};

export default AccordionBody;
