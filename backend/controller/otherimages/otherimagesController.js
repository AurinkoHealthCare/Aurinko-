const ImageSlider = require("../../model/otherImages/otherImagesSchema");
const fs = require("fs");
const path = require("path");

// Helper: delete file safely
const deleteFileSafe = async (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    }
  } catch (err) {
    console.warn("File delete skipped:", err.message);
  }
};

// Upload Images
exports.uploadImages = async (req, res) => {
  try {
    let files = [];
    if (req.files && req.files.length > 0) {
      files = req.files;
    } else if (req.file) {
      files = [req.file];
    }

    if (files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const existingCount = await ImageSlider.countDocuments();

    const uploadDocs = files.map((file, index) => ({
      name: req.body.name || file.originalname,
      no: existingCount + index + 1,
      url: `${baseUrl}/uploads/${file.customPath || ""}${file.customPath ? "/" : ""}${file.customFilename || file.filename}`,
      public_id: `${file.customPath || ""}${file.customPath ? "/" : ""}${file.customFilename || file.filename}`,
    }));

    const saved = await ImageSlider.insertMany(uploadDocs);
    return res.status(201).json({ success: true, message: "Files uploaded successfully", data: saved });
  } catch (error) {
    console.error("Upload Error:", error);
    return res.status(500).json({ success: false, message: "Failed to upload files", error: error.message });
  }
};


// Get All Images
exports.getImages = async (req, res) => {
  try {
    const images = await ImageSlider.find().sort({ no: 1 });
    res.json({ images });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch images", error: error.message });
  }
};

// Get by Name
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

// Update Image
exports.updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const imageDoc = await ImageSlider.findById(id);

    if (!imageDoc) return res.status(404).json({ message: "File not found" });

    // Delete old file
    const oldPath = path.join(__dirname, "../uploads", imageDoc.public_id);
    await deleteFileSafe(oldPath);

    const file = req.file;
    imageDoc.url = `${baseUrl}/uploads/${file.customPath}/${file.customFilename}`;
    imageDoc.name = file.originalname;
    imageDoc.public_id = `${file.customPath}/${file.customFilename}`;
    await imageDoc.save();

    res.json({ message: "File updated successfully", data: imageDoc });
  } catch (error) {
    res.status(500).json({ message: "Failed to update file", error: error.message });
  }
};

// Delete Image
exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const imageDoc = await ImageSlider.findById(id);
    if (!imageDoc) return res.status(404).json({ message: "File not found" });

    const filePath = path.join(__dirname, "../uploads", imageDoc.public_id);
    await deleteFileSafe(filePath);

    await ImageSlider.findByIdAndDelete(id);
    res.json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete file", error: error.message });
  }
};
