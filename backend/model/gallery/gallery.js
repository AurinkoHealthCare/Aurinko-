const mongoose = require("mongoose");

const imageSliderSchema = new mongoose.Schema({
  no: Number,
  url: String,
  public_id: String,
  category: { type: String, required: true }, // ✅ new field
});

module.exports = mongoose.model("galleryImages", imageSliderSchema);
