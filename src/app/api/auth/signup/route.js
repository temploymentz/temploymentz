import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";
import OTP from "@/models/OTP";
import bcrypt from "bcrypt";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API);

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOTPEmail = async (email, otp) => {
  try {
    const response = await resend.emails.send({
      from: "no-reply@temploymentz.com", // Use Resend's default sender first for testing
      to: email,
      subject: "Your Temploymentz OTP Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Email Verification</h2>
          <p>Your OTP (One-Time Password) for Temploymentz registration is:</p>
          <div style="background-color: #f0f0f0; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <h1 style="color: #007bff; letter-spacing: 5px; margin: 0;">${otp}</h1>
          </div>
          <p>This OTP will expire in <strong>5 minutes</strong>.</p>
          <p style="color: #666; font-size: 14px;">If you didn't request this code, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">© 2025 Temploymentz. All rights reserved.</p>
        </div>
      `,
    });
    
    console.log("✅ Email sent successfully:", response);
    return true;
  } catch (error) {
    console.error("❌ Error sending OTP email:", error);
    console.error("Error details:", error.message);
    return false;
  }
};

export async function POST(req) {
  try {
    console.log("📝 Signup request received");
    await connectDB();
    const { firstName, lastName, email, password } = await req.json();

    console.log("📋 Form data received:", { firstName, lastName, email });

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return Response.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return Response.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return Response.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔐 Password hashed");

    // Create user with isVerified as false
    const newUser = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      isVerified: false,
    });

    await newUser.save();
    console.log("✅ User created in database:", newUser._id);

    // Generate and send OTP
    const otp = generateOTP();
    console.log("🔢 OTP generated:", otp);
    
    const otpRecord = new OTP({
      email: email.toLowerCase(),
      otp: otp,
    });

    await otpRecord.save();
    console.log("💾 OTP saved to database");

    // Send OTP via email
    console.log("📧 Attempting to send OTP email to:", email);
    const emailSent = await sendOTPEmail(email, otp);

    if (!emailSent) {
      console.error("❌ Email sending failed");
      return Response.json(
        { error: "Failed to send OTP. Please check the logs." },
        { status: 500 }
      );
    }

    console.log("✅ OTP email sent successfully");
    return Response.json(
      {
        message: "User created successfully. OTP sent to your email.",
        email: email,
        userId: newUser._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Signup error:", error);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    return Response.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
