const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
  title: String,
  category: { type: String, enum: ["Reports", "Articles"], required: true },
  filePath: String,
}, { timestamps: true });

module.exports = mongoose.model("Pdf", pdfSchema);
