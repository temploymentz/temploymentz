import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";
import OTP from "@/models/OTP";

export async function POST(req) {
  try {
    await connectDB();
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return Response.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    // Find OTP record
    const otpRecord = await OTP.findOne({
      email: email.toLowerCase(),
      otp: otp.trim(),
    });

    if (!otpRecord) {
      return Response.json(
        { error: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    // Check if OTP is expired (TTL should handle this, but let's be sure)
    const createdTime = new Date(otpRecord.createdAt);
    const currentTime = new Date();
    const differenceInSeconds = (currentTime - createdTime) / 1000;

    if (differenceInSeconds > 300) {
      // 5 minutes
      await OTP.deleteOne({ _id: otpRecord._id });
      return Response.json(
        { error: "OTP has expired" },
        { status: 400 }
      );
    }

    // Mark user as verified
    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { isVerified: true },
      { new: true }
    );

    if (!user) {
      return Response.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Delete OTP record after successful verification
    await OTP.deleteOne({ _id: otpRecord._id });

    return Response.json(
      {
        message: "Email verified successfully",
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("OTP verification error:", error);
    return Response.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
