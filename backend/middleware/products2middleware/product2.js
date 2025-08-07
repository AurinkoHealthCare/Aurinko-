const uploadFields = (req, res, next) => {
  upload.fields([
    { name: "productImage", maxCount: 1 },
    { name: "productLogo", maxCount: 1 },
    { name: "report", maxCount: 1 },
    { name: "brochure", maxCount: 1 },
  ])(req, res, function (err) {
    if (err && err.code === "LIMIT_UNEXPECTED_FILE") {
      console.error("🔥 Unexpected field:", err.field);
      return res.status(400).json({ message: "Unexpected field: " + err.field });
    }
    next();
  });
};
