import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";
import PasswordReset from "@/models/PasswordReset";
import bcrypt from "bcrypt";

export async function POST(request) {
    try {
        const { email, resetToken, newPassword, confirmPassword } = await request.json();

        // Validate inputs
        if (!email || !resetToken || !newPassword || !confirmPassword) {
            return Response.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        if (newPassword !== confirmPassword) {
            return Response.json(
                { error: "Passwords do not match" },
                { status: 400 }
            );
        }

        if (newPassword.length < 6) {
            return Response.json(
                { error: "Password must be at least 6 characters" },
                { status: 400 }
            );
        }

        await connectDB();

        // Find and verify reset token
        const resetRecord = await PasswordReset.findOne({
            email: email.toLowerCase(),
            resetToken,
        });

        if (!resetRecord) {
            return Response.json(
                { error: "Invalid or expired reset token" },
                { status: 400 }
            );
        }

        // Check if token expired
        if (new Date() > resetRecord.expiresAt) {
            await PasswordReset.deleteOne({ _id: resetRecord._id });
            return Response.json(
                { error: "Reset token has expired" },
                { status: 400 }
            );
        }

        // Find user and update password
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return Response.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        // Delete used reset token
        await PasswordReset.deleteOne({ _id: resetRecord._id });

        console.log("✅ Password reset successful for:", email);

        return Response.json(
            { message: "Password reset successful" },
            { status: 200 }
        );
    } catch (error) {
        console.error("❌ Reset password error:", error);
        return Response.json(
            { error: error.message || "Failed to reset password" },
            { status: 500 }
        );
    }
}
