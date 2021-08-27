import Form from "./Form.js"
import Landing from "./Landing.js"
import Forecast from "./Forecast.tsx"

import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";


class App extends React.Component {
    render() {
        return (
            <Router>

                <Switch>
                    <Route exact path="/landing">
                        <Landing />
                    </Route>

                    <Route exact path="/forecast">
                        <Forecast />
                    </Route>

                    <Route exact path="/">
                        <Form />
                    </Route>

                    <Route path="/">
                        <Redirect push to="/" />
                    </Route>


                </Switch>
            </Router>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);