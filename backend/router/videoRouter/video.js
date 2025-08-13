const express = require("express");
const router = express.Router();
const upload = require("../../middleware/imageuploadermiddleware/imageUploader");
const videoController = require("../../controller/videoController/video");

router.post("/upload", upload.single("video"), videoController.uploadVideo);
router.get("/all", videoController.getAllVideos);
router.delete("/delete/:id", videoController.deleteVideo);
router.put("/update/:id", upload.single("video"), videoController.updateVideo);

module.exports = router;
