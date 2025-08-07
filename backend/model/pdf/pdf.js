const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
  title: { type: String, required: true },
  details: { type: String, default: "" },
  category: { type: String, enum: ["Reports", "Articles"], required: true },
  type: { type: String, required: true }, // ✅ Required field
  filePath: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Pdf", pdfSchema);
