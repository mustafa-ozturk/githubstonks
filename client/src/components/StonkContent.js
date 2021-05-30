import React from "react";

import Stonks from "./Stonks";

const StonkContent = ({ cardData, userStats, userStatsDispatch }) => {
    return (
        <>
            {cardData.length > 0 ? (
                <Stonks
                    cardData={cardData}
                    userStats={userStats}
                    userStatsDispatch={userStatsDispatch}
                />
            ) : (
                "loading"
            )}
        </>
    );
};

export default StonkContent;
