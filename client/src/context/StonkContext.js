import React, { createContext, useState, useEffect } from "react";

export const StonkContext = createContext();

export const StonkProvider = ({ children }) => {
    const [stonkData, setstonkData] = useState([]);
    useEffect(() => {
        fetch("/api/stonkData")
            .then((response) => response.json())
            .then(({ data }) => setstonkData(data));
    }, []);

    return (
        <StonkContext.Provider value={stonkData}>
            {children}
        </StonkContext.Provider>
    );
};
