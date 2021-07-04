import React, { createContext, useEffect, useState } from "react";

export const realUserContext = createContext();

export const RealUserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [refetchUserSide, setRefetchUserSide] = useState(false);
    const tokenId = localStorage.getItem("id");
    useEffect(() => {
        const id = localStorage.getItem("id");

        if (id) {
            fetch(`${process.env.REACT_APP_API_LINK}/api/${id}/info`)
                .then((response) => response.json())
                .then((data) => {
                    setUserData(data);
                    setRefetchUserSide(false);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    }, [tokenId, refetchUserSide]);
    const balance = userData ? userData.data.balance : 0;
    const portfolioValue = userData ? userData.data.portfolio : 0;
    const netWorth = userData ? userData.data.netWorth : 0;
    const profitLoss = userData ? userData.data.profitLoss : 0;
    const totalShares = userData ? userData.data.totalShares : {};
    const accountStats = userData ? userData.data.accountStats : {};
    return (
        <realUserContext.Provider
            value={{
                balance,
                portfolioValue,
                netWorth,
                profitLoss,
                totalShares,
                accountStats,
                setRefetchUserSide,
            }}
        >
            {children}
        </realUserContext.Provider>
    );
};
