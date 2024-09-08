import RootNavbar from "@/components/RootNavbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
    return (
        <main className="relative bg-dark-2">
            <RootNavbar />
            <section className="px-6 sm:px-14 pt-28 min-h-screen">
                <div className="w-full text-white">
                    <Outlet />
                </div>
            </section>
        </main>
    );
};

export default RootLayout;
