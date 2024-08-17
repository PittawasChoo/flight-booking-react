import useSWR from "swr";
import axios from "axios";
import { axiosMethods } from "../constant/axiosMethods";

const FLIGHT_BOOKING_API_URL = process.env.REACT_APP_FLIGHT_BOOKING_API_URL;

const useFlightBookingApi = ({ route, method, options = null, body = null }) => {
    const getFetcher = (url) => {
        return axios({
            method,
            url,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            data: body,
            // XMLHttpRequest always ignores body from get request. Need to send as params instead
            ...(method === axiosMethods.GET && { params: { x: 1234 } }),
        }).then((res) => res.data);
    };

    const { data, error, isLoading } = useSWR(
        `${FLIGHT_BOOKING_API_URL}/api${route}`,
        getFetcher,
        options
    );

    return { data, error, isLoading };
};

export default useFlightBookingApi;
