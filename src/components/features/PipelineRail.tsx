"use client";

import React from "react";
import { ProjectStage } from "@/content/types";

interface PipelineRailProps {
  stages: ProjectStage[];
  activeStageIndex?: number;
  className?: string;
}

export default function PipelineRail({
  stages,
  activeStageIndex = 0,
  className = "",
}: PipelineRailProps) {
  return (
    <div className={`w-full ${className}`}>
      {/* --- DESKTOP VERTICAL RAIL (lg screens) --- */}
      <div className="hidden lg:block relative py-2">
        <div className="relative pl-6">
          {/* SVG Vertical Spine */}
          <div
            aria-hidden="true"
            className="absolute left-[7px] top-3 bottom-6 w-[2px] bg-[var(--line)]"
          >
            {/* Active scrubbed fill indicator */}
            <div
              className="w-full bg-[var(--signal)] transition-all duration-300"
              style={{
                height: `${(activeStageIndex / Math.max(1, stages.length - 1)) * 100}%`,
              }}
            />
          </div>

          {/* Stages List */}
          <ol className="space-y-6">
            {stages.map((stage, idx) => {
              const isActive = idx <= activeStageIndex;
              const isCurrent = idx === activeStageIndex;

              return (
                <li key={stage.name} className="relative flex items-start gap-3 group">
                  {/* Stage Node Dot */}
                  <div
                    aria-hidden="true"
                    className={`absolute -left-[24px] top-1 w-4 h-4 rounded-full flex items-center justify-center transition-colors duration-200 ${
                      isCurrent
                        ? "bg-[var(--bg)] border-2 border-[var(--signal)] shadow-[0_0_8px_var(--signal)]"
                        : isActive
                        ? "bg-[var(--signal)] border-2 border-[var(--signal)]"
                        : "bg-[var(--bg)] border-2 border-[var(--line-strong)]"
                    }`}
                  >
                    {isCurrent && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal)] animate-pulse" />
                    )}
                  </div>

                  {/* Stage Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`font-mono text-xs font-semibold tracking-wider transition-colors duration-150 ${
                          isActive ? "text-[var(--text)]" : "text-[var(--text-muted)]"
                        }`}
                      >
                        {stage.name}
                      </span>
                      {stage.ms !== undefined && (
                        <span
                          className={`font-mono text-[11px] px-1.5 py-0.5 rounded-[3px] hairline transition-colors ${
                            isCurrent
                              ? "bg-[var(--accent)] text-[var(--accent-ink)] border-transparent font-bold"
                              : isActive
                              ? "bg-[var(--bg-sunken)] text-[var(--signal)] border-[var(--line)]"
                              : "text-[var(--text-muted)] border-transparent"
                          }`}
                        >
                          {stage.ms} ms
                        </span>
                      )}
                    </div>
                    {stage.description && (
                      <p className="mt-0.5 text-xs text-[var(--text-muted)] font-body line-clamp-2">
                        {stage.description}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* --- MOBILE HORIZONTAL STEPPER (< lg screens) --- */}
      <div className="lg:hidden mb-4 overflow-x-auto pb-2">
        <ol className="flex items-center gap-2 min-w-max">
          {stages.map((stage, idx) => {
            const isActive = idx <= activeStageIndex;
            const isCurrent = idx === activeStageIndex;

            return (
              <li
                key={stage.name}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-[4px] hairline text-xs font-mono transition-colors ${
                  isCurrent
                    ? "bg-[var(--bg-raised)] border-[var(--signal)] text-[var(--text)]"
                    : isActive
                    ? "bg-[var(--bg-sunken)] border-[var(--line)] text-[var(--text)]"
                    : "bg-transparent border-transparent text-[var(--text-muted)]"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`w-2 h-2 rounded-full ${
                    isCurrent
                      ? "bg-[var(--signal)] animate-pulse"
                      : isActive
                      ? "bg-[var(--signal)]"
                      : "bg-[var(--line-strong)]"
                  }`}
                />
                <span className="font-semibold">{stage.name}</span>
                {stage.ms !== undefined && (
                  <span className="text-[10px] text-[var(--accent)] ml-1">
                    {stage.ms}ms
                  </span>
                )}
                {idx < stages.length - 1 && (
                  <span aria-hidden="true" className="text-[var(--line-strong)] ml-1">
                    →
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
