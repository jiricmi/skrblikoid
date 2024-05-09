import React, {useEffect} from "react";
import {checkPasswdConf, checkEmail, checkUsername, formAction} from "./validator";
import "./LoginForm.css";


const Container = ({children}) => {
    return (
        <div className="container">
            {children}
        </div>
    );
}

const Header = ({text}) => {
    return (
        <div className="header">
            <div className="text">{text}</div>
        </div>
    );
}

const FromSwitchers = ({children}) => {
    return (
        <div className="form-switchers">
            {children}
        </div>
    );
}

const FormSwitchButton = ({text, onclick}) => {
    return (
        <button onClick={onclick}>{text}</button>
    );
}

const Inputs = ({children}) => {
    return (
        <div className="inputs">
            {children}
        </div>
    );
}

const Input = ({label, type, value, onChange, errMessage = "", hidden = false}) => {
    return (
        <div className="input" style={{display: hidden ? "none" : "block"}}>
            <label>{label}</label>
            <input type={type} value={value} onChange={onChange}/>
            <ErrorMessage text={errMessage}/>
        </div>
    );
}

const ErrorMessage = ({text}) => {
    return (
        <div className="error-message">{text}</div>
    );
}

const SubmitButton = ({onclick}) => {
    return (
        <input type="submit" value="Submit" onClick={onclick}/>
    );
}

const LoginForm = () => {
    const [action, setAction] = React.useState<'signup' | 'signin'>();
    const [email, setEmail] = React.useState<string>("");
    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [confirmPassword, setConfirmPassword] = React.useState<string>("");
    const [emailError, setEmailError] = React.useState<string>("");
    const [usernameError, setUsernameError] = React.useState<string>("");
    const [passwordError, setPasswordError] = React.useState<string>("");

    useEffect(() => (setPasswordError(checkPasswdConf(password, confirmPassword))));

    const validateForm = () => {
        let validated: boolean; // todo: add validation
        if (action === 'signup') {
            validated = validateSignup();
        } else {
            validated = validateSignin();
        }
    };

    const validateSignup = (): boolean => {
        let validate = true;
        setEmailError(checkEmail(action, email));
        setUsernameError(checkUsername(action, username));
        setPasswordError(checkPasswdConf(password, confirmPassword))
        return true;

    };

    const validateSignin = (): boolean => {
        return true;
    }

    return (
        <Container>
            <Header text="Sign Up"/>
            <FromSwitchers>
                <FormSwitchButton text="Sign Up" onclick={() => setAction("signup")}/>
                <FormSwitchButton text="Log In" onclick={() => setAction("signin")}/>
            </FromSwitchers>
            <Inputs>
                <Input
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => {
                        setEmail(e.target.value)
                    }}
                    hidden={action !== "signup"}
                    errMessage={emailError}
                />

                <Input
                    label="Username"
                    type="text" value={username}
                    onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => {
                        setUsername(e.target.value)
                    }}
                    errMessage={usernameError}
                />

                <Input
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => {
                        setPassword(e.target.value)
                    }}
                />

                <Input
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => {
                        setConfirmPassword(e.target.value)
                    }}
                    hidden={action !== "signup"}
                    errMessage={passwordError}
                />
            </Inputs>
            <SubmitButton onclick={() => validateForm()}/>
        </Container>
    );
};

export default LoginForm;
