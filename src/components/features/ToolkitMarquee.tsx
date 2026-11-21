"use client";

import React, { useEffect, useRef, useState } from "react";

interface ToolItem {
  name: string;
  category: string;
  project?: string;
}

const ROWS: ToolItem[][] = [
  // Row 1: Languages & Core Systems
  [
    { name: "C++", category: "Core DSA", project: "Algorithmic Practice" },
    { name: "Python", category: "Systems", project: "Delta Engine & ML" },
    { name: "TypeScript", category: "Frontend & Fullstack", project: "Portfolio & RAGForge" },
    { name: "Java", category: "Object Oriented", project: "VIT Coursework" },
    { name: "SQL", category: "Databases", project: "PostgreSQL & Supabase" },
    { name: "Pine Script v5", category: "Trading Systems", project: "NIFTY SMART LEAD" },
    { name: "JavaScript", category: "Web Standard", project: "Node & React" },
    { name: "Bash / Shell", category: "DevOps", project: "Linux Tooling" },
    { name: "Data Structures & Algorithms", category: "C++", project: "LeetCode & Competitive" },
  ],
  // Row 2: Real-time Telemetry & Backend
  [
    { name: "WebSockets", category: "Streaming", project: "NSE Scanner & GridGuard" },
    { name: "Server-Sent Events", category: "Streaming", project: "NSE Breadth & Ask Ansh" },
    { name: "FastAPI", category: "Backend", project: "GridGuard & Delta Options" },
    { name: "Docker", category: "Containers", project: "GridGuard & CI/CD Sandbox" },
    { name: "Node.js", category: "Runtime", project: "NSE Decoder & APIs" },
    { name: "Express.js", category: "Microservices", project: "Telemetry Ingestion" },
    { name: "Angel One SmartAPI", category: "Financial API", project: "NSE Momentum Scanner" },
    { name: "Delta Exchange API", category: "Crypto Options", project: "Options Risk Engine" },
    { name: "Linux / Ubuntu", category: "OS", project: "Production Deployment" },
  ],
  // Row 3: Machine Learning & Retrieval
  [
    { name: "XGBoost", category: "ML Classifier", project: "GridGuard AI" },
    { name: "SHAP Explainability", category: "Interpretability", project: "GridGuard Anomaly Engine" },
    { name: "pgvector", category: "Vector Store", project: "RAGForge" },
    { name: "Supabase", category: "Database & Auth", project: "RAGForge & Vector Index" },
    { name: "Gemini 3.5 Flash", category: "LLM API", project: "Ask Ansh RAG" },
    { name: "scikit-learn", category: "Machine Learning", project: "AirPredict & GridGuard" },
    { name: "NumPy & Pandas", category: "Data Science", project: "Market Tick Analysis" },
    { name: "PostgreSQL", category: "Relational DB", project: "GridGuard & RAGForge" },
    { name: "BM25 Retrieval", category: "Search Ranking", project: "Hybrid Portfolio RAG" },
  ],
  // Row 4: Modern Web & Visual Performance
  [
    { name: "Next.js 16 (Turbopack)", category: "Fullstack Framework", project: "Portfolio Architecture" },
    { name: "React 19", category: "UI Library", project: "Interactive Demos" },
    { name: "Tailwind CSS 4", category: "Styling Engine", project: "Cyanotype Design System" },
    { name: "GSAP & ScrollTrigger", category: "Choreography", project: "Pipeline Rails & Marquee" },
    { name: "Canvas 2D", category: "Graphics Engine", project: "Query Field & 3D Skyline" },
    { name: "View Transitions API", category: "Web Standard", project: "Blueprint Theme Wipe" },
    { name: "Zod", category: "Schema Validation", project: "Contact & API Routes" },
    { name: "Vercel", category: "Edge Delivery", project: "Production Hosting" },
    { name: "Chrome MV3", category: "Browser Extension", project: "Delta Options Execution" },
  ],
];

