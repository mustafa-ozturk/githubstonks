import react from "react";
import styled from "styled-components";

const Card = () => {
    // add proper icons
    return (
        <Wrapper>
            <IconNameSymbol>
                <StockIcon src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png" />
                <StockName>React</StockName>
                <StockSymbol>RCT</StockSymbol>
            </IconNameSymbol>
            <PriceIncreasePast>
                <Price>$420.00</Price>
                <IncreaseWrapper>
                    <Increase>$120.00 (40%)</Increase>
                    <Past24>past 24h</Past24>
                </IncreaseWrapper>
            </PriceIncreasePast>
            <StatWrapper>
                <Statbox>170k stars</Statbox>
                <Statbox>34k forks</Statbox>
                <Statbox>14k commits</Statbox>
            </StatWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    margin: 1rem;
    border-radius: 7px;
    width: 280px;
    height: 120px;
    padding: 20px;
    box-shadow: 0 2px 1px -5px rgb(0 0 0 / 15%), 0 1px 1px 0 rgb(0 0 0 / 14%),
        0 1px 3px 0 rgb(0 0 0 / 12%);
    &:hover {
        background-color: rgba(0, 0, 0, 0.03);
        cursor: pointer;
    }
`;

const IconNameSymbol = styled.div`
    display: flex;
    position: relative;
    right: 9px;
    margin-bottom: 5px;
`;

const StockIcon = styled.img`
    width: 50px;
`;
const StockName = styled.span`
    font-size: 1.5rem;
    font-weight: 500;
`;
const StockSymbol = styled.span`
    font-size: 1.5rem;
    margin-left: 1rem;
    font-weight: 500;
`;

const Price = styled.p`
    margin: 0;
    font-weight: 500;
`;
const IncreaseWrapper = styled.div`
    margin: 0;
    font-weight: 500;
`;

const Increase = styled.span`
    color: #0f9d58;
`;

const Past24 = styled.span`
    color: rgba(0, 0, 0, 0.5);
    margin-left: 0.5rem;
    font-size: 0.7rem;
`;

const PriceIncreasePast = styled.div`
    margin-bottom: 10px;
`;

const StatWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Statbox = styled.div`
    background-color: rgba(0, 0, 0, 0.1);
    padding: 5px;
    border-radius: 5px;
`;

export default Card;
