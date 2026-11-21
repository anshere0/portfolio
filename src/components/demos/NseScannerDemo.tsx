"use client";

import React, { useState } from "react";
import { NSE_DEMO_FRAMES } from "@/content/demos/nse-data";
import Tag from "@/components/ui/Tag";

interface NseScannerDemoProps {
  onStageChange?: (stageIdx: number) => void;
}

export default function NseScannerDemo({ onStageChange }: NseScannerDemoProps) {
  const [frameIdx, setFrameIdx] = useState(0);
  const frame = NSE_DEMO_FRAMES[frameIdx];

  const handleNext = () => {
    const nextIdx = (frameIdx + 1) % NSE_DEMO_FRAMES.length;
    setFrameIdx(nextIdx);
    // Cycle pipeline stages as ticks progress
    onStageChange?.(nextIdx % 5);
  };

  const handlePrev = () => {
    const prevIdx = (frameIdx - 1 + NSE_DEMO_FRAMES.length) % NSE_DEMO_FRAMES.length;
    setFrameIdx(prevIdx);
    onStageChange?.(prevIdx % 5);
  };

  return (
    <div className="w-full bg-[var(--bg-raised)] rounded-[16px] hairline p-4 sm:p-5 space-y-4">
      {/* Demo Header with Honest Tag */}
      <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--signal)] animate-pulse" />
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text)]">
            Run It // Live Binary Packet Replay
          </span>
        </div>
        <Tag variant="signal">recorded run</Tag>
      </div>

      {/* Main Terminal-Style Telemetry Box */}
      <div className="bg-[var(--bg-sunken)] rounded-[4px] hairline p-3 sm:p-4 space-y-3 font-mono text-xs">
        {/* Packet Header & Timestamp */}
        <div className="flex items-center justify-between text-[var(--text-muted)] text-[11px] border-b border-[var(--line)] pb-2">
          <span>PACKET #{frame.id} / 5</span>
          <span>TIMESTAMP: {frame.timestamp}</span>
          <span className="text-[var(--signal)]">STATUS: CONNECTED</span>
        </div>

        {/* Binary Hex Buffer Stream */}
        <div>
          <span className="text-[var(--text-muted)] text-[10px] block mb-1">
            RAW BINARY BUFFER (Angel One SmartAPI Websocket):
          </span>
          <div className="bg-[var(--bg)] p-2 rounded-[3px] text-[var(--signal)] tracking-wider text-[11px] overflow-x-auto">
            {frame.rawHex}
          </div>
        </div>

        {/* Decoded Telemetry Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          <div className="p-2 bg-[var(--bg)] rounded-[3px] hairline">
            <span className="text-[10px] text-[var(--text-muted)] block">INDEX</span>
            <span className="font-bold text-[var(--text)]">{frame.symbol}</span>
          </div>
          <div className="p-2 bg-[var(--bg)] rounded-[3px] hairline">
            <span className="text-[10px] text-[var(--text-muted)] block">LTP (₹)</span>
            <span className="font-bold text-[var(--accent)]">
              {frame.ltp.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="p-2 bg-[var(--bg)] rounded-[3px] hairline">
            <span className="text-[10px] text-[var(--text-muted)] block">ADV / DEC</span>
            <span className="font-bold text-[var(--text)]">
              {frame.advances} : {frame.declines}
            </span>
          </div>
          <div className="p-2 bg-[var(--bg)] rounded-[3px] hairline">
            <span className="text-[10px] text-[var(--text-muted)] block">BREADTH RATIO</span>
            <span className="font-bold text-[var(--signal)]">{frame.ratio}x</span>
          </div>
        </div>

        {/* SSE Fanout JSON payload */}
        <div>
          <span className="text-[var(--text-muted)] text-[10px] block mb-1">
            FAN-OUT PAYLOAD (Server-Sent Events Stream):
          </span>
          <code className="block bg-[var(--bg)] p-2 rounded-[3px] text-[var(--text)] text-[11px] overflow-x-auto">
            {frame.ssePayload}
          </code>
        </div>
      </div>

      {/* Control Buttons & Packet Stepper */}
      <div className="flex items-center justify-between pt-1">
        <span className="font-mono text-xs text-[var(--text-muted)]">
          Replay step: {frameIdx + 1} of {NSE_DEMO_FRAMES.length}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="px-3 py-1.5 rounded-[4px] hairline text-xs font-mono text-[var(--text)] hover:bg-[var(--bg-sunken)] transition-colors cursor-pointer"
          >
            Previous tick
          </button>
          <button
            onClick={handleNext}
            className="px-3 py-1.5 rounded-[4px] bg-[var(--accent)] text-[var(--accent-ink)] text-xs font-mono font-bold hover:brightness-105 transition-all cursor-pointer"
          >
            Next tick →
          </button>
        </div>
      </div>
    </div>
  );
}
