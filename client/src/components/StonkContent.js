import react from "react";
import styled from "styled-components";
import Stonks from "./Stonks";
import Exchange from "./Exchange";
const StonkContent = () => {
    return (
        <Wrapper>
            <Stonks />
            <Exchange />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    padding: 1.4rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

export default StonkContent;
