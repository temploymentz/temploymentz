import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";
import PasswordReset from "@/models/PasswordReset";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API);

export async function POST(request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return Response.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        await connectDB();

        // Check if user exists
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            // Don't reveal if email exists (security best practice)
            return Response.json(
                { message: "If email exists, reset link will be sent" },
                { status: 200 }
            );
        }

        // Generate reset token (6-digit code)
        const resetToken = Math.floor(100000 + Math.random() * 900000).toString();

        // Save reset token with 10-minute expiry
        await PasswordReset.create({
            email: email.toLowerCase(),
            resetToken,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
        });

        // Send reset email
        const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}&email=${encodeURIComponent(email.toLowerCase())}`;

        await resend.emails.send({
            from: "no-reply@temploymentz.com",
            to: email,
            subject: "Password Reset Request - Temploymentz",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #007bff; margin-bottom: 20px;">Password Reset Request</h2>
                    <p style="margin-bottom: 20px;">Hi ${user.firstName},</p>
                    <p style="margin-bottom: 20px;">We received a request to reset your password. Click the link below to proceed:</p>
                    
                    <div style="margin: 30px 0;">
                        <a href="${resetLink}" style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                            Reset Password
                        </a>
                    </div>
                    
                    <p style="margin-bottom: 20px;">Or use this code: <strong>${resetToken}</strong></p>
                    
                    <p style="color: #666; font-size: 14px; margin-bottom: 10px;">This link expires in 10 minutes.</p>
                    <p style="color: #666; font-size: 14px;">If you didn't request this, please ignore this email.</p>
                    
                    <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
                    <p style="color: #999; font-size: 12px; text-align: center;">© Temploymentz. All rights reserved.</p>
                </div>
            `,
        });

        console.log("📧 Password reset email sent to:", email);

        return Response.json(
            { message: "If email exists, reset link will be sent" },
            { status: 200 }
        );
    } catch (error) {
        console.error("❌ Forgot password error:", error);
        return Response.json(
            { error: error.message || "Failed to process password reset" },
            { status: 500 }
        );
    }
}
