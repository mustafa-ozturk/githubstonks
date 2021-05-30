import React from "react";
import styled from "styled-components";

const Exchange = ({ elem }) => {
    return (
        <Wrapper>
            <DivSellContainer>
                <span style={{ color: "rgb(14, 184, 239)" }}>Buy</span>
                <span
                    style={{
                        margin: "0px 8px 0px 8px",
                        color: "rgba(0, 0, 0, 0.1)",
                    }}
                >
                    |
                </span>
                <span>Sell</span>
            </DivSellContainer>
            <Input type="number" placeholder="1" />
            <CostContainer>
                <p>
                    <CostLabel>Market Price</CostLabel> ${elem.price.toFixed(2)}
                </p>
                <p>
                    <CostLabel>Fee (0.10%)</CostLabel> $
                    {(elem.price * 0.1).toFixed(2)}
                </p>
                <p>
                    <CostLabel>Total Cost</CostLabel> $
                    {(elem.price * 0.1 + elem.price).toFixed(2)}
                </p>
            </CostContainer>
            <ButtonWrapper>
                <Button>BUY {elem.symbol}</Button>
            </ButtonWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    border-radius: 8px;
    width: 200px;
    height: 300px;
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
    height: 150px;
    text-align: center;
    font-size: 3rem;
    outline: none;
`;

const ButtonWrapper = styled.div`
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding-top: 14px;
`;

const Button = styled.button`
    background-color: rgb(14, 184, 239);
    font-weight: bold;
    font-size: 16px;
    color: rgb(255, 255, 255);
    padding: 24px 72px;
    border: 1px solid rgb(14, 184, 239);
    border-radius: 4px;
    cursor: pointer;
    white-space: nowrap;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12),
        0px 1px 3px rgba(0, 0, 0, 0.2);
`;

const CostContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const CostLabel = styled.span`
    display: block;
    color: rgba(0, 0, 0, 0.6);
`;

export default Exchange;
