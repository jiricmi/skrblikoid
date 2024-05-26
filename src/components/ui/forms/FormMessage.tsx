import React from "react";

export const FormMessage: React.FC<{ message: string}> = ({message}) => {
    const success = !message.includes("Error") && !message.includes("error") && !message.includes("fail");
    const empty = message === "";
    return (
        <div className={`${success ? "bg-green-400" : "bg-red-400"} rounded-lg p-2 ${empty ? "hidden" : "visible"}`}>
            {message}
        </div>
    );
}