import React from "react";
import styled from "styled-components";

function abbreviateNumber(value) {
    let newVal = value.toFixed(2);
    if (value >= 1000000000000) {
        newVal = value / 1000000000000 + "T";
    } else if (value >= 1000000) {
        newVal = value / 1000000 + "M";
    } else if (value >= 1000000000) {
        newVal = value / 1000000000 + "B";
    } else if (value >= 1000) {
        newVal = value / 1000 + "K";
    }
    return newVal;
}

const Sidebar = ({ userStats }) => {
    return (
        <Wrapper>
            <LogoWrapper>
                <Logo>🚀</Logo>
                <Title>GITHUBSTONKS</Title>
            </LogoWrapper>
            <SideBarParentWrapper>
                <SideBarItemWrapper>
                    <SideBarItem>
                        <SideBarIcon>🏦</SideBarIcon>
                        <SideBarItemTextWrapper>
                            <Description>Net Worth</Description>
                            <span>${abbreviateNumber(userStats.netWorth)}</span>
                        </SideBarItemTextWrapper>
                    </SideBarItem>
                    <SideBarItem>
                        <SideBarIcon>📁</SideBarIcon>
                        <SideBarItemTextWrapper>
                            <Description>Portfolio Value</Description>
                            <span>
                                ${abbreviateNumber(userStats.portfolioValue)}
                            </span>
                        </SideBarItemTextWrapper>
                    </SideBarItem>
                    <SideBarItem>
                        <SideBarIcon>💰</SideBarIcon>
                        <SideBarItemTextWrapper>
                            <Description>Balance</Description>
                            <span>${abbreviateNumber(userStats.balance)}</span>
                        </SideBarItemTextWrapper>
                    </SideBarItem>
                    <SideBarItem>
                        <SideBarIcon>📈</SideBarIcon>
                        <SideBarItemTextWrapper>
                            <Description>Profit/Loss</Description>
                            <span>
                                ${abbreviateNumber(userStats.profitLoss)}
                            </span>
                        </SideBarItemTextWrapper>
                    </SideBarItem>
                </SideBarItemWrapper>
            </SideBarParentWrapper>
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

export default Sidebar;
