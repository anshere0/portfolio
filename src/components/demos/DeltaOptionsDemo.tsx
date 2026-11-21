"use client";

import React, { useState } from "react";
import { DELTA_OPTIONS_FRAMES } from "@/content/demos/delta-data";
import Tag from "@/components/ui/Tag";

interface DeltaOptionsDemoProps {
  onStageChange?: (stageIdx: number) => void;
}

export default function DeltaOptionsDemo({ onStageChange }: DeltaOptionsDemoProps) {
  const [frameIdx, setFrameIdx] = useState(0);
  const frame = DELTA_OPTIONS_FRAMES[frameIdx];

  const handleSelectFrame = (idx: number) => {
    setFrameIdx(idx);
    onStageChange?.(3); // RATIO stage
  };

  return (
    <div className="w-full bg-[var(--bg-raised)] rounded-[16px] hairline p-4 sm:p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--signal)] animate-pulse" />
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text)]">
            Run It // Delta Exchange Options HUD
          </span>
        </div>
        <Tag variant="signal">recorded run</Tag>
      </div>

      {/* Strike Price & Expiry Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-[11px] text-[var(--text-muted)]">
          BTC 5m ATM Options Contracts:
        </span>
        <div className="flex items-center gap-2">
          {DELTA_OPTIONS_FRAMES.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleSelectFrame(idx)}
              className={`px-2.5 py-1 rounded-[3px] font-mono text-xs hairline transition-colors cursor-pointer ${
                idx === frameIdx
                  ? "bg-[var(--accent)] text-[var(--accent-ink)] font-bold"
                  : "bg-[var(--bg-sunken)] text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
            >
              {item.strike} {item.type}
            </button>
          ))}
        </div>
      </div>

      {/* Main HUD Telemetry Grid */}
      <div className="bg-[var(--bg-sunken)] rounded-[4px] hairline p-3 sm:p-4 space-y-3 font-mono text-xs">
        {/* Underlying & Contract Info */}
        <div className="flex items-center justify-between text-[11px] border-b border-[var(--line)] pb-2 text-[var(--text-muted)]">
          <span>UNDERLYING: BTC / USD (${frame.spotPrice.toLocaleString()})</span>
          <span>EXPIRY: {frame.expiry}</span>
          <span className="text-[var(--signal)]">FEED: WEBSOCKET 5m</span>
        </div>

        {/* Real-Time Greeks HUD */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="p-2 bg-[var(--bg)] rounded-[3px] hairline">
            <span className="text-[10px] text-[var(--text-muted)] block">DELTA (Δ)</span>
            <span className="font-bold text-[var(--text)]">{frame.delta}</span>
          </div>
          <div className="p-2 bg-[var(--bg)] rounded-[3px] hairline">
            <span className="text-[10px] text-[var(--text-muted)] block">GAMMA (Γ)</span>
            <span className="font-bold text-[var(--text)]">{frame.gamma}</span>
          </div>
          <div className="p-2 bg-[var(--bg)] rounded-[3px] hairline">
            <span className="text-[10px] text-[var(--text-muted)] block">THETA (Θ)</span>
            <span className="font-bold text-[var(--accent)]">{frame.theta} / day</span>
          </div>
          <div className="p-2 bg-[var(--bg)] rounded-[3px] hairline">
            <span className="text-[10px] text-[var(--text-muted)] block">IV (%)</span>
            <span className="font-bold text-[var(--signal)]">{frame.iv}%</span>
          </div>
        </div>

        {/* Risk-Reward & Trade Signal Execution Banner */}
        <div
          className={`p-3 rounded-[3px] flex items-center justify-between text-xs hairline ${
            frame.setupStatus === "VALID SETUP"
              ? "bg-[var(--signal)]/15 border-[var(--signal)] text-[var(--signal)]"
              : "bg-[var(--accent)]/15 border-[var(--accent)] text-[var(--accent)]"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="font-bold">STATUS: {frame.setupStatus}</span>
            <span>(R:R 1:{frame.riskReward})</span>
          </div>
          <span className="font-mono text-[11px]">
            {frame.setupStatus === "VALID SETUP" ? "GATE: PASS" : "GATE: BLOCKED"}
          </span>
        </div>

        {/* Filter Criteria Explanation */}
        <div className="p-2.5 bg-[var(--bg)] rounded-[3px] text-[11px] text-[var(--text-muted)] font-body leading-relaxed">
          <span className="font-mono text-[10px] text-[var(--text)] uppercase block mb-0.5">
            EXECUTION FILTER RATIONALE:
          </span>
          {frame.reason}
        </div>
      </div>
    </div>
  );
}
