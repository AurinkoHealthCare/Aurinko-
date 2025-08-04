const express = require("express");
const router = express.Router();
const upload = require("../../middleware/imageuploadermiddleware/imageUploader");
const { uploadImages, getImages, updateImage, deleteImage } = require("../../controller/imageslidercontroller/imageslider");

router.post("/upload", upload.array("files", 24), uploadImages);

router.get("/:category/:lang", getImages);

router.put("/:id", upload.single("file"), updateImage);

router.delete("/:id", deleteImage);

module.exports = router;
