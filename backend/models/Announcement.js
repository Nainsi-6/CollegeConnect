const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String, // Storing date as a string (you can use Date type too)
    required: true,
  },
  time: {
    type: String, // Storing time separately
    required: true,
  },
});

module.exports = mongoose.model("Announcement", AnnouncementSchema);
