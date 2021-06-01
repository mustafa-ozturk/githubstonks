import React, { createContext, useContext, useReducer } from "react";
import { StonkContext } from "./StonkContext";

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
    const balance = getBalance();
    const portfolioValue = getPortfolioValue();
    const netWorth = getNetWorth();
    const profitLoss = getProfitLoss();
    const totalShares = getTotalShares();

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
            }}
        >
            {children}
        </GuestUserContext.Provider>
    );
};
