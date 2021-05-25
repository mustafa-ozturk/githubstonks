import react from "react";
import styled from "styled-components";

const Navbar = () => {
    return (
        <Wrapper>
            <NavBarItem className="active">Home</NavBarItem>
            <NavBarItem>Portfolio</NavBarItem>
        </Wrapper>
    );
};
//  navlink knows
const Wrapper = styled.div`
    padding: 10px 10px 10px 14px;
    max-width: 100%;
    height: 21px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    background-color: white;
    position: fixed;
    width: 100%;
    margin-left: 201px;
`;

const NavBarItem = styled.span`
    margin-right: 14px;

    &.active {
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
`;

export default Navbar;
