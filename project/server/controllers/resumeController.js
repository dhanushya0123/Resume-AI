// ================================
// controllers/resumeController.js
// ================================
const { extractText, cleanupFile } = require("../utils/resumeParser");
const { analyzeResume }            = require("../utils/openaiService");

/**
 * POST /api/resume/analyze
 * Accepts a resume file + job description, returns AI analysis.
 */
const analyzeResumeController = async (req, res, next) => {
  const filePath = req.file?.path;

  try {
    // ── Validate inputs ──────────────────────────────────
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No resume file uploaded. Please attach a PDF, DOC, or DOCX.",
      });
    }

    const { jobDescription } = req.body;
    if (!jobDescription || jobDescription.trim().length < 20) {
      return res.status(400).json({
        success: false,
        error: "Job description is too short. Please provide at least 20 characters.",
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        success: false,
        error: "Server configuration error: OpenAI API key is missing.",
      });
    }

    // ── Extract resume text ──────────────────────────────
    console.log(`📄 Parsing: ${req.file.originalname} (${req.file.mimetype})`);
    const resumeText = await extractText(filePath, req.file.mimetype);

    if (!resumeText || resumeText.length < 50) {
      return res.status(422).json({
        success: false,
        error: "Could not extract meaningful text from the resume. Is the file readable?",
      });
    }

    // ── AI Analysis ──────────────────────────────────────
    console.log("🤖 Sending to OpenAI for analysis…");
    const analysis = await analyzeResume(resumeText, jobDescription.trim());

    // ── Respond ──────────────────────────────────────────
    res.status(200).json({
      success: true,
      fileName: req.file.originalname,
      ...analysis,
    });

  } catch (err) {
    // Pass to central error handler
    next(err);
  } finally {
    // Always clean up uploaded file from disk
    if (filePath) cleanupFile(filePath);
  }
};

module.exports = { analyzeResumeController };
