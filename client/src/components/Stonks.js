import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { RiStarSLine } from "react-icons/ri";
import { AiOutlineBranches } from "react-icons/ai";
import { BiGitCommit } from "react-icons/bi";
import Chart from "./Chart";
import GuestExchange from "./guest/GuestExchange";
import RealExchange from "./RealExchange";
import { abbreviateNumber } from "../utils";
import { useMediaQuery } from "react-responsive";
import { MOBILE_SIZE } from "../utils";

const Stonks = ({
    userType,
    stonkData,
    guestUserStatsDispatch,
    guestTotalShares,
    guestBalance,
    setRefetch,
    setRefetchUserSide,
    totalShares,
    balance,
}) => {
    let { stonkname } = useParams();
    const isMobile = useMediaQuery({ query: MOBILE_SIZE });

    const stonkPrice = (elem) => {
        return (
            <PriceIncreasePast isMobile={isMobile}>
                <Price title={elem.price} isMobile={isMobile}>
                    ${abbreviateNumber(elem.price)}
                </Price>
                <IncreaseWrapper isMobile={isMobile}>
                    <Increase isMobile={isMobile}>
                        +$
                        {abbreviateNumber(
                            elem.increasePrice
                        )}
                        (
                        {abbreviateNumber(
                            elem.increasePercent
                        )}
                        %)
                    </Increase>
                    <Past24>past 24h</Past24>
                </IncreaseWrapper>
            </PriceIncreasePast>
        )

    }

    return (
        <>
            {stonkData.map((elem, index) => {
                if (elem.name === stonkname) {
                    return (
                        <Wrapper key={index} isMobile={isMobile}>
                            <Stonk isMobile={isMobile}>
                                <TitleStatWrapper isMobile={isMobile}>
                                    <IconNameSymbol isMobile={isMobile}>
                                        <StockIcon src={elem.logo} isMobile={isMobile} />
                                        <StockName>{elem.name}</StockName>
                                        <StockSymbol isMobile={isMobile}>
                                            ({elem.symbol})
                                        </StockSymbol>
                                    </IconNameSymbol>
                                    <StatWrapper isMobile={isMobile}>
                                        <Statbox title={elem.stars} isMobile={isMobile}>
                                            {abbreviateNumber(elem.stars)}
                                            <StatIcons>
                                                <RiStarSLine />
                                            </StatIcons>
                                        </Statbox>
                                        <Statbox title={elem.forks} isMobile={isMobile}>
                                            {abbreviateNumber(elem.forks)}
                                            <StatIcons>
                                                <AiOutlineBranches />
                                            </StatIcons>
                                        </Statbox>
                                        <Statbox title={elem.commits} isMobile={isMobile}>
                                            {abbreviateNumber(elem.commits)}
                                            <StatIcons>
                                                <BiGitCommit />
                                            </StatIcons>
                                        </Statbox>
                                    </StatWrapper>
                                </TitleStatWrapper>
                                <Graph isMobile={isMobile}>
                                    {isMobile ? (stonkPrice(elem)) : ('')}
                                    <Container isMobile={isMobile}>
                                        {isMobile ? ('') : (stonkPrice(elem))}
                                        <Chart priceHistory={elem.priceHistory} />
                                        <History isMobile={isMobile}>
                                            <span className={"inactive"}>1H</span>
                                            <span className={"inactive"}>24H</span>
                                            <span className={"inactive"}>1W</span>
                                            <span className={"inactive"}>1M</span>
                                            <span className={"inactive"}>1Y</span>
                                            <span className={"active"}>ALL</span>
                                        </History>
                                    </Container>
                                </Graph>
                            </Stonk>

                            {userType === "guest" ? (
                                <GuestExchange
                                    elem={elem}
                                    guestUserStatsDispatch={
                                        guestUserStatsDispatch
                                    }
                                    guestTotalShares={guestTotalShares}
                                    guestBalance={guestBalance}
                                    setRefetch={setRefetch}
                                />
                            ) : (
                                <RealExchange
                                    elem={elem}
                                    setRefetch={setRefetch}
                                    setRefetchUserSide={setRefetchUserSide}
                                    totalShares={totalShares}
                                    balance={balance}
                                />
                            )}
                        </Wrapper>
                    );
                }
                return null;
            })}
        </>
    );
};

