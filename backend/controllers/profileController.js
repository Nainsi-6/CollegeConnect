const Profile = require("../models/Profile");
const cloudinary = require("../utils/cloudinaryConfig");
const getDataUrl = require("../utils/urlGenerator");
// Get Profile of the logged-in user
exports.getProfile = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const profile = await Profile.findById(userId).select("-password");

    if (!profile) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update User Profile (Including Profile Picture)
exports.updateProfile = async (req, res) => {
  try {
    const { name, branch, hobbies, skills, year, description } = req.body;
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Default profilePic value
    let profilePic = {
      id: "",
      url: "",
    };

    // Handle file upload to Cloudinary if file exists
    if (req.file) {
      const myCloud = await cloudinary.uploader.upload(req.file.buffer, {
        folder: "profile_pictures",
        transformation: [{ width: 500, height: 500, crop: "limit" }],
      });

      profilePic = {
        id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    // Update the user profile in the database
    const updatedProfile = await Profile.findByIdAndUpdate(
      userId,
      { name, branch, hobbies, skills, year, description, profilePic },
      { new: true }
    ).select("-password");

    if (!updatedProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



// Convert Buffer to Base64
const bufferToDataURI = (buffer, mimetype) => {
    return `data:${mimetype};base64,${buffer.toString('base64')}`;
};

exports.createProfile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded!" });
        }

        // Convert file buffer to Data URI format
        const fileDataURI = bufferToDataURI(req.file.buffer, req.file.mimetype);

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(fileDataURI, {
            folder: "profiles", // Change the folder name as needed
        });

        console.log("Cloudinary Upload Result:", result);

        res.status(200).json({
            message: "Profile created successfully!",
            profileImageUrl: result.secure_url, // Return the Cloudinary URL
        });

    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};
