const User = require("../models/User")
const Connection = require("../models/Connection")
const { Profile } = require("../models/Profile")

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const currentUserId = req.user._id

    // Get all users except the current user
    const users = await User.find({ _id: { $ne: currentUserId } })
      .select("_id name email role batch regNumber facultyId department company passedOutBatch")
      .lean()

    // Get profiles to add profile photos
    const profiles = await Profile.find({
      userId: { $in: users.map((user) => user._id) },
    })
      .select("userId profilePhoto coverPhoto")
      .lean()

    // Map profile photos to users
    const usersWithPhotos = users.map((user) => {
      const profile = profiles.find((p) => p.userId && p.userId.toString() === user._id.toString())
      return {
        ...user,
        profilePhoto: profile?.profilePhoto || null,
        coverPhoto: profile?.coverPhoto || null,
      }
    })

    res.status(200).json({
      success: true,
      users: usersWithPhotos,
    })
  } catch (error) {
    console.error("Error fetching users:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params

    const user = await User.findById(userId)
      .select("_id name email role batch regNumber facultyId department company passedOutBatch")
      .lean()

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Get profile to add profile photo
    const profile = await Profile.findOne({ userId }).select("profilePhoto coverPhoto").lean()

    const userWithPhoto = {
      ...user,
      profilePhoto: profile?.profilePhoto || null,
      coverPhoto: profile?.coverPhoto || null,
    }

    res.status(200).json({
      success: true,
      user: userWithPhoto,
    })
  } catch (error) {
    console.error("Error fetching user:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

// Send connection request
exports.sendConnectionRequest = async (req, res) => {
  try {
    const requesterId = req.user._id
    const recipientId = req.params.userId

    // Check if users exist
    const [requester, recipient] = await Promise.all([User.findById(requesterId), User.findById(recipientId)])

    if (!requester || !recipient) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Check if connection already exists
    const existingConnection = await Connection.findOne({
      $or: [
        { requester: requesterId, recipient: recipientId },
        { requester: recipientId, recipient: requesterId },
      ],
    })

    if (existingConnection) {
      return res.status(400).json({
        success: false,
        message: "Connection already exists",
        connection: existingConnection,
      })
    }

    // Create new connection
    const newConnection = new Connection({
      requester: requesterId,
      recipient: recipientId,
      status: "pending",
    })

    const savedConnection = await newConnection.save()

    res.status(201).json({
      success: true,
      message: "Connection request sent",
      connection: savedConnection,
    })
  } catch (error) {
    console.error("Error sending connection request:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

// Get user connections
exports.getUserConnections = async (req, res) => {
  try {
    const userId = req.user._id

    // Find all connections where the user is either requester or recipient
    const connections = await Connection.find({
      $or: [{ requester: userId }, { recipient: userId }],
    }).lean()

    res.status(200).json({
      success: true,
      connections,
    })
  } catch (error) {
    console.error("Error fetching connections:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

// Accept connection request
exports.acceptConnectionRequest = async (req, res) => {
  try {
    const userId = req.user._id
    const connectionId = req.params.connectionId

    // Find the connection
    const connection = await Connection.findById(connectionId)

    if (!connection) {
      return res.status(404).json({
        success: false,
        message: "Connection not found",
      })
    }

    // Check if the user is the recipient
    if (connection.recipient.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to accept this connection",
      })
    }

    // Update connection status
    connection.status = "accepted"
    await connection.save()

    res.status(200).json({
      success: true,
      message: "Connection accepted",
      connection,
    })
  } catch (error) {
    console.error("Error accepting connection:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

// Reject or cancel connection request
exports.deleteConnection = async (req, res) => {
  try {
    const userId = req.user._id
    const connectionId = req.params.connectionId

    // Find the connection
    const connection = await Connection.findById(connectionId)

    if (!connection) {
      return res.status(404).json({
        success: false,
        message: "Connection not found",
      })
    }

    // Check if the user is either the requester or recipient
    if (
      connection.requester.toString() !== userId.toString() &&
      connection.recipient.toString() !== userId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this connection",
      })
    }

    // Delete the connection
    await Connection.findByIdAndDelete(connectionId)

    res.status(200).json({
      success: true,
      message: "Connection deleted",
    })
  } catch (error) {
    console.error("Error deleting connection:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

// Get user's followers and following
exports.getUserNetwork = async (req, res) => {
  try {
    const userId = req.user._id

    // Find accepted connections where the user is either requester or recipient
    const connections = await Connection.find({
      $or: [
        { requester: userId, status: "accepted" },
        { recipient: userId, status: "accepted" },
      ],
    }).lean()

    // Extract connected user IDs
    const connectedUserIds = connections.map((conn) => {
      return conn.requester.toString() === userId.toString() ? conn.recipient : conn.requester
    })

    // Get user details for connected users
    const connectedUsers = await User.find({
      _id: { $in: connectedUserIds },
    })
      .select("_id name email role")
      .lean()

    // Get profiles to add profile photos
    const profiles = await Profile.find({
      userId: { $in: connectedUserIds },
    })
      .select("userId profilePhoto")
      .lean()

    // Map profile photos to users
    const usersWithPhotos = connectedUsers.map((user) => {
      const profile = profiles.find((p) => p.userId && p.userId.toString() === user._id.toString())
      return {
        ...user,
        profilePhoto: profile?.profilePhoto || null,
      }
    })

    res.status(200).json({
      success: true,
      connections: usersWithPhotos,
    })
  } catch (error) {
    console.error("Error fetching user network:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

