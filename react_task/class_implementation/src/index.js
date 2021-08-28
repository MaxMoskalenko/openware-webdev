import Form from "./Form.js"
import Landing from "./Landing.js"
import Forecast from "./Forecast.tsx"


import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,

} from "react-router-dom";


class App extends React.Component {
    constructor(props) {
        super(props);
        console.log("constructor");

        this.state = {
            isLogged: false
        };
        this.handleLogIn = this.handleLogIn.bind(this);
    }

    handleLogIn() {
        this.setState({ isLogged: true });
    }

    render() {
        return (

            <Router>
                <Switch>
                    <Route exact path="/landing">
                        <Landing />
                    </Route>

                    <Route exact path="/forecast" >
                        <Forecast />

                        {/* {this.state.isLogged ?
                            <Forecast />
                            :
                            <Redirect push to="/" />
                        } */}

                        {/* <PrivateRoute component={Forecast} /> */}
                    </Route>

                    <Route exact path="/" >
                        <Form changeState={this.handleLogIn} />
                        {/* {!this.state.isLogged ?
                            <Form changeState={this.handleLogIn} />
                            :
                            <Redirect push to="/landing" />
                        } */}
                    </Route>

                    <Route path="/">
                        {!this.state.isLogged ?
                            <Redirect push to="/" /> :
                            <Redirect push to="/landing" />
                        }
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