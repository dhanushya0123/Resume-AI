// ================================
// server.js — Express Entry Point
// ================================
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const { errorHandler } = require("./middleware/errorHandler");
const resumeRoutes = require("./routes/resumeRoutes");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically (optional)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ── Routes ──────────────────────────────────────────────
app.use("/api/resume", resumeRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Resume Screening API is running" });
});

// ── Error Handler (must be last) ────────────────────────
app.use(errorHandler);

// ── Start Server ────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`🔑 OpenAI Key: ${process.env.OPENAI_API_KEY ? "Loaded" : "MISSING ⚠️"}`);
});
