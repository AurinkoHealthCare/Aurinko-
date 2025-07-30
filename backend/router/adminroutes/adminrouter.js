const express = require("express");
const router = express.Router();
const {loginUser,getCurrentUser,logoutUser} = require("../../controller/admincontroller/admincontroller");
const {verifyToken,verifyAdmin} = require("../../middleware/adminmiddleware/adminauthmiddle");

router.post("/login", loginUser);

router.get("/dashboard", verifyToken, verifyAdmin, (req, res) => {
  res.status(200).json({ message: `Welcome Admin ${req.user.name}` });
});

router.get("/me", verifyToken, getCurrentUser);

router.post("/logout", logoutUser);

module.exports = router;
