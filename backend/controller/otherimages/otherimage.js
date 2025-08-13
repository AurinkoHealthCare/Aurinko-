const OtherImage = require("../../model/otherImages/otherimage");
const path = require("path");
const fs = require("fs");

exports.uploadImages = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const uploadedImages = [];

    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const imageNameFromInput = Array.isArray(req.body.imageNames)
        ? req.body.imageNames[i]
        : req.body.imageNames;

      const relativePath = path.join("uploads", file.customPath, file.filename).replace(/\\/g, "/");
      const fullUrl = `${baseUrl}/${relativePath}`;

      const imageData = new OtherImage({
        no: req.body.no,
        url: fullUrl,
        category: req.body.category,
        lang: req.body.lang,
        imageName: imageNameFromInput || file.originalname,
      });

      await imageData.save();
      uploadedImages.push(imageData);
    }

    res.status(201).json({ message: "Files uploaded successfully", data: uploadedImages });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateImage = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const { id } = req.params;

    const imageDoc = await OtherImage.findById(id);
    if (!imageDoc) return res.status(404).json({ message: "File not found" });

    if (req.file) {
      const oldPath = path.join(__dirname, "../../", imageDoc.url.replace(baseUrl + "/", ""));
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

      const relativePath = path.join("uploads", req.file.customPath, req.file.customFilename).replace(/\\/g, "/");
      imageDoc.url = `${baseUrl}/${relativePath}`;
      imageDoc.imageName = req.file.customFilename;
    }

    if (req.body.no) imageDoc.no = req.body.no;
    if (req.body.category) imageDoc.category = req.body.category;
    if (req.body.lang) imageDoc.lang = req.body.lang;

    await imageDoc.save();

    res.json({ message: "File updated successfully", data: imageDoc });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const { id } = req.params;

    const imageDoc = await OtherImage.findById(id);
    if (!imageDoc) return res.status(404).json({ message: "File not found" });

    const filePath = path.join(__dirname, "../../", imageDoc.url.replace(baseUrl + "/", ""));
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await OtherImage.findByIdAndDelete(id);

    res.json({ message: "File deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 Get all images
exports.getAllImages = async (req, res) => {
  try {
    const images = await OtherImage.find().sort({ createdAt: -1 });
    res.json({ count: images.length, data: images });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getImagesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const images = await OtherImage.find({ category }).sort({ createdAt: -1 });
    if (!images.length) {
      return res.status(404).json({ message: "No images found for this category" });
    }
    res.json({ count: images.length, data: images });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};