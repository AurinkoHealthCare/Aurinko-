// controllers/uploadController.js
const fs = require("fs");
const ImageSlider = require("../../model/gallery/gallery");

// Upload Multiple Images
exports.uploadImages = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const uploadPromises = req.files.map(async (file, index) => {
      const no = (await ImageSlider.countDocuments()) + index + 1;
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
    res.status(500).json({ message: "Failed to upload images", error: error.message });
  }
};

// Update Image by ID
exports.updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const oldImage = await ImageSlider.findById(id);

    if (!oldImage) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Delete old file
    const oldPath = `uploads/${oldImage.public_id}`;
    if (fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
    }

    // Save new file
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const updatedData = {
      url: `${baseUrl}/uploads/${req.file.filename}`,
      public_id: req.file.filename,
    };

    const updatedImage = await ImageSlider.findByIdAndUpdate(id, updatedData, { new: true });

    res.json({ message: "Image updated successfully", data: updatedImage });
  } catch (error) {
    res.status(500).json({ message: "Failed to update image", error: error.message });
  }
};

// Delete Image by ID
exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await ImageSlider.findById(id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Delete file from uploads
    const filePath = `uploads/${image.public_id}`;
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Remove from DB
    await ImageSlider.findByIdAndDelete(id);

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete image", error: error.message });
  }
};

// Get All Images
exports.getAllImages = async (req, res) => {
  try {
    const images = await ImageSlider.find();
    res.json({ data: images });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch images", error: error.message });
  }
};
