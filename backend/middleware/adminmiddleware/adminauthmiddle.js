const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.userId);
    if (!admin) return res.status(401).json({ message: "Unauthorized" });

    // Check password change
    if (admin.passwordChangedAt && decoded.iat * 1000 < admin.passwordChangedAt.getTime()) {
      return res.status(401).json({ message: "Password changed. Please login again." });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token." });
  }
};


const verifyAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") return res.status(403).json({ message: "Access denied. Admins only." });
  next();
};

module.exports = { verifyToken, verifyAdmin };
