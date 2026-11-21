"use client";

import React from "react";
import LoadCurve from "@/components/features/LoadCurve";
import Spans from "@/components/features/Spans";
import EvidenceMatrix from "@/components/features/EvidenceMatrix";
import { CERTIFICATIONS } from "@/content/metrics";

export default function PracticeSection() {
  return (
    <section
      id="practice"
      aria-label="Telemetry & Engineering Practice"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto hairline-t space-y-16"
    >
      {/* Section Header */}
      <div className="max-w-3xl">
        <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] block mb-2">
          TELEMETRY &amp; EMPIRICAL EVIDENCE
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text)] tracking-tight">
          Observable practice.
        </h2>
        <p className="mt-3 text-base sm:text-lg text-[var(--text-muted)] font-body leading-relaxed">
          Daily contribution frequency measured as a smart-meter profile, execution
          milestones traced on a waterfall timeline, and empirical technology verification.
        </p>
      </div>

      {/* 1. Oscilloscope Commit Load Curve */}
      <LoadCurve />

      {/* 2. Engineering Trace Waterfall Spans */}
      <Spans />

      {/* 3. Tech x Project Evidence Matrix */}
      <EvidenceMatrix />

      {/* 4. Subdued Academic Credentials & Examination Records */}
      <div className="p-5 sm:p-6 rounded-[12px] bg-[var(--bg-raised)] hairline space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[var(--line)] pb-3">
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
            CERTIFICATIONS &amp; EXAMINATION LEDGER
          </span>
          <span className="font-mono text-[10px] text-[var(--text-muted)]">
            Verified course examination scores
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="p-3 rounded-[4px] bg-[var(--bg-sunken)] hairline flex items-center justify-between gap-3"
            >
              <div className="truncate">
                <span className="font-semibold text-[var(--text)] block truncate">
                  {cert.title}
                </span>
                <span className="text-[10px] text-[var(--text-muted)]">
                  {cert.issuer} ({cert.date})
                </span>
              </div>

              {cert.fileUrl && (
                <a
                  href={cert.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-xs text-[var(--accent)] hover:underline"
                >
                  Document →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
