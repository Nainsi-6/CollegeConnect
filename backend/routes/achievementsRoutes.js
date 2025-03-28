const express = require("express");
const router = express.Router();
const Achievement = require("../models/Achivements");

// ✅ Create a new Achievement
router.post("/", async (req, res) => {
    try {
        const { title, description, date, time } = req.body;
        const achievement = new Achievement({ title, description, date, time });
        await achievement.save();
        res.status(201).json({ message: "Achievement added successfully!", achievement });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Get all Achievements
router.get("/", async (req, res) => {
    try {
        const achievements = await Achievement.find().sort({ createdAt: -1 });
        res.status(200).json(achievements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ❌ Delete an Achievement by ID
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Achievement.findByIdAndDelete(id);
        res.status(200).json({ message: "Achievement deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
