const express = require("express");
const router = express.Router();

const { loginUser, getCurrentUser, logoutUser } = require("../../controller/admincontroller/admincontroller");
const { verifyToken, verifyAdmin } = require("../../middleware/adminmiddleware/adminauthmiddle");
const { forgotPassword, resetPassword } = require("../../controller/admincontroller/forgetpassword");

// Auth
router.post("/login", loginUser);
router.get("/me", verifyToken, getCurrentUser);
router.post("/logout", logoutUser);

// Admin-only example
router.get("/dashboard", verifyToken, verifyAdmin, (req, res) => {
  res.status(200).json({ message: `Welcome Admin ${req.user.name}` });
});

// Password Recovery
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
