const express = require("express");
const router = express.Router();
const upload = require("../../middleware/imageuploadermiddleware/imageUploader");
const otherImageController = require("../../controller/otherimages/otherimage");

router.post("/upload", upload.array("files", 10), otherImageController.uploadImages);
router.put("/update/:id", upload.single("file"), otherImageController.updateImage);
router.delete("/delete/:id", otherImageController.deleteImage);

router.get("/all", otherImageController.getAllImages);
router.get("/category/:category", otherImageController.getImagesByCategory);

module.exports = router;
