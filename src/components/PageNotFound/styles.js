import styled from "styled-components";

export const Root = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const BackgroundWrapper = styled.div`
    position: relative;
`;

export const Background = styled.div`
    background-image: url(/images/page_not_found.png);
    background-size: cover;
    width: 800px;
    height: 640px;
`;

export const ButtonWrapper = styled.div`
    position: absolute;
    top: 75%;
    left: 42%;
`;
