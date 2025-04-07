const multer = require('multer');

// Set up memory storage to handle file buffer
const storage = multer.memoryStorage();

// Limit the size of the uploaded file (optional)
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max 5MB file size
}).single('file');  // 'file' is the field name in the form

module.exports = upload;
