// const multer = require("multer");
// const path = require("path");

// // Storage configuration
// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => {
//     const uniqueName = Date.now() + "-" + file.originalname;
//     cb(null, uniqueName);
//   },
// });

// // File filter (optional - only images)
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|webp/;
//   const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = allowedTypes.test(file.mimetype);
//   if (extname && mimetype) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only image files are allowed!"));
//   }
// };

// // Multer instance
// const upload = multer({
//   storage,
//   limits: { fileSize: 1 * 1024 * 1024 }, // 1 MB
//   fileFilter,
// });

// module.exports = upload;


const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Base uploads folder
const basePath = path.join(__dirname, "../../uploads");

// Allowed mime types
const allowedTypes = {
  image: /jpeg|jpg|png|webp/,
  video: /mp4|mkv|avi|mov/,
  pdf: /pdf/,
};

// Helper: ensure folder exists
const ensureDir = (folder) => {
  const dir = path.join(basePath, folder);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
};

// Multer storage setup (dynamic by file type)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "others"; // fallback
    if (allowedTypes.image.test(file.mimetype)) folder = "image";
    else if (allowedTypes.video.test(file.mimetype)) folder = "video";
    else if (allowedTypes.pdf.test(file.mimetype)) folder = "pdf";

    const uploadPath = ensureDir(folder);
    file.customPath = `${folder}`; // save folder info for controller
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    file.customFilename = uniqueName; // custom filename to use later
    cb(null, uniqueName);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const isImage = allowedTypes.image.test(file.mimetype);
  const isVideo = allowedTypes.video.test(file.mimetype);
  const isPdf = allowedTypes.pdf.test(file.mimetype);

  if (isImage || isVideo || isPdf) {
    cb(null, true);
  } else {
    cb(new Error("Only image, video, and PDF files are allowed!"));
  }
};

// Multer instance
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter,
});

module.exports = upload;
