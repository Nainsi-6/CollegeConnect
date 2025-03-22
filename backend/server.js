/*require("dotenv").config();


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Allow frontend to communicate with backend

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// User Schema & Model
const UserSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model("User", UserSchema);

// Post Schema & Model (✅ Fixed)
const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Post = mongoose.model("Post", PostSchema);

// Signup Route
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.json({ message: "✅ User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "❌ Error signing up", error: error.message });
  }
});
app.post("/signup", async (req, res) => {
  console.log("Incoming Signup Request:", req.body); // Debugging

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "❌ All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    console.log("✅ User added to DB:", newUser); // Debugging

    res.json({ message: "✅ User registered successfully!" });
  } catch (error) {
    console.error("❌ Signup Error:", error);
    res.status(500).json({ message: "❌ Error signing up", error: error.message });
  }
});
const corsOptions = {
  origin: "http://localhost:3000", // Adjust based on frontend URL
  credentials: true,
  methods: ["GET", "POST"],
};
app.use(cors(corsOptions));


// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "❌ Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "❌ Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "✅ Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "❌ Error logging in", error: error.message });
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    console.log("Entered Password:", password);
    console.log("Stored Hashed Password:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    res.status(200).json({ message: "Login successful!", user });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "An error occurred. Please try again." });
  }
});



// Middleware for Authentication
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "❌ Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "❌ Invalid Token" });
  }
};

// ✅ Fixed Post Route (Now Using Correct Model)
app.post("/posts", async (req, res) => {
  console.log("Incoming Data:", req.body);

  try {
    const { title, content } = req.body;

    if (!title || !content) {
      console.log("❌ Missing Data");
      return res.status(400).json({ error: "Title and content required" });
    }

    const newPost = new Post({ title, content });
    await newPost.save();
    console.log("✅ Post saved:", newPost);

    res.status(201).json({ message: "✅ Post added", post: newPost });
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Start Server (✅ Change Port to Avoid Conflict)
const PORT = process.env.PORT || 5001; // Changed to 5001 if 5000 is busy
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));*/


const axios = require("axios");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Student", "Faculty", "Alumni"], required: true },
  batch: String,
  regNumber: String,
  facultyId: String,
  department: String,
  company: String,
  image: String,
  skills: [String],
  linkedin: String,
  hobbies: String,
  description: String,
  branch: String,
  year: String,
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

const User = mongoose.model("User", UserSchema);

// Signup Route
app.post("/signup", async (req, res) => {
  const { name, email, password, role, batch, regNumber, facultyId, department, company, image, skills, linkedin } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "❌ All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "❌ Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      batch,
      regNumber,
      facultyId,
      department,
      company,
      image,
      skills,
      linkedin,
    });

    await newUser.save();
    res.json({ message: "✅ User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "❌ Error signing up", error: error.message });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "❌ User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "❌ Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "✅ Login successful", token, user });
  } catch (error) {
    res.status(500).json({ message: "❌ An error occurred", error: error.message });
  }
});

// Profile Route
app.get("/api/profile/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).populate("connections followers");
    if (!user) return res.status(404).json({ message: "❌ Profile not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching profile", error: error.message });
  }
});

app.post("/api/profile", async (req, res) => {
  const { email, name, role, batch, image, skills, linkedin, hobbies, description, branch, year } = req.body;

  if (!email) return res.status(400).json({ message: "❌ Email is required!" });

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { name, role, batch, image, skills, linkedin, hobbies, description, branch, year } },
      { new: true, upsert: true }
    );

    res.json({ message: "✅ Profile updated", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "❌ Error updating profile", error: error.message });
  }
});

// Middleware for Authentication
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "❌ Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "❌ Invalid Token" });
  }
};

// Follow a user
app.post("/follow", authMiddleware, async (req, res) => {
  const { userId, followId } = req.body;
  
  try {
    await User.findByIdAndUpdate(userId, { $addToSet: { followers: followId } });
    await User.findByIdAndUpdate(followId, { $addToSet: { followers: userId } });
    res.json({ message: "✅ User followed" });
  } catch (error) {
    res.status(500).json({ message: "❌ Error following user", error: error.message });
  }
});

// Unfollow a user
app.post("/unfollow", authMiddleware, async (req, res) => {
  const { userId, followId } = req.body;

  try {
    await User.findByIdAndUpdate(userId, { $pull: { followers: followId } });
    await User.findByIdAndUpdate(followId, { $pull: { followers: userId } });
    res.json({ message: "✅ User unfollowed" });
  } catch (error) {
    res.status(500).json({ message: "❌ Error unfollowing user", error: error.message });
  }
});

// Connections Route
app.post("/connect", authMiddleware, async (req, res) => {
  const { userId, connectId } = req.body;

  try {
    await User.updateOne({ _id: userId }, { $push: { connections: connectId } });
    await User.updateOne({ _id: connectId }, { $push: { connections: userId } });
    res.json({ message: "✅ Connection request sent" });
  } catch (error) {
    res.status(500).json({ message: "❌ Error connecting", error: error.message });
  }
});



// Server Setup
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

