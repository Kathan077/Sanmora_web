const multer = require("multer");

// Setup memory storage to avoid writing uploaded resumes to the local disk
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
}).single("resume");

module.exports = upload;
