import { dashboardMenuLinks } from "../constants/index";
import { cn } from "../lib/utils";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
    const { pathname } = useLocation();

    return (
        <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
            <div className="flex flex-1 flex-col gap-6">
                {dashboardMenuLinks.map((item) => {
                    const isActive =
                        item.route === "/dashboard"
                            ? pathname === item.route
                            : pathname.startsWith(item.route);
                    return (
                        <Link
                            to={item.route}
                            key={item.label}
                            className={cn(
                                "flex gap-4 items-center p-4 rounded-lg justify-start",
                                { "bg-blue-1": isActive }
                            )}
                        >
                            <img
                                src={item.imgURL}
                                alt={item.label}
                                width={22}
                                height={22}
                            />
                            <p className="text-lg font-semibold max-lg:hidden">
                                {item.label}
                            </p>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default Sidebar;
