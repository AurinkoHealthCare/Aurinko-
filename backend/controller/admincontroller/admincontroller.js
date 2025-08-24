const Admin = require("../../model/admin/adminschema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// JWT token generate
const createToken = (admin) => {
  return jwt.sign(
    { userId: admin._id, name: admin.name, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

const loginUser = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password)
    return res.status(400).json({ message: "All fields are required" });

  const admin = await Admin.findOne({ name });
  if (!admin) return res.status(404).json({ message: "Admin not found" });

  // Check login lock
  if (admin.loginLockUntil && admin.loginLockUntil > Date.now()) {
    const waitSec = Math.ceil((admin.loginLockUntil - Date.now()) / 1000);
    return res
      .status(403)
      .json({ message: `Too many failed attempts. Try again in ${waitSec} seconds.` });
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    // Atomic update for login attempts
    const update = { $inc: { loginAttempts: 1 } };
    if ((admin.loginAttempts || 0) + 1 >= 3) {
      update.$set = { loginLockUntil: Date.now() + 60 * 1000 }; // 1 min lock
      update.$inc.loginAttempts = -(admin.loginAttempts || 0); // reset attempts
    }

    await Admin.updateOne({ _id: admin._id }, update);

    return res.status(401).json({ message: "Wrong password" });
  }

  // Successful login → reset attempts atomically
  await Admin.updateOne(
    { _id: admin._id },
    { $set: { loginAttempts: 0, loginLockUntil: null } }
  );

  const token = createToken(admin);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "Login successful",
    user: { name: admin.name, role: admin.role },
  });
};

const getCurrentUser = (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ name: user.name, role: user.role });
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { loginUser, getCurrentUser, logoutUser };
