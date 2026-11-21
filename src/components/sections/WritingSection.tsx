"use client";

import React from "react";
import { TECHNICAL_NOTES } from "@/content/writing";
import Tag from "@/components/ui/Tag";

export default function WritingSection() {
  return (
    <section
      id="writing"
      aria-label="Technical Writing & Architecture Notes"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto hairline-t space-y-12"
    >
      {/* Section Header */}
      <div className="max-w-3xl">
        <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] block mb-2">
          SYSTEM DESIGN &amp; POST-MORTEMS
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text)] tracking-tight">
          Technical notes.
        </h2>
        <p className="mt-3 text-base sm:text-lg text-[var(--text-muted)] font-body leading-relaxed">
          Deep architectural breakdowns on streaming binary telemetry, multi-tenant
          vector windowing, and low-latency anomaly explainability.
        </p>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TECHNICAL_NOTES.map((note) => (
          <article
            key={note.slug}
            className="flex flex-col justify-between p-6 rounded-[8px] bg-[var(--bg-raised)] hairline space-y-5"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-[11px] text-[var(--text-muted)] border-b border-[var(--line)] pb-3">
                <span>{note.date}</span>
                <span className="text-[var(--accent)]">{note.readTime}</span>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-display text-lg font-bold text-[var(--text)] tracking-tight leading-snug">
                  {note.title}
                </h3>
                <p className="font-mono text-xs text-[var(--text-muted)] leading-relaxed">
                  {note.subtitle}
                </p>
              </div>

              <p className="font-body text-xs sm:text-sm text-[var(--text)] leading-relaxed">
                {note.summary}
              </p>

              {/* Core System Takeaways */}
              <div className="space-y-2 pt-2 border-t border-[var(--line)]">
                <span className="font-mono text-[10px] text-[var(--accent)] uppercase tracking-wider block">
                  SYSTEM TAKEAWAYS
                </span>
                <ul className="space-y-1.5 font-body text-xs text-[var(--text-muted)]">
                  {note.takeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                      <span className="text-[var(--signal)] font-mono select-none">▸</span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--line)] flex flex-wrap gap-1">
              {note.tags.map((tag) => (
                <Tag key={tag} variant="outline">
                  {tag}
                </Tag>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
