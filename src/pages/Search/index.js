import React, { useState } from "react";

import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { get } from "lodash";

import AirportInput from "components/AirportInput";
import Flights from "components/Flights";
import FullPageLoader from "components/FullPageLoader";
import NavBar from "components/NavBar";
import SpinnerButton from "components/SpinnerButton";

import { axiosMethods } from "constant/axiosMethods";

import useFlightBookingApi from "hooks/useFlightBookingApi";
import useFlightBookingApiMutation from "hooks/useFlightBookingApiMutation";

import { sanitize } from "modules/text";

import Loading from "./Loading";
import NoSearch from "./NoSearch";
import { Banner, BannerFade, BannerText, ContentWrapper, Content, InputWrapper } from "./styles";

const Search = () => {
    const [original, setOriginal] = useState(null);
    const [destination, setDestination] = useState(null);
    const [departureDate, setDepartureDate] = useState(null);
    const [showError, setShowError] = useState(false);
    const [isFetched, setIsFetched] = useState(false);
    const [searchError, setSearchError] = useState(null);

    // get all airports data
    const { data: allAirports, isLoading } = useFlightBookingApi({
        route: "/airports/all",
        method: axiosMethods.GET,
    });

    // get search result
    const {
        data: searchResult,
        trigger: search,
        isMutating,
    } = useFlightBookingApiMutation({
        route: "/flights/search",
        method: axiosMethods.GET,
        body: {
            originalAirportCode: sanitize(get(original, "airportCode", "")),
            destinationAirportCode: sanitize(get(destination, "airportCode")),
            departureDate: sanitize(dayjs(departureDate).format("YYYY-MM-DD")),
        },
        options: {
            onError: (err) => {
                setSearchError(err);
            },
            onComplete: () => setSearchError(null),
        },
    });

    if (isLoading) {
        return <FullPageLoader />;
    }

    const getContent = () => {
        if (!isFetched) {
            return <NoSearch />;
        }

        if (isMutating && !searchResult) {
            return <Loading />;
        }

        return <Flights flights={searchResult} error={searchError} />;
    };

    const validateInput = () => {
        const hasError = !original || !destination || !departureDate || departureDate < new Date();
        if (hasError) {
            setShowError(true);
        } else {
            setShowError(false);
            setIsFetched(true);
            search();
        }
    };

    const getDatePickerErrorText = () => {
        if (showError && !departureDate) {
            return "Please select departure date";
        }

        if (showError && departureDate < new Date()) {
            return "Selected date is in valid";
        }

        return;
    };

    return (
        <>
            <NavBar />
            <Banner>
                <BannerFade />
            </Banner>
            <BannerText>Code Challenge: Flight Booking</BannerText>
            <ContentWrapper>
                <Content>
                    <InputWrapper>
                        <AirportInput
                            allAirports={(allAirports || []).filter(
                                (airport) =>
                                    airport.airportCode !== get(destination, "airportCode", "")
                            )}
                            inputId="originalAirport"
                            value={original}
                            onValueChange={(event, newValue) => {
                                setOriginal(newValue);
                            }}
                            label="Depart from"
                            error={showError && !original}
                            helperText={
                                showError && !original ? "Please select original airport" : ""
                            }
                        />
                        <AirportInput
                            allAirports={(allAirports || []).filter(
                                (airport) =>
                                    airport.airportCode !== get(original, "airportCode", "")
                            )}
                            inputId="destinationAirport"
                            value={destination}
                            onValueChange={(event, newValue) => {
                                setDestination(newValue);
                            }}
                            label="Destination"
                            error={showError && !destination}
                            helperText={
                                showError && !destination ? "Please select destination airport" : ""
                            }
                        />
                        <DatePicker
                            id="departureDate"
                            label="Depature Date"
                            value={departureDate}
                            onChange={(newValue) => setDepartureDate(newValue)}
                            disablePast
                            slotProps={{
                                textField: {
                                    error:
                                        showError && (!departureDate || departureDate < new Date()),
                                    helperText: getDatePickerErrorText(),
                                },
                            }}
                        />
                        <SpinnerButton onClick={validateInput} loading={isMutating}>
                            Search
                        </SpinnerButton>
                    </InputWrapper>
                    {getContent()}
                </Content>
            </ContentWrapper>
        </>
    );
};

export default Search;
