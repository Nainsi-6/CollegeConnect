const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const { authenticateUser } = require("../middleware/auth")

// Apply authentication middleware to all routes
router.use(authenticateUser)

// Get all users
router.get("/all", userController.getAllUsers)

// Get user by ID
router.get("/:userId", userController.getUserById)

// Send connection request
router.post("/connect/:userId", userController.sendConnectionRequest)

// Get user connections
router.get("/connections", userController.getUserConnections)

// Accept connection request
router.put("/connections/:connectionId/accept", userController.acceptConnectionRequest)

// Delete/cancel connection
router.delete("/connections/:connectionId", userController.deleteConnection)

// Get user's network (followers/following)
router.get("/network", userController.getUserNetwork)

module.exports = router


