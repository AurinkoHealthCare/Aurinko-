// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// // Base uploads folder
// const basePath = path.join(__dirname, "../../uploads");

// // Allowed mime types
// const allowedTypes = {
//   image: /jpeg|jpg|png|webp/,
//   video: /mp4|mkv|avi|mov/,
//   pdf: /pdf/,
// };

// // Helper: ensure folder exists
// const ensureDir = (folder) => {
//   const dir = path.join(basePath, folder);
//   if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir, { recursive: true });
//   }
//   return dir;
// };

// // Multer storage setup (dynamic by file type)
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     let folder = "others"; // fallback
//     if (allowedTypes.image.test(file.mimetype)) folder = "image";
//     else if (allowedTypes.video.test(file.mimetype)) folder = "video";
//     else if (allowedTypes.pdf.test(file.mimetype)) folder = "pdf";

//     const uploadPath = ensureDir(folder);
//     file.customPath = `${folder}`; // save folder info for controller
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
//     file.customFilename = uniqueName; // custom filename to use later
//     cb(null, uniqueName);
//   },
// });

// // File filter
// const fileFilter = (req, file, cb) => {
//   const isImage = allowedTypes.image.test(file.mimetype);
//   const isVideo = allowedTypes.video.test(file.mimetype);
//   const isPdf = allowedTypes.pdf.test(file.mimetype);

//   if (isImage || isVideo || isPdf) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only image, video, and PDF files are allowed!"));
//   }
// };

// // Multer instance
// const upload = multer({
//   storage,
//   limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
//   fileFilter,
// });

// module.exports = upload;


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
