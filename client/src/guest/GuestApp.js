import React, { useContext, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import GuestAccount from "./GuestAccount";
import Stonks from "../components/Stonks";
import Card from "../components/Card";
import { StonkContext } from "../context/StonkContext";
import { GuestUserContext } from "./GuestUserContext";

const GuestApp = ({ userType }) => {
    const stonkData = useContext(StonkContext);

    useEffect(() => {
        if (localStorage.getItem("id") !== null) {
            console.log("this mf is logged in tf");
        }
    }, []);

    const {
        guestUserStats,
        guestUserStatsDispatch,
        guestBalance,
        guestPortfolioValue,
        guestNetWorth,
        guestProfitLoss,
        guestTotalShares,
        guestAccountStats,
    } = useContext(GuestUserContext);
    console.log(guestUserStats);
    return (
        <Wrapper>
            <Sidebar
                balance={guestBalance}
                portfolioValue={guestPortfolioValue}
                netWorth={guestNetWorth}
                profitLoss={guestProfitLoss}
            />
            <NavAndContentContainer>
                <Navbar userType={userType} />
                <ContentWrapper>
                    <Switch>
                        <Route path="/guest/stonk/:stonkname">
                            <Stonks
                                userType={userType}
                                stonkData={stonkData}
                                guestUserStats={guestUserStats}
                                guestUserStatsDispatch={guestUserStatsDispatch}
                                guestTotalShares={guestTotalShares}
                                guestBalance={guestBalance}
                            />
                        </Route>
                        <Route path="/guest/account">
                            <GuestAccount
                                guestAccountStats={guestAccountStats}
                            />
                        </Route>
                        <Route path="/guest">
                            <Card stonkData={stonkData} userType={userType} />
                        </Route>
                    </Switch>
                </ContentWrapper>
            </NavAndContentContainer>
        </Wrapper>
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

export default GuestApp;
