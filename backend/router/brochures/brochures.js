const express = require("express");
const router = express.Router();
const upload = require("../../middleware/imageuploadermiddleware/imageUploader");
const imageController = require("../../controller/brochures/brochures");

router.post("/all", upload.any(), imageController.uploadFiles);

router.get("/all", imageController.getImages);

router.delete("/:id", imageController.deleteImage);

router.put("/:id", upload.any(), imageController.updateImage);

module.exports = router;
