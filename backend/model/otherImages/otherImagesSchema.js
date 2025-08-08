const mongoose = require("mongoose");

const imageSliderSchema = new mongoose.Schema({
  name: String,
  no: Number,
 images: {
    en: { url: String, public_id: String },
    ar: { url: String, public_id: String },
    fr: { url: String, public_id: String },
    es: { url: String, public_id: String },
    ko: { url: String, public_id: String },
  }
});

module.exports = mongoose.model("othersImage", imageSliderSchema);
