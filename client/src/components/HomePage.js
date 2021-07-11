import React, { useContext, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Account from "./Account";
import GuestAccount from "./guest/GuestAccount";
import Stonks from "./Stonks";
import Card from "./Card";
import Leaderboard from "./Leaderboard";
import Updates from "./Updates";
import { StonkContext } from "../context/StonkContext";
import { slide as Menu } from "react-burger-menu";
import { useMediaQuery } from "react-responsive";
import { MOBILE_SIZE } from "../utils";

const GUEST = "/guest";

const HomePage = ({ userType, context }) => {
    const location = useLocation();

    const { stonkData, setRefetch } = useContext(StonkContext);

    const isGuest = location.pathname.includes(GUEST);

    const {
        guestUserStats,
        guestUserStatsDispatch,
        balance,
        portfolioValue,
        netWorth,
        profitLoss,
        totalShares,
        accountStats,
        guestAccountStats,
        setRefetchUserSide,
    } = useContext(context);

    const isMobile = useMediaQuery({ query: MOBILE_SIZE });

    useEffect(() => {
        if (!isGuest) {
            if (window.location.search) {
                const params = new URLSearchParams(window.location.search);
                const param = params.get("id");
                localStorage.setItem("id", param);
            }
            if (!localStorage.getItem("id")) {
                window.location.replace("/guest");
            }
        }
    }, []);

    const sideBar = () => {
        return (
            <Column>
                <Sidebar
                    balance={balance}
                    portfolioValue={portfolioValue}
                    netWorth={netWorth}
                    profitLoss={profitLoss}
                    userType={userType}
                />
            </Column>
        )
    }

    return (
        <Wrapper>
            {isMobile
                ? <BurgerMenu>
                    <Menu isOpen={!isMobile} width={'12rem'} >
                        {sideBar()}
                    </Menu>
                </BurgerMenu>
                : sideBar()
            }

            <StretchColumn>
                <Row>
                    {!isMobile
                        && <Navbar userType={userType} />
                    }
                </Row>
                <Row>
                    <ContentWrapper isMobile={isMobile}>
                        <Switch>
                            <Route
                                path={
                                    isGuest ?
                                        process.env.PUBLIC_URL +
                                        "/guest/stonk/:stonkname" :
                                        "/stonk/:stonkname"
                                }
                            >
                                {isGuest ?
                                    (
                                        <Stonks
                                            userType={userType}
                                            stonkData={stonkData}
                                            guestUserStats={guestUserStats}
                                            guestUserStatsDispatch={guestUserStatsDispatch}
                                            guestTotalShares={totalShares}
                                            guestBalance={balance}
                                            setRefetch={setRefetch}
                                        />
                                    ) :
                                    (
                                        <Stonks
                                            userType={userType}
                                            stonkData={stonkData}
                                            totalShares={totalShares}
                                            balance={balance}
                                            setRefetch={setRefetch}
                                            setRefetchUserSide={setRefetchUserSide}
                                        />
                                    )
                                }

                            </Route>
                            <Route path={isGuest ? "/guest/leaderboard" : "/leaderboard"}>
                                <Leaderboard />
                            </Route>
                            <Route path={isGuest ? "/guest/account" : "/account"}>
                                {isGuest ?
                                    <GuestAccount guestAccountStats={guestAccountStats} />
                                    :
                                    <Account accountStats={accountStats} />
                                }
                            </Route>
                            <Route path={isGuest ? "/guest/updates" : "/updates"}>
                                <Updates />
                            </Route>
                            <Route path={isGuest ? "/guest" : "/"}>
                                <Card stonkData={stonkData} userType={userType} />
                            </Route>
                        </Switch>
                    </ContentWrapper>
                </Row>
            </StretchColumn>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
`;

const ContentWrapper = styled.div`
    margin-top:  ${props => props.isMobile ? "70px" : "15px"};
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
`;

const StretchColumn = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap
    flex: 1;
    width: 100%;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
`;

const BurgerMenu = styled.div`
    .bm-burger-button {
        position: fixed;
        width: 36px;
        height: 30px;
        left: 20px;
        top: 20px;
    }
    .bm-burger-bars {
        background: #373a47;
    }
    .bm-burger-bars-hover {
        background: #a90000;
    }
    .bm-cross-button {
        height: 24px;
        width: 24px;
    }
    .bm-cross {
        background: #bdc3c7;
    }
    .bm-menu-wrap {
        position: fixed;
        height: 100%;
    }
    .bm-menu {
        background: rgba(255, 255, 255, 1);
        // padding: 2.5em 1.5em 0;
        font-size: 1.15em;
    }
`;




export default HomePage
