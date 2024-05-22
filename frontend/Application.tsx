import React from "react";
import {createRoot} from "react-dom/client";
import LoginForm from "./Components/LoginForm/LoginForm";

function Application() {
    return (
        <div className="container mt-8 px-6 py-12 mx-auto bg-transparent">
            <LoginForm/>
        </div>
    );
}

const root = createRoot(document.querySelector("#application")!);
root.render(<Application/>);
