import React from "react";
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

const Input = ({label, type, hidden = false}) => {
    return (
        <div className="input" style={{display: hidden ? "none" : "block"}}>
            <label>{label}</label>
            <input type={type}/>
        </div>
    );
}

const LoginForm = () => {
    const [action, setAction] = React.useState("Sign Up");

    return (
        <Container>
            <Header text="Sign Up"/>
            <FromSwitchers>
                <FormSwitchButton text="Sign Up" onclick={() => setAction("Sign Up")}/>
                <FormSwitchButton text="Log In" onclick={() => setAction("Log In")}/>
            </FromSwitchers>
            <Inputs>
                <Input label="Email" type="email" hidden={action !== "Sign Up"}/>
                <Input label="Username" type="text"/>
                <Input label="Password" type="password"/>
                <Input label="Confirm Password" type="password" hidden={action !== "Sign Up"}/>
            </Inputs>
            <input type="submit" value="Submit"/>
        </Container>
    );
};

export default LoginForm;
