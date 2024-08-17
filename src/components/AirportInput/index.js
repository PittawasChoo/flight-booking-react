import React, { useState } from "react";
import PropTypes from "prop-types";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { matchSorter } from "match-sorter";
import { get } from "lodash";

const AirportInput = ({ allAirports, inputId, onValueChange, label, value = null }) => {
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
            renderInput={(params) => <TextField {...params} label={label} />}
            renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                    <Box key={key} component="li" {...optionProps}>
                        <div>
                            <div>
                                {option.airportName} ({option.airportCode})
                            </div>
                            <div style={{ fontSize: "14px", opacity: 0.6 }}>
                                {option.cityName}, {option.countryName}({option.countryCode})
                            </div>
                        </div>
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
};

export default AirportInput;
