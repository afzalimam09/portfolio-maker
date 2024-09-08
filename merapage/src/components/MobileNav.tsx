"use client";

import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { cn } from "../lib/utils";
import { Link, useLocation } from "react-router-dom";
import { dashboardMenuLinks } from "../constants/index";

const MobileNav = () => {
    const { pathname } = useLocation();
    return (
        <section className="w-full max-w-[264px]">
            <Sheet>
                <SheetTrigger asChild>
                    <img
                        src="/icons/hamburger.svg"
                        width={36}
                        height={36}
                        alt="hamburger icon"
                        className="cursor-pointer sm:hidden"
                    />
                </SheetTrigger>
                <SheetContent side="left" className="border-none bg-dark-1">
                    <Link to="/" className="flex items-center gap-1">
                        {/* <img
                            src="/icons/logo.svg"
                            width={32}
                            height={32}
                            alt="yoom logo"
                        /> */}
                        <p className="text-[26px] font-extrabold text-white">
                            MeraPage
                        </p>
                    </Link>
                    <div className="flex h-[calc(100vh-72px) flex-col justify-between overflow-y-auto">
                        <SheetClose asChild>
                            <section className="flex h-full flex-col gap-6 pt-16 text-white">
                                {dashboardMenuLinks.map((item) => {
                                    const isActive =
                                        item.route === "/dashboard"
                                            ? pathname === item.route
                                            : pathname.startsWith(item.route);

                                    return (
                                        <SheetClose asChild key={item.route}>
                                            <Link
                                                to={item.route}
                                                key={item.label}
                                                className={cn(
                                                    "flex gap-4 items-center p-4 rounded-lg w-full max-w-60",
                                                    {
                                                        "bg-blue-1": isActive,
                                                    }
                                                )}
                                            >
                                                <img
                                                    src={item.imgURL}
                                                    alt={item.label}
                                                    width={20}
                                                    height={20}
                                                />
                                                <p className="font-semibold">
                                                    {item.label}
                                                </p>
                                            </Link>
                                        </SheetClose>
                                    );
                                })}
                            </section>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    );
};

export default MobileNav;
