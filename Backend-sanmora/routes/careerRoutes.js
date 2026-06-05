const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");
const { applyJob } = require("../controllers/careerController");

// POST /api/career-apply
router.post("/", upload, applyJob);

module.exports = router;
