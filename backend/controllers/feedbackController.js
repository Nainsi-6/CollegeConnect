const Feedback = require('../models/Feedback');

// Handle feedback submission
exports.submitFeedback = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.body.userId || null;

    if (!message || message.trim() === '') {
      return res.status(400).json({ message: "Feedback message is required" });
    }

    const feedback = new Feedback({
      user: userId,
      message,
    });

    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully!" });
  } catch (error) {
    console.error("Feedback submission error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
