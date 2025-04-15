const multer = require("multer")
const path = require("path")
const fs = require("fs")
const { v4: uuidv4 } = require("uuid")

// Create necessary directories
const createUploadDirs = () => {
  const dirs = [
    path.join(__dirname, "..", "public", "uploads"),
    path.join(__dirname, "..", "public", "uploads", "profile"),
    path.join(__dirname, "..", "public", "uploads", "cover"),
  ]

  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
      console.log(`Created directory: ${dir}`)
    }
  })
}

// Create directories on startup
createUploadDirs()

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determine destination based on field name
    if (file.fieldname === "profilePhoto") {
      cb(null, path.join(__dirname, "..", "public", "uploads", "profile"))
    } else if (file.fieldname === "coverPhoto") {
      cb(null, path.join(__dirname, "..", "public", "uploads", "cover"))
    } else {
      cb(null, path.join(__dirname, "..", "public", "uploads"))
    }
  },
  filename: (req, file, cb) => {
    // Generate unique filename with original extension
    const uniqueId = uuidv4()
    const fileExt = path.extname(file.originalname)
    cb(null, `${file.fieldname}-${uniqueId}${fileExt}`)
  },
})

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith("image/")) {
    cb(null, true)
  } else {
    cb(new Error("Only image files are allowed!"), false)
  }
}

// Create multer upload instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
})

module.exports = upload
