import {POSTJsonRequest} from "../RestAPI/requests";

const TEMP_HOST = "http://localhost:5000"

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

export const checkEmail = async (email: string): Promise<string> => {
    if (email === "") {
        return "Email is empty!";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return "Email is not in correct format!";
    } else {
        try {
            const exists = await checkUserExists({email: email});
            if (exists) {
                return "This email is already registred!";
            }
        } catch (error) {
            console.error(error);
            return "Error checking username";
        }
    }
    return "";
};

export const checkUsername = async (username: string): Promise<string> => {
    if (username === "") {
        return "Username is empty!";
    } else if (!/^[a-zA-Z0-9_-]{5,20}$/.test(username)) {
        return "Username has to be 5-20 letters long and contain letters, numbers, and dashes";
    } else {
        try {
            const exists = await checkUserExists({username: username});
            if (exists) {
                return "Username already exists!";
            }
        } catch (error) {
            console.error(error);
            return "Error checking username";
        }
    }
    return "";
};

const checkUserExists = async (data: any): Promise<boolean> => {
    try {
        const response = await POSTJsonRequest(TEMP_HOST + "/api/user/exists", data);
        console.log("data exists: " + response.ret);
        return response.ret;
    } catch (error) {
        console.error(error);
        return true;
    }
};