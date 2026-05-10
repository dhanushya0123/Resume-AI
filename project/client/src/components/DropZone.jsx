// src/components/DropZone.jsx
import React, { useCallback, useState } from "react";

/**
 * Drag-and-drop + click-to-upload file input.
 * Accepts PDF, DOC, DOCX up to 5 MB.
 */
const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_MB = 5;

const DropZone = ({ file, onFile, disabled }) => {
  const [dragging, setDragging] = useState(false);
  const [localError, setLocalError] = useState("");

  const validate = (f) => {
    setLocalError("");
    if (!ACCEPTED_TYPES.includes(f.type)) {
      setLocalError("Unsupported format. Use PDF, DOC, or DOCX.");
      return false;
    }
    if (f.size > MAX_MB * 1024 * 1024) {
      setLocalError(`File exceeds ${MAX_MB} MB limit.`);
      return false;
    }
    return true;
  };

  const handleFile = useCallback(
    (f) => {
      if (f && validate(f)) onFile(f);
    },
    [onFile]
  );

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  const onInputChange = (e) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  const extBadge = file?.name.split(".").pop().toUpperCase();

  return (
    <div className="space-y-2">
      <label
        htmlFor="resumeInput"
        onDragOver={(e) => { e.preventDefault(); !disabled && setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`
          flex flex-col items-center justify-center gap-3
          border-2 border-dashed rounded-2xl p-8 cursor-pointer
          transition-all duration-200 select-none
          ${disabled ? "opacity-40 cursor-not-allowed" : "hover:border-accent hover:bg-accent/5"}
          ${dragging ? "drag-active" : "border-border bg-slate"}
          ${file ? "border-accent/50 bg-accent/5" : ""}
        `}
      >
        {/* Icon */}
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl
          ${file ? "bg-accent/20 text-accent" : "bg-border/50 text-muted"}`}>
          {file ? "📄" : "⬆️"}
        </div>

        {file ? (
          <div className="text-center">
            <p className="font-display font-semibold text-white text-sm">{file.name}</p>
            <p className="text-muted text-xs mt-1">
              <span className="text-accent font-mono font-medium">.{extBadge}</span>
              {" · "}
              {(file.size / 1024).toFixed(0)} KB
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p className="font-display font-semibold text-white text-sm">
              Drop your resume here
            </p>
            <p className="text-muted text-xs mt-1">
              PDF, DOC, DOCX · Max 5 MB
            </p>
          </div>
        )}

        {/* Change label */}
        {file && (
          <span className="text-xs text-accent/70 underline underline-offset-2">
            Click to change
          </span>
        )}
      </label>

      {/* Hidden file input */}
      <input
        id="resumeInput"
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={onInputChange}
        disabled={disabled}
      />

      {/* Local validation error */}
      {localError && (
        <p className="text-warn text-xs flex items-center gap-1.5">
          <span>⚠</span> {localError}
        </p>
      )}
    </div>
  );
};

export default DropZone;
