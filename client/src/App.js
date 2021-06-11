import React, { useEffect, useState } from "react";
import GuestApp from "./guest/GuestApp";
import RealApp from "./RealApp";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
} from "react-router-dom";

const App = () => {
    const [userType, setUserType] = useState("guest");

    let history = useHistory();
    const removeQueryFromPathOnReceivedToken = () => {
        history.push("/");
    };
    useEffect(() => {
        if (localStorage.getItem("id") !== null) {
            fetch("http://localhost:8000/api/user/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ id: localStorage.getItem("id") }),
            })
                .then((response) => response.json())
                .then((data) => {
                    setUserType("real");
                    removeQueryFromPathOnReceivedToken();
                });
        } else {
            setUserType("guest");
        }
    }, []);
    return (
        <>
            <Switch>
                <Route path="/guest">
                    <GuestApp userType={userType} />
                </Route>
                <Route path="/">
                    <RealApp userType={userType} />
                </Route>
            </Switch>
        </>
    );
};

export default App;
