const ImageSlider = require("../../model/brochures/brochures");
const path = require("path");
const fs = require("fs");

exports.uploadFiles = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const files = req.files || [];
    const names = Array.isArray(req.body.names) ? req.body.names : [req.body.names];
    const categories = Array.isArray(req.body.categories) ? req.body.categories : [req.body.categories];

    if (files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const uploadPromises = files.map(async (file, index) => {
      const no = (await ImageSlider.countDocuments()) + index + 1;
      return {
        no,
        name: names[index] || file.originalname,
        category: categories[index] || "Uncategorized",
        url: `${baseUrl}/uploads/${file.customPath}/${file.customFilename}`,
        public_id: `${file.customPath}/${file.customFilename}`,
      };
    });

    const uploadedFiles = await Promise.all(uploadPromises);
    const saved = await ImageSlider.insertMany(uploadedFiles);

    res.status(201).json({
      message: files.length > 1 ? "Multiple files uploaded" : "Single file uploaded",
      data: saved
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Failed to upload files", error: error.message });
  }
};

exports.getImages = async (req, res) => {
  try {
    const images = await ImageSlider.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Failed to fetch images", error: error.message });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const image = await ImageSlider.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });

    const filePath = path.join(__dirname, "../../uploads", image.public_id);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await ImageSlider.findByIdAndDelete(req.params.id);
    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Failed to delete image", error: error.message });
  }
};

exports.updateImage = async (req, res) => {
  try {
    const image = await ImageSlider.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });

    if (req.files && req.files.length > 0) {
      const oldPath = path.join(__dirname, "../../uploads", image.public_id);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
      const file = req.files[0];
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      image.url = `${baseUrl}/uploads/${file.customPath}/${file.customFilename}`;
      image.public_id = `${file.customPath}/${file.customFilename}`;
    }

    if (req.body.name) image.name = req.body.name;
    if (req.body.no) image.no = req.body.no;
    if (req.body.category) image.category = req.body.category;

    await image.save();
    res.json({ message: "Image updated successfully", data: image });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Failed to update image", error: error.message });
  }
};
