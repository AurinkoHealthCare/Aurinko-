const express = require("express");
const router = express.Router();
const upload = require("../../middleware/imageuploadermiddleware/imageUploader");
const { uploadPdf, getPdfs, deletePdf, updatePdf } = require("../../controller/pdf/pdfController");

router.post("/upload", upload.single("pdf"), uploadPdf);
router.get("/:category", getPdfs);
router.delete("/:id", deletePdf);
router.put("/:id", upload.single("pdf"), updatePdf);

module.exports = router;
