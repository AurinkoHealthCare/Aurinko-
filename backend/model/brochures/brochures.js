const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  no: { type: Number },
  name: { type: String, required: true }, // <-- Image name
  url: { type: String, required: true },
  public_id: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Brochures", imageSchema);
