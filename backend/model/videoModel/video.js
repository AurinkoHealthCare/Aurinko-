const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    filename: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);
