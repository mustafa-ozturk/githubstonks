import React, { useState } from "react";
import styled from "styled-components";
import { abbreviateNumber } from "../utils";

const RealExchange = ({
    elem,
    setRefetch,
    setRefetchUserSide,
    totalShares,
    balance,
}) => {
    const [buyOrSell, setBuyOrSell] = useState("buy");
    const [inputState, setInputState] = useState(0);
    const [confirmation, setConfirmation] = useState("");
    const handleBuyPost = (type, price) => {
        if (inputState <= 0) {
            return;
        }
        let data = {};
        if (type === "buy") {
            data.type = "BUY";
            data.stockName = elem.name;
            data.symbol = elem.symbol;
            data.quantity = inputState;
        } else {
            data.type = "SELL";
            data.stockName = elem.name;
            data.symbol = elem.symbol;
            data.quantity = inputState;
        }
        const id = localStorage.getItem("id");
        fetch(`${process.env.REACT_APP_API_LINK}/api/${id}/${buyOrSell}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                setRefetch(true);
                setRefetchUserSide(true);
                setInputState(0);
                if (data.status !== 400) {
                    setConfirmation(data.confirmation);
                }

                setTimeout(() => {
                    setConfirmation("");
                }, 4000);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const handleBuyOrSellState = (type) => {
        setBuyOrSell(type);
        setInputState(0);
    };

    const handleInputState = (value) => {
        setInputState(value);
    };

    const price = elem.price;
    const fee =
        buyOrSell === "buy"
            ? inputState * elem.price * 0.15
            : inputState * elem.price * 0.15;
    const totalBuyCost = inputState * elem.price * 1.15;
    const totalSellCost = inputState * elem.price * 1.15;

    const realUserTotalShares =
        totalShares[elem.name] === undefined ? 0 : totalShares[elem.name];
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
                max={buyOrSell === "buy" ? "" : realUserTotalShares}
                placeholder="0"
                value={inputState}
                onChange={(ev) => handleInputState(ev.target.value)}
            />

            <CostContainer>
                <p title={price}>
                    <Label>Price</Label> ${abbreviateNumber(price)}
                </p>

                <p title={fee}>
                    <Label>Fee</Label> ${abbreviateNumber(fee)}
                </p>

                <p title={buyOrSell === "buy" ? totalBuyCost : totalSellCost}>
                    <Label>Total</Label> $
                    {buyOrSell === "buy"
                        ? abbreviateNumber(totalBuyCost)
                        : abbreviateNumber(totalSellCost)}
                </p>
            </CostContainer>

            <span className="sharesOwned">
                Shares Owned: {realUserTotalShares}
            </span>

            <ButtonWrapper>
                <button
                    onClick={() => handleBuyPost(buyOrSell)}
                    className={
                        buyOrSell === "buy"
                            ? balance >= totalBuyCost && inputState <= 1000
                                ? "buyBtn"
                                : "buyBtnDisabled"
                            : realUserTotalShares >= inputState &&
                              realUserTotalShares > 0 &&
                              inputState <= 1000
                            ? "sellBtn"
                            : "sellBtnDisabled"
                    }
                    disabled={
                        buyOrSell === "buy"
                            ? balance >= totalBuyCost && inputState <= 1000
                                ? false
                                : true
                            : realUserTotalShares >= inputState &&
                              realUserTotalShares > 0 &&
                              inputState <= 1000
                            ? false
                            : true
                    }
                >
                    {buyOrSell === "buy"
                        ? `BUY ${elem.symbol}`
                        : `SELL ${elem.symbol}`}
                </button>
            </ButtonWrapper>
            {confirmation.length > 0 && confirmation}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    border-radius: 8px;
    width: 200px;
    height: 315px;
    box-shadow: var(--main-boxshadow);
    padding: 24px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: relative;
    top: 72px;
    margin-left: 8px;

    & .sharesOwned {
        margin-bottom: 1rem;
        display: block;
        color: rgba(0, 0, 0, 0.6);
    }
`;

const BuyOrSellTabContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 10px;

    & > .buy {
        cursor: pointer;
    }
    & > .onbuy {
        color: var(--main-blue);
    }
    & > .sell {
        cursor: pointer;
    }
    & > .onsell {
        color: var(--main-red);
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

    & > button {
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
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14),
            0px 2px 1px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2);
    }
    & > .buyBtn {
        background-color: rgb(14, 184, 239);
        border: 1px solid rgb(14, 184, 239);
    }
    & > .buyBtnDisabled {
        background-color: rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(0, 0, 0, 0.1);
    }
    & > .sellBtn {
        background-color: rgb(221, 21, 33);
        border: 1px solid rgb(239, 14, 14);
    }
    & > .sellBtnDisabled {
        background-color: rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(0, 0, 0, 0.1);
    }
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

export default RealExchange;
