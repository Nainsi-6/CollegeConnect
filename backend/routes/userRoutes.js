const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const { authMiddleware } = require("../middleware/authMiddleware")

// Apply auth middleware to all routes
router.use(authMiddleware)

// Search users
router.get("/search", userController.searchUsers)

// Get suggested users
router.get("/suggested", userController.getSuggestedUsers)

// Get connection requests
router.get("/requests", userController.getConnectionRequests)

// Follow a user
router.post("/follow/:userId", userController.followUser)

// Respond to a follow request
router.put("/request/:requestId", userController.respondToFollowRequest)

// Get followers and following
router.get("/connections/:userId?", userController.getConnections)

module.exports = router





