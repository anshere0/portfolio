import { PROFILE_DATA } from "@/content/profile";
import { Code2, ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function LeetCodePanel() {
  const { leetcode } = PROFILE_DATA;

  const total = leetcode.solvedTotal;
  const easyPct = Math.round((leetcode.easyCount / total) * 100);
  const medPct = Math.round((leetcode.mediumCount / total) * 100);
  const hardPct = Math.round((leetcode.hardCount / total) * 100);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 hairline-b bg-[var(--bg-paper)]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10 hairline-b pb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 bg-[var(--signal-amber)] inline-block" />
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink-secondary)] font-bold">
              08 / ALGORITHMIC PROBLEM SOLVING (DSA)
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif text-[var(--ink-primary)] tracking-tight">
            Competitive Programming & C++ Mastery
          </h2>
        </div>

        <a
          href={leetcode.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 hairline-border bg-[var(--bg-paper-subtle)] hover:bg-[var(--bg-paper-darker)] font-mono text-xs uppercase tracking-wider transition-colors"
        >
          <Code2 className="w-3.5 h-3.5 text-[var(--signal-amber)]" />
          <span>@{leetcode.username} on LeetCode</span>
          <ArrowUpRight className="w-3 h-3 text-[var(--ink-tertiary)]" />
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Stat Metric & Difficulty Split */}
        <div className="lg:col-span-5 p-6 sm:p-8 bg-[var(--bg-paper-subtle)] hairline-border space-y-6">
          <div className="flex items-center justify-between hairline-b pb-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[var(--ink-tertiary)]">
                VERIFIED SOLVED PROBLEMS
              </div>
              <div className="text-5xl sm:text-6xl font-serif text-[var(--ink-primary)] tracking-tight mt-1">
                {leetcode.solvedTotal}
                <span className="text-[var(--signal-amber)] text-3xl font-mono">+</span>
              </div>
            </div>

            <div className="text-right font-mono text-xs text-[var(--ink-secondary)]">
              <span className="text-[var(--signal-emerald)] font-bold">● ACTIVE PRACTICE</span>
              <div className="text-[11px] text-[var(--ink-tertiary)]">LANGUAGE: MODERN C++</div>
            </div>
          </div>

          {/* Difficulty Split Bars */}
          <div className="space-y-4 font-mono text-xs">
            <div className="space-y-1.5">
              <div className="flex justify-between text-[var(--ink-primary)]">
                <span className="text-emerald-700 font-bold">EASY</span>
                <span>
                  {leetcode.easyCount} problems ({easyPct}%)
                </span>
              </div>
              <div className="w-full h-2 bg-[var(--bg-paper-darker)] hairline-border">
                <div
                  className="h-full bg-[var(--signal-emerald)]"
                  style={{ width: `${easyPct}%` }}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[var(--ink-primary)]">
                <span className="text-amber-700 font-bold">MEDIUM</span>
                <span>
                  {leetcode.mediumCount} problems ({medPct}%)
                </span>
              </div>
              <div className="w-full h-2 bg-[var(--bg-paper-darker)] hairline-border">
                <div
                  className="h-full bg-[var(--signal-amber)]"
                  style={{ width: `${medPct}%` }}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[var(--ink-primary)]">
                <span className="text-rose-700 font-bold">HARD</span>
                <span>
                  {leetcode.hardCount} problems ({hardPct}%)
                </span>
              </div>
              <div className="w-full h-2 bg-[var(--bg-paper-darker)] hairline-border">
                <div
                  className="h-full bg-rose-600"
                  style={{ width: `${hardPct}%` }}
                />
              </div>
            </div>
          </div>

          <p className="font-mono text-xs text-[var(--ink-secondary)] leading-relaxed pt-2 hairline-t">
            {leetcode.note}
          </p>
        </div>

        {/* Right: Core Algorithmic Focus Topics */}
        <div className="lg:col-span-7 p-6 sm:p-8 bg-[var(--bg-paper-subtle)] hairline-border space-y-6">
          <div className="font-mono text-xs uppercase tracking-widest text-[var(--ink-tertiary)] hairline-b pb-3">
            CORE ALGORITHMIC PATTERNS & COMPLEXITY ANALYSIS
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            {leetcode.topTopics.map((topic, tIdx) => (
              <div
                key={topic}
                className="p-3.5 bg-[var(--bg-paper)] hairline-border flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[var(--signal-vermilion)] font-bold">
                    0{tIdx + 1}
                  </span>
                  <span className="text-[var(--ink-primary)] font-medium">
                    {topic}
                  </span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-[var(--signal-emerald)]" />
              </div>
            ))}
          </div>

          <div className="p-4 bg-[var(--bg-paper)] hairline-border font-mono text-xs text-[var(--ink-secondary)] space-y-2">
            <div className="text-[var(--ink-primary)] font-bold uppercase">
              [BENCHMARK PRINCIPLE]
            </div>
            <p className="leading-relaxed">
              Practicing optimal space/time complexity tradeoffs in C++ STL (vectors, unordered_maps, priority queues). Solutions are written for clarity and minimal heap allocation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
