const express = require("express");
const router = express.Router();
const upload = require("../../middleware/imageslidermiddleware/imageUploader");

const {
  addProduct,
  getProducts,
  getProductById, // ✅ नया controller जोड़ा
  updateProduct,
  deleteProduct
} = require("../../controller/products/productscontroller");

// ➕ Add Product
router.post("/add", upload.single("image"), addProduct);

// 📌 Get All Products (with ?lang support)
router.get("/get", getProducts);

// 📌 Get Single Product by productId
router.get("/get/:id", getProductById);

// ✏️ Update Product by productId
router.put("/update/:id", upload.single("image"), updateProduct);

// ❌ Delete Product by productId
router.delete("/delete/:id", deleteProduct);

module.exports = router;
