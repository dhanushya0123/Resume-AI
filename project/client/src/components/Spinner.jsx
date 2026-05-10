// src/components/Spinner.jsx
import React from "react";

/**
 * Animated loading spinner with optional label.
 */
const Spinner = ({ label = "Analysing…" }) => (
  <div className="flex flex-col items-center justify-center gap-4 py-10">
    {/* Outer ring */}
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 rounded-full border-4 border-border" />
      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-accent animate-spin" />
      {/* Inner pulse */}
      <div className="absolute inset-3 rounded-full bg-accent/20 animate-pulse" />
    </div>

    <div className="text-center space-y-1">
      <p className="font-display font-semibold text-white text-sm">{label}</p>
      <p className="text-muted text-xs">Comparing resume with job description…</p>
    </div>
  </div>
);

export default Spinner;
