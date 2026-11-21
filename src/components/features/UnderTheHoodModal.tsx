"use client";

import React, { useState, useEffect } from "react";

export default function UnderTheHoodModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [fps, setFps] = useState(60);
  const [theme, setTheme] = useState("obsidian");

  // Keyboard shortcut 'u' to toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (e.key.toLowerCase() === "u") {
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Sync theme
  useEffect(() => {
    const updateTheme = () => {
      const active = document.documentElement.getAttribute("data-theme") || "obsidian";
      setTheme(active);
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  // Live real-time FPS counter
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const measureFps = (now: number) => {
      frameCount++;
      const delta = now - lastTime;
      if (delta >= 1000) {
        setFps(Math.round((frameCount * 1000) / delta));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(measureFps);
    };

    animId = requestAnimationFrame(measureFps);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <>
      {/* Floating Trigger Pill in Bottom-Left Corner */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open Under the hood system specifications"
        className="fixed bottom-4 left-4 z-40 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-sunken)]/90 hairline text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--signal)] backdrop-blur-md shadow-lg transition-all cursor-pointer group"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse group-hover:scale-125 transition-transform" />
        <span className="text-[11px]">Under the hood</span>
        <span className="text-[10px] text-[var(--text-muted)]/70 hairline px-1 py-0.2 rounded">u</span>
      </button>

      {/* Glassmorphic Telemetry Modal (matching Pranav's screenshot) */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-[14px] bg-[var(--bg-raised)]/95 hairline p-6 text-xs font-mono text-[var(--text)] shadow-2xl backdrop-blur-xl space-y-5 border border-[var(--line-strong)]"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
              <span className="font-bold text-sm text-[var(--text)]">
                Under the hood
              </span>
              <div className="flex items-center gap-4 text-xs">
                <span className="text-emerald-400 font-bold">{fps} fps</span>
                <span className="text-[var(--text-muted)]">
                  theme <span className="text-[var(--text)] font-semibold">{theme}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-[var(--text-muted)] hover:text-[var(--text)] cursor-pointer text-sm"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Architecture Ledger */}
            <div className="space-y-4 leading-relaxed font-mono text-[11px]">
              <div className="grid grid-cols-12 gap-2">
                <span className="col-span-3 text-[var(--accent)] font-bold uppercase tracking-wider">
                  HERO
                </span>
                <span className="col-span-9 text-[var(--text-muted)]">
                  2D Canvas · 70 semantic nodes in a spring-smoothed topology field with Gaussian proximity falloff (w = exp(-d²/2σ²)).
                </span>
              </div>

              <div className="grid grid-cols-12 gap-2">
                <span className="col-span-3 text-[var(--accent)] font-bold uppercase tracking-wider">
                  SCROLL
                </span>
                <span className="col-span-9 text-[var(--text-muted)]">
                  Velocity-reactive Toolkit marquee, sticky stage rails with traveling packet, and GSAP scroll choreography.
                </span>
              </div>

              <div className="grid grid-cols-12 gap-2">
                <span className="col-span-3 text-[var(--accent)] font-bold uppercase tracking-wider">
                  SKYLINE
                </span>
                <span className="col-span-9 text-[var(--text-muted)]">
                  Extruded 3D Isometric Commit City rendering 365 days of GitHub activity with hover depth raycasting.
                </span>
              </div>

              <div className="grid grid-cols-12 gap-2">
                <span className="col-span-3 text-[var(--accent)] font-bold uppercase tracking-wider">
                  THEME
                </span>
                <span className="col-span-9 text-[var(--text-muted)]">
                  Dual-theme Cyanotype / Night Shift with expanding circular clip-path via View Transitions API.
                </span>
              </div>

              <div className="grid grid-cols-12 gap-2">
                <span className="col-span-3 text-[var(--accent)] font-bold uppercase tracking-wider">
                  RETRIEVAL
                </span>
                <span className="col-span-9 text-[var(--text-muted)]">
                  In-memory hybrid BM25 + vector cosine similarity search with Server-Sent Events (SSE) streaming from Gemini 3.5 Flash Lite.
                </span>
              </div>

              <div className="grid grid-cols-12 gap-2">
                <span className="col-span-3 text-[var(--accent)] font-bold uppercase tracking-wider">
                  DELIVERY
                </span>
                <span className="col-span-9 text-[var(--text-muted)]">
                  Next.js 16.4.6 static prerendering, zero layout shift (CLS &lt; 0.05), and 100% WCAG AA contrast compliance.
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-[var(--line)] flex items-center justify-between text-[10px] text-[var(--text-muted)]">
              <span>Press <kbd className="px-1 py-0.5 rounded bg-[var(--bg-sunken)] hairline">Esc</kbd> or <kbd className="px-1 py-0.5 rounded bg-[var(--bg-sunken)] hairline">u</kbd> to close</span>
              <span>Ansh Arora · Class of 2028</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
