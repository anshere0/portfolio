"use client";

import { useState } from "react";
import { PROFILE_DATA } from "@/content/profile";
import { Check, Grid, BarChart3 } from "lucide-react";

export default function TechMatrixHeatmap() {
  const [viewMode, setViewMode] = useState<"matrix" | "domain">("matrix");
  const { techMatrix, technicalSkills } = PROFILE_DATA;

  // Domain categories with verifiable systems count
  const DOMAIN_EVIDENCE = [
    {
      domain: "AI / ML & Telemetry",
      count: "5 Verified Systems",
      skills: ["Gemini API", "pgvector", "XGBoost", "SHAP", "OpenAI API", "PyTorch"],
      evidence: "RAGForge (768-dim embeddings), GridGuard AI (XGBoost SHAP), AirPredict NYC, LikhAI",
    },
    {
      domain: "Backend & Systems",
      count: "6 Production Stacks",
      skills: ["FastAPI", "Express.js", "Node.js", "PostgreSQL", "Supabase", "Prisma ORM"],
      evidence: "FastAPI WebSockets gateway, multi-tenant Postgres RLS, Express CI failure listener",
    },
    {
      domain: "Frontend & Interfaces",
      count: "5 Production Stacks",
      skills: ["Next.js (App Router)", "TypeScript", "React", "Tailwind CSS", "React Flow"],
      evidence: "Webyou client deliverables, RAGForge chat widget, GridGuard GIS topology",
    },
    {
      domain: "DevOps & Infrastructure",
      count: "4 Verified Toolchains",
      skills: ["Docker", "GitHub Actions", "Vercel", "Git Version Control"],
      evidence: "Isolated Docker sandbox testing, automated CI webhook pipeline, Vercel deployments",
    },
    {
      domain: "CS Fundamentals & DSA",
      count: "120+ Problems Solved",
      skills: ["Modern C++", "Data Structures", "Algorithms", "OOP", "DBMS", "OS"],
      evidence: "LeetCode (120+ solved in C++), VIT Bhopal academic coursework with 7.51 CGPA",
    },
  ];

  return (
    <section id="skills" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 hairline-b bg-[var(--bg-paper)]">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10 hairline-b pb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 bg-[var(--signal-vermilion)] inline-block" />
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink-secondary)] font-bold">
              06 / SKILLS AS EVIDENCE
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif text-[var(--ink-primary)] tracking-tight">
            Technology × Project Proof Matrix
          </h2>
          <p className="font-mono text-xs text-[var(--ink-secondary)] mt-1">
            Empirical verification showing precisely where each technology was implemented. No arbitrary percentage bars.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 p-1 bg-[var(--bg-paper-subtle)] hairline-border font-mono text-xs">
          <button
            onClick={() => setViewMode("matrix")}
            className={`px-3 py-1.5 flex items-center gap-1.5 uppercase transition-colors ${
              viewMode === "matrix"
                ? "bg-[var(--ink-primary)] text-white"
                : "text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Matrix Heatmap</span>
          </button>
          <button
            onClick={() => setViewMode("domain")}
            className={`px-3 py-1.5 flex items-center gap-1.5 uppercase transition-colors ${
              viewMode === "domain"
                ? "bg-[var(--ink-primary)] text-white"
                : "text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Domain Breakdown</span>
          </button>
        </div>
      </div>

      {viewMode === "matrix" ? (
        /* Matrix Heatmap View */
        <div className="overflow-x-auto hairline-border bg-[var(--bg-paper-subtle)]">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="hairline-b bg-[var(--bg-paper-darker)]/70">
                <th className="p-3.5 hairline-r font-bold text-[var(--ink-primary)] uppercase min-w-[180px]">
                  Technology / Tool
                </th>
                {techMatrix.projects.map((proj) => (
                  <th
                    key={proj.slug}
                    className="p-3.5 hairline-r text-center font-bold text-[var(--ink-primary)] min-w-[110px]"
                  >
                    <a
                      href={`#${proj.slug}`}
                      className="hover:text-[var(--signal-vermilion)] transition-colors"
                    >
                      {proj.name}
                    </a>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {techMatrix.technologies.map((tech, rIdx) => (
                <tr
                  key={tech}
                  className="hairline-b hover:bg-[var(--bg-paper)] transition-colors"
                >
                  <td className="p-3 hairline-r font-medium text-[var(--ink-primary)] bg-[var(--bg-paper-subtle)]">
                    {tech}
                  </td>
                  {techMatrix.projects.map((proj) => {
                    const isUsed = proj.usedTech.some(
                      (t) => t.toLowerCase() === tech.toLowerCase() || tech.toLowerCase().includes(t.toLowerCase())
                    );

                    return (
                      <td
                        key={proj.slug}
                        className={`p-3 hairline-r text-center ${
                          isUsed ? "bg-emerald-50/50" : ""
                        }`}
                      >
                        {isUsed ? (
                          <span className="inline-flex items-center justify-center w-5 h-5 bg-[var(--signal-emerald)] text-white rounded-none text-[11px] font-bold">
                            ✓
                          </span>
                        ) : (
                          <span className="text-[var(--hairline-strong)] text-xs">·</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Domain Evidence View */
        <div className="space-y-4">
          {DOMAIN_EVIDENCE.map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-[var(--bg-paper-subtle)] hairline-border space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 hairline-b pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[var(--signal-vermilion)] font-bold">
                    0{idx + 1} //
                  </span>
                  <h4 className="font-serif text-2xl text-[var(--ink-primary)]">
                    {item.domain}
                  </h4>
                </div>
                <span className="px-3 py-1 font-mono text-xs uppercase bg-[var(--bg-paper)] hairline-border font-bold text-[var(--signal-emerald)]">
                  {item.count}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {item.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 bg-[var(--bg-paper)] hairline-border text-[var(--ink-primary)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="font-mono text-xs text-[var(--ink-secondary)] pt-1">
                <span className="text-[var(--ink-tertiary)] uppercase mr-1">
                  VERIFIED IMPLEMENTATIONS:
                </span>
                <span>{item.evidence}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
