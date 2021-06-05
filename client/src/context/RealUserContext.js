import React, { createContext, useContext, useReducer } from "react";

export const realUserContext = createContext();

export const RealUserProvider = ({ children }) => {
    const balance = 0;
    const portfolioValue = 0;
    const netWorth = 0;
    const profitLoss = 0;
    const totalShares = [];
    const accountStats = {};
    return (
        <realUserContext.Provider
            value={{
                balance,
                portfolioValue,
                netWorth,
                profitLoss,
                totalShares,
                accountStats,
            }}
        >
            {children}
        </realUserContext.Provider>
    );
};
