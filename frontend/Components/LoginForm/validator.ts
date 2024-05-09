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
    if (passwd === "") { // todo: check some security
        return "Password is empty!";
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
