const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  branch: { type: String, required: true },
  skills: { type: String, required: true },
  description: { type: String, required: true }
});

module.exports = mongoose.model("Profile", ProfileSchema);
