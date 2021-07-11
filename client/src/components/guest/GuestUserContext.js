import React, { createContext, useContext, useReducer } from "react";
import { StonkContext } from "../../context/StonkContext";

const initialguestUserStatsState = {
    startingguestBalance: 100000,
    buysAndSells: [],
};

function guestUserStatsReducer(state, action) {
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

export const GuestUserContext = createContext();

export const GuestUserProvider = ({ children }) => {
    const { stonkData } = useContext(StonkContext);

    const [guestUserStats, guestUserStatsDispatch] = useReducer(
        guestUserStatsReducer,
        initialguestUserStatsState
    );

    const getguestPortfolioValue = () => {
        // find what stocks we own and how many
        let stonksOwned = {
            React: 0,
            Angular: 0,
            Vue: 0,
            Node: 0,
            Express: 0,
            Nest: 0,
            Linux: 0,
            Solana: 0,
            GithubStonks: 0,
            Deno: 0,
            SerenityOS: 0,
            Rust: 0,
        };
        guestUserStats.buysAndSells.forEach((elem) => {
            if (elem.type === "BUY") {
                stonksOwned[elem.stockName] += parseInt(elem.quantity);
            } else {
                stonksOwned[elem.stockName] -= parseInt(elem.quantity);
            }
        });
        // stock we own * its up to date price
        let guestPortfolioValue = 0;
        stonkData.forEach((elem) => {
            guestPortfolioValue += stonksOwned[elem.name] * elem.price;
        });
        return guestPortfolioValue;
    };

    const getguestBalance = () => {
        let total = 0;
        guestUserStats.buysAndSells.forEach((elem) => {
            if (elem.type === "BUY") {
                total += parseFloat(elem.purchaseCost);
            } else {
                total -= parseFloat(elem.purchaseCost);
            }
        });
        return guestUserStats.startingguestBalance - total;
    };

    const getguestNetWorth = () => {
        return getguestPortfolioValue() + getguestBalance();
    };

    const getguestProfitLoss = () => {
        let stonksOwned = {
            React: 0,
            Angular: 0,
            Vue: 0,
            Node: 0,
            Express: 0,
            Nest: 0,
            Linux: 0,
            Solana: 0,
            GithubStonks: 0,
            Deno: 0,
            SerenityOS: 0,
            Rust: 0,
        };
        let totalCostAtPurchase = 0;
        guestUserStats.buysAndSells.forEach((elem) => {
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

    const getguestTotalShares = () => {
        let stonksOwned = {
            React: 0,
            Angular: 0,
            Vue: 0,
            Node: 0,
            Express: 0,
            Nest: 0,
            Linux: 0,
            Solana: 0,
            GithubStonks: 0,
            Deno: 0,
            SerenityOS: 0,
            Rust: 0,
        };
        guestUserStats.buysAndSells.forEach((elem) => {
            if (elem.type === "BUY") {
                stonksOwned[elem.stockName] += parseInt(elem.quantity);
            } else {
                stonksOwned[elem.stockName] -= parseInt(elem.quantity);
            }
        });
        return stonksOwned;
    };

    const getAccountStat = () => {
        let stonksAndCost = {
            React: {},
            Angular: {},
            Vue: {},
            Node: {},
            Express: {},
            Nest: {},
            Linux: {},
            Solana: {},
            GithubStonks: {},
            Deno: {},
            SerenityOS: {},
            Rust: {},
        };
        guestUserStats.buysAndSells.forEach((elem) => {
            stonksAndCost[elem.stockName].name = elem.stockName;
            stonkData.forEach((e) => {
                if (e.name === elem.stockName) {
                    // finding the symbol
                    stonksAndCost[elem.stockName].symbol = e.symbol;
                    // finding the current price (up to date)
                    stonksAndCost[elem.stockName].price = e.price;
                }
            });

            if (elem.type === "BUY") {
                stonksAndCost[elem.stockName].quantity === undefined
                    ? (stonksAndCost[elem.stockName].quantity = parseInt(
                          elem.quantity
                      ))
                    : (stonksAndCost[elem.stockName].quantity += parseInt(
                          elem.quantity
                      ));
                stonksAndCost[elem.stockName].cost === undefined
                    ? (stonksAndCost[elem.stockName].totalCost = parseFloat(
                          elem.purchaseCost
                      ))
                    : (stonksAndCost[elem.stockName].totalCost += parseFloat(
                          elem.purchaseCost
                      ));
            } else {
                stonksAndCost[elem.stockName].quantity -= parseInt(
                    elem.quantity
                );
                stonksAndCost[elem.stockName].totalCost -= parseFloat(
                    elem.purchaseCost
                );
            }
            stonksAndCost[elem.stockName].gainLossDollar =
                stonksAndCost[elem.stockName].price *
                    stonksAndCost[elem.stockName].quantity -
                stonksAndCost[elem.stockName].totalCost;
            stonksAndCost[elem.stockName].currentValue =
                stonksAndCost[elem.stockName].price *
                stonksAndCost[elem.stockName].quantity;
        });

        return stonksAndCost;
    };

    const balance = getguestBalance();
    const portfolioValue = getguestPortfolioValue();
    const netWorth = getguestNetWorth();
    const profitLoss = getguestProfitLoss();
    const totalShares = getguestTotalShares();
    const   guestAccountStats = getAccountStat();
    return (
        <GuestUserContext.Provider
            value={{
                guestUserStats,
                guestUserStatsDispatch,
                balance,
                portfolioValue,
                netWorth,
                profitLoss,
                totalShares,
                guestAccountStats
            }}
        >
            {children}
        </GuestUserContext.Provider>
    );
};
