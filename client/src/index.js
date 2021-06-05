import React from "react";
import ReactDOM from "react-dom";
import GlobalStyles from "./GlobalStyles";
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
                <App />
            </RealUserProvider>
        </GuestUserProvider>
    </StonkProvider>,
    document.getElementById("root")
);
