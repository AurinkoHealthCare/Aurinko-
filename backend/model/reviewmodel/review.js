const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true }, // user ka naam
  email: { 
    type: String, 
    required: true, 
    unique: true, // ek hi email se multiple review na aaye
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"]
  },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  approved: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);
