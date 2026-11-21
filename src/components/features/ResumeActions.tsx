"use client";

import React from "react";

export function ResumeActions() {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={handlePrint}
        className="px-3 py-1.5 rounded-[4px] hairline text-xs font-mono text-[var(--text)] hover:bg-[var(--bg-raised)] transition-colors cursor-pointer"
        aria-label="Print résumé"
      >
        Print résumé (Ctrl+P)
      </button>
      <a
        href="/Ansh_Arora_Resume.pdf"
        download="Ansh_Arora_Resume.pdf"
        className="px-4 py-1.5 rounded-[4px] bg-[var(--accent)] text-[var(--accent-ink)] text-xs font-mono font-bold hover:brightness-105 transition-all"
      >
        Download PDF
      </a>
    </div>
  );
}
