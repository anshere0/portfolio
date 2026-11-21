"use client";

import React from "react";
import { SITE_CONFIG } from "@/content/site";

export default function Footer() {
  const triggerVitals = () => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "v" }));
  };

  return (
    <footer className="w-full hairline-t py-8 mt-20 text-center font-body text-xs text-[var(--text-muted)]">
      <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        <span>© 2026 {SITE_CONFIG.name}. Built with Next.js, GSAP and Canvas.</span>
        <span>•</span>
        <a
          href={SITE_CONFIG.socials.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[var(--text)] transition-colors"
        >
          Source on GitHub
        </a>
        <span>•</span>
        <button
          type="button"
          onClick={triggerVitals}
          className="underline hover:text-[var(--text)] transition-colors cursor-pointer"
        >
          Performance telemetry (v)
        </button>
      </div>
    </footer>
  );
}
