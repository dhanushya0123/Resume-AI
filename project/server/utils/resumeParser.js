// ================================
// utils/resumeParser.js
// ================================
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const fs = require("fs");
const path = require("path");

/**
 * Extracts plain text from a resume file.
 * Supports: PDF, DOC, DOCX
 *
 * @param {string} filePath - Absolute path to the uploaded file
 * @param {string} mimeType  - MIME type of the file
 * @returns {Promise<string>} Extracted plain text
 */
const extractText = async (filePath, mimeType) => {
  const fileBuffer = fs.readFileSync(filePath);

  // ── PDF ──────────────────────────────────────────────
  if (mimeType === "application/pdf") {
    const data = await pdfParse(fileBuffer);
    return data.text.trim();
  }

  // ── DOCX ─────────────────────────────────────────────
  if (
    mimeType ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({ buffer: fileBuffer });
    return result.value.trim();
  }

  // ── Legacy DOC ────────────────────────────────────────
  // mammoth handles .doc as well (limited support)
  if (mimeType === "application/msword") {
    try {
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      return result.value.trim();
    } catch {
      throw new Error(
        "Could not parse legacy .doc file. Please convert to .docx or PDF."
      );
    }
  }

  throw new Error("Unsupported file format.");
};

/**
 * Deletes a file from disk after processing.
 * @param {string} filePath
 */
const cleanupFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (err) {
    console.warn("⚠️ Could not delete temp file:", filePath);
  }
};

module.exports = { extractText, cleanupFile };
