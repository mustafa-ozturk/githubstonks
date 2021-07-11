import React, { useEffect, useState } from "react";
import HomePage from './components/HomePage';
import { Switch, Route, useHistory } from "react-router-dom";
import { GuestUserContext } from "./components/guest/GuestUserContext";
import { RealUserContext } from "./context/RealUserContext";

const App = () => {
    const [userType, setUserType] = useState("guest");
    const tokenId = localStorage.getItem("id");

    let history = useHistory();
    const removeQueryFromPathOnReceivedToken = () => {
        history.push("/");
    };

    useEffect(() => {
        if (localStorage.getItem("id") !== null) {
            fetch(`${process.env.REACT_APP_API_LINK}/api/user/auth`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
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
    }, [tokenId]);

    return (
        <>
            <Switch>
                <Route path={"/guest"}>
                    <HomePage userType={userType} context={GuestUserContext} />
                </Route>
                <Route path={"/"}>
                    <HomePage userType={userType} context={RealUserContext} />
                </Route>
            </Switch>
        </>
    );
};

export default App;
