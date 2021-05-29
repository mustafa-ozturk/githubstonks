import React, { useEffect, useState } from "react";

import styled from "styled-components";
import Card from "./Card";
const CardContent = () => {
    const [cardData, setCardData] = useState([]);

    useEffect(() => {
        fetch("/api/cards")
            .then((response) => response.json())
            .then(({ data }) => setCardData(data));
    }, []);

    console.log(cardData);
    return (
        <Wrapper>
            {cardData.length > 0 ? <Card cardData={cardData} /> : "loading"}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    padding: 1.4rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: row;
`;

export default CardContent;
