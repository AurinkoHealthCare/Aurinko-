const mongoose = require("mongoose");

const langFields = new mongoose.Schema({
  en: { type: String, default: "" },
  ar: { type: String, default: "" },
  es: { type: String, default: "" },
  fr: { type: String, default: "" },
  ko: { type: String, default: "" },
});

const blogSchema = new mongoose.Schema(
  {
    imageUrl: { type: String },
    imageName: { type: String },
    headings: [langFields],
    paragraphs: [langFields],
    category: { type: String, default: "" }, // <-- add this
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
