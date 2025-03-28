const express = require("express");
const Announcement = require("../models/Announcement");

const router = express.Router();

// @route   POST /api/announcements
// @desc    Add a new announcement
router.post("/", async (req, res) => {
  try {
    const { text, date, time } = req.body;

    if (!text || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newAnnouncement = new Announcement({ text, date, time });
    await newAnnouncement.save();

    res.status(201).json({ message: "Announcement added successfully", newAnnouncement });
  } catch (error) {
    console.error("Error adding announcement:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route   GET /api/announcements
// @desc    Fetch all announcements
router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ date: -1 });
    res.json(announcements);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route   DELETE /api/announcements/:id
// @desc    Delete an announcement
router.delete("/:id", async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    await announcement.deleteOne();
    res.json({ message: "Announcement deleted successfully" });
  } catch (error) {
    console.error("Error deleting announcement:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
