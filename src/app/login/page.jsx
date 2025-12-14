"use client";
import React, { useState } from "react";
import google from "@/assets/google.png";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import logoBG from "@/assets/logoBG.png";
import Link from "next/link";
import { toast } from "react-toastify";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!formData.email.trim()) {
            toast.error("Email is required");
            return;
        }
        if (!formData.password.trim()) {
            toast.error("Password is required");
            return;
        }

        setLoading(true);
        try {
            const result = await signIn("credentials", {
                email: formData.email.trim().toLowerCase(),
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                toast.error(result.error);
            } else if (result?.ok) {
                toast.success("Login successful!");
                setTimeout(() => {
                    router.push("/form");
                }, 1500);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
            console.error("Login error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[90vh] flex flex-col items-center justify-center bg-gray-50 p-4">
            {/* Logo */}
            <div className="mb-6">
                <img
                    src={logoBG.src}
                    alt="Temploymentz Logo"
                    className="w-40 mx-auto"
                />
            </div>

            <h2 className="text-2xl font-semibold mb-6 text-center">Welcome back</h2>

            {/* Buttons */}
            <div className="w-full max-w-sm space-y-3">
                <button
                    onClick={() => signIn("google", { callbackUrl: "/form" })}
                    className="w-full flex items-center justify-center gap-2 border rounded-lg py-2 bg-white hover:bg-gray-50"
                >
                    <img src={google.src} className="w-10" /> Continue with Google
                </button>

                <div className="flex items-center my-4">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="px-3 text-gray-500">OR</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                <form onSubmit={handleLogin} className="space-y-3">
                    {/* Email Input */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Password Input */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2.5 text-gray-600 cursor-pointer"
                        >
                            {showPassword ? "👁️" : "👁️‍🗨️"}
                        </span>
                    </div>

                    <div className="flex items-center justify-end text-sm mt-2">
                        <Link href="/forgot-password" className="text-blue-600 hover:text-blue-700 font-medium">
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg mt-3 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Logging in..." : "Log in"}
                    </button>
                </form>

                <p className="text-xs text-center text-gray-500 mt-3">
                    This site is protected by reCAPTCHA and the Google Privacy Policy and
                    Terms of Service apply.
                </p>

                <p className="text-center text-sm mt-4">
                    Don't have an account?{' '}
                    <Link className="text-blue-600 font-semibold" href={"/signup"}>Sign Up</Link>
                </p>

            </div>
        </div>
    );
}