import react from "react";
import styled from "styled-components";
import Stonks from "./Stonks";
import Exchange from "./Exchange";
const StonkContent = ({ cardData }) => {
    return (
        <Wrapper>
            {cardData.length > 0 ? (
                <>
                    <Stonks cardData={cardData} /> <Exchange />
                </>
            ) : (
                "loading"
            )}
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
