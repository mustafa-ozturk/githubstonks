import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { AiOutlineGithub } from "react-icons/ai";
// uselocation
const Navbar = ({ userType }) => {
    const handleLogout = () => {
        localStorage.removeItem("id");

        fetch("/api/delete-session", {
            method: "DELETE",
            credentials: "include",
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            });
    };

    return (
        <Wrapper>
            <div>
                <NavBarItem
                    className="active"
                    exact
                    to={userType === "guest" ? "/guest" : "/"}
                    activeStyle={{
                        fontWeight: "bold",
                        color: "rgb(14, 184, 239)",
                    }}
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
                >
                    Acount
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
                >
                    Leaderboard
                </NavBarItem>
            </div>
            {userType === "guest" ? (
                <Login>
                    <a
                        className="login"
                        href="http://localhost:8000/api/user/signin"
                    >
                        Login with GitHub
                        <span className="logo">
                            <AiOutlineGithub />
                        </span>
                    </a>
                </Login>
            ) : (
                <Login>
                    <a
                        href="http://localhost:3000/guest"
                        onClick={handleLogout}
                    >
                        Logout
                    </a>
                </Login>
            )}
        </Wrapper>
    );
};
//  navlink knows
const Wrapper = styled.div`
    padding: 10px 10px 10px 14px;
    height: 21px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    background-color: white;
    position: fixed;
    min-width: calc(100% - 201px);
    margin-left: 201px;

    z-index: 10;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const NavBarItem = styled(NavLink)`
    margin-right: 14px;
    text-decoration: none;
    color: black;
    &:active {
        color: rgb(14, 184, 239);
    }
`;

const Login = styled.div`
    margin-right: 24px;
    & > a {
        margin-top: 0;
        color: black;
        text-decoration: none;
        font-weight: 600;
        &:active {
            color: rgb(14, 184, 239);
        }
    }
    & > .login {
        display: flex;
        align-items: center;
        color: black;
        text-decoration: none;
        font-weight: 600;
        margin-top: -10px;
        &:active {
            color: rgb(14, 184, 239);
        }
        & > .logo {
            font-size: 2rem;
            margin-left: 4px;
        }
    }
`;

export default Navbar;
