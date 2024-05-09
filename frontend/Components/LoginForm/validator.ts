export const formAction = (action: string): void => {
    if (action === "signup") {
        console.log("signup")

    } else if (action === "signin") {
        console.log("signin")
    } else {
        console.warn("Invalid action");
    }
};


export const checkPasswdConf = (passwd: string, confPasswd: string): string => {
    if (passwd === "") {
        return "Password is empty!";
    } else if (passwd.length < 8) {
        return "Password must have at least 8 characters long!";
    } else if (!/[a-z]/.test(passwd)) {
        return "Password must have at least one lowecase letter!";
    } else if (!/[A-Z]/.test(passwd)) {
        return "Password must have at least one uppercase letter!";
    } else if (!/\d/.test(passwd)) {
        return "Password must have at least one digit!";
    } else if (confPasswd === "") {
        return "Confirm your password!";
    } else if (passwd != confPasswd) {
        return "Password do not match!";
    }
    return "";
};

export const checkEmail = (action: string, email: string): string => {
    if (email === "") { // todo: connect to api
        return "Email is empty!";
    }


    return "";
}

export const checkUsername = (action: string, username: string): string => {
    if (username === "") { // todo: connect to api
        return "Username is empty!";
    }
    return "";
}
