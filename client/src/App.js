import React, { useEffect, useState, useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import CardContent from "./components/CardContent";
import StonkContent from "./components/StonkContent";
import Account from "./components/Account";

const initialState = {
    netWorth: 100000.0,
    portfolioValue: 0.0,
    balance: 100000.0,
    profitLoss: 0.0,
};

function reducer(state, action) {
    console.log(action);
    switch (action.type) {
        case "buy":
            return {
                ...state,
            };
        case "sell":
            return {
                ...state,
            };
        default:
            throw new Error();
    }
}

const App = () => {
    const [cardData, setCardData] = useState([]);
    const [userStats, userStatsDispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        fetch("/api/stonkData")
            .then((response) => response.json())
            .then(({ data }) => setCardData(data));

        if (!localStorage.getItem("user")) {
            localStorage.setItem("user", "test");
        }
    }, []);

    return (
        <>
            <Wrapper>
                <Router>
                    <Sidebar userStats={userStats} />
                    <NavAndContentContainer>
                        <Navbar />
                        <ContentWrapper>
                            <Switch>
                                <Route exact path="/">
                                    <CardContent cardData={cardData} />
                                </Route>
                                <Route exact path="/stonk/:stonkname">
                                    <StonkContent
                                        cardData={cardData}
                                        userStats={userStats}
                                        userStatsDispatch={userStatsDispatch}
                                    />
                                </Route>
                                <Route exact path="/account">
                                    <Account />
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
export default App;
