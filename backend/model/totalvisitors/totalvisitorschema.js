const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  ip: String,
  country: { type: String, default: "Unknown" },
  region: { type: String, default: "Unknown" },
  city: { type: String, default: "Unknown" },
  userAgent: { type: String, required: true },
  visitorId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  lastVisit: { type: Date, default: Date.now },
  visits: [
    {
      ip: String,
      date: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Visitor", visitorSchema);
