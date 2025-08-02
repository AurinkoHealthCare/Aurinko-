// routes/imageslider.js
const express = require('express');
const router = express.Router();
const upload = require('../../middleware/imageuploadermiddleware/imageUploader');
const {
  uploadImages,
  getAllImages,
  deleteImage,
  updateImage
} = require('../../controller/imageslidercontroller/imageslider');

router.post('/upload', upload.array('images', 10), uploadImages);
router.get('/all', getAllImages);
router.delete('/:no', deleteImage);
router.put('/:no', upload.single('image'), updateImage); // for single image update

module.exports = router;
 