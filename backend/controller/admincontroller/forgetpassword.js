const Admin = require("../../model/admin/adminschema");
const transporter = require("../../utils/auth/mailer");
const { generateOtp, hashOtp, constantTimeEqual } = require("../../utils/auth/otp");

// Forgot Password - generate OTP
const forgotPassword = async (req, res) => {
  try {
    const { name } = req.body;
    const admin = await Admin.findOne({ name });
    if (!admin) return res.status(400).json({ message: "Admin not found" });

    const otp = generateOtp();
    admin.otpHash = hashOtp(otp);
    admin.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 min
    admin.otpAttempts = 0;
    admin.otpLockUntil = undefined;
    await admin.save();

    // Send mail in background (non-blocking)
    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // only admin receives OTP
      subject: "Aurinko Admin - Password Reset OTP",
      text: `OTP for ${admin.name}: ${otp}\nValid for 5 minutes.`,
    }).catch(err => console.error("Failed to send OTP mail:", err));

    // Immediate response to client
    res.json({ message: "OTP generated. Check your email shortly." });

  } catch (err) {
    console.error("OTP generation error:", err);
    res.status(500).json({ message: "Failed to generate OTP" });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  try {
    const { name, otp, newPassword } = req.body;
    const admin = await Admin.findOne({ name });
    if (!admin) return res.status(400).json({ message: "Invalid request" });

    // OTP lock & expiry
    if (admin.otpLockUntil && admin.otpLockUntil > Date.now())
      return res.status(403).json({ message: "Too many invalid attempts. Try later." });
    if (!admin.otpHash || !admin.otpExpiry || admin.otpExpiry < Date.now())
      return res.status(400).json({ message: "OTP expired. Please request again." });

    // Validate OTP
    if (!constantTimeEqual(hashOtp(otp), admin.otpHash)) {
      admin.otpAttempts = (admin.otpAttempts || 0) + 1;
      if (admin.otpAttempts >= 3) {
        admin.otpLockUntil = Date.now() + 5 * 60 * 1000;
        admin.otpAttempts = 0;
      }
      await admin.save();
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Reset password
    admin.password = newPassword; // schema pre-save hashes
    admin.otpHash = undefined;
    admin.otpExpiry = undefined;
    admin.otpAttempts = 0;
    admin.otpLockUntil = undefined;
    await admin.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { forgotPassword, resetPassword };
