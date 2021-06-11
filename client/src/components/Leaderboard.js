import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState(null);
    useEffect(() => {
        fetch("http://localhost:8000/api/leaderboard", {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                let sortedData = data.leaderboard.sort(
                    (a, b) => b.networth - a.networth
                );
                setLeaderboard(sortedData);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);
    console.log(leaderboard);
    return (
        <Wrapper>
            <div>
                <Table>
                    <Thead>
                        <tr>
                            <Th>rank</Th>
                            <Th>username</Th>
                            <Th>networth</Th>
                        </tr>
                    </Thead>
                    <tbody>
                        {leaderboard !== null &&
                            leaderboard.map((elem, index) => {
                                return (
                                    <tr key={index}>
                                        <Td>{index + 1}</Td>
                                        <Td>@{elem.username}</Td>
                                        <Td>${elem.networth}</Td>
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
    width: 500px;
    margin: 0 auto;
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

export default Leaderboard;
