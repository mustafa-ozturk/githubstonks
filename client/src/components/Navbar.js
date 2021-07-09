import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { AiOutlineGithub } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import { useMediaQuery } from 'react-responsive';
import { MOBILE_SIZE } from '../utils';
// uselocation
const Navbar = ({ userType }) => {
    const isMobile = useMediaQuery({ query: MOBILE_SIZE });

    const handleLogout = () => {
        fetch(
            `${process.env.REACT_APP_API_LINK}/api/${localStorage.getItem(
                "id"
            )}/delete-session`,
            {
                method: "DELETE",
            }
        )
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            });
        localStorage.removeItem("id");
    };

    return (
        <Wrapper isMobile={isMobile}>
            <ColumnOne isMobile={isMobile}>
                <NavBarItem
                    className="active"
                    exact
                    to={userType === "guest" ? "/guest" : "/"}
                    activeStyle={{
                        fontWeight: "bold",
                        color: "rgb(14, 184, 239)",
                    }}
                    isMobile={isMobile}
                >
                    Home
                </NavBarItem>
                <NavBarItem
                    exact
                    to={userType === "guest" ? "/guest/account" : "/account"}
                    activeStyle={{
                        fontWeight: "bold",
                        color: "rgb(14, 184, 239)",
                    }}
                    isMobile={isMobile}
                >
                    Account
                </NavBarItem>

                <NavBarItem
                    exact
                    to={
                        userType === "guest"
                            ? "/guest/leaderboard"
                            : "/leaderboard"
                    }
                    activeStyle={{
                        fontWeight: "bold",
                        color: "rgb(14, 184, 239)",
                    }}
                    isMobile={isMobile}
                >
                    Leaderboard
                </NavBarItem>
                <NavBarItem
                    exact
                    to={userType === "guest" ? "/guest/updates" : "/updates"}
                    activeStyle={{
                        fontWeight: "bold",
                        color: "rgb(14, 184, 239)",
                    }}
                    isMobile={isMobile}
                >
                    Updates
                </NavBarItem>
                <About
                    href="https://github.com/mustafa-ozturk/githubstonks/blob/main/README.md"
                    target="_blank"
                    isMobile={isMobile}
                >
                    About
                    <span>
                        <FiExternalLink />
                    </span>
                </About>
            </ColumnOne>
            <ColumnTwo isMobile={isMobile}>
                {userType === "guest" ? (
                    <Login isMobile={isMobile}>
                        <a
                            className="login"
                            href={`${process.env.REACT_APP_API_LINK}/api/user/signin`}
                        >
                            Login with GitHub
                            <span className="logo">
                                <AiOutlineGithub />
                            </span>
                        </a>
                    </Login>
                ) : (
                    <Login isMobile={isMobile}>
                        <a
                            href={`${process.env.REACT_APP_CLIENT_LINK}/guest`}
                            onClick={handleLogout}
                        >
                            Logout
                        </a>
                    </Login>
                )}
            </ColumnTwo>
        </Wrapper>
    );
};
//  navlink knows
const Wrapper = styled.div`
    ${props => props.isMobile ?
        (
            `display: flex;
             flex-direction: column;
             flex-wrap: wrap;
             font-size: 0.85rem;
             z-index: 10;
             justify-content: center;
             align-items: flex-start;`
        ) :
        (
            `padding: 10px 10px 10px 14px;
             height: 21px;
             border-bottom: 1px solid rgba(0, 0, 0, 0.1);
             background-color: white;
             position: fixed;
             min-width: calc(100% - 201px);
             margin-left: 201px;
             z-index: 10;
             display: flex;
             flex-direction: row;
             justify-content: space-between;`
        )
    }
`;

const ColumnOne = styled.div`
    display: flex;
    flex-direction: ${props => props.isMobile ? "column" : "row"};
    flex-wrap: wrap;
`;
const ColumnTwo = styled.div`
    display: flex;
    flex-direction: ${props => props.isMobile ? "column" : "row"};
    flex-wrap: wrap;
`;

const About = styled.a`
    margin-right:  ${props => props.isMobile ? "0" : "14px"};
    padding: ${props => props.isMobile ? "5px" : ""};
    text-decoration: none;
    color: black;
    &:active {
        color: rgb(14, 184, 239);
    }
    & > span {
        position: relative;
        top: 2px;
        left: 2px;
    }
`;

const NavBarItem = styled(NavLink)`
    margin-right: ${props => props.isMobile ? "0" : "18px"};
    padding: ${props => props.isMobile ? "5px" : ""};
    text-decoration: none;
    color: black;
    &:active {
        color: rgb(14, 184, 239);
    }
`;

const Login = styled.div`
    margin-right: ${props => props.isMobile ? "0" : "24px"};
    & > a {
        margin-top: 0;
        color: black;
        text-decoration: none;
        font-weight: 600;
    }
    & > .login {
        display: flex;
        align-items: center;
       
        color: black;
        text-decoration: none;
        font-weight: 600;
        font-size: ${props => props.isMobile ? "0.7rem" : ""};
        margin-top: ${props => props.isMobile ? "1px" : "-10px"};
        &:active {
            color: rgb(14, 184, 239);
        }
        & > .logo {
            font-size: ${props => props.isMobile ? "1.5rem" : "2rem"};
            margin-left: 4px;
        }
    }
`;

export default Navbar;
