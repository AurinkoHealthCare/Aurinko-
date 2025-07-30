const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
   name: {
     type: String,
     required: true   // fixed spelling
   },
   email: {
     type: String,
     required: true
   },
   phone: {
     type: Number,
     required: true
   },
   message: {
     type: String,
     required: true
   }
}, { timestamps: true }); // ✅ Adds createdAt & updatedAt automatically

module.exports = mongoose.model("Contact", contactSchema);
