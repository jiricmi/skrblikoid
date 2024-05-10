const TEMP_HOST = "http://localhost:5000"

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
    if (email === "") { // todo: connect to api to check
        return "Email is empty!";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return "Email is not in correct format!";
    }
    

    return "";
};

export const checkUsername = (action: string, username: string): string => {
    if (username === "") { // todo: connect to api to check
        return "Username is empty!";
    } else if (!/^[a-zA-Z0-9_-]{5,20}$/.test(username)) {
        return "Username has to be 5-20 letters long and contain letters numbers and dash";
    }

    checkUsernameExists(username);

    return "";
};

const checkUsernameExists = (username: string): boolean => {

    const data = {
        username: username,
    }

    const requestOptions: RequestInit = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    };
    let url = TEMP_HOST + '/api/user/exists'
    fetch(url, requestOptions)
        .then(
            response => {
                if (response.ok) {
                    console.log(response)
                } else {
                    throw new Error("Error")
                }
            }
        )
        .catch(
            error => {
                console.error(error);
            }
        );

    return true;
};