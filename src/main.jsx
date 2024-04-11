import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthService from "./Services/AuthService.js";

const authorization = new AuthService();
authorization.loginUser(
  `${import.meta.env.VITE_USERNAME}`,
  `${import.meta.env.VITE_PASSWORD}`
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
