"use client";

import { navlinks } from "@/data";
import Link from "next/link";
import React from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Button from "./Button";
import logoBG from "@/assets/logoBG.png";

const Navbar = () => {
    return (
        <nav className="flex justify-center border-b bg-[#fcf103]">
            <div className="py-5 flex justify-between items-center w-[90%] lg:w-[77%] mx-auto">
                {/* Logo */}
                <div>
                    <img src={logoBG.src} className="h-[70px] lg:h-[120px]" alt="Logo" />
                </div>

                {/* Desktop Nav Links */}
                <div className="hidden lg:flex gap-10 items-center">
                    {navlinks.map((link) => (
                        <Link
                            className="px-2 text-xl text-blue-600 font-bold hover:text-blue-600 transition-colors"
                            key={link.name}
                            href={link.href}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link href={'#login-href'}>
                        <Button className="text-lg px-10 py-1">Login</Button>
                    </Link>
                </div>

                {/* Mobile Menu */}
                <div className="lg:hidden">
                    <Sheet>
                        <SheetTrigger>
                            <Menu className="h-7 w-7 cursor-pointer" />
                        </SheetTrigger>
                        <SheetContent side="left" className="p-6">
                            <div className="flex flex-col gap-6 mt-10">
                                {navlinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="text-lg font-medium hover:text-blue-600 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <Link href={'#login-href'}>
                                    <Button className="mt-4">Login</Button>
                                </Link>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
