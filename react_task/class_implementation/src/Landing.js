import React from 'react';
import './css/landing.css';
import './css/landing-dropdown.css';
import './css/landing-form.css';
import './css/landing-header.css';



export default class Landing extends React.Component {
    render() {
        return (
            <div>
                <img src="/images/space_bg.png" alt="" className="bg-image" />

                <Header />
                <Form />

                <span className="site-title title-1">Explore your</span>
                <span className="site-title title-2">SPACE</span>

                <Dropdown />
            </div>
        );
    }
}



class Header extends React.Component {
    render() {
        return (
            <header className="landing-header">
                <div className="logo-bg">
                    <img src="/images/space_logo.png" alt="" />
                </div>

                <div className="opacity-bg">
                    <input type="text" />
                </div>

                <HeaderButton class="star-btn" label="Stars" />
                <HeaderButton class="planets-btn" label="Planets" />
                <HeaderButton class="meteoroids-btn" label="Meteoroids" />
                <HeaderButton class="wonders-btn" label="Space Wonders" />
            </header>
        );
    }
}

class HeaderButton extends React.Component {
    render() {
        return (
            <div className="opacity-bg" >
                <button className={this.props.class}>{this.props.label}</button>
            </div >
        );
    }
}

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = { isSignIn: false };
    }
    handleClick() {
        this.setState({ isSignIn: !this.state.isSignIn });
    }

    render() {
        return (
            <form className="landing-form">
                <div className="form-title">
                    <span>{this.state.isSignIn ? "Welcome Back" : "Subscribe"}</span>
                </div>

                {!this.state.isSignIn ?
                    <span>
                        <FormTextInput class="input-1" id="name" label="Name" />
                        <FormTextInput class="input-2" id="email" label="Email" />
                        <FormTextInput class="input-3" id="password" label="Password" />

                        <FormCheckboxInput id="checkbox-1" label="I agree with everything at all" />
                        <FormCheckboxInput id="checkbox-2" label="Send me more about space on email" />
                    </span>
                    :
                    <span>

                        <FormTextInput class="input-2" id="email" label="Email" />
                        <FormTextInput class="input-3" id="password" label="Password" />


                    </span>
                }


                <button className="sign-in-button" id="submit">Sign in</button>


                <div className="change-form">
                    <span className="change-form" onClick={() => { this.handleClick() }}>
                        {this.state.isSignIn ? "Don`t have an account? Sign up now" : "Already have an account?"}
                    </span>
                </div>
                {!this.state.isSignIn &&
                    <div className="form-footer">
                        <span>Learn more about space with this portal</span>
                    </div>
                }
            </form>
        );
    }
}


class FormTextInput extends React.Component {
    render() {
        return (
            <div className="form-text-input">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input className={this.props.class} type="text" id={this.props.id} />
            </div>
        );
    }
}

class FormCheckboxInput extends React.Component {
    render() {
        return (
            <div className="form-checkbox-input">
                <input type="checkbox" id={this.props.id} />
                <label htmlFor={this.props.id}>{this.props.label}</label>
            </div>

        );
    }
}

class Dropdown extends React.Component {

    constructor(props) {
        super(props);
        this.handleSwitch = this.handleSwitch.bind(this);
        this.state = { isOpen: false };
    }
    handleSwitch() {
        this.setState({ isOpen: !this.state.isOpen });
    }


    render() {
        return (
            <span>
                <button className={this.state.isOpen ? "arrow-dropdown-open" : "arrow-dropdown-closed"}
                    onMouseEnter={() => { this.handleSwitch() }}>

                </button>
                {
                    this.state.isOpen &&
                    <div className="dropdown" onMouseLeave={() => { this.handleSwitch() }}>
                        <button className="dropdown-btn-1">About us</button>
                        <button className="dropdown-btn-2">External Resources</button>
                        <button className="dropdown-btn-3">Support us</button>
                        <button className="dropdown-btn-4">Follow us in media</button>
                    </div>
                }
            </span>
        );

    }
}