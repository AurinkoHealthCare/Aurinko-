const express = require("express");
const upload = require("../../middleware/imageuploadermiddleware/imageUploader");
const {
  uploadImages,
  updateImage,
  deleteImage,
  getAllImages,
  getImagesByCategory,
  getAllCategories, // ✅ category wise fetch
} = require("../../controller/galleryController/gallery");

const router = express.Router();

router.post("/multiple", upload.array("images", 6), uploadImages);

router.put("/update/:id", upload.single("image"), updateImage);

router.delete("/delete/:id", deleteImage);

router.get("/all", getAllImages);

router.get("/category/:category", getImagesByCategory);

router.get("/categories", getAllCategories);


module.exports = router;
