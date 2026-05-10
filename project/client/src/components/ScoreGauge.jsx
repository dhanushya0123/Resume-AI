// src/components/ScoreGauge.jsx
import React from "react";

/**
 * Circular SVG gauge showing the match percentage.
 * Colour shifts from red → amber → emerald based on score.
 */
const ScoreGauge = ({ score }) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color =
    score >= 75 ? "#6EE7B7"   // emerald — strong match
    : score >= 45 ? "#FCD34D" // amber   — partial match
    : "#FCA5A5";               // red     — weak match

  const label =
    score >= 75 ? "Strong Match"
    : score >= 45 ? "Partial Match"
    : "Weak Match";

  return (
    <div className="flex flex-col items-center gap-3 animate-fade-up">
      <svg width="140" height="140" className="rotate-[-90deg]">
        {/* Track */}
        <circle cx="70" cy="70" r={radius} fill="none" stroke="#2E3140" strokeWidth="10" />
        {/* Progress */}
        <circle
          cx="70" cy="70" r={radius} fill="none"
          stroke={color} strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>

      {/* Centre text (counter-rotated) */}
      <div
        className="absolute flex flex-col items-center"
        style={{ color }}
      >
        <span className="font-display font-extrabold text-4xl leading-none">{score}</span>
        <span className="text-xs font-mono text-muted">/ 100</span>
      </div>

      {/* Label below gauge */}
      <div className="text-center -mt-1">
        <p className="font-display font-semibold text-white text-base">{label}</p>
        <p className="text-muted text-xs">Match Percentage</p>
      </div>
    </div>
  );
};

// Wrapper keeps SVG centred with absolute label
const ScoreGaugeWrapper = ({ score }) => (
  <div className="relative flex flex-col items-center">
    <ScoreGauge score={score} />
  </div>
);

export default ScoreGaugeWrapper;
