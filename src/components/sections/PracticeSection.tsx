"use client";

import React from "react";
import CommitSkyline3D from "@/components/features/CommitSkyline3D";
import ToolkitMarquee from "@/components/features/ToolkitMarquee";
import { CERTIFICATIONS } from "@/content/metrics";

export default function PracticeSection() {
  return (
    <section
      id="practice"
      aria-label="Toolkit & 3D GitHub Telemetry"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto hairline-t space-y-24"
    >
      {/* 1. The Velocity-Coupled Multi-Row Toolkit Marquee (matching Pranav's screenshot) */}
      <ToolkitMarquee />

      {/* 2. Interactive Three.js 3D Commit City */}
      <div className="space-y-6">
        <CommitSkyline3D />
      </div>

      {/* 3. Verified Academic Credentials & Examination Records */}
      <div className="p-6 sm:p-8 rounded-[16px] bg-[#121420] hairline border border-white/5 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[var(--line)] pb-4">
          <div>
            <h4 className="text-lg font-bold font-display text-white">
              Course examinations &amp; badges
            </h4>
            <p className="text-xs text-[var(--text-muted)] font-body mt-0.5">
              Verified examination scores and university milestones
            </p>
          </div>
          <span className="font-mono text-xs text-[var(--signal)]">
            CGPA: 7.79 · B.Tech CSE (AI/ML)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="p-4 rounded-[10px] bg-[#0A0B10] hairline border border-white/5 flex items-center justify-between gap-4 hover:border-[var(--signal)]/30 transition-colors"
            >
              <div className="truncate">
                <span className="font-bold text-white block truncate text-sm">
                  {cert.title}
                </span>
                <span className="text-xs text-[var(--text-muted)] mt-0.5 block">
                  {cert.issuer} ({cert.date})
                </span>
              </div>

              {cert.fileUrl && (
                <a
                  href={cert.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 px-3 py-1 rounded-full bg-[var(--bg-sunken)] hairline text-xs text-[var(--accent)] hover:text-white transition-colors"
                >
                  View credential
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
