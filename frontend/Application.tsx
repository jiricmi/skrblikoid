// @ts-ignore
import React from "react";
import {createRoot} from "react-dom/client";
import LoginForm from "./Components/LoginForm/LoginForm";

function Application() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}

const root = createRoot(document.querySelector("#application")!);
root.render(<Application />);
