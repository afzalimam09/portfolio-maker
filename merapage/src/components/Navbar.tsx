import { Link, useNavigate } from "react-router-dom";
import MobileNav from "./MobileNav";
import { Button } from "./ui/button";
import { useContext } from "react";
import { AccountContext } from "@/context/AccountProvider";
import { apiRequest } from "@/requestMethods";

const Navbar = () => {
    const navigate = useNavigate();
    const context = useContext(AccountContext);
    if (!context) {
        throw new Error("AccountContext is not available");
    }
    const { setAccount } = context;
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
            <div className="flex-between gap-5">
                {/* <img
                    src="/images/avatar-1.jpeg"
                    alt="profile photo"
                    width={30}
                    height={30}
                    className="rounded-full cursor-pointer"
                    onClick={() => navigate("profile")}
                /> */}
                <Button
                    onClick={handleLogout}
                    className="hover:bg-blue-1 bg-dark-3 px-3 rounded-md transition duration-300 text-white"
                >
                    Logout
                </Button>
                <MobileNav />
            </div>
        </nav>
    );
};

export default Navbar;
