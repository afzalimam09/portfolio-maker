import { Link, useLocation, useNavigate } from "react-router-dom";
// import RootMobileNav from "./RootMobileNav";
import { cn } from "@/lib/utils";
import { useContext } from "react";
import { AccountContext } from "@/context/AccountProvider";
import { Button } from "./ui/button";
import { apiRequest } from "@/requestMethods";

const rootMenuLinks = [
    {
        route: "/login",
        label: "Login",
    },
    {
        route: "/register",
        label: "Register",
    },
];

const RootNavbar = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const context = useContext(AccountContext);
    if (!context) {
        throw new Error("AccountContext is not available");
    }
    const { account, setAccount } = context;
    const handleLogout = async () => {
        try {
            await apiRequest.get("/auth/logout");
            setAccount(null);
            navigate("/dashboard");
        } catch (error: any) {
            console.log(error?.response?.data?.message);
        }
    };

    return (
        <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
            <Link to="/" className="flex items-center gap-1">
                {/* <img
                    src="/icons/logo.svg"
                    width={32}
                    height={32}
                    alt="suffa logo"
                    className="max-sm:size-10"
                /> */}
                <p className="text-[26px] font-extrabold text-white max-sm:hidden">
                    MeraPage
                </p>
            </Link>
            <div className="text-white flex gap-5 items-center max-sm:hidden ">
                {!account ? (
                    rootMenuLinks.map((item) => {
                        const isActive =
                            item.route === "/"
                                ? pathname === item.route
                                : pathname.startsWith(item.route);
                        return (
                            <Link
                                to={item.route}
                                key={item.label}
                                className={cn(
                                    "hover:bg-blue-1 bg-dark-3 px-3 py-1 rounded-md transition duration-300",
                                    {
                                        "bg-blue-1": isActive,
                                    }
                                )}
                            >
                                {item.label}
                            </Link>
                        );
                    })
                ) : (
                    <Button
                        onClick={handleLogout}
                        className="hover:bg-blue-1 bg-dark-3 px-3 py-1 rounded-md transition duration-300"
                    >
                        Logoout
                    </Button>
                )}
            </div>
            <div className="sm:hidden">{/* <RootMobileNav /> */}</div>
        </nav>
    );
};

export default RootNavbar;
