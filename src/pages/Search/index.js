import React, { useState } from "react";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { get } from "lodash";

import useFlightBookingApi from "hooks/useFlightBookingApi";
import useFlightBookingApiMutation from "hooks/useFlightBookingApiMutation";

import AirportInput from "components/AirportInput";
import Flights from "components/Flights";
import FullPageLoader from "components/FullPageLoader";

import { axiosMethods } from "constant/axiosMethods";

import NoSearch from "./NoSearch";
import { Banner, BannerFade, BannerText, ContentWrapper, Content, InputWrapper } from "./styles";

const Search = () => {
    const [original, setOriginal] = useState(null);
    const [destination, setDestination] = useState(null);
    const [departureDate, setDepartureDate] = useState(null);
    const [showError, setShowError] = useState(false);

    // get all airports data
    const {
        data: allAirports,
        error,
        isLoading,
    } = useFlightBookingApi({
        route: "/airports/all",
        method: axiosMethods.GET,
    });

    // get search result
    const {
        data: searchResult,
        trigger: search,
        error: searchError,
        isMutating,
    } = useFlightBookingApiMutation({
        route: "/flights/search",
        method: axiosMethods.GET,
        body: {
            originalAirportCode: get(original, "airportCode", ""),
            destinationAirportCode: get(destination, "airportCode"),
            departureDate: dayjs(departureDate).format("YYYY-MM-DD"),
        },
    });

    if (isLoading) {
        return <FullPageLoader />;
    }

    if (error) {
        return <div>Error</div>;
    }

    const getContent = () => {
        if (!searchResult) {
            return <NoSearch />;
        }

        if (isMutating) {
            return <div>searching...</div>;
        }

        if (searchResult) {
            return <Flights error={searchError} flights={searchResult} />;
        }
    };

    const validateInput = () => {
        const hasError = !original || !destination || !departureDate || departureDate < new Date();
        if (hasError) {
            setShowError(true);
        } else {
            setShowError(false);
            search();
        }
    };

    const getDatePickerErrorText = () => {
        if (showError && !departureDate) {
            return "Please select departure date";
        }

        if (showError && !departureDate) {
            return "Selected date is in valid";
        }

        return;
    };

    return (
        <>
            <Banner>
                <BannerFade />
            </Banner>
            <BannerText>Code Challenge: Flight Booking</BannerText>
            <ContentWrapper>
                <Content>
                    <InputWrapper>
                        <AirportInput
                            allAirports={allAirports}
                            inputId="originalAirport"
                            value={original}
                            onValueChange={(event, newValue) => {
                                setOriginal(newValue);
                            }}
                            label="Depart from"
                            error={showError && !original}
                            helperText={showError && !original && "Please select original airport"}
                        />
                        <AirportInput
                            allAirports={allAirports}
                            inputId="destinationAirport"
                            value={destination}
                            onValueChange={(event, newValue) => {
                                setDestination(newValue);
                            }}
                            label="Destination"
                            error={showError && !destination}
                            helperText={
                                showError && !destination && "Please select destination airport"
                            }
                        />
                        <DatePicker
                            error
                            id="departureDate"
                            label="Depature Date"
                            value={departureDate}
                            onChange={(newValue) => setDepartureDate(newValue)}
                            disablePast
                            slotProps={{
                                textField: {
                                    error: showError && !departureDate,
                                    helperText: getDatePickerErrorText(),
                                },
                            }}
                        />
                        <Button variant="contained" onClick={validateInput}>
                            Search
                        </Button>
                    </InputWrapper>
                    {getContent()}
                </Content>
            </ContentWrapper>
        </>
    );
};

export default Search;
