const express = require("express");
const router = express.Router();
const upload = require("../../middleware/imageslidermiddleware/imageUploader");
const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct
} = require("../../controller/products/productscontroller");

router.post("/add", upload.single("image"), addProduct);
router.get("/get", getProducts);
router.put("/update/:id", upload.single("image"), updateProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
