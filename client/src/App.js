import react from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const App = () => {
    return (
        <>
            <Sidebar />
            <Router>
                <Switch>
                    <Route exact path="/">
                        {/* this is home */}
                    </Route>
                </Switch>
            </Router>
        </>
    );
};

export default App;
