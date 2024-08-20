import React from "react";
import { useSearchParams } from "react-router-dom";

import useFlightBookingApi from "hooks/useFlightBookingApi";
import { axiosMethods } from "constant/axiosMethods";

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const flights = searchParams.get("flights").split(",");

    // get route detail
    const {
        data: route,
        error,
        isLoading,
    } = useFlightBookingApi({
        route: "/flights/route",
        method: axiosMethods.GET,
        body: {
            flights,
        },
    });

    return <div style={{ color: "red" }}>Booking</div>;
};

export default Search;
