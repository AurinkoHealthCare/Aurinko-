const Pdf = require("../../model/pdf/pdf");
const path = require("path");
const fs = require("fs");

// 🔧 Safe File Delete Helper
const deleteFileSafe = (filePath) => {
  try {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("Deleted PDF:", filePath);
    } else {
      console.warn("PDF not found on disk:", filePath);
    }
  } catch (err) {
    console.error("File Delete Error:", err.message);
  }
};

// 📤 Upload PDF
exports.uploadPdf = async (req, res) => {
  try {
    const { category } = req.body;
    if (!req.file) {
      return res.status(400).json({ success: false, error: "No file uploaded" });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const pdf = new Pdf({
      title: req.file.originalname,
      category: category || "general",
      filePath: req.file.path,
    });

    await pdf.save();

    res.json({
      success: true,
      message: "PDF uploaded successfully",
      pdf: {
        ...pdf.toObject(),
        url: `${baseUrl}/uploads/pdf/${req.file.filename}`, // ✅ public URL
      },
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// 🔍 Get PDFs by Category
exports.getPdfs = async (req, res) => {
  try {
    const { category } = req.params;
    const filter = category ? { category } : {};
    const pdfs = await Pdf.find(filter).sort({ createdAt: -1 });

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const pdfsWithUrl = pdfs.map((pdf) => ({
      ...pdf.toObject(),
      url: `${baseUrl}/uploads/pdf/${path.basename(pdf.filePath)}`, // ✅ Generate URL
    }));

    res.json({ success: true, count: pdfsWithUrl.length, data: pdfsWithUrl });
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ❌ Delete PDF
exports.deletePdf = async (req, res) => {
  try {
    const { id } = req.params;
    const pdf = await Pdf.findById(id);

    if (!pdf) {
      return res.status(404).json({ success: false, error: "File not found" });
    }

    deleteFileSafe(path.resolve(pdf.filePath));

    await Pdf.findByIdAndDelete(id);
    res.json({ success: true, message: "PDF deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✏️ Update/Replace PDF
exports.updatePdf = async (req, res) => {
  try {
    const { id } = req.params;
    const pdf = await Pdf.findById(id);

    if (!pdf) {
      return res.status(404).json({ success: false, error: "File not found" });
    }

    if (req.file) {
      deleteFileSafe(path.resolve(pdf.filePath));
      pdf.title = req.file.originalname;
      pdf.filePath = req.file.path;
    }

    if (req.body.category) {
      pdf.category = req.body.category;
    }

    await pdf.save();

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    res.json({
      success: true,
      message: "PDF updated successfully",
      pdf: {
        ...pdf.toObject(),
        url: `${baseUrl}/uploads/pdf/${path.basename(pdf.filePath)}`, // ✅ return url
      },
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
