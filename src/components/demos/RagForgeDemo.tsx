"use client";

import React, { useState } from "react";
import { RAGFORGE_DEMO_QUESTIONS } from "@/content/demos/ragforge-data";
import Tag from "@/components/ui/Tag";

interface RagForgeDemoProps {
  onStageChange?: (stageIdx: number) => void;
}

export default function RagForgeDemo({ onStageChange }: RagForgeDemoProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [activeCitation, setActiveCitation] = useState<string | null>(null);
  const qData = RAGFORGE_DEMO_QUESTIONS[selectedIdx];

  const handleSelectQuestion = (idx: number) => {
    setSelectedIdx(idx);
    setActiveCitation(null);
    onStageChange?.(3); // RETRIEVE stage
  };

  return (
    <div className="w-full bg-[var(--bg-raised)] rounded-[16px] hairline p-4 sm:p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--signal)] animate-pulse" />
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text)]">
            Run It // Multi-Tenant Retrieval &amp; Citations
          </span>
        </div>
        <Tag variant="signal">recorded run</Tag>
      </div>

      {/* Question Selector Chips */}
      <div className="space-y-1.5">
        <span className="font-mono text-[11px] text-[var(--text-muted)] block">
          Select sample query over 3-page SaaS SLA agreement:
        </span>
        <div className="flex flex-wrap gap-2">
          {RAGFORGE_DEMO_QUESTIONS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleSelectQuestion(idx)}
              className={`px-2.5 py-1.5 rounded-[4px] hairline text-xs font-body text-left transition-colors cursor-pointer ${
                idx === selectedIdx
                  ? "bg-[var(--accent)] text-[var(--accent-ink)] font-medium border-transparent"
                  : "bg-[var(--bg-sunken)] text-[var(--text)] hover:border-[var(--line-strong)]"
              }`}
            >
              {item.question}
            </button>
          ))}
        </div>
      </div>

      {/* Retrieval Inspector Box */}
      <div className="bg-[var(--bg-sunken)] rounded-[4px] hairline p-3 sm:p-4 space-y-3 font-mono text-xs">
        {/* Query Vector Summary */}
        <div className="flex items-center justify-between text-[11px] border-b border-[var(--line)] pb-2 text-[var(--text-muted)]">
          <span>EMBEDDING MODEL: Gemini text-embedding-004</span>
          <span>{qData.queryVectorSummary}</span>
        </div>

        {/* Retrieved Top-K Chunks List */}
        <div className="space-y-2">
          <span className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider block">
            pgvector HNSW Cosine Top-3 Retrieved Chunks:
          </span>

          <div className="space-y-2">
            {qData.retrievedChunks.map((chunk) => {
              const isCited = activeCitation === chunk.chunkId;

              return (
                <div
                  key={chunk.chunkId}
                  className={`p-2.5 rounded-[3px] hairline transition-all ${
                    isCited
                      ? "bg-[var(--signal)]/15 border-[var(--signal)] shadow-[0_0_8px_var(--signal)]"
                      : "bg-[var(--bg)] border-[var(--line)]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1 text-[11px]">
                    <span className="font-semibold text-[var(--text)]">{chunk.section}</span>
                    <span className="text-[var(--signal)] font-bold">
                      score: {chunk.score.toFixed(3)}
                    </span>
                  </div>
                  <p className="text-[11px] font-body text-[var(--text-muted)] leading-relaxed">
                    &ldquo;{chunk.text}&rdquo;
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Grounded Cited Answer Output */}
        <div className="pt-2 border-t border-[var(--line)] space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-[var(--text)]">GROUNDED RESPONSE:</span>
            <span className="text-[var(--text-muted)] text-[10px]">
              Hover citation markers to highlight source
            </span>
          </div>

          <div className="p-3 bg-[var(--bg)] rounded-[3px] hairline font-body text-xs text-[var(--text)] leading-relaxed">
            {qData.answer}
          </div>

          {/* Citation chips interactive buttons */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[10px] text-[var(--text-muted)]">Source citations:</span>
            {qData.citations.map((c) => (
              <button
                key={c.id}
                onMouseEnter={() => setActiveCitation(c.chunkId)}
                onMouseLeave={() => setActiveCitation(null)}
                className="px-2 py-0.5 rounded-[3px] bg-[var(--bg-sunken)] hairline text-[11px] font-mono text-[var(--signal)] hover:bg-[var(--signal)] hover:text-[var(--accent-ink,#0d2f6b)] transition-colors cursor-pointer"
              >
                [{c.id}] {c.section}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
