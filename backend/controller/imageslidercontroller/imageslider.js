const ImageSlider = require('../../model/imageslider/imagesliderschema');
const fs = require('fs');
const path = require('path');

// 🔧 Helper: Safe File Delete
const deleteFileSafe = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("Deleted:", filePath);
    } else {
      console.warn("File not found on disk:", filePath);
    }
  } catch (err) {
    console.error("File Delete Error:", err.message);
  }
};

// ➕ Upload multiple files
const uploadImages = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const uploadPromises = req.files.map(async (file, index) => {
      const no = await ImageSlider.countDocuments() + index + 1;
      return {
        no,
        url: `${baseUrl}/uploads/${file.customPath}/${file.customFilename}`,
        public_id: file.customFilename,
        folder: file.customPath || "image", // ✅ fallback
        type: file.mimetype.split("/")[0], // image | video | application
      };
    });

    const uploadedImages = await Promise.all(uploadPromises);
    const saved = await ImageSlider.insertMany(uploadedImages);

    res.status(201).json({ message: "Files uploaded successfully", data: saved });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Failed to upload files", error: error.message });
  }
};

// 🔍 Get all files
const getAllImages = async (req, res) => {
  try {
    const images = await ImageSlider.find().sort({ no: 1 });
    res.json({ count: images.length, images });
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Failed to get images", error: error.message });
  }
};

// ❌ Delete file
const deleteImage = async (req, res) => {
  try {
    const image = await ImageSlider.findOne({ no: req.params.no });
    if (!image) return res.status(404).json({ message: "File not found" });

    // ✅ fallback for old records
    const folder = image.folder || "image";
    const filePath = path.join(__dirname, "../../uploads", folder, image.public_id);
    deleteFileSafe(filePath);

    await ImageSlider.deleteOne({ no: req.params.no });

    res.json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Failed to delete file", error: error.message });
  }
};

// ✏️ Update file
const updateImage = async (req, res) => {
  try {
    const image = await ImageSlider.findOne({ no: req.params.no });
    if (!image) return res.status(404).json({ message: "File not found" });

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    let updatedData = {};

    if (req.file) {
      // ✅ fallback for old records
      const oldFolder = image.folder || "image";
      const oldFilePath = path.join(__dirname, "../../uploads", oldFolder, image.public_id);
      deleteFileSafe(oldFilePath);

      updatedData.url = `${baseUrl}/uploads/${req.file.customPath}/${req.file.customFilename}`;
      updatedData.public_id = req.file.customFilename;
      updatedData.folder = req.file.customPath || "image";
      updatedData.type = req.file.mimetype.split("/")[0];
    }

    if (req.body.no) {
      updatedData.no = req.body.no;
    }

    const updated = await ImageSlider.findOneAndUpdate(
      { no: req.params.no },
      updatedData,
      { new: true }
    );

    res.json({ message: "File updated successfully", data: updated });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Failed to update file", error: error.message });
  }
};

module.exports = {
  uploadImages,
  getAllImages,
  deleteImage,
  updateImage,
};
