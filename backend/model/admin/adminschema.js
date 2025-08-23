const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },  // unique identifier
    password: { type: String, required: true },
    role: { type: String, required: true },

    // OTP security fields
    otpHash: { type: String },
    otpExpiry: { type: Date },
    otpAttempts: { type: Number, default: 0 },
    otpLockUntil: { type: Date },
  },
  { timestamps: true }
);

// Always store hashed password
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("admins", adminSchema);
