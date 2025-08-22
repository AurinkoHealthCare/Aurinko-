const express = require("express");
const { uploadLogos, getLogos, updateLogo, deleteLogo } = require("../../controller/logoController/logo");
const router = express.Router();

const upload = require("../../middleware/imageuploadermiddleware/imageUploader");

router.post("/add", upload.array("images", 10), uploadLogos);
router.get("/logos", getLogos);
router.put("/:id", upload.single("image"), updateLogo);
router.delete("/:id", deleteLogo);

module.exports = router;
