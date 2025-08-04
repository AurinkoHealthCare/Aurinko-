const express = require("express");
const upload = require("../../middleware/imageuploadermiddleware/imageUploader");
const {
  uploadImages,
  updateImage,
  deleteImage,
  getAllImages,
} = require("../../controller/galleryController/gallery"); // ✅ सही path

const router = express.Router();

router.post("/multiple", upload.array("images", 6), uploadImages);
router.put("/update/:id", upload.single("image"), updateImage);
router.delete("/delete/:id", deleteImage);
router.get("/all", getAllImages);

module.exports = router;
