// models/ImageSlider.js
const mongoose = require("mongoose");

const imageSliderSchema = new mongoose.Schema({
  no: Number,
  url: String,
  public_id: String,
});

module.exports = mongoose.model("galleryImages", imageSliderSchema);
