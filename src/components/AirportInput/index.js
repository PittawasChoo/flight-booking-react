import React, { useState } from "react";
import PropTypes from "prop-types";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { get } from "lodash";
import { matchSorter } from "match-sorter";

import { SmallOptionText } from "./styles";

const AirportInput = ({
    allAirports,
    inputId,
    onValueChange,
    label,
    value = null,
    error = false,
    helperText = "",
}) => {
    const [inputValue, setInputValue] = useState("");

    const filterDropdownOptions = (options, { inputValue }) => {
        if (!inputValue) {
            return allAirports;
        }

        return matchSorter(allAirports, inputValue, {
            keys: [
                "airportName",
                "airportNameTH",
                "cityName",
                "cityNameTH",
                "countryName",
                "countryNameTH",
                "countryCode",
                "airportCode",
            ],
        });
    };

    return (
        <Autocomplete
            id={inputId}
            noOptionsText="No matching airports found"
            options={allAirports}
            value={value}
            onChange={onValueChange}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            getOptionLabel={(option) => get(option, "airportName", "-")}
            sx={{ width: 300 }}
            filterOptions={filterDropdownOptions}
            renderInput={(params) => (
                <TextField {...params} error={error} helperText={helperText} label={label} />
            )}
            renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                    <Box key={key} component="li" {...optionProps}>
                        <div>
                            {option.airportName} ({option.airportCode})
                        </div>
                        <SmallOptionText>
                            {option.cityName}, {option.countryName}({option.countryCode})
                        </SmallOptionText>
                    </Box>
                );
            }}
        />
    );
};

AirportInput.propTypes = {
    allAirports: PropTypes.array.isRequired,
    inputId: PropTypes.string.isRequired,
    onValueChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.object,
    error: PropTypes.bool,
    helperText: PropTypes.string,
};

export default AirportInput;
