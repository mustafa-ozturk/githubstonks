import React, { useContext, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Account from "./components/Account";
import Stonks from "./components/Stonks";
import Card from "./components/Card";
import Leaderboard from "./components/Leaderboard";
import { StonkContext } from "./context/StonkContext";
import { realUserContext } from "./context/RealUserContext";

const App = ({ userType }) => {
    const { stonkData, setRefetch } = useContext(StonkContext);
    const {
        balance,
        portfolioValue,
        netWorth,
        profitLoss,
        totalShares,
        accountStats,
        setRefetchUserSide,
    } = useContext(realUserContext);

    useEffect(() => {
        if (window.location.search) {
            const params = new URLSearchParams(window.location.search);
            const param = params.get("id");
            localStorage.setItem("id", param);
        }
    }, []);
    return (
        <Wrapper>
            <Sidebar
                balance={balance}
                portfolioValue={portfolioValue}
                netWorth={netWorth}
                profitLoss={profitLoss}
            />
            <NavAndContentContainer>
                <Navbar userType={userType} />
                <ContentWrapper>
                    <Switch>
                        <Route
                            path={process.env.PUBLIC_URL + "/stonk/:stonkname"}
                        >
                            <Stonks
                                userType={userType}
                                stonkData={stonkData}
                                totalShares={totalShares}
                                balance={balance}
                                setRefetch={setRefetch}
                                setRefetchUserSide={setRefetchUserSide}
                            />
                        </Route>
                        <Route path={process.env.PUBLIC_URL + "/leaderboard"}>
                            <Leaderboard />
                        </Route>
                        <Route path={process.env.PUBLIC_URL + "/account"}>
                            <Account accountStats={accountStats} />
                        </Route>
                        <Route path={process.env.PUBLIC_URL + "/"}>
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

export default App;
