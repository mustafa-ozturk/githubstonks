import react from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Content from "./components/Content";
const App = () => {
    return (
        <>
            <Wrapper>
                <Sidebar />
                <NavAndContentContainer>
                    <Navbar />
                    <ContentWrapper>
                        <Router>
                            <Switch>
                                <Route exact path="/">
                                    <Content />
                                </Route>
                            </Switch>
                        </Router>
                    </ContentWrapper>
                </NavAndContentContainer>
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
