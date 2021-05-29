import React from "react";

import Stonks from "./Stonks";

const StonkContent = ({ cardData }) => {
    return (
        <>{cardData.length > 0 ? <Stonks cardData={cardData} /> : "loading"}</>
    );
};

export default StonkContent;
