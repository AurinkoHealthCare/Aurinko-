const fs = require("fs");
const path = require("path");
const ImageSlider = require("../../model/gallery/gallery");

// 🔧 Safe File Delete Helper
const deleteFileSafe = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    } else {
      console.warn("File not found on disk:", filePath);
    }
  } catch (err) {
    console.error("File Delete Error:", err.message);
  }
};

// 📤 Upload Multiple Images
// 📤 Upload Multiple Images (fixed for array categories)
exports.uploadImages = async (req, res) => {
  try {
    const { categories } = req.body; // ✅ ab array aayegi
    if (!categories || categories.length === 0) {
      return res.status(400).json({ message: "At least one category is required" });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const uploadPromises = req.files.map(async (file, index) => {
      const category = Array.isArray(categories) ? categories[index] : categories; // ✅ per image category
      if (!category) throw new Error(`Category missing for image ${index + 1}`);

      const no = (await ImageSlider.countDocuments({ category })) + 1;
      return {
        no,
        category,
        url: `${baseUrl}/uploads/${file.customPath}/${file.customFilename}`,
        public_id: `${file.customPath}/${file.customFilename}`,
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



// ✏️ Update Image by ID (with category)
exports.updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { category } = req.body; // ✅ category update ke liye
    const oldImage = await ImageSlider.findById(id);

    if (!oldImage) {
      return res.status(404).json({ message: "Image not found" });
    }

    let updatedData = {};
    if (req.file) {
      const oldPath = path.join(__dirname, "../../uploads", oldImage.public_id);
      deleteFileSafe(oldPath);

      const baseUrl = `${req.protocol}://${req.get("host")}`;
      updatedData.url = `${baseUrl}/uploads/${req.file.customPath}/${req.file.customFilename}`;
      updatedData.public_id = `${req.file.customPath}/${req.file.customFilename}`;
    }

    if (category) {
      const no = (await ImageSlider.countDocuments({ category })) + 1;
      updatedData.category = category;
      updatedData.no = no;
    }

    const updatedImage = await ImageSlider.findByIdAndUpdate(id, updatedData, { new: true });

    res.json({ message: "Image updated successfully", data: updatedImage });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Failed to update image", error: error.message });
  }
};


// ❌ Delete Image by ID
exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await ImageSlider.findById(id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    const filePath = path.join(__dirname, "../../uploads", image.public_id);
    deleteFileSafe(filePath);

    await ImageSlider.findByIdAndDelete(id);

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Failed to delete image", error: error.message });
  }
};

// 🔍 Get All Images
exports.getAllImages = async (req, res) => {
  try {
    const images = await ImageSlider.find().sort({ no: 1 });
    res.json({ count: images.length, data: images });
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Failed to fetch images", error: error.message });
  }
};

// 🔍 Get Images by Category
exports.getImagesByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const images = await ImageSlider.find({ category }).sort({ no: 1 });

    if (!images.length) {
      return res.status(404).json({ message: "No images found for this category" });
    }

    res.json({ count: images.length, data: images });
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Failed to fetch images", error: error.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await ImageSlider.distinct("category"); // unique categories nikal lega
    res.json({ categories });
  } catch (error) {
    console.error("Category Fetch Error:", error);
    res.status(500).json({ message: "Failed to fetch categories", error: error.message });
  }
};

