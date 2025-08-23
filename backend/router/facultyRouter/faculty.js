const express = require("express");
const router = express.Router();
const upload = require("../../middleware/imageuploadermiddleware/imageUploader"); 
const {
  createFaculty,
  getFaculty,
  updateFaculty,
  deleteFaculty,
} = require("../../controller/facultyController/faculty");

// Use single file upload (faculty image)
router.post("/add", upload.single("image"), createFaculty);
router.get("/get", getFaculty);
router.put("/:id", upload.single("image"), updateFaculty);
router.delete("/:id", deleteFaculty);

module.exports = router;
