import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import CardContent from "./components/CardContent";
import StonkContent from "./components/StonkContent";
import Account from "./components/Account";

const App = () => {
    const [cardData, setCardData] = useState([]);

    useEffect(() => {
        fetch("/api/stonkData")
            .then((response) => response.json())
            .then(({ data }) => setCardData(data));
    }, []);
    return (
        <>
            <Wrapper>
                <Router>
                    <Sidebar />
                    <NavAndContentContainer>
                        <Navbar />
                        <ContentWrapper>
                            <Switch>
                                <Route exact path="/">
                                    <CardContent cardData={cardData} />
                                </Route>
                                <Route exact path="/stonk/:stonkname">
                                    <StonkContent cardData={cardData} />
                                </Route>
                                <Route exact path="/account">
                                    <Account />
                                </Route>
                            </Switch>
                        </ContentWrapper>
                    </NavAndContentContainer>
                </Router>
            </Wrapper>
        </>
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
export default App;
