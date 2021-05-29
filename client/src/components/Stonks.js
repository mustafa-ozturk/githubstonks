import react from "react";
import styled from "styled-components";
import { RiStarSLine } from "react-icons/ri";
import { AiOutlineBranches } from "react-icons/ai";
import { BiGitCommit } from "react-icons/bi";
import Chart from "./Chart";
const Stonks = () => {
    return (
        <Wrapper>
            <TitleStatWrapper>
                <IconNameSymbol>
                    <StockIcon src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png" />
                    <StockName>React</StockName>
                    <StockSymbol>(RCT)</StockSymbol>
                </IconNameSymbol>
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
            </TitleStatWrapper>
            <Container>
                <div>
                    <PriceIncreasePast>
                        <Price>$420.00</Price>
                        <IncreaseWrapper>
                            <Increase>+$120.00 (40%)</Increase>
                            <Past24>past 24h</Past24>
                        </IncreaseWrapper>
                    </PriceIncreasePast>
                </div>
                <Chart />
                <History>
                    <span className={"inactive"}>1H</span>
                    <span className={"active"}>24H</span>
                    <span className={"inactive"}>1W</span>
                    <span className={"inactive"}>1M</span>
                    <span className={"inactive"}>1Y</span>
                    <span className={"inactive"}>ALL</span>
                </History>
            </Container>
        </Wrapper>
    );
};

const Wrapper = styled.div``;

const Container = styled.div`
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12),
        0px 1px 3px rgba(0, 0, 0, 0.2);
    width: 700px;
    height: 450px;
    margin: 12px 16px 16px 16px;
    padding: 24px 32px;
    border-radius: 8px;
`;

const IconNameSymbol = styled.div`
    display: flex;
    position: relative;
    right: 10px;
    align-items: center;
`;

const StockIcon = styled.img`
    width: 60px;
    height: 60px;
    object-fit: cover;
    margin-right: 14px;
`;
const StockName = styled.span`
    font-size: 32px;
    font-weight: 500;
`;
const StockSymbol = styled.span`
    font-size: 18px;
    position: relative;
    left: 10px;
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
    width: 100%;
    position: relative;
    margin-bottom: -60px;
    margin-right: 160px;
`;

const StatWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;

const Statbox = styled.div`
    background-color: rgba(0, 0, 0, 0.1);
    padding: 2px 10px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 24px;
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
    width: 761px;
    position: relative;
    left: 20px;
    margin: 0;
    justify-content: space-between;
`;

const History = styled.div`
    position: relative;
    bottom: -12px;

    & > span {
        font-size: 12px;
        margin-right: 1rem;
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
