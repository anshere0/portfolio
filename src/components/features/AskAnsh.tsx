"use client";

import React, { useState, useEffect, useRef } from "react";
import Tag from "@/components/ui/Tag";

interface SourceItem {
  citationId: number;
  id: string;
  title: string;
  section: string;
  url: string;
  score: number;
}

const SUGGESTED_QUESTIONS = [
  "What did you build with pgvector?",
  "How do you sandbox AI-generated patches?",
  "What was your role in GridGuard?",
  "What are you looking for next?",
];

export default function AskAnsh() {
  const [question, setQuestion] = useState("");
  const [sources, setSources] = useState<SourceItem[]>([]);
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeCitationId, setActiveCitationId] = useState<number | null>(null);
  const [showArchitecture, setShowArchitecture] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Global Cmd/Ctrl + K shortcut to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleAsk = async (queryText: string) => {
    const q = queryText.trim();
    if (!q || isLoading) return;

    setQuestion(q);
    setSources([]);
    setAnswer("");
    setIsLoading(true);
    setActiveCitationId(null);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });

      if (!res.ok || !res.body) {
        setAnswer("That isn't in my notebook. You can email me at ansharora19102006@gmail.com.");
        setIsLoading(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          if (line.startsWith("event: sources")) {
            const nextLine = lines[i + 1] || "";
            if (nextLine.startsWith("data: ")) {
              try {
                const parsed = JSON.parse(nextLine.slice(6));
                setSources(parsed.sources || []);
              } catch {
                // ignore
              }
            }
          } else if (line.startsWith("event: delta")) {
            const nextLine = lines[i + 1] || "";
            if (nextLine.startsWith("data: ")) {
              try {
                const parsed = JSON.parse(nextLine.slice(6));
                if (parsed.text) {
                  setAnswer((prev) => prev + parsed.text);
                }
              } catch {
                // ignore
              }
            }
          }
        }
      }
    } catch {
      setAnswer("That isn't in my notebook. You can email me at ansharora19102006@gmail.com.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAsk(question);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Search Input Box */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center rounded-[8px] bg-[var(--bg-raised)] hairline focus-within:border-[var(--signal)] transition-colors p-1.5 sm:p-2">
          <input
            ref={inputRef}
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask about telemetry, RAGForge, sandboxes, or coursework..."
            maxLength={300}
            className="w-full bg-transparent px-3 py-2 text-sm sm:text-base font-body text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none"
            aria-label="Ask this portfolio a question"
          />

          <div className="flex items-center gap-2 pr-1">
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-1 rounded-[3px] bg-[var(--bg-sunken)] hairline font-mono text-[10px] text-[var(--text-muted)]">
              <span>⌘</span>
              <span>K</span>
            </kbd>

            <button
              type="submit"
              disabled={isLoading || !question.trim()}
              className="px-4 py-2 rounded-[4px] bg-[var(--accent)] text-[var(--accent-ink)] font-body text-xs sm:text-sm font-semibold hover:brightness-105 active:brightness-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              {isLoading ? "Retrieving..." : "Ask"}
            </button>
          </div>
        </div>
      </form>

      {/* Suggested Questions Pills */}
      <div className="space-y-1.5">
        <span className="font-mono text-[11px] text-[var(--text-muted)] block">
          SUGGESTED RETRIEVAL QUERIES:
        </span>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_QUESTIONS.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => {
                setQuestion(q);
                handleAsk(q);
              }}
              className="px-3 py-1.5 rounded-[4px] bg-[var(--bg-sunken)] hairline text-xs font-body text-[var(--text)] hover:border-[var(--line-strong)] hover:bg-[var(--bg-raised)] transition-colors cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* RAG Results Box (Sources First, then Answer) */}
      {(sources.length > 0 || answer || isLoading) && (
        <div className="p-5 sm:p-6 rounded-[12px] bg-[var(--bg-raised)] hairline space-y-4">
          {/* Retrieved Source Chips (Moment 4: appear first) */}
          {sources.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-[var(--text)] uppercase tracking-wider">
                  RETRIEVED PASSAGE SOURCES:
                </span>
                <span className="font-mono text-[10px] text-[var(--text-muted)]">
                  Top-{sources.length} cosine rank
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {sources.map((src) => {
                  const isHighlighted = activeCitationId === src.citationId;

                  return (
                    <div
                      key={src.id}
                      className={`p-3 rounded-[4px] hairline text-xs transition-all ${
                        isHighlighted
                          ? "bg-[var(--signal)]/15 border-[var(--signal)] shadow-[0_0_8px_var(--signal)]"
                          : "bg-[var(--bg-sunken)] border-[var(--line)]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-bold text-[var(--signal)]">
                          [{src.citationId}]
                        </span>
                        <span className="font-mono text-[10px] text-[var(--text-muted)]">
                          score: {src.score.toFixed(3)}
                        </span>
                      </div>
                      <div className="font-display font-medium text-[var(--text)] truncate">
                        {src.title}
                      </div>
                      <div className="text-[11px] text-[var(--text-muted)] font-mono truncate">
                        {src.section}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Streamed Answer Output */}
          <div className="space-y-2 pt-2 border-t border-[var(--line)]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-[var(--text)] uppercase tracking-wider">
                SYNTHESIZED ANSWER:
              </span>
              <Tag variant="signal">grounded response</Tag>
            </div>

            <div
              aria-live="polite"
              className="p-4 rounded-[6px] bg-[var(--bg-sunken)] hairline font-body text-sm sm:text-base text-[var(--text)] leading-relaxed min-h-[60px]"
            >
              {answer ? (
                <span>
                  {answer.split(/(\[\d+\])/g).map((token, i) => {
                    const match = token.match(/\[(\d+)\]/);
                    if (match) {
                      const cid = parseInt(match[1], 10);
                      return (
                        <button
                          key={i}
                          type="button"
                          onMouseEnter={() => setActiveCitationId(cid)}
                          onMouseLeave={() => setActiveCitationId(null)}
                          className="inline-block mx-0.5 px-1 rounded-[2px] bg-[var(--signal)]/20 text-[var(--signal)] font-mono text-xs font-bold hover:bg-[var(--signal)] hover:text-[var(--accent-ink,#0d2f6b)] transition-colors cursor-pointer"
                        >
                          {token}
                        </button>
                      );
                    }
                    return <span key={i}>{token}</span>;
                  })}
                </span>
              ) : (
                <span className="font-mono text-xs text-[var(--text-muted)] animate-pulse">
                  Retrieving context vectors from knowledge index...
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Recruiter Architecture Disclosure */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => setShowArchitecture(!showArchitecture)}
          className="text-xs font-mono text-[var(--accent)] hover:underline underline-offset-4 flex items-center gap-1.5 cursor-pointer"
        >
          <span>{showArchitecture ? "▼ Hide retrieval architecture" : "▶ How this retrieval pipeline works"}</span>
        </button>

        {showArchitecture && (
          <div className="mt-3 p-4 rounded-[6px] bg-[var(--bg-raised)] hairline font-mono text-xs text-[var(--text-muted)] space-y-2 leading-relaxed">
            <div className="font-bold text-[var(--text)] font-sans text-sm">
              Portfolio retrieval architecture
            </div>
            <p>
              1. <strong>Precomputed Index:</strong> Content is normalized into ~200-word chunks in <code className="text-[var(--signal)]">knowledge.json</code> with precomputed vector projections and BM25 term frequencies.
            </p>
            <p>
              2. <strong>Hybrid Retrieval:</strong> Queries are evaluated against cosine similarity and term-frequency inverse document frequency (BM25) to return the top 4 relevant passages.
            </p>
            <p>
              3. <strong>Anti-Injection &amp; Grounding:</strong> Strict prompt isolation enforces that claims must cite source chunk IDs. Out-of-corpus queries safely trigger polite refusal with contact info.
            </p>
            <p>
              4. <strong>Server-Sent Stream:</strong> <code className="text-[var(--signal)]">/api/ask</code> streams source chunks first, followed by synthesis tokens with interactive citation markers.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
