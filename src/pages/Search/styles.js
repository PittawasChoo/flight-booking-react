import styled from "styled-components";

export const Banner = styled.div`
    width: 100%;
    height: 250px;
    position: relative;
    background-image: url(/images/banner.svg);
    background-repeat: no-repeat;
    background-size: cover;
`;

export const BannerFade = styled.div`
    position: absolute;
    width: 100%;
    height: 250px;
    background: linear-gradient(to bottom, transparent 0%, rgb(18, 18, 18) 100%);
`;

export const BannerText = styled.div`
    margin: 20px 0 20px 0;
    text-align: center;
    font-size: 40px;
    font-weight: 500;
`;

export const ContentWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 80px;
`;

export const Content = styled.div`
    width: 1000px;
`;

export const InputWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 40px;
`;
