const jwt = require("jsonwebtoken");
const Admin = require("../../model/admin/adminschema");

const verifyToken = async (req, res, next) => {
  try {
    // Extract token from cookie or Authorization header
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch admin only once
    const admin = await Admin.findById(decoded.userId).select("+passwordChangedAt");
    if (!admin) return res.status(401).json({ message: "Unauthorized" });

    // Password change check
    if (admin.passwordChangedAt && decoded.iat * 1000 < admin.passwordChangedAt.getTime()) {
      return res.status(401).json({ message: "Password changed. Please login again." });
    }

    req.user = { id: admin._id, name: admin.name, role: admin.role };
    next();

  } catch (err) {
    console.error("JWT verification error:", err);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

const verifyAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

module.exports = { verifyToken, verifyAdmin };
