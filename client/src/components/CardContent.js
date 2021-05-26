import react from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Card from "./Card";
const CardContent = () => {
    return (
        <Wrapper>
            <Links to="/stonk/react">
                <Card />
            </Links>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    padding: 1.4rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const Links = styled(Link)`
    text-decoration: none;
    color: black;
`;

export default CardContent;
