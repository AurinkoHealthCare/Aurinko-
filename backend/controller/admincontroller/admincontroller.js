const Admin = require('../../model/admin/adminschema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (admin) => {
  return jwt.sign(
    {
      userId: admin._id,
      name: admin.name,
      role: admin.role,
    },
    process.env.JWT_SECRET,
    
    { expiresIn: '1d' }
  );
};

const loginUser = async (req, res) => {
  const { name, role, password } = req.body;

  if (!name || !role || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }``

  const admin = await Admin.findOne({ name, role });
  if (!admin) return res.status(404).json({ message: 'Admin not found' });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(401).json({ message: 'Wrong password' });

  const token = createToken(admin);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "Lax",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
    // maxAge: 10 * 1000,
  });

  res.status(200).json({
    message: 'Login successful',
    user: {
      name: admin.name,
      role: admin.role,
    },
  });
};

const getCurrentUser = (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      name: user.name,
      role: user.role
    });
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax",
    secure: true,
  });
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
  loginUser,
  getCurrentUser,
  logoutUser
};
