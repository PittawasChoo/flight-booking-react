import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";

export const Accordion = muiStyled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    "&:not(:last-child)": {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    "&::before": {
        display: "none",
    },
}));

export const AccordionSummary = muiStyled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
        {...props}
    />
))(() => ({
    padding: "0 20px 0 0",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
        margin: 0,
    },
}));

export const AccordionDetails = muiStyled(MuiAccordionDetails)(({ theme }) => ({
    borderTop: `1px solid ${theme.palette.divider}`,
}));

export const AccordionTopicWrapper = styled.div`
    flex: 1;
    padding: 20px 0 20px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const AccordionTopicFirstColumnWrapper = styled.div`
    margin-right: 40px;
    display: flex;
`;

export const AccordionTopicColumnWrapper = styled.div`
    margin-right: 40px;
`;

export const AccordionTopicAirlineLogoWrapper = styled.div`
    border-radius: 50%;
    background-color: white;
    height: 50px;
    width: 50px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
`;

export const AccordionTopicTravelTime = styled.div`
    font-size: 18px;
`;

export const AccordionTopicAirlines = styled.div`
    font-size: 12px;
    color: rgb(100, 100, 100);
`;
