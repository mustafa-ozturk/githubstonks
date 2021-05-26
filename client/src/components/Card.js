import react from "react";
import styled from "styled-components";

import { RiStarSLine } from "react-icons/ri";
import { AiOutlineBranches } from "react-icons/ai";
import { BiGitCommit } from "react-icons/bi";
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
                <Statbox>
                    170k
                    <StatIcons>
                        <RiStarSLine />
                    </StatIcons>
                </Statbox>
                <Statbox>
                    34k
                    <StatIcons>
                        <AiOutlineBranches />
                    </StatIcons>
                </Statbox>
                <Statbox>
                    14k
                    <StatIcons>
                        <BiGitCommit />
                    </StatIcons>
                </Statbox>
            </StatWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    margin: 1rem;
    border-radius: 7px;
    width: 300px;
    height: 140px;
    padding: 24px 32px;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12),
        0px 1px 3px rgba(0, 0, 0, 0.2);
    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
        cursor: pointer;
    }
`;

const IconNameSymbol = styled.div`
    display: flex;
    position: relative;
    right: 10px;
    margin-bottom: 10px;
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
    position: relative;
    left: 160px;
    color: rgba(0, 0, 0, 0.5);
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
    margin-bottom: 20px;
`;

const StatWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Statbox = styled.div`
    background-color: rgba(0, 0, 0, 0.1);
    padding: 2px 10px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StatIcons = styled.span`
    font-size: 1.5rem;
    position: relative;
    top: 2px;
    margin-left: 0.5rem;
`;

export default Card;
