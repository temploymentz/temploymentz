"use client";

import { navlinks } from "@/data";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Menu, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Button from "./Button";
import logoBG from "@/assets/logoBG.png";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const { data: session, status } = useSession();
    const pathname = usePathname();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleLogout = async () => {
        // Sign out and redirect to home
        await signOut({ redirect: true, callbackUrl: "/" });
    };

    // Show navbar on all pages

    return (
        <nav className="flex justify-center border-b bg-[#fcf103]">
            <div className="py-5 flex justify-between items-center w-[90%] lg:w-[77%] mx-auto">
                {/* Logo */}
                <div>
                    <Link href="/">
                        <img src={logoBG.src} className="h-[70px] lg:h-[90px] cursor-pointer" alt="Logo" />
                    </Link>
                </div>

                {/* Desktop Nav Links */}
                <div className="hidden lg:flex gap-10 items-center">
                    {navlinks.map((link) => (
                        <Link
                            className="px-2 text-base 2xl:text-xl text-blue-600 font-bold hover:text-blue-600 transition-colors"
                            key={link.name}
                            href={link.href}
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* Session-based buttons */}
                    {isClient && (
                        <>
                            {status === "loading" ? (
                                <Button className="text-sm 2xl:text-base px-5 py-1 2xl:px-10 2xl:py-2" disabled>
                                    Loading...
                                </Button>
                            ) : session ? (
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 border border-gray-300">
                                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                                            {session.user?.firstName?.[0] || session.user?.name?.[0] || 'U'}
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">
                                            {session.user?.firstName ? `${session.user.firstName} ${session.user.lastName || ''}` : session.user?.name || 'User'}
                                        </span>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium text-sm 2xl:text-base"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <Link href="/login">
                                    <Button className="text-sm 2xl:text-base px-5 py-1 2xl:px-10 2xl:py-2">
                                        Login
                                    </Button>
                                </Link>
                            )}
                        </>
                    )}
                </div>

                {/* Mobile Menu */}
                <div className="lg:hidden">
                    <Sheet>
                        <SheetTrigger>
                            <Menu className="h-7 w-7 cursor-pointer" />
                        </SheetTrigger>
                        <SheetContent side="left" className="p-6 bg-[#fcf103]">
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

                                {/* Mobile Session-based buttons */}
                                {isClient && (
                                    <>
                                        {status === "loading" ? (
                                            <Button className="mt-4" disabled>
                                                Loading...
                                            </Button>
                                        ) : session ? (
                                            <div className="flex flex-col gap-3 mt-4">
                                                <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-gray-300">
                                                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                                                        {session.user?.firstName?.[0] || session.user?.name?.[0] || 'U'}
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-700">
                                                        {session.user?.firstName ? `${session.user.firstName} ${session.user.lastName || ''}` : session.user?.name || 'User'}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    Logout
                                                </button>
                                            </div>
                                        ) : (
                                            <Link href="/login" className="w-full">
                                                <Button className="w-full mt-4">Login</Button>
                                            </Link>
                                        )}
                                    </>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
