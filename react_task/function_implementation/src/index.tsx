import Landing from "./Landing"
import Forecast from "./Forecast"
import Form from "./Form"


import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";


const App = function (): JSX.Element {
    return (
        <Router>
            <Switch>
                <Route exact path="/landing">
                    <Landing />
                </Route>

                <Route exact path="/forecast" >
                    <Forecast />
                    {/* <PrivateRoute component={Forecast} /> */}
                </Route>

                <Route exact path="/" >
                    <Form />
                    {/* <PublicRoute component={Form} /> */}
                </Route>

                <Route path="/">
                    <Redirect push to="/" />
                </Route>


            </Switch>
        </Router>
    );
}


// class PrivateRoute extends React.Component {
//     render() {


//         if (process.env.ISLOGGED) {
//             return (<Forecast />);
//         }

//         return <Redirect to={"/"} />;

//     };
// }

// class PublicRoute extends React.Component {

//     render() {
//         if (process.env.ISLOGGED) {
//             return (<Redirect to={ROUTES.LANDING} />);
//         }

//         return (<Form />);
//     }
// }



ReactDOM.render(
    App(),
    document.getElementById('root')
);