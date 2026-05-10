// src/services/api.js
import axios from "axios";

// Base URL — CRA proxies /api to localhost:5000 in dev
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 60_000, // 60 s — AI can take a moment
});

/**
 * Sends the resume file and job description to the backend.
 * @param {File}   file           - Resume file object
 * @param {string} jobDescription - HR-entered job description text
 * @returns {Promise<object>}     - Analysis result from OpenAI
 */
export const analyzeResume = async (file, jobDescription) => {
  const formData = new FormData();
  formData.append("resume", file);
  formData.append("jobDescription", jobDescription);

  const response = await apiClient.post("/api/resume/analyze", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export default apiClient;
