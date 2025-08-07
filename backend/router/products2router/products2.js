const express = require("express");
const router = express.Router();
const upload = require("../../middleware/imageuploadermiddleware/imageUploader");
const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../../controller/products2controller/product2");

// Accept image & PDF files
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

// ➕ Create Product
router.post("/add", uploadFields, addProduct);

// 📥 Get All Products (supports ?lang=fr)
router.get("/all", getProducts);

// 📥 Get Single Product by productId
router.get("/:id", getProductById);

// ✏️ Update Product
router.put("/update/:id", uploadFields, updateProduct);

// ❌ Delete Product
router.delete("/delete/:id", deleteProduct);

module.exports = router;
