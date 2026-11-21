"use client";

import React, { useState, useEffect } from "react";
import QueryField from "@/components/features/QueryField";
import Button from "@/components/ui/Button";

const GREETINGS = ["Hello", "नमस्ते", "Welcome"];

export default function Hero() {
  const [showHint, setShowHint] = useState(false);
  const [greetingIndex, setGreetingIndex] = useState(0);

  useEffect(() => {
    // Language-cycling greeting
    const greetingInterval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 2400);

    // 2-second delayed hint per docs/06_CONTENT.md
    const timer = setTimeout(() => {
      setShowHint(true);
    }, 2000);

    return () => {
      clearInterval(greetingInterval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative min-h-[92vh] flex flex-col justify-end px-4 sm:px-6 lg:px-8 py-16 lg:py-24 max-w-7xl mx-auto overflow-hidden select-none"
    >
      {/* 2D Canvas Topology Query Field background */}
      <QueryField />

      {/* Hero content container sitting in the calm zone (bottom-left) */}
      <div className="relative z-10 pointer-events-none max-w-3xl">
        {/* Playful language-cycling greeting badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-sunken)]/80 hairline text-xs font-mono text-[var(--accent)] mb-3 pointer-events-auto backdrop-blur-md shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal)] animate-pulse" />
          <span className="transition-opacity duration-300 font-semibold">
            {GREETINGS[greetingIndex]}
          </span>
          <span className="text-[var(--text-muted)]">·</span>
          <span className="text-[var(--text-muted)] text-[11px]">Systems &amp; Telemetry</span>
        </div>

        {/* Real DOM H1 headline */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white pointer-events-auto">
          Ansh Arora
        </h1>

        {/* Primary engineering statement */}
        <p className="mt-4 sm:mt-5 text-xl sm:text-2xl md:text-3xl font-display font-medium text-white leading-snug pointer-events-auto max-w-2xl">
          I build <span className="text-gradient-coral font-bold">real-time trading engines</span>, <span className="text-gradient-cyan font-bold">applied AI systems</span>, and high-performance software.
        </p>

        {/* Subheadline (academics & focus) */}
        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-[var(--text-muted)] font-body pointer-events-auto max-w-xl">
          B.Tech Computer Science (AI/ML) at VIT Bhopal (&apos;28). Exploring low-latency distributed systems and machine learning.
        </p>

        {/* Action buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-4 pointer-events-auto">
          <Button variant="primary" size="md" href="#work">
            See the systems
          </Button>
          <Button variant="secondary" size="md" href="#ask">
            Ask my portfolio a question
          </Button>
        </div>

        {/* 2-second delayed query hint */}
        <div
          role="status"
          aria-live="polite"
          className={`mt-12 transition-opacity duration-700 font-data text-xs text-[var(--text-muted)] flex items-center gap-2 pointer-events-auto ${showHint ? "opacity-100" : "opacity-0"
            }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          <span>Move cursor across the canvas to query nodes · Click node to inspect</span>
        </div>
      </div>
    </section>
  );
}
