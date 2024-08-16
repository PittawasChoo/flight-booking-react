import React, { useState } from "react";
import { Button, Input } from "reactstrap";
import { DatePicker } from "reactstrap-date-picker";

import Flights from "../../components/Flights";

import NoSearch from "./NoSearch";

const Search = () => {
    const [original, setOriginal] = useState("");
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState(null);

    const today = new Date();
    const flights = [];

    const handleChangeOriginal = (e) => {
        setOriginal(e.target.value);
    };

    const handleChangeDestination = (e) => {
        setDestination(e.target.value);
    };

    const handleChangeDate = (value) => {
        setDate(value);
    };

    return (
        <div>
            <Input
                id="original"
                name="original"
                value={original}
                onChange={handleChangeOriginal}
                placeholder="original"
                bsSize="lg"
            />
            <Input
                id="destination"
                name="destination"
                value={destination}
                onChange={handleChangeDestination}
                placeholder="destination"
                bsSize="lg"
            />
            <DatePicker
                id="datePicker"
                value={date}
                dateFormat={"DD/MM/YYYY"}
                name="datePicker"
                minDate={today}
                onChange={handleChangeDate}
            />
            <Button color="primary">Search</Button>

            {flights.lenght > 0 ? <Flights flights={flights} /> : <NoSearch />}
        </div>
    );
};

export default Search;
