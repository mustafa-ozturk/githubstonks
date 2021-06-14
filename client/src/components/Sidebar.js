import React from "react";
import styled from "styled-components";
import { FiExternalLink } from "react-icons/fi";
import { AiFillGithub } from "react-icons/ai";
import { SiDiscord } from "react-icons/si";
import { abbreviateNumber } from "../utils";
const Sidebar = ({ balance, portfolioValue, netWorth, profitLoss }) => {
    return (
        <Wrapper>
            <LogoWrapper>
                <Logo>🚀</Logo>
                <Title>
                    GITHUBSTONKS
                    <Info>
                        (BETA)
                        <span className="tooltip">
                            GITHUBSTONKS is still under development which means
                            user data and stonk data will be reset many times,
                            if you encouter a bug or have a suggestion/question
                            please submit an issue or join our discord server
                        </span>
                    </Info>
                </Title>
            </LogoWrapper>
            <SideBarParentWrapper>
                <SideBarItemWrapper>
                    <SideBarItem>
                        <SideBarIcon>🏦</SideBarIcon>
                        <SideBarItemTextWrapper>
                            <Description>Net Worth</Description>
                            <span title={netWorth}>
                                ${abbreviateNumber(netWorth)}
                            </span>
                        </SideBarItemTextWrapper>
                    </SideBarItem>
                    <SideBarItem>
                        <SideBarIcon>📁</SideBarIcon>
                        <SideBarItemTextWrapper>
                            <Description>Portfolio Value</Description>
                            <span title={portfolioValue}>
                                ${abbreviateNumber(portfolioValue)}
                            </span>
                        </SideBarItemTextWrapper>
                    </SideBarItem>
                    <SideBarItem>
                        <SideBarIcon>💰</SideBarIcon>
                        <SideBarItemTextWrapper>
                            <Description>Balance</Description>
                            <span title={balance}>
                                ${abbreviateNumber(balance)}
                            </span>
                        </SideBarItemTextWrapper>
                    </SideBarItem>
                    <SideBarItem>
                        <SideBarIcon>📈</SideBarIcon>
                        <SideBarItemTextWrapper>
                            <Description>Profit/Loss</Description>
                            <span title={profitLoss}>
                                ${abbreviateNumber(profitLoss)}
                            </span>
                        </SideBarItemTextWrapper>
                    </SideBarItem>
                </SideBarItemWrapper>
            </SideBarParentWrapper>
            <OtherSideElement>
                <a href="https://mozturk.dev/" target="_blank">
                    made by
                    <br />
                    mozturk.dev
                    <span>
                        <FiExternalLink />
                    </span>
                </a>
            </OtherSideElement>
            <OtherSideElement>
                <a
                    href="https://github.com/mustafa-ozturk/githubstonks"
                    target="_blank"
                >
                    contribute
                    <span>
                        <AiFillGithub />
                    </span>
                </a>
            </OtherSideElement>
            <OtherSideElement>
                <a href="https://discord.gg/n7uR5CbM2u" target="_blank">
                    discord server
                    <span>
                        <SiDiscord />
                    </span>
                </a>
            </OtherSideElement>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    min-width: 200px;
    height: 100vh;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
`;

const SideBarParentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const LogoWrapper = styled.div`
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
const Logo = styled.div`
    font-size: 5rem;
    margin-bottom: 0;
`;
const Title = styled.p`
    margin-top: 0;
    font-weight: bold;
`;

const SideBarItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: baseline;
`;

const SideBarItem = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem 1rem 1rem 0;
`;

const SideBarIcon = styled.div`
    font-size: 1.5rem;
    margin-right: 10px;
`;

const SideBarItemTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Description = styled.span`
    color: rgba(0, 0, 0, 0.6);
`;

const Info = styled.span`
    position: relative;
    display: inline;
    font-size: 0.62rem;
    cursor: help;
    color: var(--main-red);
    border-bottom: 1px dotted black;
    & > .tooltip {
        display: none;
        color: red;
        width: 190px;
        font-size: 1rem;
        position: absolute;
        bottom: -65px;
        margin-left: 5px;
        z-index: 1000;
        background-color: white;
    }
    &:hover .tooltip {
        display: block;
    }
`;

const OtherSideElement = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    & > a {
        text-align: center;
        color: rgba(0, 0, 0, 0.9);
        text-decoration: none;
        & > span {
            position: relative;
            top: 2.5px;
            left: 2px;
        }
        &:active {
            color: rgb(14, 184, 239);
        }
    }
`;

export default Sidebar;
