import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { StonkProvider } from "./context/StonkContext";
import { GuestUserProvider } from "./context/GuestUserContext";
ReactDOM.render(
    <StonkProvider>
        <GuestUserProvider>
            <App />
        </GuestUserProvider>
    </StonkProvider>,
    document.getElementById("root")
);