export default function ToolkitMarquee() {
  const [activeTool, setActiveTool] = useState<ToolItem | null>(null);
  const scrollVelocityRef = useRef(1);
  const lastScrollYRef = useRef(0);
  const marqueeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let animId: number;
    let offsets = [0, 0, 0, 0];
    const speeds = [-0.6, 0.7, -0.55, 0.65]; // Alternating row directions

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollYRef.current);
      lastScrollYRef.current = currentScrollY;
      // Boost velocity on fast scroll
      scrollVelocityRef.current = Math.min(1 + delta * 0.12, 4.5);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const animate = () => {
      // Lerp velocity back to 1.0 smoothly
      scrollVelocityRef.current += (1.0 - scrollVelocityRef.current) * 0.04;

      marqueeRefs.current.forEach((el, idx) => {
        if (!el) return;
        offsets[idx] += speeds[idx] * scrollVelocityRef.current;
        // Infinite seamless loop wrap
        const halfWidth = el.scrollWidth / 2;
        if (halfWidth > 0) {
          if (offsets[idx] <= -halfWidth) offsets[idx] += halfWidth;
          if (offsets[idx] >= 0) offsets[idx] -= halfWidth;
          el.style.transform = `translate3d(${offsets[idx]}px, 0, 0)`;
        }
      });

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative w-full py-12 space-y-6 overflow-hidden select-none">
      {/* Header (matching Pranav's screenshot) */}
      <div className="text-center space-y-2 max-w-3xl mx-auto px-4">
        <h3 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--text)] uppercase">
          THE TOOLKIT
        </h3>
        <p className="text-sm sm:text-base text-[var(--text-muted)] font-body">
          What I reach for. Scroll faster and it moves faster.
        </p>
      </div>

      {/* Marquee Rows Container */}
      <div className="relative w-full space-y-3 py-4">
        {/* Left & Right Fade Masks */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[var(--bg)] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[var(--bg)] to-transparent z-10 pointer-events-none" />

        {ROWS.map((row, rowIdx) => {
          // Double the items for seamless infinite conveyor wrapping
          const doubledRow = [...row, ...row];
          return (
            <div key={rowIdx} className="overflow-hidden whitespace-nowrap">
              <div
                ref={(el) => {
                  marqueeRefs.current[rowIdx] = el;
                }}
                className="inline-flex items-center gap-2.5 sm:gap-3 will-change-transform"
              >
                {doubledRow.map((tool, itemIdx) => {
                  const isHovered = activeTool?.name === tool.name;
                  return (
                    <button
                      key={`${rowIdx}-${itemIdx}`}
                      type="button"
                      onMouseEnter={() => setActiveTool(tool)}
                      onMouseLeave={() => setActiveTool(null)}
                      className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-body transition-all duration-150 cursor-pointer ${
                        isHovered
                          ? "bg-[var(--accent)] text-[var(--accent-ink)] font-bold scale-105 shadow-lg shadow-[var(--accent)]/20"
                          : "bg-[var(--bg-raised)] text-[var(--text)] hairline hover:border-[var(--signal)] hover:text-[var(--signal)]"
                      }`}
                    >
                      <span>{tool.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Tool Details Floating Banner */}
      <div className="h-10 flex items-center justify-center">
        {activeTool ? (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--bg-raised)] hairline font-mono text-xs text-[var(--text)] shadow-md animate-fade-in">
            <span className="font-bold text-[var(--accent)]">{activeTool.name}</span>
            <span className="text-[var(--text-muted)]">•</span>
            <span className="text-[var(--signal)]">{activeTool.category}</span>
            {activeTool.project && (
              <>
                <span className="text-[var(--text-muted)]">•</span>
                <span className="text-[var(--text-muted)]">Used in: {activeTool.project}</span>
              </>
            )}
          </div>
        ) : (
          <span className="text-xs font-mono text-[var(--text-muted)]">
            Hover any tool to inspect implementations across systems
          </span>
        )}
      </div>
    </div>
  );
}