const Wrapper = styled.div`
    padding: ${props => props.isMobile ? "" : "1.4rem"};
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: ${props => props.isMobile ? "column" : "row"};
    align-items: ${props => props.isMobile ? "center" : ""};
`;

const Container = styled.div`
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12),
        0px 1px 3px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    ${props => props.isMobile ?
        (`
            display: flex;
            flex-direction: column;
            flex: 1;
            align-items: center;
            justify-content: center;
            width: 85vw; 
            height:  35vh;
            min-width: 250px;
            min-height: 300px;
            margin:   12px 0px 8px 0px;
            padding:   8px 0px;
           
        `) :
        (`
            width: 700px;
            height: 450px;
            margin: 12px 16px 16px 16px;
            padding: 24px 32px;
        `)}
`;

const Stonk = styled.div`
    ${props => props.isMobile ? (`
        display: flex;
        flex-direction: column;
        flex: 1;
        align-items:center;
    `) :
        (``)
    }
  
`;

const Graph = styled.div`
    display: flex;
    flex-direction:  column;
    flex: 1;
    align-items:center
`;


const IconNameSymbol = styled.div`
    display: flex;
    flex-direction:  ${props => props.isMobile ? "column" : "row"};
    position: relative;
    right:  ${props => props.isMobile ? "" : "10px"};
    align-items: center;
`;

const StockIcon = styled.img`
    width: 60px;
    height: 60px;
    object-fit: scale-down;
    margin-right:  ${props => props.isMobile ? "" : "14px"};
    margin-left:  ${props => props.isMobile ? "" : "8px"};
`;
const StockName = styled.span`
    font-size: 32px;
    font-weight: 500;
`;
const StockSymbol = styled.span`
    font-size: 18px;
    position: relative;
    top:  ${props => props.isMobile ? "" : "5px"};
    left:  ${props => props.isMobile ? "" : "5px"};
    color: rgba(0, 0, 0, 0.5);
`;

const Price = styled.p`
    margin: 0;
    font-weight: 500;
    position: relative;
    font-size: 2.5rem;
`;
const IncreaseWrapper = styled.div`
    margin: 0;
    font-weight: 500;
`;

const Increase = styled.span`
    color: #0f9d58;
    font-size: 14px;
`;

const Past24 = styled.span`
    color: rgba(0, 0, 0, 0.5);
    margin-left: 0.5rem;
    font-size: 0.7rem;
`;

const PriceIncreasePast = styled.div`
    z-index: 10;
    ${props => props.isMobile ?
        (`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-top: 10px;
        `) :
        (`
            width: 100%;
            position: relative;
            margin-bottom: -5px;
            margin-right: 160px;
            flex: 1;
    `)};
`;

const StatWrapper = styled.div`
     display: flex;  
     
     ${props => props.isMobile ?
        (`
        flex-direction: row;
        flex-direction: column;
        & > * {   
            margin: 5px 0px; 
        }
        margin-top: 10px;
     `) :
        (`
        width: 100%; 
        justify-content: flex-end;
     `)};
     
     
 
  
`;

const Statbox = styled.div`
    background-color: rgba(0, 0, 0, 0.1);
    padding: 2px 10px;
    border-radius: 8px;
    display: flex;
    justify-content:  ${props => props.isMobile ? "space-between" : "center"};
    align-items: center;
    margin-left: ${props => props.isMobile ? "" : "24px"};
`;

const StatIcons = styled.span`
    font-size: 1.5rem;
    position: relative;
    top: 2px;
    margin-left: 0.5rem;
`;

const TitleStatWrapper = styled.div`
    display: flex;
    align-items: center;
    ${props => props.isMobile ?
        (`
            flex-direction: column;
        `) :
        (`
            width: 761px;
            position: relative;
            left: 20px;
            margin: 0;
            justify-content: space-between;
        `)}
   
`;

const History = styled.div`
    position: relative;
    bottom: -12px;

    & > span {
        font-size: 12px;
        margin-right: ${props => props.isMobile ? "" : "1rem"};
        padding: 4px 10px;
    }
    & > .inactive {
        color: rgba(0, 0, 0, 0.5);
    }
    & > .active {
        color: rgba(0, 0, 0, 1);
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 8px;
    }
`;

export default Stonks;