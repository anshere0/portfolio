"use client";

import React, { useEffect } from "react";
import Drawer from "@/components/ui/Drawer";
import { TraceMilestone } from "@/content/types";
import Tag from "@/components/ui/Tag";

interface MilestoneDrawerProps {
  milestone: TraceMilestone | null;
  onClose: () => void;
}

export default function MilestoneDrawer({
  milestone,
  onClose,
}: MilestoneDrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (milestone) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [milestone, onClose]);

  if (!milestone) return null;

  return (
    <Drawer isOpen={!!milestone} onClose={onClose} title="Milestone Architecture Detail">
      <div className="space-y-6 font-body text-sm">
        {/* Title & Organization Header */}
        <div className="p-4 rounded-[4px] bg-[var(--bg-sunken)] hairline space-y-1">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)]">
              {milestone.kind}
            </span>
            <Tag variant={milestone.accent ? "signal" : "default"}>
              {milestone.end ? `${milestone.start} — ${milestone.end}` : milestone.start}
            </Tag>
          </div>
          <h3 className="font-display font-bold text-lg text-[var(--text)]">
            {milestone.title}
          </h3>
          <p className="text-xs text-[var(--text-muted)]">{milestone.org}</p>
        </div>

        {/* Concrete Technical Outcomes */}
        <div className="space-y-3">
          <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
            Technical Outcomes &amp; Responsibilities
          </h4>
          <ul className="space-y-2.5">
            {milestone.bullets.map((bullet, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text)] leading-relaxed"
              >
                <span className="text-[var(--signal)] font-mono select-none">▸</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Verifiable Artifact Links */}
        {milestone.links && milestone.links.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-[var(--line)]">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
              Verifiable Evidence
            </h4>
            <div className="space-y-2">
              {milestone.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-[4px] bg-[var(--bg-raised)] hairline hover:bg-[var(--bg-sunken)] transition-colors text-xs text-[var(--text)] group"
                >
                  <span className="font-medium">{link.label}</span>
                  <span className="text-[var(--accent)] group-hover:underline">
                    Open document →
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
}
