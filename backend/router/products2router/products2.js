// routes/products/productsRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../../middleware/imageslidermiddleware/imageUploader");

const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct
} = require("../../controller/products2controller/product2");

// Upload fields: image + logo
const uploadFields = upload.fields([
  { name: "productImage", maxCount: 1 },
  { name: "productLogo", maxCount: 1 }
]);

// ➕ Create
router.post("/add2", uploadFields, addProduct);

// 📥 Get All / Filtered
router.get("/get2", getProducts);

// ✏️ Update
router.put("/update2/:id", uploadFields, updateProduct);

// ❌ Delete
router.delete("/delete2/:id", deleteProduct);

module.exports = router;
