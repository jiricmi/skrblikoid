import React, {useEffect} from "react";
import {checkPasswdConf, checkEmail, checkUsername, createUser, loginUser} from "./validator";
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

const RegStateMessage = ({text}) => {
    return (
        <div className="message">{text}</div>
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
    const [Message, setMessage] = React.useState<string>("");

    useEffect(() => (setPasswordError(checkPasswdConf(password, confirmPassword))));

    const validateForm = () => {
        if (action === 'signup') {
            validateSignup().then(() => {
            });
        } else {
            validateSignin().then(() => {
                // todo: dodelat prechod do uctu
            })
        }
    };

const validateSignup = async (): Promise<void> => {
    try {
        const [emailErr, usernameErr] = await Promise.all([checkEmail(email), checkUsername(username)]);
        setEmailError(emailErr);
        setUsernameError(usernameErr);
        setPasswordError(checkPasswdConf(password, confirmPassword));

        if (emailErr === "" && usernameErr === "" && passwordError === "") {
            try {

                let ret = await createUser(username, email, password);
                if (!ret) {
                    setMessage("Error creating user");
                    return;
                }
                clearInputs();
                setMessage("User created!");
            } catch (error) {
                console.error(error);
                setMessage("Error creating user");
            }
        }
    } catch (error) {
        console.error(error);
        setMessage("Error validating user");
    }
};

    const validateSignin = async (): Promise<void> => {
        let ret =  await loginUser(username, password);
        if (ret === 0) {
            setMessage("Error logging in");
        } else if (ret === 2) {
            setMessage("Wrong username or password");
        } else {
            setMessage("Logged in");
        }

    }

    const clearInputs = () => {
        setEmail("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
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
            <RegStateMessage text={Message}/>
            <SubmitButton onclick={() => validateForm()}/>
        </Container>
    );
};

export default LoginForm;
