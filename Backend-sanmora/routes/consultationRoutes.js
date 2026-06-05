const express = require("express");
const router = express.Router();
const { sendConsultationEmail } = require("../controllers/consultationController");

// POST /api/consultation
router.post("/", sendConsultationEmail);

module.exports = router;
