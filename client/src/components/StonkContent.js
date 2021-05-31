import React from "react";

import Stonks from "./Stonks";

const StonkContent = ({
    stonkData,
    userStats,
    userStatsDispatch,
    totalShares,
}) => {
    return (
        <>
            {stonkData.length > 0 ? (
                <Stonks
                    stonkData={stonkData}
                    userStats={userStats}
                    userStatsDispatch={userStatsDispatch}
                    totalShares={totalShares}
                />
            ) : (
                "loading"
            )}
        </>
    );
};

export default StonkContent;
