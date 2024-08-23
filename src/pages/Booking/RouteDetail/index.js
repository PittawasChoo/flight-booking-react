import React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import dayjs from "dayjs";
import { get } from "lodash";

import { formatDuration, formatToTime } from "modules/dateAndTime";

import {
    RouteDetailWrapper,
    RouteDetailHeader,
    FlightSummaryWrapper,
    FlightSummaryTextWrapper,
    FlightDetail,
    FlightSummaryText,
    TimeWrapper,
    TotalWrapper,
    ArrivalWrapper,
    DepartureWrapper,
    FlightDetailSeparator,
    FlightDetailWrapper,
    FlightWrapper,
    LayOver,
    LayOverSeparator,
    TextSeparator,
    TravelTimeDot,
    TravelTimeText,
    TravelTimeWrapper,
} from "./styles";

const RouteDetail = ({ routeData }) => {
    const flightsInRoute = get(routeData, "flights", []);

    function getLayoverTime(firstDateTime, secondsDateTime) {
        const timeDiff = dayjs(secondsDateTime).diff(firstDateTime);
        const timeDiffInMinutes = Math.floor(timeDiff / 60000);
        return formatDuration(timeDiffInMinutes);
    }

    return (
        <RouteDetailWrapper>
            <Box
                sx={{
                    borderRadius: 1,
                    borderStyle: "solid",
                    borderColor: "divider",
                    backgroundColor: "rgb(30, 30, 30)",
                }}
            >
                <RouteDetailHeader>
                    {routeData.originalAirportCity} &#x2192; {routeData.destinationAirportCity}
                    {routeData.departureDate}
                </RouteDetailHeader>

                <FlightSummaryWrapper>
                    <div>
                        {routeData.originalAirportCity} ({routeData.originalAirportCode}) -{" "}
                        {routeData.destinationAirportCity} ({routeData.destinationAirportCode})
                    </div>
                    <FlightSummaryTextWrapper>
                        <FlightSummaryText>
                            {dayjs(routeData.departure).format("D MMM")}
                        </FlightSummaryText>
                        <TextSeparator />
                        <FlightSummaryText>
                            {formatToTime(routeData.departure)} - {formatToTime(routeData.arrival)}
                        </FlightSummaryText>
                        <TextSeparator />
                        <FlightSummaryText>{formatDuration(routeData.duration)}</FlightSummaryText>
                    </FlightSummaryTextWrapper>
                </FlightSummaryWrapper>

                <FlightDetail>
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
                                            {flight.originalAirportCity},{" "}
                                            {flight.originalAirportCountry}
                                        </div>
                                    </LayOver>
                                )}
                                <FlightWrapper>
                                    <div>
                                        <DepartureWrapper>
                                            <TimeWrapper>
                                                {formatToTime(flight.departureDateTime)}
                                            </TimeWrapper>
                                            <TextSeparator />
                                            <div>
                                                {flight.originalAirportName} (
                                                {flight.originalAirportCode})
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
                                            <TimeWrapper>
                                                {formatToTime(flight.arrivalDateTime)}
                                            </TimeWrapper>
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
                </FlightDetail>
            </Box>
            <Box
                sx={{
                    borderRadius: 1,
                    borderStyle: "solid",
                    borderColor: "divider",
                    backgroundColor: "rgb(30, 30, 30)",
                    marginTop: "20px",
                }}
            >
                <TotalWrapper>
                    Total {get(routeData, "price", "-").toLocaleString()} THB
                </TotalWrapper>
            </Box>
        </RouteDetailWrapper>
    );
};

RouteDetail.propTypes = {
    routeData: PropTypes.object.isRequired,
};

export default RouteDetail;
