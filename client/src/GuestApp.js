import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Account from "./components/Account";
import Stonks from "./components/Stonks";
import Card from "./components/Card";
import { StonkContext } from "./context/StonkContext";
import { GuestUserContext } from "./context/GuestUserContext";

const GuestApp = () => {
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
                            <Route path="/guest/stonk/:stonkname">
                                <Stonks
                                    stonkData={stonkData}
                                    userStats={userStats}
                                    userStatsDispatch={userStatsDispatch}
                                    totalShares={totalShares}
                                    balance={balance}
                                />
                            </Route>
                            <Route path="/guest/account">
                                <Account
                                    stonkData={stonkData}
                                    userStats={userStats}
                                    totalShares={totalShares}
                                    accountStats={accountStats}
                                />
                            </Route>
                            <Route path="/guest">
                                <CardWrapper>
                                    <Card
                                        stonkData={stonkData}
                                        isGuest={true}
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

export default GuestApp;
