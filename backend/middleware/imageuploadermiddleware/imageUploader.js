const multer = require("multer");
const path = require("path");
const fs = require("fs");

const basePath = path.join(__dirname, "../../uploads");

const allowedTypes = {
  image: /jpeg|jpg|png|webp/,
  video: /mp4|mkv|avi|mov/,
  pdf: /pdf/,
};

const ensureDir = (folder) => {
  const dir = path.join(basePath, folder);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "others";
    if (allowedTypes.image.test(file.mimetype)) folder = "image";
    else if (allowedTypes.video.test(file.mimetype)) folder = "video";
    else if (allowedTypes.pdf.test(file.mimetype)) folder = "pdf";

    const uploadPath = ensureDir(folder);
    file.customPath = folder;
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    file.customFilename = uniqueName;
    cb(null, uniqueName);
  },
});

// File filter with size check
const fileFilter = (req, file, cb) => {
  const isImage = allowedTypes.image.test(file.mimetype);
  const isVideo = allowedTypes.video.test(file.mimetype);
  const isPdf = allowedTypes.pdf.test(file.mimetype);

  if (!isImage && !isVideo && !isPdf) {
    return cb(new Error("Only image, video, and PDF files are allowed!"));
  }

  // file size check
  if (isImage && file.size > 2 * 1024 * 1024) { // 2MB
    return cb(new Error("Image size should be max 2MB!"));
  }
  if (isVideo && file.size > 30 * 1024 * 1024) { // 30MB
    return cb(new Error("Video size should be max 30MB!"));
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
