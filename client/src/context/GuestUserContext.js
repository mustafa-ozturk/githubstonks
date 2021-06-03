import React, { createContext, useContext, useReducer } from "react";
import { StonkContext } from "./StonkContext";

const initialUserStatsState = {
    startingBalance: 1000,
    buysAndSells: [],
};

function userStatsReducer(state, action) {
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
    const stonkData = useContext(StonkContext);

    const [userStats, userStatsDispatch] = useReducer(
        userStatsReducer,
        initialUserStatsState
    );
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

    const getAccountStat = () => {
        let stonksAndCost = {
            React: {},
            Angular: {},
            Vue: {},
        };
        //         name: ,
        //         symbol : ,
        //         price: ,
        //         quantity: ,
        //         totalCost: ,
        //         gainLossDollar: ,  totalCost -  price * quantity,
        //         currentValue: ,
        //     },
        userStats.buysAndSells.forEach((elem) => {
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

    const balance = getBalance();
    const portfolioValue = getPortfolioValue();
    const netWorth = getNetWorth();
    const profitLoss = getProfitLoss();
    const totalShares = getTotalShares();
    const accountStats = getAccountStat();
    return (
        <GuestUserContext.Provider
            value={{
                userStats,
                userStatsDispatch,
                balance,
                portfolioValue,
                netWorth,
                profitLoss,
                totalShares,
                accountStats,
            }}
        >
            {children}
        </GuestUserContext.Provider>
    );
};
