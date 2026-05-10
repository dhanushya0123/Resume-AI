// src/components/SkillTag.jsx
import React from "react";

/**
 * Pill badge for a single skill.
 * variant: "found" | "missing"
 */
const SkillTag = ({ skill, variant = "found" }) => {
  const styles = {
    found:   "bg-accent/10   text-accent  border-accent/25",
    missing: "bg-warn/10    text-warn    border-warn/25",
  };

  const dot = {
    found:   "bg-accent",
    missing: "bg-warn",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs
        font-mono font-medium border ${styles[variant]} animate-fade-up`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dot[variant]}`} />
      {skill}
    </span>
  );
};

export default SkillTag;
