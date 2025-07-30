const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String }, // full URL
  category: { type: String, required: true },
  details: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Products", productSchema);
