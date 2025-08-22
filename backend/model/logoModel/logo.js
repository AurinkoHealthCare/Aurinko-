const mongoose = require("mongoose");

const logoSchema = new mongoose.Schema(
  {
    no: { type: Number, required: true },
    url: { type: String, required: true },
    imageName: { type: String, required: true },
    public_id: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Logo", logoSchema);
