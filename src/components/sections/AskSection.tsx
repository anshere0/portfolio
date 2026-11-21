"use client";

import React from "react";
import AskAnsh from "@/components/features/AskAnsh";

export default function AskSection() {
  return (
    <section
      id="ask"
      aria-label="Ask This Portfolio Anything"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto hairline-t"
    >
      <div className="max-w-3xl mb-10">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text)] tracking-tight">
          Ask this portfolio anything.
        </h2>
        <p className="mt-3 text-base sm:text-lg text-[var(--text-muted)] font-body leading-relaxed">
          This box searches my projects, telemetry benchmarks, and architecture notes,
          answers only from what it finds, and cites its sources. It is the same retrieval
          approach I built in RAGForge.
        </p>
      </div>

      <AskAnsh />
    </section>
  );
}
