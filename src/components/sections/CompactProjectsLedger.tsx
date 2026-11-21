"use client";

import React from "react";
import { COMPACT_PROJECTS } from "@/content/projects";
import Tag from "@/components/ui/Tag";

export default function CompactProjectsLedger() {
  return (
    <section className="pt-16 pb-8" aria-label="Extended Systems Ledger">
      <div className="max-w-2xl mb-8">
        <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text)] tracking-tight">
          Additional systems &amp; tooling
        </h3>
        <p className="mt-1 text-sm text-[var(--text-muted)] font-body">
          Algorithmic indicators, automated developer tooling, and incident diagnosis systems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {COMPACT_PROJECTS.map((project) => (
          <div
            key={project.slug}
            className="flex flex-col justify-between p-5 rounded-[8px] bg-[var(--bg-raised)] hairline space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--text-muted)] font-body">
                  {project.stack[0]}
                </span>
                <Tag variant={project.status === "live" ? "accent" : "outline"}>
                  {project.status}
                </Tag>
              </div>

              <div>
                <h4 className="font-display font-semibold text-base text-[var(--text)] tracking-tight">
                  {project.name}
                </h4>
                <p className="text-xs text-[var(--text-muted)] font-body mt-1">
                  {project.tagline}
                </p>
              </div>

              <p className="text-xs text-[var(--text)] font-body leading-relaxed">
                {project.summary}
              </p>
            </div>

            <div className="space-y-3 pt-2 border-t border-[var(--line)]">
              <div className="flex flex-wrap gap-1">
                {project.stack.map((tech) => (
                  <Tag key={tech} variant="outline">
                    {tech}
                  </Tag>
                ))}
              </div>

              <div className="flex items-center gap-3 text-xs font-body pt-1">
                {project.links.source && (
                  <a
                    href={project.links.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text)] hover:text-[var(--accent)] underline underline-offset-4"
                  >
                    GitHub
                  </a>
                )}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text)] hover:text-[var(--accent)] underline underline-offset-4"
                  >
                    Live deployment
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
