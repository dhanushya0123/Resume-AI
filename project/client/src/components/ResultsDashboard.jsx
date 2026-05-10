// src/components/ResultsDashboard.jsx
import React from "react";
import ScoreGauge from "./ScoreGauge";
import SkillTag from "./SkillTag";

/**
 * Full results panel shown after successful API response.
 */
const ResultsDashboard = ({ data, onReset }) => {
  const { fileName, matchPercentage, skillsFound, missingSkills, summary } = data;

  return (
    <div className="space-y-5">

      {/* ── Header ─────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-xl text-white">Analysis Complete</h2>
          <p className="text-muted text-xs mt-0.5 font-mono truncate max-w-xs">{fileName}</p>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-muted hover:text-white transition px-3 py-1.5
            border border-border rounded-lg hover:border-accent/50"
        >
          ← New Analysis
        </button>
      </div>

      {/* ── Score Card ─────────────────────────────── */}
      <div className="bg-card border border-border rounded-2xl p-6 flex justify-center
        animate-fade-up">
        <ScoreGauge score={matchPercentage} />
      </div>

      {/* ── Summary ────────────────────────────────── */}
      <div className="bg-card border border-border rounded-2xl p-5 animate-fade-up delay-100">
        <p className="text-xs font-mono text-sky uppercase tracking-widest mb-3">
          Candidate Summary
        </p>
        <p className="text-sm text-gray-300 leading-relaxed">{summary}</p>
      </div>

      {/* ── Skills Grid ────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Skills Found */}
        <div className="bg-card border border-border rounded-2xl p-5 animate-fade-up delay-200">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-accent inline-block" />
            <p className="text-xs font-mono text-accent uppercase tracking-widest">
              Skills Found
            </p>
            <span className="ml-auto text-xs font-mono text-muted">
              {skillsFound.length}
            </span>
          </div>
          {skillsFound.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {skillsFound.map((s, i) => (
                <SkillTag key={i} skill={s} variant="found" />
              ))}
            </div>
          ) : (
            <p className="text-muted text-xs italic">No matching skills detected.</p>
          )}
        </div>

        {/* Missing Skills */}
        <div className="bg-card border border-border rounded-2xl p-5 animate-fade-up delay-300">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-warn inline-block" />
            <p className="text-xs font-mono text-warn uppercase tracking-widest">
              Missing Skills
            </p>
            <span className="ml-auto text-xs font-mono text-muted">
              {missingSkills.length}
            </span>
          </div>
          {missingSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {missingSkills.map((s, i) => (
                <SkillTag key={i} skill={s} variant="missing" />
              ))}
            </div>
          ) : (
            <p className="text-muted text-xs italic">All required skills are present! 🎉</p>
          )}
        </div>
      </div>

      {/* ── Stats Bar ──────────────────────────────── */}
      <div className="grid grid-cols-3 gap-3 animate-fade-up delay-400">
        {[
          { label: "Match",   value: `${matchPercentage}%`, color: "text-accent" },
          { label: "Present", value: skillsFound.length,    color: "text-sky"    },
          { label: "Missing", value: missingSkills.length,  color: "text-warn"   },
        ].map(({ label, value, color }) => (
          <div key={label}
            className="bg-card border border-border rounded-xl p-4 text-center">
            <p className={`font-display font-bold text-2xl ${color}`}>{value}</p>
            <p className="text-muted text-xs mt-0.5">{label}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ResultsDashboard;
