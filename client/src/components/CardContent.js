import React from "react";

import styled from "styled-components";
import Card from "./Card";
const CardContent = ({ stonkData }) => {
    return (
        <Wrapper>
            {stonkData.length > 0 ? <Card stonkData={stonkData} /> : "loading"}
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
