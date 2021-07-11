import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import GuestAccount from "./GuestAccount";
import Stonks from "../Stonks";
import Card from "../Card";
import Leaderboard from "../Leaderboard";
import Updates from "../Updates";
import { StonkContext } from "../../context/StonkContext";
import { GuestUserContext } from "./GuestUserContext";
import { slide as Menu } from 'react-burger-menu';
import { useMediaQuery } from 'react-responsive';
import { MOBILE_SIZE } from '../../utils';

const GuestApp = ({ userType,context }) => {
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

    const isMobile = useMediaQuery({ query: MOBILE_SIZE });

    const sideBar = () => {
        return (
            <Column>
                <Sidebar
                    balance={guestBalance}
                    portfolioValue={guestPortfolioValue}
                    netWorth={guestNetWorth}
                    profitLoss={guestProfitLoss}
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

            <DoubleColumn>
                <NavAndContentContainer>
                    {!isMobile
                        && <Navbar userType={userType} />
                    }
                    <ContentWrapper isMobile={isMobile}>
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
            </DoubleColumn>
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
    margin-top:  ${props => props.isMobile ? "70px" : "15px"};
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
`;

const DoubleColumn = styled.div`
    display: flex;
    flex-direction: column;
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




export default GuestApp;
