"use client";

import React, { useState } from "react";
import LoadCurve from "@/components/features/LoadCurve";
import CommitSkyline3D from "@/components/features/CommitSkyline3D";
import ToolkitMarquee from "@/components/features/ToolkitMarquee";
import Spans from "@/components/features/Spans";
import EvidenceMatrix from "@/components/features/EvidenceMatrix";
import { CERTIFICATIONS } from "@/content/metrics";

export default function PracticeSection() {
  const [activityMode, setActivityMode] = useState<"skyline" | "oscilloscope">("skyline");

  return (
    <section
      id="practice"
      aria-label="Telemetry & Engineering Practice"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto hairline-t space-y-20"
    >
      {/* 1. The Velocity-Coupled Multi-Row Toolkit Marquee */}
      <ToolkitMarquee />

      {/* 2. Observable Practice & Activity Section Header */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text)] tracking-tight">
              Observable practice.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[var(--text-muted)] font-body leading-relaxed">
              Daily contribution telemetry rendered as an extruded 3D isometric city or smart-meter oscilloscope trace, execution milestones on a waterfall timeline, and empirical stack verification.
            </p>
          </div>

          {/* Activity Mode Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-[6px] bg-[var(--bg-sunken)] hairline font-mono text-xs shrink-0 self-start sm:self-end">
            <button
              type="button"
              onClick={() => setActivityMode("skyline")}
              className={`px-3 py-1.5 rounded-[4px] transition-colors cursor-pointer ${
                activityMode === "skyline"
                  ? "bg-[var(--accent)] text-[var(--accent-ink)] font-bold shadow-sm"
                  : "text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
            >
              3D Skyline City
            </button>
            <button
              type="button"
              onClick={() => setActivityMode("oscilloscope")}
              className={`px-3 py-1.5 rounded-[4px] transition-colors cursor-pointer ${
                activityMode === "oscilloscope"
                  ? "bg-[var(--accent)] text-[var(--accent-ink)] font-bold shadow-sm"
                  : "text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
            >
              Oscilloscope Trace
            </button>
          </div>
        </div>

        {/* Dynamic Activity Visualization: 3D Skyline City or Oscilloscope Curve */}
        {activityMode === "skyline" ? <CommitSkyline3D /> : <LoadCurve />}
      </div>

      {/* 3. Engineering Trace Waterfall Spans */}
      <Spans />

      {/* 4. Tech x Project Evidence Matrix */}
      <EvidenceMatrix />

      {/* 5. Subdued Academic Credentials & Examination Records */}
      <div className="p-5 sm:p-6 rounded-[12px] bg-[var(--bg-raised)] hairline space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[var(--line)] pb-3">
          <span className="text-xs font-sans text-[var(--text-muted)] font-medium">
            Examination records &amp; badges
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
                  View document
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
