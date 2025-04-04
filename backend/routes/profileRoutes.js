const express = require("express");
const uploadFile = require("../middleware/multer");
const { getProfile, updateProfile, createProfile } = require("../controllers/profileController");

const router = express.Router();

// Route to get a user's profile
router.get("/:userId", getProfile);

// Route to update a user's profile
router.put("/:userId", uploadFile, updateProfile);

// Route to create a new user's profile
router.post("/create", uploadFile, createProfile);

module.exports = router;
