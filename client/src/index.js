import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { StonkProvider } from "./context/StonkContext";

ReactDOM.render(
    <StonkProvider>
        <App />
    </StonkProvider>,
    document.getElementById("root")
);
