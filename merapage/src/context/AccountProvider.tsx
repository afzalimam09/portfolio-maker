import React, {
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
    useEffect,
} from "react";
import { createContext } from "react";

// Define the types for account and the context value
interface AccountContextType {
    account: any; // You can replace 'any' with a more specific type if you know the shape of the 'account'
    setAccount: Dispatch<SetStateAction<any>>; // Replace 'any' with the same specific type
}

// Set initial context value to `null` for better type checking
export const AccountContext = createContext<AccountContextType | null>(null);

// Define the type for the props of AccountProvider
interface AccountProviderProps {
    children: ReactNode;
}

const AccountProvider: React.FC<AccountProviderProps> = ({ children }) => {
    const [account, setAccount] = useState<any>(() => {
        // Load account from localStorage if available
        const savedAccount = localStorage.getItem("account");
        return savedAccount ? JSON.parse(savedAccount) : null;
    });

    // Whenever `account` changes, update localStorage
    useEffect(() => {
        if (account) {
            localStorage.setItem("account", JSON.stringify(account));
        } else {
            localStorage.removeItem("account"); // Remove from localStorage when account is null
        }
    }, [account]);
    return (
        <AccountContext.Provider
            value={{
                account,
                setAccount,
            }}
        >
            {children}
        </AccountContext.Provider>
    );
};

export default AccountProvider;
