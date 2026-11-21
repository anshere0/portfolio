"use client";

import { useState } from "react";
import { ArchitectureStep } from "@/content/profile";

interface ArchitectureDiagramProps {
  steps: ArchitectureStep[];
  projectTitle: string;
}

export default function ArchitectureDiagram({ steps, projectTitle }: ArchitectureDiagramProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  if (!steps || steps.length === 0) return null;

  return (
    <div className="w-full bg-[var(--bg-paper-subtle)] hairline-border p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 hairline-b pb-4">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 bg-[var(--signal-vermilion)] inline-block" />
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink-primary)] font-bold">
            ARCHITECTURE BLUEPRINT // {projectTitle.toUpperCase()}
          </span>
        </div>
        <div className="font-mono text-xs text-[var(--ink-tertiary)] uppercase">
          INTERACTIVE STAGE INSPECTOR
        </div>
      </div>

      {/* Pipeline Stages Sequence */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {steps.map((step, idx) => {
          const isSelected = activeStepIndex === idx;

          return (
            <button
              key={idx}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-3.5 text-left hairline-border transition-all duration-150 relative ${
                isSelected
                  ? "bg-[var(--bg-paper)] border-[var(--ink-primary)] shadow-sm ring-1 ring-[var(--ink-primary)]"
                  : "bg-[var(--bg-paper-darker)]/50 hover:bg-[var(--bg-paper)] border-[var(--hairline)]"
              }`}
            >
              <div className="font-mono text-xs font-bold text-[var(--signal-vermilion)] mb-1">
                {step.step}
              </div>
              <div className="font-mono text-xs font-semibold text-[var(--ink-primary)] uppercase tracking-wide">
                {step.label}
              </div>

              {idx < steps.length - 1 && (
                <div
                  className="hidden sm:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-20 font-mono text-xs text-[var(--ink-tertiary)] select-none pointer-events-none"
                  aria-hidden="true"
                >
                  →
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Step Technical Telemetry */}
      <div className="p-4 bg-[var(--bg-paper)] hairline-border font-mono text-xs space-y-1.5">
        <div className="text-[var(--signal-vermilion)] font-bold uppercase tracking-wider">
          STAGE {steps[activeStepIndex].step} SPECIFICATION //
        </div>
        <div className="text-[var(--ink-primary)] font-medium leading-relaxed">
          {steps[activeStepIndex].detail}
        </div>
      </div>
    </div>
  );
}
