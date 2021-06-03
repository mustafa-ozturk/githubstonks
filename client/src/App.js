import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
    } = useContext(GuestUserContext);
    return (
        <>
            <Wrapper>
                <Router>
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
                                <Route exact path="/">
                                    <CardWrapper>
                                        <Card stonkData={stonkData} />
                                    </CardWrapper>
                                </Route>
                                <Route exact path="/stonk/:stonkname">
                                    <Stonks
                                        stonkData={stonkData}
                                        userStats={userStats}
                                        userStatsDispatch={userStatsDispatch}
                                        totalShares={totalShares}
                                        balance={balance}
                                    />
                                </Route>
                                <Route exact path="/account">
                                    <Account
                                        stonkData={stonkData}
                                        userStats={userStats}
                                        totalShares={totalShares}
                                    />
                                </Route>
                            </Switch>
                        </ContentWrapper>
                    </NavAndContentContainer>
                </Router>
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
