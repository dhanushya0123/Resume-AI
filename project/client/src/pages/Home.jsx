// src/pages/Home.jsx
import React, { useState } from "react";
import DropZone from "../components/DropZone";
import Spinner from "../components/Spinner";
import ResultsDashboard from "../components/ResultsDashboard";
import ErrorMessage from "../components/ErrorMessage";
import { analyzeResume } from "../services/api";

const MIN_JD_LENGTH = 20;

const Home = () => {
  const [file, setFile]               = useState(null);
  const [jobDescription, setJobDesc]  = useState("");
  const [loading, setLoading]         = useState(false);
  const [result, setResult]           = useState(null);
  const [error, setError]             = useState("");

  // ── Handlers ─────────────────────────────────────────
  const handleAnalyze = async () => {
    setError("");

    // Client-side validation
    if (!file) {
      setError("Please upload a resume before analysing.");
      return;
    }
    if (jobDescription.trim().length < MIN_JD_LENGTH) {
      setError(`Job description must be at least ${MIN_JD_LENGTH} characters.`);
      return;
    }

    try {
      setLoading(true);
      const data = await analyzeResume(file, jobDescription);
      setResult(data);
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        err.message ||
        "Unexpected error. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setJobDesc("");
    setResult(null);
    setError("");
  };

  const canSubmit = !!file && jobDescription.trim().length >= MIN_JD_LENGTH && !loading;

  // ── Render ───────────────────────────────────────────
  return (
    <div className="min-h-screen bg-ink font-body">

      {/* ── Decorative background ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full
          bg-accent/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full
          bg-sky/5 blur-3xl" />
      </div>

      {/* ── Header ── */}
      <header className="relative z-10 border-b border-border bg-slate/60 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-base">
            🎯
          </div>
          <div>
            <h1 className="font-display font-bold text-white text-base leading-none">
              ResumeIQ
            </h1>
            <p className="text-muted text-xs">AI-Powered Resume Screening</p>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-10">

        {result ? (
          /* ── Results view ── */
          <ResultsDashboard data={result} onReset={handleReset} />
        ) : (
          /* ── Input view ── */
          <div className="space-y-8">

            {/* Page intro */}
            <div className="text-center space-y-2 animate-fade-up">
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
                Screen Resumes <span className="text-accent">Instantly</span>
              </h2>
              <p className="text-muted text-sm max-w-md mx-auto leading-relaxed">
                Upload a resume, paste a job description, and let AI rank the fit in seconds.
              </p>
            </div>

            {/* Form card */}
            <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 space-y-6
              animate-fade-up delay-100">

              {/* Row: Upload + JD side-by-side on md+ */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Resume upload */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-muted uppercase tracking-widest">
                    Resume File
                  </label>
                  <DropZone file={file} onFile={setFile} disabled={loading} />
                </div>

                {/* Job description */}
                <div className="space-y-2 flex flex-col">
                  <label
                    htmlFor="jobDesc"
                    className="text-xs font-mono text-muted uppercase tracking-widest"
                  >
                    Job Description
                  </label>
                  <textarea
                    id="jobDesc"
                    value={jobDescription}
                    onChange={(e) => setJobDesc(e.target.value)}
                    placeholder="Paste the full job description here — requirements, responsibilities, skills…"
                    disabled={loading}
                    rows={8}
                    className="flex-1 w-full bg-slate border border-border rounded-2xl p-4
                      text-sm text-white placeholder-muted resize-none
                      focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/20
                      transition disabled:opacity-40"
                  />
                  <p className="text-right text-xs text-muted font-mono">
                    {jobDescription.length} chars
                  </p>
                </div>
              </div>

              {/* Error */}
              {error && (
                <ErrorMessage message={error} onDismiss={() => setError("")} />
              )}

              {/* Loading state */}
              {loading && <Spinner label="Analysing resume…" />}

              {/* Submit */}
              {!loading && (
                <button
                  onClick={handleAnalyze}
                  disabled={!canSubmit}
                  className={`
                    w-full py-4 rounded-2xl font-display font-bold text-base
                    transition-all duration-200
                    ${canSubmit
                      ? "bg-accent text-ink hover:bg-accent/90 hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-accent/20"
                      : "bg-border text-muted cursor-not-allowed"}
                  `}
                >
                  Analyse Resume →
                </button>
              )}
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap justify-center gap-2 animate-fade-up delay-200">
              {[
                "Match Percentage",
                "Skills Found",
                "Missing Skills",
                "Candidate Summary",
              ].map((f) => (
                <span
                  key={f}
                  className="text-xs font-mono text-muted border border-border
                    rounded-full px-3 py-1"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-border mt-16 py-6 text-center">
        <p className="text-muted text-xs font-mono">
          ResumeIQ · Powered by OpenAI GPT-4o mini
        </p>
      </footer>
    </div>
  );
};

export default Home;
