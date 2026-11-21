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
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
          Ask this portfolio{" "}
          <span className="text-gradient-cyan">anything.</span>
        </h2>
        <p className="mt-3 text-base sm:text-lg text-[var(--text-muted)] font-body leading-relaxed">
          Powered by Gemini 3.5 Flash Lite + vector retrieval. Click any question bubble or type your own to get instant grounded answers with citations.
        </p>
      </div>

      <AskAnsh />
    </section>
  );
}
