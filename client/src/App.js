import React, { useReducer, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import CardContent from "./components/CardContent";
import StonkContent from "./components/StonkContent";
import Account from "./components/Account";
import { StonkContext } from "./context/StonkContext";

const initialUserStatsState = {
    startingBalance: 1000,
    buysAndSells: [],
};

function userStatsReducer(state, action) {
    console.log(action);
    switch (action.type) {
        case "PUSH-TO-BUYS-AND-SELLS":
            return {
                ...state,
                buysAndSells: [...state.buysAndSells, action.payload],
            };
        default:
            throw new Error();
    }
}

const App = () => {
    const stonkData = useContext(StonkContext);
    const [userStats, userStatsDispatch] = useReducer(
        userStatsReducer,
        initialUserStatsState
    );

    console.log(userStats.buysAndSells);

    const getPortfolioValue = () => {
        // find what stocks we own and how many
        let stonksOwned = {
            React: 0,
            Angular: 0,
            Vue: 0,
        };
        userStats.buysAndSells.forEach((elem) => {
            if (elem.type === "BUY") {
                stonksOwned[elem.stockName] += parseInt(elem.quantity);
            } else {
                stonksOwned[elem.stockName] -= parseInt(elem.quantity);
            }
        });
        // stock we own * its up to date price
        let portfolioValue = 0;
        stonkData.forEach((elem) => {
            portfolioValue += stonksOwned[elem.name] * elem.price;
        });
        return portfolioValue;
    };

    const getBalance = () => {
        let total = 0;
        userStats.buysAndSells.forEach((elem) => {
            if (elem.type === "BUY") {
                total += parseFloat(elem.purchaseCost);
            } else {
                total -= parseFloat(elem.purchaseCost);
            }
        });
        return userStats.startingBalance - total;
    };

    const getNetWorth = () => {
        return getPortfolioValue() + getBalance();
    };

    const getProfitLoss = () => {
        let stonksOwned = {
            React: 0,
            Angular: 0,
            Vue: 0,
        };
        let totalCostAtPurchase = 0;
        userStats.buysAndSells.forEach((elem) => {
            if (elem.type === "BUY") {
                stonksOwned[elem.stockName] += parseInt(elem.quantity);
                totalCostAtPurchase += parseFloat(elem.purchaseCost);
            } else {
                stonksOwned[elem.stockName] -= parseInt(elem.quantity);
                totalCostAtPurchase -= parseFloat(elem.purchaseCost);
            }
        });
        let currentTotalValueOfShares = 0;
        stonkData.forEach((elem) => {
            currentTotalValueOfShares += stonksOwned[elem.name] * elem.price;
        });

        return currentTotalValueOfShares - totalCostAtPurchase;
    };

    const getTotalShares = () => {
        let stonksOwned = {
            React: 0,
            Angular: 0,
            Vue: 0,
        };
        userStats.buysAndSells.forEach((elem) => {
            if (elem.type === "BUY") {
                stonksOwned[elem.stockName] += parseInt(elem.quantity);
            } else {
                stonksOwned[elem.stockName] -= parseInt(elem.quantity);
            }
        });
        return stonksOwned;
    };

    const balance = getBalance();
    const portfolioValue = getPortfolioValue();
    const netWorth = getNetWorth();
    const profitLoss = getProfitLoss();
    const totalShares = getTotalShares();
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
                                    <CardContent stonkData={stonkData} />
                                </Route>
                                <Route exact path="/stonk/:stonkname">
                                    <StonkContent
                                        stonkData={stonkData}
                                        userStats={userStats}
                                        userStatsDispatch={userStatsDispatch}
                                        totalShares={totalShares}
                                        balance={balance}
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
