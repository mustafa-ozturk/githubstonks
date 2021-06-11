import React from "react";
import ReactDOM from "react-dom";
import GlobalStyles from "./GlobalStyles";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
} from "react-router-dom";
import "./index.css";
import App from "./App";

import { StonkProvider } from "./context/StonkContext";
import { GuestUserProvider } from "./guest/GuestUserContext";
import { RealUserProvider } from "./context/RealUserContext";

ReactDOM.render(
    <StonkProvider>
        <GuestUserProvider>
            <RealUserProvider>
                <GlobalStyles />
                <Router>
                    <App />
                </Router>
            </RealUserProvider>
        </GuestUserProvider>
    </StonkProvider>,
    document.getElementById("root")
);
