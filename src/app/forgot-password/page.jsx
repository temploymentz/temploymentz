"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "@/app/components/Button";
import { ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please enter your email");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitted(true);
                toast.success("Reset link sent to your email");
                console.log("📧 Reset email sent");
            } else {
                toast.error(data.error || "Failed to send reset email");
                console.error("❌ Error:", data.error);
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Back Button */}
                <Link href="/login" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Login
                </Link>

                {/* Card */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-blue-600 mb-2">Forgot Password?</h1>
                    <p className="text-gray-600 text-sm mb-6">
                        No worries! Enter your email and we'll send you a link to reset your password.
                    </p>

                    {submitted ? (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                            <h2 className="text-green-700 font-semibold mb-2">Check Your Email!</h2>
                            <p className="text-green-600 text-sm mb-4">
                                We've sent a password reset link to <strong>{email}</strong>
                            </p>
                            <p className="text-gray-600 text-xs mb-4">
                                The link expires in 10 minutes. If you don't see the email, check your spam folder.
                            </p>
                            <Link href="/login">
                                <Button className="w-full">Back to Login</Button>
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full"
                            >
                                {loading ? "Sending..." : "Send Reset Link"}
                            </Button>
                        </form>
                    )}

                    {/* Signup Link */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600 text-sm">
                            Don't have an account?{" "}
                            <Link href="/signup" className="text-blue-600 font-semibold hover:text-blue-700">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
