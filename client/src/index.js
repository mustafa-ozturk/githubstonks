import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import "./index.css";
import GuestApp from "./GuestApp";
import App from "./App";
import { StonkProvider } from "./context/StonkContext";
import { GuestUserProvider } from "./context/GuestUserContext";

ReactDOM.render(
    <StonkProvider>
        <GuestUserProvider>
            <GlobalStyles />
            <Router>
                <Switch>
                    <Route path="/guest">
                        <GuestApp />
                    </Route>
                    <Route path="/">
                        <App />
                    </Route>
                </Switch>
            </Router>
        </GuestUserProvider>
    </StonkProvider>,
    document.getElementById("root")
);
