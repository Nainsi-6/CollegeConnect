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
const announcementRoutes = require("./routes/announcementRoutes")
const achievementRoutes = require("./routes/achievementsRoutes");
const profileRoutes = require("./routes/profileRoutes");
const connectDB = require("./config/db");
const User = require("./models/User");  // Importing User Model
const authRoutes = require("./routes/authRoutes");
const bodyParser = require("body-parser");
const eventsRoutes = require("./routes/eventsRoutes");
const postRoutes = require("./routes/postRoutes");
const path = require("path")
const app = express();
// app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use(bodyParser.json());
// Make sure your app has the proper middleware for handling file uploads
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// MongoDB Connection
connectDB();






//Announcements
//Auth Routes
app.use("/api/auth", authRoutes); 
app.use("/api/announcements", announcementRoutes);
//Achievements
app.use("/api/achievements", achievementRoutes);
 
// Use Profile Routes
app.use("/api/profile", profileRoutes);
//Events Routes
// Routes
app.use("/api/events", eventsRoutes);

app.use("/api/posts", postRoutes);



// Server Setup
const PORT =  5005;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


