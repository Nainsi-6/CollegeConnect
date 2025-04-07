const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.signup = async (req, res) => {
  try {
      const { name, email, password, role, batch, regNumber, facultyId, department, company, passedOutBatch } = req.body;
  
      if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "All required fields must be filled!" });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists!" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
        batch: role === "student" ? batch : "",
        regNumber: role === "student" ? regNumber : "",
        facultyId: role === "faculty" ? facultyId : "",
        department: role === "faculty" ? department : "",
        company: role === "alumni" ? company : "",
        passedOutBatch: role === "alumni" ? passedOutBatch : "",
      });
  
      await newUser.save();
      res.status(201).json({ message: "✅ Signup Successful! Please log in." });
  
    } catch (error) {
      console.error("Signup Error:", error);
      res.status(500).json({ message: "Server error, please try again later!" });
    }
  }
  
  
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "❌ Email and password are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "❌ User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "❌ Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "✅ Login successful", token, user });
  } catch (error) {
    res.status(500).json({ message: "❌ An error occurred", error: error.message });
  }
};
