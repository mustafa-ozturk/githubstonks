import react from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

const App = () => {
    return (
        <>
            <Wrapper>
                <Sidebar />
                <NavAndContentContainer>
                    <Navbar />
                    <Content>
                        <Router>
                            <Switch>
                                <Route exact path="/">
                                    <p>test</p>
                                </Route>
                            </Switch>
                        </Router>
                    </Content>
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

const Content = styled.div`
    margin-left: 201px;
    margin-top: 50px;
`;
export default App;
