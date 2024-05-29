import React from "react";

// toto jsou zakladni prvky formulare ktere jsem si vytvoril kvuli tailwinds

interface FormProps {
    onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
    children?: React.ReactNode;
}

export const Form: React.FC<FormProps> = ({onSubmit, children}) => {
    return (
        <form className="flex flex-col text-2xl font-semibold" onSubmit={onSubmit}>
            {children}
        </form>
    );
}

export const FormLabel: React.FC<{children?: React.ReactNode}> = ({children}) => {
    return (
        <label className="text-lg font-semibold">
            {children}
        </label>
    );
}

export const FormInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
    return (
        <input {...props} className="border-2 border-gray-500 rounded-lg p-1 m-5"/>
    );
}

export const FormSelect: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => {
    return (
        <select {...props} className="border-2 border-gray-500 rounded-lg p-1 m-5"/>
    );
}

export const SubmitButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    return (
        <button {...props} className="bg-blue-500 text-white rounded-lg p-1 hover:bg-blue-600 duration-200"/>
    );
}

export const FormMessage: React.FC<{ message: string}> = ({message}) => {
    const success = !message.includes("Error") && !message.includes("error") && !message.includes("fail");
    const empty = message === "";
    return (
        <div className={`${success ? "bg-green-300" : "bg-red-400"} rounded-lg p-2 mb-4 ${empty ? "hidden" : "visible"}`}>
            <p className="text-sm text-center text-gray-700">{message}</p>
        </div>
    );
}
