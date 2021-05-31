import React, { useState } from "react";
import styled from "styled-components";
function abbreviateNumber(value) {
    let newVal = value.toFixed(2);
    if (value >= 1000000000000) {
        newVal = (value / 1000000000000).toFixed(2) + "T";
    } else if (value >= 1000000000) {
        newVal = (value / 1000000000).toFixed(2) + "B";
    } else if (value >= 1000000) {
        newVal = (value / 1000000).toFixed(2) + "M";
    } else if (value >= 1000) {
        newVal = (value / 1000).toFixed(2) + "K";
    }
    return newVal;
}
const Exchange = ({
    elem,
    userStats,
    userStatsDispatch,
    guestUserPurchaseHistory,
    setGuestUserPurchaseHistory,
    totalShares,
    balance,
}) => {
    const [buyOrSell, setBuyOrSell] = useState("buy");
    const [inputState, setInputState] = useState(0);
    return (
        <Wrapper>
            {buyOrSell === "buy" ? (
                <DivSellContainer>
                    <span
                        style={{
                            color: "rgb(14, 184, 239)",
                            cursor: "pointer",
                        }}
                        onClick={() => setBuyOrSell("buy")}
                    >
                        Buy
                    </span>
                    <span
                        style={{
                            margin: "0px 8px 0px 8px",
                            color: "rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        |
                    </span>
                    <span
                        style={{ cursor: "pointer" }}
                        onClick={() => setBuyOrSell("sell")}
                    >
                        Sell
                    </span>
                </DivSellContainer>
            ) : (
                <DivSellContainer>
                    <span
                        style={{ cursor: "pointer" }}
                        onClick={() => setBuyOrSell("buy")}
                    >
                        Buy
                    </span>
                    <span
                        style={{
                            margin: "0px 8px 0px 8px",
                            color: "rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        |
                    </span>
                    <span
                        style={{ color: "rgb(221,21,33)", cursor: "pointer" }}
                        onClick={() => setBuyOrSell("sell")}
                    >
                        Sell
                    </span>
                </DivSellContainer>
            )}
            {buyOrSell === "buy" ? (
                <Input
                    type="number"
                    min="0"
                    placeholder="0"
                    onChange={(ev) => setInputState(ev.target.value)}
                />
            ) : (
                <Input
                    type="number"
                    min="0"
                    max={totalShares[elem.name]}
                    placeholder="0"
                    onChange={(ev) => setInputState(ev.target.value)}
                />
            )}
            {buyOrSell === "buy" ? (
                <CostContainer>
                    <p>
                        <CostLabel>Price</CostLabel> $
                        {abbreviateNumber(elem.price)}
                    </p>
                    <p>
                        <CostLabel>Fee</CostLabel> $
                        {abbreviateNumber(inputState * elem.price * 0.1)}
                    </p>
                    <p>
                        <CostLabel>Total</CostLabel> $
                        {abbreviateNumber(
                            inputState * elem.price * 0.1 +
                                inputState * elem.price
                        )}
                    </p>
                </CostContainer>
            ) : (
                <CostContainer>
                    <p>
                        <CostLabel>Price</CostLabel> $
                        {abbreviateNumber(elem.price)}
                    </p>
                    <p>
                        <CostLabel>Total</CostLabel> $
                        {abbreviateNumber(
                            inputState * elem.price * 0.1 +
                                inputState * elem.price
                        )}
                    </p>
                </CostContainer>
            )}
            <CostLabel style={{ marginBottom: "1rem" }}>
                Shares Owned: {totalShares[elem.name]}
            </CostLabel>
            <ButtonWrapper>
                {buyOrSell === "buy" ? (
                    <Button
                        onClick={() => {
                            console.log("button clicked");
                            inputState > 0 &&
                                userStatsDispatch({
                                    type: "PUSH-TO-BUYS-AND-SELLS",
                                    payload: {
                                        type: "BUY",
                                        stockName: elem.name,
                                        quantity: inputState,
                                        purchaseCost: (
                                            inputState * elem.price * 0.1 +
                                            inputState * elem.price
                                        ).toFixed(2),
                                    },
                                });
                        }}
                        style={{
                            backgroundColor:
                                balance >= inputState
                                    ? "rgb(14, 184, 239)"
                                    : "rgba(0,0,0,0.1)",
                            border:
                                balance >= inputState
                                    ? "1px solid rgb(14, 184, 239)"
                                    : "1px solid rgba(0,0,0,0.1)",
                        }}
                        disabled={balance >= inputState ? false : true}
                    >
                        BUY {elem.symbol}
                    </Button>
                ) : (
                    <Button
                        onClick={() => {
                            console.log("button clicked");
                            inputState > 0 &&
                                userStatsDispatch({
                                    type: "PUSH-TO-BUYS-AND-SELLS",
                                    payload: {
                                        type: "SELL",
                                        stockName: elem.name,
                                        quantity: inputState,
                                        purchaseCost: (
                                            inputState * elem.price * 0.1 +
                                            inputState * elem.price
                                        ).toFixed(2),
                                    },
                                });
                        }}
                        style={{
                            backgroundColor:
                                totalShares[elem.name] >= inputState
                                    ? "rgb(221,21,33)"
                                    : "rgba(0,0,0,0.1)",
                            border:
                                totalShares[elem.name] >= inputState
                                    ? "1px solid rgb(239, 14, 14)"
                                    : "1px solid rgba(0,0,0,0.1)",
                        }}
                        disabled={
                            totalShares[elem.name] >= inputState ? false : true
                        }
                    >
                        SELL {elem.symbol}
                    </Button>
                )}
            </ButtonWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    border-radius: 8px;
    width: 200px;
    height: 315px;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12),
        0px 1px 3px rgba(0, 0, 0, 0.2);
    padding: 24px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: relative;
    top: 72px;
    margin-left: 8px;
`;

const DivSellContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
`;

const Input = styled.input`
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    width: 210px;
    height: 80px;
    text-align: center;
    font-size: 3rem;
    outline: none;
`;

const ButtonWrapper = styled.div`
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding-top: 14px;
`;

const Button = styled.button`
    width: 218px;
    height: 68px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 16px;

    color: rgb(255, 255, 255);
    padding: 24px 72px;
    border-radius: 4px;
    cursor: pointer;
    white-space: nowrap;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12),
        0px 1px 3px rgba(0, 0, 0, 0.2);
`;

const CostContainer = styled.div`
    display: flex;

    & > p {
        margin: 1rem;
    }
`;

const CostLabel = styled.span`
    display: block;
    color: rgba(0, 0, 0, 0.6);
`;

export default Exchange;
