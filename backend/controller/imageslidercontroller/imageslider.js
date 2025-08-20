const ImageSlider = require("../../model/imageslider/imagesliderschema");
const fs = require("fs");
const path = require("path");

// Helper: safe delete
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
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const { category, lang } = req.body;

    if (!category || !lang) {
      return res.status(400).json({ message: "Category and language are required" });
    }

    const existingCount = await ImageSlider.countDocuments({ category, lang });

    const uploadDocs = req.files.map((file, index) => ({
      no: existingCount + index + 1,
      url: `${baseUrl}/uploads/${file.customPath}/${file.customFilename}`,
      category,
      lang,
      imageName: file.originalname,
      public_id: `${file.customPath}/${file.customFilename}`,
    }));

    const saved = await ImageSlider.insertMany(uploadDocs);

    res.status(201).json({ message: "Images uploaded successfully", data: saved });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Failed to upload images", error: error.message });
  }
};

// Get Images
exports.getImages = async (req, res) => {
  try {
    let { category, lang } = req.params;

    // normalize lang like "en-GB" → "en"
    lang = lang.split("-")[0];

    const images = await ImageSlider.find({
      category: new RegExp(`^${category}$`, "i"), // case-insensitive category
      lang
    }).sort({ no: 1 });

    res.json({ category, lang, images });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch images", error: error.message });
  }
};


// Update Image
exports.updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const imageDoc = await ImageSlider.findById(id);

    if (!imageDoc) return res.status(404).json({ message: "Image not found" });

    const oldPath = path.join(__dirname, "../../uploads", imageDoc.public_id);
    await deleteFileSafe(oldPath);

    const file = req.file;
    imageDoc.url = `${baseUrl}/uploads/${file.customPath}/${file.customFilename}`;
    imageDoc.imageName = file.originalname;
    imageDoc.public_id = `${file.customPath}/${file.customFilename}`;
    await imageDoc.save();

    res.json({ message: "Image updated successfully", data: imageDoc });
  } catch (error) {
    res.status(500).json({ message: "Failed to update image", error: error.message });
  }
};

// Delete Image
exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const imageDoc = await ImageSlider.findById(id);
    if (!imageDoc) return res.status(404).json({ message: "Image not found" });

    const filePath = path.join(__dirname, "../../uploads", imageDoc.public_id);
    await deleteFileSafe(filePath);

    await ImageSlider.findByIdAndDelete(id);

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete image", error: error.message });
  }
};
