import { useState } from 'react';




export default function Landing(): JSX.Element {
    return (
        <div>
            <img src="/images/space_bg.png" alt="" className="bg-image" />

            <Header />
            <Form />

            <span className="site-title title-1">Explore your</span>
            <span className="site-title title-2">SPACE</span>

            <Dropdown />
        </div>
    )
}




function Header(): JSX.Element {
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


interface HeaderButtonProps {
    class: string;
    label: string;
}
function HeaderButton(props: HeaderButtonProps): JSX.Element {
    return (
        <div className="opacity-bg" >
            <button className={props.class}>{props.label}</button>
        </div >
    );
}

function Form(): JSX.Element {

    const [isSignIn, setSignIn] = useState(false);

    return (
        <form className="landing-form">
            <div className="form-title">
                <span>{isSignIn ? "Welcome Back" : "Subscribe"}</span>
            </div>

            {!isSignIn ?
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
                <span className="change-form" onClick={() => setSignIn(!isSignIn)}>
                    {isSignIn ? "Don`t have an account? Sign up now" : "Already have an account?"}
                </span>
            </div>
            {!isSignIn &&
                <div className="form-footer">
                    <span>Learn more about space with this portal</span>
                </div>
            }
        </form>
    )
}

interface FormTextInputProps {
    class: string;
    id: string;
    label: string;
}

function FormTextInput(props: FormTextInputProps): JSX.Element {
    return (
        <div className="form-text-input">
            <label htmlFor={props.id}>{props.label}</label>
            <input className={props.class} type="text" id={props.id} />
        </div>
    );
}

interface FormCheckboxInputProps {
    id: string;
    label: string;
}

function FormCheckboxInput(props: FormCheckboxInputProps): JSX.Element {
    return (
        <div className="form-checkbox-input">
            <input type="checkbox" id={props.id} />
            <label htmlFor={props.id}>{props.label}</label>
        </div>

    );
}

function Dropdown(): JSX.Element {

    const [isOpen, setOpening] = useState(false);

    return (
        <span>
            <button className={isOpen ? "arrow-dropdown-open" : "arrow-dropdown-closed"}
                onMouseEnter={() => setOpening(!isOpen)}>

            </button>
            {
                isOpen &&
                <div className="dropdown" onMouseLeave={() => setOpening(!isOpen)}>
                    <button className="dropdown-btn-1">About us</button>
                    <button className="dropdown-btn-2">External Resources</button>
                    <button className="dropdown-btn-3">Support us</button>
                    <button className="dropdown-btn-4">Follow us in media</button>
                </div>
            }
        </span>
    );

}