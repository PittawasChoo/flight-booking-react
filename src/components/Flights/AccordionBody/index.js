import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { formatDuration, formatToTime } from "modules/dateAndTime";

import {
    AirlineLogoWrapper,
    ArrivalWrapper,
    DepartureWrapper,
    FlightDetailSeparator,
    FlightDetailWrapper,
    FlightWrapper,
    LayOver,
    LayOverSeparator,
    TextSeparator,
    TravelTimeDot,
    TravelTimeWrapper,
    TravelTimeText,
} from "./styles";

const AccordionBody = ({ flightsInRoute }) => {
    function getLayoverTime(firstDateTime, secondsDateTime) {
        const timeDiff = dayjs(secondsDateTime).diff(firstDateTime);
        const timeDiffInMinutes = Math.floor(timeDiff / 60000);
        return formatDuration(timeDiffInMinutes);
    }

    return (
        <>
            {flightsInRoute.map((flight, index) => {
                return (
                    <>
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
                    </>
                );
            })}
        </>
    );
};

AccordionBody.propTypes = {
    flightsInRoute: PropTypes.array,
};

export default AccordionBody;
