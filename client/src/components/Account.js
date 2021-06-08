import React from "react";
import styled from "styled-components";
const Account = ({ accountStats }) => {
    return (
        <Wrapper>
            <div>
                <Table>
                    <Thead>
                        <tr>
                            {/* add logo  */}
                            {/* <Th>Logo</Th> */}
                            <Th>Name</Th>
                            <Th>Symbol</Th>
                            <Th>Price</Th>
                            <Th>Quantity</Th>
                            <Th>Total Cost Basis</Th>
                            <Th>Total Gain/Loss ($)</Th>
                            <Th>Current Value</Th>
                        </tr>
                    </Thead>
                    <tbody>
                        {accountStats.length > 0 &&
                            accountStats.map((elem, index) => {
                                return (
                                    <tr key={index}>
                                        <Td>{elem.name}</Td>
                                        <Td>{elem.symbol}</Td>
                                        <Td>${elem.price}</Td>
                                        <Td>{elem.quantity}</Td>
                                        <Td>${elem.totalCostBasis}</Td>
                                        <Td>${elem.totalGainLoss}</Td>
                                        <Td>${elem.currentValue}</Td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </Table>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    padding: 25px 40px 20px 40px;
    & > div {
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14),
            0px 2px 1px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2);
    }
`;

const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
    height: 100%;
    text-align: center;
`;

const Thead = styled.thead`
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;
const Th = styled.th`
    padding: 1rem;
    text-align: center;
    background-color: white;
    color: black;
`;
const Td = styled.td`
    padding: 1rem;
`;
export default Account;
