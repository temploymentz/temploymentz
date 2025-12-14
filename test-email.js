#!/usr/bin/env node

/**
 * OTP Email Troubleshooting Guide
 * Run this to test your email setup
 */

import { Resend } from "resend";

async function testEmailSending() {
  console.log("\n🧪 Testing Resend Email Configuration...\n");

  // Check environment variable
  if (!process.env.RESEND_API) {
    console.error("❌ RESEND_API not found in .env file");
    console.log("   Add this to your .env:");
    console.log("   RESEND_API=re_xxxxxxxxxxxxxxxxxxxxxxxx\n");
    process.exit(1);
  }

  console.log("✅ RESEND_API found in environment\n");

  const resend = new Resend(process.env.RESEND_API);

  try {
    console.log("📧 Sending test email...\n");

    const response = await resend.emails.send({
      from: "no-reply@temploymentz.com",
      to: "vanshrajput099@gmail.com", // Resend's test email
      subject: "🧪 Temploymentz OTP Test Email",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">✅ Test Email Success!</h2>
          <p>This is a test email from your Temploymentz application.</p>
          <div style="background-color: #f0f0f0; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <h1 style="color: #007bff; letter-spacing: 5px; margin: 0;">123456</h1>
          </div>
          <p>If you received this email, your Resend API is working correctly!</p>
          <p style="color: #666; font-size: 14px;">Test OTP: <strong>123456</strong></p>
        </div>
      `,
    });

    console.log("✅ Test email sent successfully!\n");
    console.log("Response:", response);
    console.log("\n✅ Your Resend API is working!\n");

    console.log("🔧 TROUBLESHOOTING TIPS:\n");
    console.log("1. For production, change 'from' email to your verified domain");
    console.log("2. Check your Resend dashboard: https://resend.com/emails");
    console.log("3. Make sure email is verified in Resend account");
    console.log("4. Check spam folder if not receiving emails\n");

  } catch (error) {
    console.error("❌ Error sending test email:\n");
    console.error("Error:", error.message);
    console.error("\n🔧 SOLUTIONS:\n");
    console.error("1. Verify RESEND_API key is correct in .env");
    console.error("2. Check Resend dashboard for errors");
    console.error("3. Ensure your account has proper permissions");
    console.error("4. Try regenerating the API key from Resend dashboard\n");
    process.exit(1);
  }
}

testEmailSending();
