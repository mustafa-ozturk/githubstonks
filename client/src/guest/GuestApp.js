import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import GuestAccount from "./GuestAccount";
import Stonks from "../components/Stonks";
import Card from "../components/Card";
import Leaderboard from "../components/Leaderboard";
import Updates from "../components/Updates";
import { StonkContext } from "../context/StonkContext";
import { GuestUserContext } from "./GuestUserContext";
import { slide as Menu } from 'react-burger-menu';
import { useMediaQuery } from 'react-responsive';
import { MOBILE_SIZE } from '../utils';

const GuestApp = ({ userType }) => {
    const { stonkData, setRefetch } = useContext(StonkContext);
    const {
        guestUserStats,
        guestUserStatsDispatch,
        guestBalance,
        guestPortfolioValue,
        guestNetWorth,
        guestProfitLoss,
        guestTotalShares,
        guestAccountStats,
    } = useContext(GuestUserContext);

    const isMobile = useMediaQuery({ query: MOBILE_SIZE })

    const sideBar = () => {
        return (
            <Sidebar
                balance={guestBalance}
                portfolioValue={guestPortfolioValue}
                netWorth={guestNetWorth}
                profitLoss={guestProfitLoss}
                userType={userType}
            />
        )
    }

    return (
        <Wrapper>
            {isMobile
                ? <BurgerMenu>
                    <Menu isOpen={!isMobile} width={'9.1rem'} >
                        {sideBar()}
                    </Menu>
                </BurgerMenu>
                : sideBar()
            }

            <NavAndContentContainer>
                {!isMobile
                    && <Navbar userType={userType} />
                }
                <ContentWrapper>
                    <Switch>
                        <Route
                            path={
                                process.env.PUBLIC_URL +
                                "/guest/stonk/:stonkname"
                            }
                        >
                            <Stonks
                                userType={userType}
                                stonkData={stonkData}
                                guestUserStats={guestUserStats}
                                guestUserStatsDispatch={guestUserStatsDispatch}
                                guestTotalShares={guestTotalShares}
                                guestBalance={guestBalance}
                                setRefetch={setRefetch}
                            />
                        </Route>
                        <Route path={"/guest/leaderboard"}>
                            <Leaderboard />
                        </Route>
                        <Route path={"/guest/account"}>
                            <GuestAccount
                                guestAccountStats={guestAccountStats}
                            />
                        </Route>
                        <Route path={"/guest/updates"}>
                            <Updates />
                        </Route>
                        <Route path={"/guest"}>
                            <Card stonkData={stonkData} userType={userType} />
                        </Route>
                    </Switch>
                </ContentWrapper>
            </NavAndContentContainer>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
`;

const NavAndContentContainer = styled.div`
    width: 100%;
`;

const ContentWrapper = styled.div`
    margin-left: 201px;
    margin-top: 50px;
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
        padding: 2.5em 1.5em 0;
        font-size: 1.15em;
    }
`;




export default GuestApp;
