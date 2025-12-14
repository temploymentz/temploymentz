import mongoose from "mongoose";

const PasswordResetSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        index: true,
    },
    resetToken: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
        index: { expires: 0 }, // Auto-delete after expiry
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.PasswordReset || mongoose.model("PasswordReset", PasswordResetSchema);
