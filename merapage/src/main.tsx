import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/toaster.tsx";
import AccountProvider from "./context/AccountProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AccountProvider>
            <BrowserRouter>
                <Toaster />
                <App />
            </BrowserRouter>
        </AccountProvider>
    </React.StrictMode>
);
