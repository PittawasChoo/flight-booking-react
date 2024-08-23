import InputAdornment from "@mui/material/InputAdornment";
import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";

export const StyledInputAdornment = muiStyled((props) => <InputAdornment {...props} />)(
    ({ theme }) => ({
        marginRight: "2px",
        marginLeft: "-8px",
    })
);

export const BoxBodyWrapper = styled.div`
    padding: 20px 20px;
`;

export const BoxHeader = styled.div`
    font-size: 18px;
`;

export const Label = styled.div`
    margin-top: 14px;
    font-size: 14px;
`;

export const InputGroupWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;
