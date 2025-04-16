const User = require("../models/User")
const { Profile } = require("../models/Profile")
const Follow = require("../models/Follow")

// Search users
exports.searchUsers = async (req, res) => {
  try {
    const { query } = req.query
    const currentUserId = req.user._id

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      })
    }

    // Search for users by name or email, excluding the current user
    const users = await User.find({
      $and: [
        { _id: { $ne: currentUserId } },
        {
          $or: [{ name: { $regex: query, $options: "i" } }, { email: { $regex: query, $options: "i" } }],
        },
      ],
    }).select("_id name email role batch regNumber facultyId department company passedOutBatch")

    // Get profiles for the users
    const userIds = users.map((user) => user._id)
    const profiles = await Profile.find({ userId: { $in: userIds } }).select("userId profilePhoto role")

    // Map profiles to users
    const usersWithProfiles = users.map((user) => {
      const userObj = user.toObject()
      const profile = profiles.find((p) => p.userId.toString() === user._id.toString())

      return {
        ...userObj,
        profilePhoto: profile?.profilePhoto || "",
        profilePhotoUrl: profile?.profilePhoto
          ? `/uploads/profile/${profile.profilePhoto.split("/").pop()}`
          : "/default-profile.jpg",
      }
    })

    res.status(200).json({
      success: true,
      users: usersWithProfiles,
    })
  } catch (error) {
    console.error("Error searching users:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

// Get suggested users
exports.getSuggestedUsers = async (req, res) => {
  try {
    const currentUserId = req.user._id
    const currentUser = await User.findById(currentUserId)

    // Find users with the same role or department/batch
    const query = { _id: { $ne: currentUserId } }

    if (currentUser.role === "student") {
      // For students, suggest other students in the same batch or faculty in their department
      query.$or = [
        { role: "student", batch: currentUser.batch },
        { role: "faculty", department: currentUser.department },
        { role: "alumni", passedOutBatch: currentUser.batch },
      ]
    } else if (currentUser.role === "faculty") {
      // For faculty, suggest other faculty in the same department or students in their department
      query.$or = [
        { role: "faculty", department: currentUser.department },
        { role: "student", department: currentUser.department },
      ]
    } else if (currentUser.role === "alumni") {
      // For alumni, suggest other alumni from the same batch or company
      query.$or = [
        { role: "alumni", passedOutBatch: currentUser.passedOutBatch },
        { role: "alumni", company: currentUser.company },
        { role: "student", batch: currentUser.passedOutBatch },
      ]
    }

    // Get users who are not already being followed
    const following = await Follow.find({ follower: currentUserId }).select("following")
    const followingIds = following.map((f) => f.following)

    if (followingIds.length > 0) {
      query._id.$nin = followingIds
    }

    // Limit to 10 suggested users
    const users = await User.find(query)
      .select("_id name email role batch regNumber facultyId department company passedOutBatch")
      .limit(10)

    // Get profiles for the users
    const userIds = users.map((user) => user._id)
    const profiles = await Profile.find({ userId: { $in: userIds } }).select("userId profilePhoto")

    // Map profiles to users
    const usersWithProfiles = users.map((user) => {
      const userObj = user.toObject()
      const profile = profiles.find((p) => p.userId.toString() === user._id.toString())

      return {
        ...userObj,
        profilePhoto: profile?.profilePhoto || "",
        profilePhotoUrl: profile?.profilePhoto
          ? `/uploads/profile/${profile.profilePhoto.split("/").pop()}`
          : "/default-profile.jpg",
      }
    })

    res.status(200).json({
      success: true,
      users: usersWithProfiles,
    })
  } catch (error) {
    console.error("Error getting suggested users:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

// Get connection requests
exports.getConnectionRequests = async (req, res) => {
  try {
    const currentUserId = req.user._id

    // Find pending follow requests where current user is the target
    const requests = await Follow.find({
      following: currentUserId,
      status: "pending",
    }).populate({
      path: "follower",
      select: "_id name email role",
    })

    // Get profiles for the requesters
    const requesterIds = requests.map((req) => req.follower._id)
    const profiles = await Profile.find({ userId: { $in: requesterIds } }).select("userId profilePhoto")

    // Map profiles to requests
    const requestsWithProfiles = requests.map((request) => {
      const requestObj = request.toObject()
      const profile = profiles.find((p) => p.userId.toString() === request.follower._id.toString())

      return {
        ...requestObj,
        follower: {
          ...requestObj.follower,
          profilePhoto: profile?.profilePhoto || "",
          profilePhotoUrl: profile?.profilePhoto
            ? `/uploads/profile/${profile.profilePhoto.split("/").pop()}`
            : "/default-profile.jpg",
        },
      }
    })

    res.status(200).json({
      success: true,
      requests: requestsWithProfiles,
    })
  } catch (error) {
    console.error("Error getting connection requests:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

// Follow a user
exports.followUser = async (req, res) => {
  try {
    const { userId } = req.params
    const currentUserId = req.user._id

    // Check if user exists
    const userToFollow = await User.findById(userId)
    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Check if already following
    const existingFollow = await Follow.findOne({
      follower: currentUserId,
      following: userId,
    })

    if (existingFollow) {
      return res.status(400).json({
        success: false,
        message: "Already following or request pending",
      })
    }

    // Create new follow request
    const follow = new Follow({
      follower: currentUserId,
      following: userId,
      status: "pending",
    })

    await follow.save()

    res.status(200).json({
      success: true,
      message: "Follow request sent",
      follow,
    })
  } catch (error) {
    console.error("Error following user:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

// Accept or reject a follow request
exports.respondToFollowRequest = async (req, res) => {
  try {
    const { requestId } = req.params
    const { action } = req.body
    const currentUserId = req.user._id

    if (!["accept", "reject"].includes(action)) {
      return res.status(400).json({
        success: false,
        message: "Invalid action. Must be 'accept' or 'reject'",
      })
    }

    // Find the follow request
    const followRequest = await Follow.findById(requestId)

    if (!followRequest) {
      return res.status(404).json({
        success: false,
        message: "Follow request not found",
      })
    }

    // Verify the current user is the target of the follow request
    if (followRequest.following.toString() !== currentUserId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to respond to this request",
      })
    }

    // Update the status based on the action
    followRequest.status = action === "accept" ? "accepted" : "rejected"
    await followRequest.save()

    // If accepted, update follower and following counts in profiles
    if (action === "accept") {
      await Profile.findOneAndUpdate({ userId: followRequest.following }, { $inc: { "stats.followers": 1 } })
      await Profile.findOneAndUpdate({ userId: followRequest.follower }, { $inc: { "stats.following": 1 } })
    }

    res.status(200).json({
      success: true,
      message: `Follow request ${action}ed`,
      followRequest,
    })
  } catch (error) {
    console.error(`Error responding to follow request:`, error)
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

// Get following and followers
exports.getConnections = async (req, res) => {
  try {
    const userId = req.params.userId || req.user._id

    // Get followers (users who follow the specified user)
    const followers = await Follow.find({
      following: userId,
      status: "accepted",
    }).populate({
      path: "follower",
      select: "_id name email role",
    })

    // Get following (users the specified user follows)
    const following = await Follow.find({
      follower: userId,
      status: "accepted",
    }).populate({
      path: "following",
      select: "_id name email role",
    })

    // Get profiles for followers and following
    const followerIds = followers.map((f) => f.follower._id)
    const followingIds = following.map((f) => f.following._id)
    const allUserIds = [...new Set([...followerIds, ...followingIds])]

    const profiles = await Profile.find({ userId: { $in: allUserIds } }).select("userId profilePhoto")

    // Map profiles to followers
    const followersWithProfiles = followers.map((follow) => {
      const followObj = follow.toObject()
      const profile = profiles.find((p) => p.userId.toString() === follow.follower._id.toString())

      return {
        ...followObj,
        follower: {
          ...followObj.follower,
          profilePhoto: profile?.profilePhoto || "",
          profilePhotoUrl: profile?.profilePhoto
            ? `/uploads/profile/${profile.profilePhoto.split("/").pop()}`
            : "/default-profile.jpg",
        },
      }
    })

    // Map profiles to following
    const followingWithProfiles = following.map((follow) => {
      const followObj = follow.toObject()
      const profile = profiles.find((p) => p.userId.toString() === follow.following._id.toString())

      return {
        ...followObj,
        following: {
          ...followObj.following,
          profilePhoto: profile?.profilePhoto || "",
          profilePhotoUrl: profile?.profilePhoto
            ? `/uploads/profile/${profile.profilePhoto.split("/").pop()}`
            : "/default-profile.jpg",
        },
      }
    })

    res.status(200).json({
      success: true,
      followers: followersWithProfiles,
      following: followingWithProfiles,
    })
  } catch (error) {
    console.error("Error getting connections:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}
