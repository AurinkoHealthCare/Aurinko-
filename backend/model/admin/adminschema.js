const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },

    // OTP security fields
    otpHash: { type: String },
    otpExpiry: { type: Date },
    otpAttempts: { type: Number, default: 0 },
    otpLockUntil: { type: Date },

    // Track login attempts
    loginAttempts: { type: Number, default: 0 },
    loginLockUntil: { type: Date },

    // Track password change
    passwordChangedAt: { type: Date },
  },
  { timestamps: true }
);

// Always hash password
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);

  // Update passwordChangedAt when password changes
  if (!this.isNew) this.passwordChangedAt = new Date();
  next();
});

module.exports = mongoose.model("admins", adminSchema);
