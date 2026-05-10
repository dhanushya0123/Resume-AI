// ================================
// routes/resumeRoutes.js
// ================================
const express = require("express");
const router  = express.Router();
const upload  = require("../middleware/upload");
const { analyzeResumeController } = require("../controllers/resumeController");

/**
 * POST /api/resume/analyze
 * Multipart: field "resume" (file) + field "jobDescription" (text)
 */
router.post(
  "/analyze",
  upload.single("resume"),   // Multer parses the "resume" field
  analyzeResumeController
);

module.exports = router;
