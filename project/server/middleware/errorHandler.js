// ================================
// middleware/errorHandler.js
// ================================

/**
 * Central error-handling middleware.
 * Must be registered LAST in Express (after all routes).
 */
const errorHandler = (err, req, res, next) => {
  console.error("❌ Error:", err.message);

  // Multer-specific errors
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({
      success: false,
      error: "File too large. Maximum allowed size is 5 MB.",
    });
  }

  if (err.message && err.message.includes("Invalid file type")) {
    return res.status(415).json({
      success: false,
      error: err.message,
    });
  }

  // OpenAI errors
  if (err.status === 401) {
    return res.status(401).json({
      success: false,
      error: "Invalid OpenAI API key. Please check your .env configuration.",
    });
  }

  if (err.status === 429) {
    return res.status(429).json({
      success: false,
      error: "OpenAI rate limit exceeded. Please try again in a moment.",
    });
  }

  // Generic fallback
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || "Internal server error. Please try again.",
  });
};

module.exports = { errorHandler };
