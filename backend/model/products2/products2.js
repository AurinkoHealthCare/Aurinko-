const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productImage: {
    type: String,
    required: true
  },
  productLogo: {
    type: String,
    required: true
  },
  generalInfo: {
    name: { type: String, required: true },
    segment: { type: String, required: true },
    type: { type: String, required: true },
    category: { type: String, required: true },
    packing: { type: String, required: true }
  },
  composition: {
    type: String,
    required: true
  },
  indications: {
    type: String,
    required: true
  },
  usage: {
    type: String,
    required: true
  },
  report: {
    type: String
  },
  brochure: {
    type: String
  },
  feedback: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Products2', productSchema);
