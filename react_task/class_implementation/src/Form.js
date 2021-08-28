import React from 'react';
import './css/signin.css';


export default class Form extends React.Component {

    render() {
        return (
            <div className="main-form">
                <span>Sign In</span>
                <Input label="Login:" type="text" />
                <Input label="Password:" type="password" />
                <SubmitBtn changeState={this.props.changeState} />
            </div>
        );
    }
}

class Input extends React.Component {
    render() {
        return (
            <div className="inputBox" >
                <label>{this.props.label}</label>
                <input type={this.props.type} />
            </div>
        );
    }
}

class SubmitBtn extends React.Component {
    render() {
        return (
            <button onClick={() => { this.props.changeState(); }}>Sign In</button>
        );
    }
}
