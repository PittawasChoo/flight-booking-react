import axios from "axios";
import useSWRMutation from "swr/mutation";
import { get } from "lodash";

import { axiosMethods } from "constant/axiosMethods";

const FLIGHT_BOOKING_API_URL = process.env.REACT_APP_FLIGHT_BOOKING_API_URL;

const SUCCESS_STATUS_TEXT = ["OK", "Created"];

const useFlightBookingApiMutation = ({ route, method, options = null, body = null }) => {
    const authToken = localStorage.getItem("authToken");

    const getFetcher = (url) => {
        return axios({
            method,
            url,
            headers: {
                "Content-Type": "application/json",
                "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
                "X-Content-Type-Options": "nosniff",
                "X-Frame-Options": "DENY",
                "X-XSS-Protection": "1; mode=block",
                Accept: "application/json",
                ...(authToken && { Authorization: "Bearer " + authToken }),
            },
            data: body,
            // XMLHttpRequest always ignores body from get request. Need to send as params instead
            ...(method === axiosMethods.GET && { params: body }),
        })
            .then((res) => {
                if (!SUCCESS_STATUS_TEXT.includes(res.statusText)) {
                    const error = new Error("An error occurred while fetching the data.");
                    // Attach extra info to the error object.
                    error.status = res;
                    throw error;
                }

                const data = res.data;
                if (get(options, "onComplete", null)) {
                    options.onComplete(data);
                }
                return data;
            })
            .catch((err) => {
                // Log or handle the error appropriately
                console.error("Request failed:", err);
                if (get(options, "onError", null)) {
                    options.onError(err);
                }
                return;
            });
    };

    const { data, trigger, isMutating } = useSWRMutation(
        `${FLIGHT_BOOKING_API_URL}/api${route}`,
        getFetcher,
        options
    );

    return { data, trigger, isMutating };
};

export default useFlightBookingApiMutation;
