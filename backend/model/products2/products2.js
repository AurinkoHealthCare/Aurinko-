const mongoose = require("mongoose");
const autoIncrement = require("../../middleware/counterMiddleware");

const translationSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  segment: { type: String, default: "" },
  type: { type: String, default: "" },
  category: { type: String, default: "" },
  packing: { type: String, default: "" },
  composition: { type: String, default: "" },
  indications: { type: String, default: "" },
  usage: { type: String, default: "" },
}, { _id: false });

const product2Schema = new mongoose.Schema({
  productId: { type: Number, unique: true },

  productImage: { type: String },
  productLogo: { type: String },

  generalInfo: {
    name: { type: String, required: true },
    segment: { type: String, default: "" },
    type: { type: String, default: "" },
    category: { type: String, required: true },
    packing: { type: String, default: "" },
  },

  composition: { type: String, default: "" },
  indications: { type: String, default: "" },
  usage: { type: String, default: "" },
  report: { type: String, default: "" },
  brochure: { type: String, default: "" },
  feedback: { type: String, default: "" },

  translations: {
    fr: { type: translationSchema, default: {} },
    es: { type: translationSchema, default: {} },
    ar: { type: translationSchema, default: {} },
    ko: { type: translationSchema, default: {} },
  },

}, { timestamps: true });

// Auto-increment productId
product2Schema.pre("save", autoIncrement("productId"));

module.exports = mongoose.model("Products2", product2Schema);
