const ImageSlider = require('../../model/imageslider/imagesliderschema');
const fs = require('fs');
const path = require('path');

// 🔧 Helper: Safe File Delete
const deleteFileSafe = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (err) {
    console.error("File Delete Error:", err.message);
  }
};

// ➕ Upload multiple images
const uploadImages = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const uploadPromises = req.files.map(async (file, index) => {
      const no = await ImageSlider.countDocuments() + index + 1;
      return {
        no,
        url: `${baseUrl}/uploads/${file.filename}`,
        public_id: file.filename,
      };
    });

    const uploadedImages = await Promise.all(uploadPromises);
    const saved = await ImageSlider.insertMany(uploadedImages);
    res.status(201).json({ message: "Images uploaded successfully", data: saved });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Failed to upload images", error: error.message });
  }
};

// 🔍 Get all images
const getAllImages = async (req, res) => {
  try {
    const images = await ImageSlider.find().sort({ no: 1 });
    res.json({ count: images.length, images });
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Failed to get images", error: error.message });
  }
};

// ❌ Delete image
const deleteImage = async (req, res) => {
  try {
    const image = await ImageSlider.findOne({ no: req.params.no });
    if (!image) return res.status(404).json({ message: "Image not found" });

    // Delete file safely
    const filePath = path.join(__dirname, "../../uploads", image.public_id);
    deleteFileSafe(filePath);

    // Delete from MongoDB
    await ImageSlider.deleteOne({ no: req.params.no });

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Failed to delete image", error: error.message });
  }
};

// ✏️ Update image
const updateImage = async (req, res) => {
  try {
    const image = await ImageSlider.findOne({ no: req.params.no });
    if (!image) return res.status(404).json({ message: "Image not found" });

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    let updatedData = {};

    if (req.file) {
      // Delete old file safely
      const oldFilePath = path.join(__dirname, "../../uploads", image.public_id);
      deleteFileSafe(oldFilePath);

      updatedData.url = `${baseUrl}/uploads/${req.file.filename}`;
      updatedData.public_id = req.file.filename;
    }

    if (req.body.no) {
      updatedData.no = req.body.no;
    }

    const updated = await ImageSlider.findOneAndUpdate(
      { no: req.params.no },
      updatedData,
      { new: true }
    );

    res.json({ message: "Image updated successfully", data: updated });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Failed to update image", error: error.message });
  }
};

module.exports = {
  uploadImages,
  getAllImages,
  deleteImage,
  updateImage,
};
