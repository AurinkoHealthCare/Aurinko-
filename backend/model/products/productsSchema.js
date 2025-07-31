// models/Product.js
const mongoose = require("mongoose");
const autoIncrement = require("../../middleware/counterMiddleware");

const productSchema = new mongoose.Schema({
  productId: { type: Number, unique: true },
  
  // Normal fields
  name: { type: String, required: true }, 
  image: { type: String }, 
  rating: { type: Number, min: 1, max: 5, default: 1, required: true },
  category: { type: String, required: true },

  // Multi-language translations
  translations: {
    fr: { name: String, details: String, category: String },
    es: { name: String, details: String, category: String },
    ar: { name: String, details: String, category: String },
    ko: { name: String, details: String, category: String }
  },

  // Optional details in default language
  details: { type: String }
}, { timestamps: true });

// Auto-increment plugin
productSchema.pre("save", autoIncrement("productId"));

module.exports = mongoose.model("Products", productSchema);
