import useSWRMutation from "swr/mutation";
import axios from "axios";
import { axiosMethods } from "constant/axiosMethods";

const FLIGHT_BOOKING_API_URL = process.env.REACT_APP_FLIGHT_BOOKING_API_URL;

const useFlightBookingApiMutation = ({ route, method, options = null, body = null }) => {
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
            ...(method === axiosMethods.GET && { params: body }),
        }).then((res) => res.data);
    };

    const { data, trigger, error, isMutating } = useSWRMutation(
        `${FLIGHT_BOOKING_API_URL}/api${route}`,
        getFetcher,
        options
    );

    return { data, trigger, error, isMutating };
};

export default useFlightBookingApiMutation;
