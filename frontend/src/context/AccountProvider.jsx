import React, { useState, useEffect } from "react";
import { createContext } from "react";
import { getSubdomainAndHost } from "../utils";
import axios from "axios";
const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

export const AccountContext = createContext(null);

const AccountProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(false);

    let { username } = getSubdomainAndHost();
    console.log({ username });

    useEffect(() => {
        const getAccountData = async () => {
            try {
                setLoading(true);
                console.log(username, "username");
                const { data } = await axios.get(
                    `${BACKEND_API_URL}/api/v1/users/getuser/${username}`
                );
                setAccount(data.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        getAccountData();
    }, []);

    if (!account) {
        return (
            <div style={{ color: "white", textAlign: "center" }}>
                Internal Server Error
            </div>
        );
    }
    return (
        <AccountContext.Provider
            value={{
                account,
                setAccount,
                loading,
                setLoading,
            }}
        >
            {children}
        </AccountContext.Provider>
    );
};

export default AccountProvider;
