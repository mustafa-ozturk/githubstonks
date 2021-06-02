import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { RiStarSLine } from "react-icons/ri";
import { AiOutlineBranches } from "react-icons/ai";
import { BiGitCommit } from "react-icons/bi";
import { abbreviateNumber } from "../utils";

const Card = ({ stonkData }) => {
    return (
        <>
            {stonkData.map((elem, index) => {
                return (
                    <Wrapper key={index}>
                        <Links to={`/stonk/${elem.name}`}>
                            <IconNameSymbol>
                                <StockIcon src={elem.logo} />
                                <StockName>{elem.name}</StockName>
                                <StockSymbol>({elem.symbol})</StockSymbol>
                            </IconNameSymbol>
                            <PriceIncreasePast>
                                <Price>${elem.price.toFixed(2)}</Price>
                                <IncreaseWrapper>
                                    <Increase>
                                        +${elem.increasePrice} (
                                        {elem.increasePercent}%)
                                    </Increase>
                                    <Past24>past 24h</Past24>
                                </IncreaseWrapper>
                            </PriceIncreasePast>
                            <StatWrapper>
                                <Statbox>
                                    {abbreviateNumber(elem.stars)}
                                    <StatIcons>
                                        <RiStarSLine />
                                    </StatIcons>
                                </Statbox>
                                <Statbox>
                                    {abbreviateNumber(elem.forks)}
                                    <StatIcons>
                                        <AiOutlineBranches />
                                    </StatIcons>
                                </Statbox>
                                <Statbox>
                                    {abbreviateNumber(elem.commits)}
                                    <StatIcons>
                                        <BiGitCommit />
                                    </StatIcons>
                                </Statbox>
                            </StatWrapper>
                        </Links>
                    </Wrapper>
                );
            })}
        </>
    );
};

const Wrapper = styled.div`
    margin: 1rem;
    border-radius: 7px;
    width: 300px;
    height: 160px;
    padding: 24px 32px;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12),
        0px 1px 3px rgba(0, 0, 0, 0.2);
    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
        cursor: pointer;
    }
    &:active {
        background-color: rgb(14, 184, 239, 0.05);
    }
`;

const IconNameSymbol = styled.div`
    display: flex;
    position: relative;
    right: 10px;
    margin-bottom: 10px;
`;

const StockIcon = styled.img`
    margin-left: 10px;
    margin-right: 10px;
    width: 40px;
    height: 40px;
    object-fit: scale-down;
`;
const StockName = styled.span`
    font-size: 1.5rem;
    font-weight: 500;
`;
const StockSymbol = styled.span`
    position: relative;
    top: 5px;
    left: 5px;
    font-size: 1rem;
    color: rgba(0, 0, 0, 0.5);
`;

const Price = styled.p`
    margin: 0;
    font-size: 1.5rem;
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

const Links = styled(Link)`
    text-decoration: none;
    color: black;
`;

export default Card;
