const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    res.status(200).json({ message: "Profile Created Successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
