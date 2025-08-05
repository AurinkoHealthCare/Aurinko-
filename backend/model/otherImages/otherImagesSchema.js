const mongoose = require("mongoose");

const imageSliderSchema = new mongoose.Schema({
  name:String,
  no: Number,
  url: String,
  public_id: String,
});

module.exports = mongoose.model("othersImage", imageSliderSchema);
