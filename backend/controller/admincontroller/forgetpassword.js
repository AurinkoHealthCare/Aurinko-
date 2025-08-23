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

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // only admin receives OTP
      subject: "Aurinko Admin - Password Reset OTP",
      text: `OTP for ${admin.name}: ${otp}\nValid for 5 minutes.`,
    });

    res.json({ message: "OTP generated and sent to Admin email" });
  } catch (err) {
    console.error("OTP send error:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  try {
    const { name, otp, newPassword } = req.body;
    const admin = await Admin.findOne({ name });
    if (!admin) return res.status(400).json({ message: "Invalid request" });

    // OTP lock
    if (admin.otpLockUntil && admin.otpLockUntil > Date.now()) {
      return res.status(403).json({ message: "Too many invalid attempts. Try later." });
    }

    // OTP expiry
    if (!admin.otpHash || !admin.otpExpiry || admin.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired. Please request again." });
    }

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
    admin.password = newPassword; // schema pre-save will hash
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
