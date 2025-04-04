const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "faculty", "alumni"], required: true },

  // Optional fields
  batch: { type: String, default: "" },
  regNumber: { type: String, default: "" },
  facultyId: { type: String, default: "" },
  department: { type: String, default: "" },
  company: { type: String, default: "" },
  passedOutBatch: { type: String, default: "" },
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

module.exports = mongoose.model("User", UserSchema);
