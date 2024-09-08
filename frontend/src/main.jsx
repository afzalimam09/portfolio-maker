import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AccountProvider from "./context/AccountProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AccountProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </AccountProvider>
);
