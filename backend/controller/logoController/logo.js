const Logo = require("../../model/logoModel/logo");
const fs = require("fs");
const path = require("path");

// 📤 Upload Multiple Images
const uploadLogos = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const files = req.files;

    const newLogos = await Logo.insertMany(
      files.map((file, idx) => ({
        no: idx + 1,
        url: `${baseUrl}/uploads/${file.customPath}/${file.customFilename}`, // ✅ correct URL
        imageName: file.originalname,
        public_id: `${file.customPath}/${file.customFilename}`, // ✅ save folder + filename
      }))
    );

    res.json(newLogos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📥 Get All Images
const getLogos = async (req, res) => {
  try {
    const logos = await Logo.find();
    res.json(logos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✏️ Update Single Image
const updateLogo = async (req, res) => {
  try {
    const { id } = req.params;
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const updateData = {};

    if (req.file) {
      // 🔹 purana file delete karo
      const oldLogo = await Logo.findById(id);
      if (oldLogo) {
        const oldPath = path.join(__dirname, "../../uploads", oldLogo.public_id);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      // 🔹 naya data save karo
      updateData.url = `${baseUrl}/uploads/${req.file.customPath}/${req.file.customFilename}`;
      updateData.imageName = req.file.originalname;
      updateData.public_id = `${req.file.customPath}/${req.file.customFilename}`;
    }

    const updated = await Logo.findByIdAndUpdate(id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🗑 Delete
const deleteLogo = async (req, res) => {
  try {
    const { id } = req.params;
    const logo = await Logo.findByIdAndDelete(id);

    if (logo) {
      const filePath = path.join(__dirname, "../../uploads", logo.public_id);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    res.json({ message: "Deleted", id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  uploadLogos,
  getLogos,
  updateLogo,
  deleteLogo,
};
