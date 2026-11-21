"use client";

import React, { useState } from "react";
import { MILESTONES } from "@/content/experience";
import { TraceMilestone } from "@/content/types";
import MilestoneDrawer from "./MilestoneDrawer";

export default function Spans() {
  const [selectedMilestone, setSelectedMilestone] =
    useState<TraceMilestone | null>(null);

  return (
    <div className="w-full bg-[var(--bg-raised)] rounded-[12px] hairline p-5 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[var(--line)] pb-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] block mb-1">
            FEATURE F5 // SYSTEM EXECUTION SPANS
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text)] tracking-tight">
            Engineering spans waterfall
          </h3>
          <p className="text-xs text-[var(--text-muted)] font-body mt-1">
            Trace timeline from 2024 to present. Long span is education; project releases and hackathon milestones are nested child spans.
          </p>
        </div>
        <span className="font-mono text-[10px] text-[var(--text-muted)]">
          Click any span for technical breakdown
        </span>
      </div>

      {/* --- DESKTOP WATERFALL TIMELINE (hidden on mobile) --- */}
      <div className="hidden md:block relative py-4 space-y-4 font-mono text-xs">
        {/* Time Axis Bar (2024 — 2025 — 2026 — 2028) */}
        <div className="flex justify-between text-[11px] text-[var(--text-muted)] border-b border-[var(--line)] pb-2 px-1">
          <span>Jul 2024 (VIT Enrollment)</span>
          <span>2025</span>
          <span>2026 (Present)</span>
          <span>May 2028 (Graduation)</span>
        </div>

        {/* Milestone Spans Waterfall List */}
        <div className="space-y-3 pt-2">
          {MILESTONES.map((item) => {
            const isEducation = item.kind === "education";
            const isHackathon = item.kind === "hackathon";
            const isProject = item.kind === "project";

            // Relative placement offsets
            let offsetStyle = "w-full";
            if (item.id === "vit-bhopal") {
              offsetStyle = "w-full bg-[var(--bg-sunken)] border-[var(--line-strong)] text-[var(--text)]";
            } else if (item.id === "aizen-hackathon") {
              offsetStyle = "ml-[25%] w-[18%] bg-[var(--bg)] border-[var(--line)] text-[var(--text-muted)]";
            } else if (item.id === "gssoc-contributor") {
              offsetStyle = "ml-[42%] w-[25%] bg-[var(--bg-sunken)] border-[var(--line)] text-[var(--text)]";
            } else if (item.id === "socf-finalist") {
              offsetStyle = "ml-[50%] w-[22%] bg-[var(--accent)]/15 border-[var(--accent)] text-[var(--accent)] font-semibold";
            } else if (item.id === "ragforge-release") {
              offsetStyle = "ml-[55%] w-[28%] bg-[var(--signal)]/15 border-[var(--signal)] text-[var(--signal)] font-semibold";
            } else if (item.id === "nse-scanner-release") {
              offsetStyle = "ml-[62%] w-[34%] bg-[var(--signal)]/20 border-[var(--signal)] text-[var(--signal)] font-semibold";
            }

            return (
              <div key={item.id} className="w-full">
                <button
                  type="button"
                  onClick={() => setSelectedMilestone(item)}
                  className={`block text-left p-2.5 rounded-[4px] hairline text-xs transition-all hover:brightness-110 cursor-pointer ${offsetStyle}`}
                  aria-label={`Open milestone: ${item.title}`}
                >
                  <div className="flex items-center justify-between gap-2 truncate">
                    <span className="font-semibold truncate">
                      {isEducation && "🎓 "}
                      {isHackathon && "⚡ "}
                      {isProject && "● "}
                      {item.title}
                    </span>
                    <span className="text-[10px] opacity-80 shrink-0">
                      {item.start}
                    </span>
                  </div>
                  <div className="text-[10px] opacity-70 truncate mt-0.5">
                    {item.org}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- MOBILE VERTICAL TIMELINE (< md screens) --- */}
      <div className="md:hidden space-y-3">
        {MILESTONES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelectedMilestone(item)}
            className="w-full text-left p-3 rounded-[6px] bg-[var(--bg-sunken)] hairline space-y-1.5 transition-colors hover:border-[var(--line-strong)]"
          >
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[var(--accent)] uppercase font-semibold">
                {item.kind}
              </span>
              <span className="text-[var(--text-muted)] text-[10px]">
                {item.end ? `${item.start} — ${item.end}` : item.start}
              </span>
            </div>
            <div className="font-display font-bold text-sm text-[var(--text)]">
              {item.title}
            </div>
            <div className="text-xs text-[var(--text-muted)] font-body">
              {item.org}
            </div>
          </button>
        ))}
      </div>

      {/* Milestone Detail Drawer */}
      <MilestoneDrawer
        milestone={selectedMilestone}
        onClose={() => setSelectedMilestone(null)}
      />
    </div>
  );
}
