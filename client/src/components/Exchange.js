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

    const handleBuyOrSellState = (type) => {
        setBuyOrSell(type);
    };

    const handleInputState = (value) => {
        setInputState(value);
    };

    const handleBuyDispatch = () => {
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
    };
    const handleSellDispatch = () => {
        inputState > 0 &&
            userStatsDispatch({
                type: "PUSH-TO-BUYS-AND-SELLS",
                payload: {
                    type: "SELL",
                    stockName: elem.name,
                    quantity: inputState,
                    purchaseCost: (inputState * elem.price).toFixed(2),
                },
            });
    };
    return (
        <Wrapper>
            <BuyOrSellTabContainer>
                <span
                    className={buyOrSell === "buy" ? "buy onbuy" : "buy"}
                    onClick={() => handleBuyOrSellState("buy")}
                >
                    Buy
                </span>
                <span className="seperator">|</span>
                <span
                    className={buyOrSell === "sell" ? "sell onsell" : "sell"}
                    onClick={() => handleBuyOrSellState("sell")}
                >
                    Sell
                </span>
            </BuyOrSellTabContainer>

            <Input
                type="number"
                min="0"
                // change max stocks you can buy based on balance
                max={buyOrSell === "buy" ? 1000 : totalShares[elem.name]}
                placeholder="0"
                onChange={(ev) => handleInputState(ev.target.value)}
            />

            <CostContainer>
                <p>
                    <Label>Price</Label> ${abbreviateNumber(elem.price)}
                </p>
                {buyOrSell === "buy" && (
                    <p>
                        <Label>Fee</Label> $
                        {abbreviateNumber(inputState * elem.price * 0.1)}
                    </p>
                )}
                <p>
                    <Label>Total</Label> $
                    {buyOrSell === "buy"
                        ? abbreviateNumber(
                              inputState * elem.price * 0.1 +
                                  inputState * elem.price
                          )
                        : abbreviateNumber(inputState * elem.price)}
                </p>
            </CostContainer>

            <Label style={{ marginBottom: "1rem" }}>
                Shares Owned: {totalShares[elem.name]}
            </Label>
            <ButtonWrapper>
                {buyOrSell === "buy" ? (
                    <Button
                        onClick={() => handleBuyDispatch()}
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
                        onClick={() => handleSellDispatch()}
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

const BuyOrSellTabContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 10px;

    & > .buy {
        cursor: pointer;
    }
    & > .onbuy {
        color: rgb(14, 184, 239);
    }
    & > .sell {
        cursor: pointer;
    }
    & > .onsell {
        color: rgb(221, 21, 33);
    }
    & > .seperator {
        margin: 0px 8px 0px 8px;
        color: rgba(0, 0, 0, 0.1);
    }
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

const Label = styled.span`
    display: block;
    color: rgba(0, 0, 0, 0.6);
`;

export default Exchange;
