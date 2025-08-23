const mongoose = require("mongoose");

const langFields = new mongoose.Schema({
  en: { type: String, default: "" },
  ar: { type: String, default: "" },
  es: { type: String, default: "" },
  fr: { type: String, default: "" },
  ko: { type: String, default: "" },
});

const facultySchema = new mongoose.Schema(
  {
    name: { type: langFields, required: true },
    designation: { type: langFields, required: true },
    bio: { type: langFields, required: true },
    image: {   // ✅ single image
      url: { type: String },
      filename: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Faculty", facultySchema);
