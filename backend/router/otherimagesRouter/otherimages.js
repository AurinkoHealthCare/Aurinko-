const express = require("express");
const router = express.Router();
const upload = require("../../middleware/imageuploadermiddleware/imageUploader"); // aapka multer wala file
const {
  uploadImages,
  getImages,
  getImageByName,
  updateImage,
  deleteImage,
} = require("../../controller/otherimages/otherimagesController");

// Upload multiple files
router.post("/upload", upload.any(), uploadImages);


// Get all files
router.get("/", getImages);

// Get file by name
router.get("/:name", getImageByName);

// Update file
router.put("/:id", upload.single("file"), updateImage);

// Delete file
router.delete("/:id", deleteImage);

module.exports = router;
