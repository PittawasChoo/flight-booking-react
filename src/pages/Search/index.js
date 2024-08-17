import React, { useState } from "react";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

import useFlightBookingApi from "../../hooks/useFlightBookingApi";
import Flights from "../../components/Flights";
import { axiosMethods } from "../../constant/axiosMethods";
import FullPageLoader from "../../components/FullPageLoader";

import NoSearch from "./NoSearch";
import AirportInput from "../../components/AirportInput";

const Search = () => {
    const [original, setOriginal] = useState(null);
    const [destination, setDestination] = useState(null);
    const [departureDate, setDepartureDate] = useState(null);

    // get all airports data
    const {
        data: allAirports,
        error,
        isLoading,
    } = useFlightBookingApi({
        route: "/airports/all",
        method: axiosMethods.GET,
    });

    if (isLoading) {
        return <FullPageLoader />;
    }

    if (error) {
        return <div>Error</div>;
    }

    return (
        <div>
            <AirportInput
                allAirports={allAirports}
                inputId="originalAirport"
                value={original}
                onValueChange={(event, newValue) => {
                    setOriginal(newValue);
                }}
                label="Depart from"
            />
            <AirportInput
                allAirports={allAirports}
                inputId="destinationAirport"
                value={destination}
                onValueChange={(event, newValue) => {
                    setDestination(newValue);
                }}
                label="Destination"
            />
            <DatePicker
                id="departureDate"
                label="Depature Date"
                value={departureDate}
                onChange={(newValue) => setDepartureDate(newValue)}
                minDate={dayjs()}
            />
            <Button variant="contained">Search</Button>
            {flights.lenght > 0 ? <Flights flights={flights} /> : <NoSearch />}
        </div>
    );
};

export default Search;
