const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  branch: { type: String, required: true },
  hobbies: { type: [String], required: false },
  skills: { type: [String], required: false },
  year: { type: String, required: true },
  description: { type: String, required: false },
  profilePic: {
    id: { type: String, required: false },
    url: { type: String, required: false },
  },
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
