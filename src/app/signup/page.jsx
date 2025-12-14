"use client";
import React, { useState, useRef, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import logoBG from "@/assets/logoBG.png";
import Link from "next/link";
import google from "@/assets/google.png";
import { toast } from "react-toastify";

export default function SignupPage() {
    const router = useRouter();
    const [step, setStep] = useState("signup"); // "signup" or "otp"
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [timer, setTimer] = useState(300); // 5 minutes in seconds
    const timerInterval = useRef(null);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const otpInputs = useRef([]);

    // Timer effect for OTP expiry
    useEffect(() => {
        if (step === "otp") {
            timerInterval.current = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(timerInterval.current);
                        setStep("signup");
                        toast.error("OTP expired. Please signup again.");
                        return 300;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timerInterval.current);
    }, [step]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!formData.firstName.trim()) {
            toast.error("First name is required");
            return;
        }
        if (!formData.lastName.trim()) {
            toast.error("Last name is required");
            return;
        }
        if (!formData.email.trim()) {
            toast.error("Email is required");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            toast.error("Invalid email format");
            return;
        }
        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: formData.firstName.trim(),
                    lastName: formData.lastName.trim(),
                    email: formData.email.trim().toLowerCase(),
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.error || "Signup failed");
                return;
            }

            setEmail(data.email);
            setStep("otp");
            setTimer(300);
            toast.success("OTP sent to your email!");
        } catch (error) {
            toast.error("An error occurred. Please try again.");
            console.error("Signup error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleOtpChange = (index, value) => {
        if (value.length > 1) return;
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            otpInputs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            otpInputs.current[index - 1]?.focus();
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();

        const otpCode = otp.join("");
        if (otpCode.length !== 6) {
            toast.error("Please enter a valid 6-digit OTP");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("/api/auth/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    otp: otpCode,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.error || "OTP verification failed");
                return;
            }

            toast.success("Email verified successfully!");
            clearInterval(timerInterval.current);

            // Redirect to login
            setTimeout(() => {
                router.push("/login");
            }, 1500);
        } catch (error) {
            toast.error("An error occurred. Please try again.");
            console.error("OTP verification error:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const handleResendOtp = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: email,
                    password: formData.password,
                }),
            });

            if (response.ok) {
                setTimer(300);
                setOtp(["", "", "", "", "", ""]);
                toast.success("OTP resent to your email!");
            } else {
                toast.error("Failed to resend OTP");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
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

            {step === "signup" ? (
                <>
                    <h2 className="text-2xl font-semibold mb-6 text-center">Sign up</h2>

                    <div className="w-full max-w-sm space-y-3">
                        <button
                            onClick={() => signIn("google")}
                            className="w-full flex items-center justify-center gap-2 border rounded-lg py-2 bg-white hover:bg-gray-50"
                        >
                            <img src={google.src} className="w-10" /> Continue with Google
                        </button>

                        <div className="flex items-center my-4">
                            <div className="flex-1 h-px bg-gray-300"></div>
                            <span className="px-3 text-gray-500">OR</span>
                            <div className="flex-1 h-px bg-gray-300"></div>
                        </div>

                        <form onSubmit={handleSignup} className="space-y-3">
                            {/* Name Inputs */}
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="w-1/2 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="w-1/2 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Email */}
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            {/* Password */}
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

                            {/* Confirm Password */}
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Agreement */}
                            <label className="flex items-center gap-2 text-sm mt-2">
                                <input type="checkbox" required /> I agree to the Temploymentz{' '}
                                <a href="#" className="text-blue-600">Terms & Conditions</a>
                            </label>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white py-2 rounded-lg mt-3 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Creating account..." : "Sign Up"}
                            </button>

                            <p className="text-center text-sm mt-4">
                                Already have an account?{' '}
                                <Link href={"/login"} className="text-blue-600 font-semibold">Log in</Link>
                            </p>
                        </form>
                    </div>
                </>
            ) : (
                <>
                    <h2 className="text-2xl font-semibold mb-2 text-center">Verify Email</h2>
                    <p className="text-center text-gray-600 mb-6">
                        We've sent a 6-digit OTP to <span className="font-semibold">{email}</span>
                    </p>

                    <div className="w-full max-w-sm space-y-4">
                        <form onSubmit={handleVerifyOtp} className="space-y-4">
                            {/* OTP Input Boxes */}
                            <div className="flex gap-2 justify-center">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(ref) => (otpInputs.current[index] = ref)}
                                        type="text"
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                        className="w-12 h-12 border-2 rounded-lg text-center text-2xl font-bold focus:outline-none focus:border-blue-500"
                                    />
                                ))}
                            </div>

                            {/* Timer */}
                            <div className="text-center">
                                <p className="text-sm text-gray-600">
                                    OTP expires in:{' '}
                                    <span className={timer < 60 ? "text-red-600 font-bold" : "font-semibold"}>
                                        {formatTime(timer)}
                                    </span>
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || otp.join("").length !== 6}
                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Verifying..." : "Verify Email"}
                            </button>
                        </form>

                        {/* Resend OTP */}
                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                Didn't receive the OTP?{' '}
                                <button
                                    onClick={handleResendOtp}
                                    disabled={loading}
                                    className="text-blue-600 font-semibold hover:underline disabled:opacity-50"
                                >
                                    Resend
                                </button>
                            </p>
                        </div>

                        <button
                            onClick={() => {
                                setStep("signup");
                                setOtp(["", "", "", "", "", ""]);
                                clearInterval(timerInterval.current);
                            }}
                            className="w-full text-blue-600 py-2 rounded-lg border border-blue-600 hover:bg-blue-50"
                        >
                            Back to Sign Up
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}