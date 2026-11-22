"use client";

import React from "react";
import CommitSkyline3D from "@/components/features/CommitSkyline3D";
import ToolkitMarquee from "@/components/features/ToolkitMarquee";
import InteractiveTerminal from "@/components/features/InteractiveTerminal";
import { CERTIFICATIONS } from "@/content/metrics";

export default function PracticeSection() {
  return (
    <section
      id="practice"
      aria-label="Toolkit, 3D GitHub Telemetry & Interactive Terminal"
      className="w-full hairline-t space-y-24"
    >
      {/* 1. The Velocity-Coupled Multi-Row Toolkit Marquee (Full Bleed) */}
      <ToolkitMarquee />

      {/* 2. Interactive Three.js 3D Commit City (Full Bleed Scroll-Driven Experience) */}
      <div className="w-full">
        <CommitSkyline3D />
      </div>

      {/* 3. Interactive Shell & Retro Sandbox Terminal */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="max-w-2xl">
          <div className="text-xs font-mono text-[var(--signal)] uppercase tracking-widest mb-1">
            Live Sandbox
          </div>
          <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Interactive shell &amp; terminal.
          </h3>
          <p className="text-sm sm:text-base text-[var(--text-muted)] font-body mt-2 leading-relaxed">
            Test commands, inspect system architecture, or switch to the retro Snake game directly in the browser shell.
          </p>
        </div>

        <InteractiveTerminal />
      </div>

      {/* 4. Verified Academic Credentials & Examination Records */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
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
      </div>
    </section>
  );
}
