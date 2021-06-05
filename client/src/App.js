import React, { useEffect, useState } from "react";
import GuestApp from "./guest/GuestApp";
import RealApp from "./RealApp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
    const [userType, setUserType] = useState("guest");
    useEffect(() => {
        console.log("local", localStorage.getItem("id"));
        if (localStorage.getItem("id") !== null) {
            console.log("we fetchin");
            fetch("http://localhost:8000/api/user/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: localStorage.getItem("id") }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setUserType("real");
                });
        } else {
            setUserType("guest");
        }
    }, []);

    console.log(userType);
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/guest">
                        <GuestApp userType={userType} />
                    </Route>
                    <Route path="/">
                        <RealApp userType={userType} />
                    </Route>
                </Switch>
            </Router>
        </>
    );
};

export default App;
