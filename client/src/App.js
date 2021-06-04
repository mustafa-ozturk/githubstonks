import React, { useContext, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Account from "./components/Account";
import Stonks from "./components/Stonks";
import Card from "./components/Card";
import { StonkContext } from "./context/StonkContext";
import { GuestUserContext } from "./context/GuestUserContext";

const App = () => {
    const stonkData = useContext(StonkContext);
    const {
        userStats,
        userStatsDispatch,
        balance,
        portfolioValue,
        netWorth,
        profitLoss,
        totalShares,
        accountStats,
    } = useContext(GuestUserContext);

    // if(isRedirectToGuest) {
    //     return <Redirect to="/guest"/>
    // }

    useEffect(() => {
        if (window.location.search) {
            console.log("hey");
            const params = new URLSearchParams(window.location.search);
            const param = params.get("id");
            localStorage.setItem("id", param);
        }
        console.log("local", localStorage.getItem("id"));
        if (localStorage.getItem("id") !== undefined) {
            fetch("http://localhost:8000/api/user/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: localStorage.getItem("id") }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                });
        }
    }, []);

    return (
        <>
            <Wrapper>
                <Sidebar
                    balance={balance}
                    portfolioValue={portfolioValue}
                    netWorth={netWorth}
                    profitLoss={profitLoss}
                />
                <NavAndContentContainer>
                    <Navbar />
                    <ContentWrapper>
                        <Switch>
                            <Route path="/stonk/:stonkname">
                                <Stonks
                                    stonkData={stonkData}
                                    userStats={userStats}
                                    userStatsDispatch={userStatsDispatch}
                                    totalShares={totalShares}
                                    balance={balance}
                                />
                            </Route>
                            <Route path="/account">
                                <Account
                                    stonkData={stonkData}
                                    userStats={userStats}
                                    totalShares={totalShares}
                                    accountStats={accountStats}
                                />
                            </Route>
                            <Route path="/">
                                <CardWrapper>
                                    <Card
                                        stonkData={stonkData}
                                        isGuest={false}
                                    />
                                </CardWrapper>
                            </Route>
                        </Switch>
                    </ContentWrapper>
                </NavAndContentContainer>
            </Wrapper>
        </>
    );
};

const Wrapper = styled.div`
    display: flex;
`;

const NavAndContentContainer = styled.div`
    width: 100%;
`;

const ContentWrapper = styled.div`
    margin-left: 201px;
    margin-top: 50px;
`;

const CardWrapper = styled.div`
    padding: 1.4rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: row;
`;

export default App;
