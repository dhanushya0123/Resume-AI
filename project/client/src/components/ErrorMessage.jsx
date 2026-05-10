// src/components/ErrorMessage.jsx
import React from "react";

/**
 * Styled error alert banner.
 */
const ErrorMessage = ({ message, onDismiss }) => (
  <div className="flex items-start gap-3 bg-warn/10 border border-warn/30
    rounded-xl p-4 animate-fade-up">
    <span className="text-warn text-lg mt-0.5 shrink-0">⚠</span>
    <div className="flex-1 min-w-0">
      <p className="text-warn text-sm font-medium">Something went wrong</p>
      <p className="text-warn/80 text-xs mt-0.5 leading-relaxed">{message}</p>
    </div>
    {onDismiss && (
      <button
        onClick={onDismiss}
        className="text-warn/60 hover:text-warn transition text-lg leading-none shrink-0"
        aria-label="Dismiss error"
      >
        ×
      </button>
    )}
  </div>
);

export default ErrorMessage;
