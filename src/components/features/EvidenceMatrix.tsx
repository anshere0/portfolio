"use client";

import React, { useState } from "react";
import Tag from "@/components/ui/Tag";

interface TechRow {
  name: string;
  domain: "Streaming & Telemetry" | "Retrieval & ML" | "Systems & Infrastructure" | "Algorithms (C++)";
  projects: string[]; // Slugs of implementing projects
}

const MATRIX_PROJECTS = [
  { slug: "nse-scanner", name: "NSE Scanner" },
  { slug: "gridguard", name: "GridGuard AI" },
  { slug: "ragforge", name: "RAGForge" },
  { slug: "delta-options", name: "Delta Options" },
  { slug: "nifty-lead", name: "NIFTY LEAD" },
  { slug: "cicd", name: "CI/CD Sandbox" },
  { slug: "rca", name: "RCA Copilot" },
];

const MATRIX_TECHS: TechRow[] = [
  {
    name: "Modern C++ (Core DSA)",
    domain: "Algorithms (C++)",
    projects: ["nse-scanner"],
  },
  {
    name: "Python",
    domain: "Retrieval & ML",
    projects: ["gridguard", "delta-options"],
  },
  {
    name: "TypeScript",
    domain: "Systems & Infrastructure",
    projects: ["nse-scanner", "ragforge", "cicd", "rca"],
  },
  {
    name: "Next.js (App Router)",
    domain: "Systems & Infrastructure",
    projects: ["gridguard", "ragforge", "rca"],
  },
  {
    name: "FastAPI",
    domain: "Systems & Infrastructure",
    projects: ["gridguard", "delta-options"],
  },
  {
    name: "WebSockets",
    domain: "Streaming & Telemetry",
    projects: ["nse-scanner", "gridguard", "delta-options"],
  },
  {
    name: "Server-Sent Events (SSE)",
    domain: "Streaming & Telemetry",
    projects: ["nse-scanner"],
  },
  {
    name: "PostgreSQL & pgvector",
    domain: "Retrieval & ML",
    projects: ["ragforge", "gridguard", "cicd"],
  },
  {
    name: "XGBoost & SHAP",
    domain: "Retrieval & ML",
    projects: ["gridguard"],
  },
  {
    name: "Docker Sandboxing",
    domain: "Systems & Infrastructure",
    projects: ["gridguard", "cicd"],
  },
  {
    name: "Pine Script v5",
    domain: "Streaming & Telemetry",
    projects: ["nifty-lead"],
  },
  {
    name: "node:test (Zero Bias)",
    domain: "Systems & Infrastructure",
    projects: ["nse-scanner"],
  },
];

export default function EvidenceMatrix() {
  const [viewMode, setViewMode] = useState<"matrix" | "domain">("matrix");
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const domains = [
    "Streaming & Telemetry",
    "Retrieval & ML",
    "Systems & Infrastructure",
    "Algorithms (C++)",
  ] as const;

  return (
    <div className="w-full bg-[var(--bg-raised)] rounded-[12px] hairline p-5 sm:p-6 space-y-6">
      {/* Header & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--line)] pb-4">
        <div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text)] tracking-tight">
            Technology × project evidence matrix
          </h3>
          <p className="text-xs text-[var(--text-muted)] font-body mt-1">
            Bidirectional cross-verification: hover a technology to see which systems implement it, or hover a system to inspect its stack.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 p-1 rounded-[4px] bg-[var(--bg-sunken)] hairline font-mono text-xs">
          <button
            type="button"
            onClick={() => setViewMode("matrix")}
            className={`px-3 py-1 rounded-[3px] transition-colors cursor-pointer ${
              viewMode === "matrix"
                ? "bg-[var(--accent)] text-[var(--accent-ink)] font-bold"
                : "text-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            Matrix
          </button>
          <button
            type="button"
            onClick={() => setViewMode("domain")}
            className={`px-3 py-1 rounded-[3px] transition-colors cursor-pointer ${
              viewMode === "domain"
                ? "bg-[var(--accent)] text-[var(--accent-ink)] font-bold"
                : "text-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            Domains
          </button>
        </div>
      </div>

      {viewMode === "matrix" ? (
        /* Matrix Heatmap Table */
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-[var(--line)] text-[var(--text-muted)] text-[11px]">
                <th className="py-2.5 px-3 min-w-[200px]">Technology / Tool</th>
                {MATRIX_PROJECTS.map((proj) => {
                  const isColHovered = hoveredProject === proj.slug;

                  return (
                    <th
                      key={proj.slug}
                      onMouseEnter={() => setHoveredProject(proj.slug)}
                      onMouseLeave={() => setHoveredProject(null)}
                      className={`py-2.5 px-2 text-center transition-colors cursor-pointer ${
                        isColHovered
                          ? "bg-[var(--signal)]/15 text-[var(--signal)] font-bold"
                          : "text-[var(--text-muted)] hover:text-[var(--text)]"
                      }`}
                    >
                      {proj.name}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {MATRIX_TECHS.map((tech) => {
                const isRowHovered = hoveredTech === tech.name;

                return (
                  <tr
                    key={tech.name}
                    onMouseEnter={() => setHoveredTech(tech.name)}
                    onMouseLeave={() => setHoveredTech(null)}
                    className={`border-b border-[var(--line)]/60 transition-colors ${
                      isRowHovered ? "bg-[var(--bg-sunken)]" : ""
                    }`}
                  >
                    <td className="py-2.5 px-3 font-semibold text-[var(--text)] truncate">
                      {tech.name}
                    </td>

                    {MATRIX_PROJECTS.map((proj) => {
                      const hasTech = tech.projects.includes(proj.slug);
                      const isHighlighted =
                        (isRowHovered && hasTech) ||
                        (hoveredProject === proj.slug && hasTech);

                      return (
                        <td
                          key={proj.slug}
                          className={`py-2.5 px-2 text-center transition-colors ${
                            isHighlighted ? "bg-[var(--signal)]/20" : ""
                          }`}
                        >
                          {hasTech ? (
                            <span
                              className={`inline-block w-2.5 h-2.5 rounded-full ${
                                isHighlighted
                                  ? "bg-[var(--accent)] shadow-[0_0_6px_var(--accent)]"
                                  : "bg-[var(--signal)]"
                              }`}
                              aria-label={`Implemented in ${proj.name}`}
                            />
                          ) : (
                            <span className="text-[var(--line-strong)] select-none">
                              ·
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* Domain Breakdown View */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {domains.map((domain) => {
            const techsInDomain = MATRIX_TECHS.filter((t) => t.domain === domain);

            return (
              <div
                key={domain}
                className="p-4 rounded-[6px] bg-[var(--bg-sunken)] hairline space-y-3"
              >
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-2 font-mono text-xs">
                  <span className="font-bold text-[var(--text)]">{domain}</span>
                  <span className="text-[var(--accent)] text-[11px]">
                    {techsInDomain.length} verified stacks
                  </span>
                </div>

                <div className="space-y-2">
                  {techsInDomain.map((t) => (
                    <div
                      key={t.name}
                      className="flex items-center justify-between text-xs font-body"
                    >
                      <span className="text-[var(--text)] font-mono">{t.name}</span>
                      <div className="flex gap-1">
                        {t.projects.map((pSlug) => {
                          const p = MATRIX_PROJECTS.find((mp) => mp.slug === pSlug);
                          return (
                            <Tag key={pSlug} variant="outline" className="text-[10px] py-0 px-1.5">
                              {p?.name || pSlug}
                            </Tag>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
