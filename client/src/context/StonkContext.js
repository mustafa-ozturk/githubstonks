import React, { createContext, useState, useEffect } from "react";

export const StonkContext = createContext();

export const StonkProvider = ({ children }) => {
    const [stonkData, setstonkData] = useState([]);
    const [refetch, setRefetch] = useState(false);
    useEffect(() => {
        fetch(
            "http://githubstonks-env.eba-ypr4dpfq.us-east-2.elasticbeanstalk.com/api/stonkData",
            {
                method: "GET",
            }
        )
            .then((response) => response.json())
            .then(({ data }) => {
                setstonkData(data);
                setRefetch(false);
            });
    }, [refetch]);

    return (
        <StonkContext.Provider value={{ stonkData, setRefetch }}>
            {children}
        </StonkContext.Provider>
    );
};
