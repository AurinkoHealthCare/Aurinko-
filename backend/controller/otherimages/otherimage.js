const OtherImage = require("../../model/otherImages/otherimage");
const path = require("path");
const fs = require("fs");

exports.uploadFiles = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const uploadedImages = req.files.map((file, index) => ({
      imageName: req.body.name || file.originalname,
      category: req.body.category,
      lang: req.query.lang || "en",
      url: `${baseUrl}/uploads/image/${file.filename}`,
      no: index + 1,
    }));

    const savedImages = await OtherImage.insertMany(uploadedImages);

    res.status(201).json({
      success: true,
      message: "Images uploaded successfully",
      data: savedImages,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ success: false, message: "Upload failed", error });
  }
};

exports.updateImage = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const { id } = req.params;
    const imageDoc = await OtherImage.findById(id);

    if (!imageDoc) return res.status(404).json({ message: "File not found" });

    if (req.file) {
      const oldPath = path.join(
        __dirname,
        "../../",
        imageDoc.url.split("?")[0].replace(baseUrl + "/", "")
      );
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

      const file = req.file;
      const relativePath = path.join("uploads/image", file.filename).replace(/\\/g, "/");
      imageDoc.url = `${baseUrl}/${relativePath}`;
      imageDoc.imageName = req.body.imageName || file.originalname;
    }

    if (req.body.no) imageDoc.no = req.body.no;
    if (req.body.category) imageDoc.category = req.body.category;
    if (req.body.lang) imageDoc.lang = req.body.lang;
    if (req.body.imageName) imageDoc.imageName = req.body.imageName;

    await imageDoc.save();

    imageDoc.url = `${imageDoc.url}?t=${Date.now()}`;

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

    const filePath = path.join(
      __dirname,
      "../../",
      imageDoc.url.replace(baseUrl + "/", "").split("?")[0]
    );
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await OtherImage.findByIdAndDelete(id);
    res.json({ message: "File deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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
