const ImageSlider = require("../../model/otherImages/otherImagesSchema");
const fs = require("fs");
const path = require("path");

const deleteFileSafe = async (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    }
  } catch (err) {
    console.warn("File delete skipped:", err.message);
  }
};

// ✅ Upload Images
exports.uploadImages = async (req, res) => {
  try {
    const files = req.files || [];

    if (files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const existingCount = await ImageSlider.countDocuments();

    const languages = ["en", "ar", "fr", "es", "ko"];

    // Group files by language
    const langMap = {};
    for (const file of files) {
      const lang = file.fieldname; // Fieldname must match 'en', 'ar', etc.
      if (languages.includes(lang)) {
        langMap[lang] = {
          url: `${baseUrl}/uploads/${file.customPath || ""}${file.customPath ? "/" : ""}${file.customFilename || file.filename}`,
          public_id: `${file.customPath || ""}${file.customPath ? "/" : ""}${file.customFilename || file.filename}`,
        };
      }
    }

    const newImageDoc = new ImageSlider({
      name: req.body.name || "Untitled",
      no: existingCount + 1,
      images: langMap,
    });

    const saved = await newImageDoc.save();
    return res.status(201).json({ success: true, message: "Images uploaded successfully", data: saved });
  } catch (error) {
    console.error("Upload Error:", error);
    return res.status(500).json({ success: false, message: "Failed to upload images", error: error.message });
  }
};

// ✅ Get All Images
exports.getImages = async (req, res) => {
  try {
    const images = await ImageSlider.find().sort({ no: 1 });
    res.json({ images });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch images", error: error.message });
  }
};

// ✅ Get by Name
exports.getImageByName = async (req, res) => {
  try {
    const { name } = req.params;
    const image = await ImageSlider.findOne({ name });
    if (!image) return res.status(404).json({ message: "Image not found" });
    res.json(image);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch image", error: error.message });
  }
};

// ✅ Update Specific Language Image
exports.updateImage = async (req, res) => {
  try {
    const { id, lang } = req.params;
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    if (!["en", "ar", "fr", "es", "ko"].includes(lang)) {
      return res.status(400).json({ message: "Invalid language key" });
    }

    const imageDoc = await ImageSlider.findById(id);
    if (!imageDoc) return res.status(404).json({ message: "File not found" });

    // Delete old file
    const oldPublicId = imageDoc.images?.[lang]?.public_id;
    if (oldPublicId) {
      const oldPath = path.join(__dirname, "../uploads", oldPublicId);
      await deleteFileSafe(oldPath);
    }

    const file = req.file;
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    // Update language image
    imageDoc.images[lang] = {
      url: `${baseUrl}/uploads/${file.customPath}/${file.customFilename}`,
      public_id: `${file.customPath}/${file.customFilename}`,
    };

    await imageDoc.save();
    res.json({ message: "File updated successfully", data: imageDoc });
  } catch (error) {
    res.status(500).json({ message: "Failed to update file", error: error.message });
  }
};

// ✅ Delete Entire Image Document
exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const imageDoc = await ImageSlider.findById(id);
    if (!imageDoc) return res.status(404).json({ message: "File not found" });

    // Delete all language images
    const allLangImages = Object.values(imageDoc.images || {});
    for (const img of allLangImages) {
      const filePath = path.join(__dirname, "../uploads", img.public_id);
      await deleteFileSafe(filePath);
    }

    await ImageSlider.findByIdAndDelete(id);
    res.json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete file", error: error.message });
  }
};
