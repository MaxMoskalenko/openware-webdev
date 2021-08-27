import React from 'react';
import './css/signin.css';

export default class Form extends React.Component {
    render() {
        return (
            <form className="main-form">
                <span>Sign In</span>
                <Input label="Login:" type="text" />
                <Input label="Password:" type="password" />
                <SubmitBtn />
            </form>
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
            <button>Sign In</button>
        );
    }
}
