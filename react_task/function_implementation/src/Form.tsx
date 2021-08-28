import './css/signin.css';


export default function Form(): JSX.Element {
    return (
        <form className="main-form">
            <span>Sign In</span>
            <Input label="Login:" type="text" />
            <Input label="Password:" type="password" />
            <SubmitBtn />
        </form>
    )
}
interface InputProps {
    label: string;
    type: string;
}
function Input(props: InputProps): JSX.Element {
    return (
        <div className="inputBox" >
            <label>{props.label}</label>
            <input type={props.type} />
        </div>
    )

}

function SubmitBtn(): JSX.Element {
    return (
        <button>Sign In</button>
    )
}
