const express = require("express");
const router = express.Router();
const upload = require("../../middleware/imageuploadermiddleware/imageUploader");
const { createBlog, getBlogs, updateBlog, deleteBlog } = require("../../controller/blogController/blog");

router.post("/add", upload.single("image"), createBlog);
router.get("/get", getBlogs);
router.put("/:id", upload.single("image"), updateBlog);
router.delete("/:id", deleteBlog);

module.exports = router;
