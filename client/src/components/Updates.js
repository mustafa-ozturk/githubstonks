import React from "react";
import styled from "styled-components";
const Updates = () => {
    return (
        <Wrapper>
            <div>
                <h1>June 14, 2021 - July 02, 2021</h1>
                <ul>
                    <li>public beta testing:</li>
                    <ul>
                        <li>major game breaking exploits fixed:</li>
                        <ul>
                            <li>added more request body validation</li>
                            <li>added rate limiting</li>
                        </ul>
                        <li>smaller bug fixes</li>
                        <li>codebase clean up</li>
                        <li>big updates to the readme (still in progress)</li>
                        <li>added updates page to keep track of changes</li>
                    </ul>
                </ul>
                <hr />
                <h1>May 24, 2021 - June 13, 2021</h1>
                <ul>
                    <li>initial features:</li>
                    <ul>
                        <li>buy/sell</li>
                        <li>guest user</li>
                        <li>github login</li>
                        <li>player leaderboard</li>
                        <li>player basic account (portfolio)</li>
                        <li>login user has effect on prices</li>
                        <li>initial readme</li>
                    </ul>
                    <li>deploying on netlify and aws ec2</li>
                    <li>private beta testing:</li>
                    <ul>
                        <li>balancing the game</li>
                        <li>fixing major game breaking bugs:</li>
                        <ul>
                            <li>added request body validation</li>
                        </ul>
                    </ul>
                </ul>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    padding: 25px 40px 20px 40px;
    width: 500px;
    margin: 0 auto;
    & > div {
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14),
            0px 2px 1px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2);
        & > h1 {
            text-align: center;
        }
        & > hr {
            opacity: 0.5;
        }
    }
`;

export default Updates;
