const Pdf = require("../../model/pdf/pdf");
const path = require("path");
const fs = require("fs");

// Upload PDF
exports.uploadPdf = async (req, res) => {
  try {
    const { category } = req.body;
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const pdf = new Pdf({
      title: req.file.originalname,
      category,
      filePath: req.file.path,
    });
    await pdf.save();
    res.json({ success: true, pdf });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get PDFs by category
exports.getPdfs = async (req, res) => {
  try {
    const pdfs = await Pdf.find({ category: req.params.category });
    res.json(pdfs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete PDF
exports.deletePdf = async (req, res) => {
  try {
    const pdf = await Pdf.findById(req.params.id);
    if (!pdf) return res.status(404).json({ error: "File not found" });

    // File system se delete
    fs.unlinkSync(path.resolve(pdf.filePath));

    await Pdf.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update/Replace PDF
exports.updatePdf = async (req, res) => {
  try {
    const { id } = req.params;
    const pdf = await Pdf.findById(id);
    if (!pdf) return res.status(404).json({ error: "File not found" });

    if (req.file) {
      // Purana file delete
      fs.unlinkSync(path.resolve(pdf.filePath));
      pdf.title = req.file.originalname;
      pdf.filePath = req.file.path;
    }

    if (req.body.category) pdf.category = req.body.category;

    await pdf.save();
    res.json({ success: true, pdf });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
