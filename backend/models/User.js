const mongoose = require("mongoose");
// User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  email: { type: String, unique: true, required: true }, 
  password: { type: String, required: true }, 
  role: { type: String, enum: ["student", "faculty", "alumni"], required: true },

  // Optional fields based on role
  batch: { type: String, default: "" }, // For students
  regNumber: { type: String, default: "" }, // For students
  facultyId: { type: String, default: "" }, // For faculty
  department: { type: String, default: "" }, // For faculty
  company: { type: String, default: "" }, // For alumni
  passedOutBatch: { type: String, default: "" }, // For alumni

  // Additional optional fields
  image: { type: String, default: "" },
  skills: { type: [String], default: [] },
  linkedin: { type: String, default: "" },
  hobbies: { type: String, default: "" },
  description: { type: String, default: "" },
  branch: { type: String, default: "" },
  year: { type: String, default: "" },

  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});
