"use client";

import React, { useState } from "react";
import {
  GRIDGUARD_SAMPLE_POINTS,
  SHAP_EXPLANATION_ANOMALY,
} from "@/content/demos/gridguard-data";
import Tag from "@/components/ui/Tag";

interface GridGuardDemoProps {
  onStageChange?: (stageIdx: number) => void;
}

export default function GridGuardDemo({ onStageChange }: GridGuardDemoProps) {
  const [thresholdZ, setThresholdZ] = useState(2.5);
  const [injectedIndex, setInjectedIndex] = useState(5); // Default to anomalous point
  const currentPoint = GRIDGUARD_SAMPLE_POINTS[injectedIndex];
  const isFlagged = currentPoint.zScore >= thresholdZ;

  const handleInjectFault = () => {
    setInjectedIndex(5);
    onStageChange?.(3); // EXPLAIN stage
  };

  const handleNormal = () => {
    setInjectedIndex(2);
    onStageChange?.(1); // WINDOW stage
  };

  return (
    <div className="w-full bg-[var(--bg-raised)] rounded-[16px] hairline p-4 sm:p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--signal)] animate-pulse" />
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text)]">
            Run It // Smart-Meter Stream &amp; SHAP
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Tag variant="signal">synthetic data</Tag>
          <Tag variant="outline">illustrative</Tag>
        </div>
      </div>

      {/* Main Telemetry Box */}
      <div className="bg-[var(--bg-sunken)] rounded-[4px] hairline p-3 sm:p-4 space-y-4 font-mono text-xs">
        {/* Stream Status & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] pb-2 text-[11px]">
          <span className="text-[var(--text-muted)]">TELEMETRY FEED: 50Hz AC GRID</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleNormal}
              className={`px-2 py-1 rounded-[3px] hairline transition-colors ${
                !isFlagged
                  ? "bg-[var(--accent)] text-[var(--accent-ink)] font-bold"
                  : "text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
            >
              Normal reading
            </button>
            <button
              onClick={handleInjectFault}
              className={`px-2 py-1 rounded-[3px] hairline transition-colors ${
                isFlagged
                  ? "bg-[var(--signal)] text-[var(--bg-paper-darker,#0a1b38)] font-bold"
                  : "text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
            >
              Inject fault spike
            </button>
          </div>
        </div>

        {/* Telemetry Reading Display */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="p-2 bg-[var(--bg)] rounded-[3px] hairline">
            <span className="text-[10px] text-[var(--text-muted)] block">VOLTAGE</span>
            <span
              className={`font-bold ${
                currentPoint.voltage < 210 ? "text-[var(--signal)]" : "text-[var(--text)]"
              }`}
            >
              {currentPoint.voltage} V
            </span>
          </div>
          <div className="p-2 bg-[var(--bg)] rounded-[3px] hairline">
            <span className="text-[10px] text-[var(--text-muted)] block">CURRENT</span>
            <span
              className={`font-bold ${
                currentPoint.current > 30 ? "text-[var(--accent)]" : "text-[var(--text)]"
              }`}
            >
              {currentPoint.current} A
            </span>
          </div>
          <div className="p-2 bg-[var(--bg)] rounded-[3px] hairline">
            <span className="text-[10px] text-[var(--text-muted)] block">FREQUENCY</span>
            <span className="font-bold text-[var(--text)]">{currentPoint.freq} Hz</span>
          </div>
          <div className="p-2 bg-[var(--bg)] rounded-[3px] hairline">
            <span className="text-[10px] text-[var(--text-muted)] block">CALCULATED Z</span>
            <span
              className={`font-bold ${
                isFlagged ? "text-[var(--accent)]" : "text-[var(--text-muted)]"
              }`}
            >
              {currentPoint.zScore.toFixed(2)} σ
            </span>
          </div>
        </div>

        {/* Anomaly Flag Banner */}
        <div
          className={`p-2.5 rounded-[3px] flex items-center justify-between text-xs hairline transition-colors ${
            isFlagged
              ? "bg-[var(--accent)]/15 border-[var(--accent)] text-[var(--accent)]"
              : "bg-[var(--bg)] text-[var(--text-muted)]"
          }`}
        >
          <span className="font-semibold">
            {isFlagged
              ? "● ANOMALY FLAGGED: Ingestion z-score exceeded threshold"
              : "○ NORMAL: Ingestion telemetry within operating band"}
          </span>
          <span className="font-mono text-[11px]">
            {isFlagged ? "ISOLATION TRIGGERED" : "NOMINAL"}
          </span>
        </div>

        {/* SHAP Feature Attribution Breakdown (Shown when anomaly flagged) */}
        {isFlagged && (
          <div className="space-y-2 pt-1 border-t border-[var(--line)]">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[var(--text)] font-semibold">
                SHAP EXPLAINABILITY ATTRIBUTION:
              </span>
              <span className="text-[var(--text-muted)] text-[10px]">
                XGBoost tree feature contributions
              </span>
            </div>

            <div className="space-y-2">
              {SHAP_EXPLANATION_ANOMALY.map((item) => (
                <div key={item.feature} className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[var(--text)]">{item.feature}</span>
                    <span className="text-[var(--text-muted)]">
                      {item.actual} (weight: +{item.weight}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[var(--bg)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[var(--signal)] rounded-full transition-all duration-300"
                      style={{ width: `${item.weight}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Threshold Slider Controls */}
      <div className="space-y-1.5 pt-1">
        <div className="flex justify-between text-xs font-mono">
          <span className="text-[var(--text-muted)]">
            Anomaly Threshold Trigger (z-score):
          </span>
          <span className="text-[var(--accent)] font-bold">{thresholdZ.toFixed(1)} σ</span>
        </div>
        <input
          type="range"
          min="1.0"
          max="4.0"
          step="0.1"
          value={thresholdZ}
          onChange={(e) => setThresholdZ(parseFloat(e.target.value))}
          className="w-full accent-[var(--accent)] cursor-pointer"
          aria-label="Anomaly z-score threshold slider"
        />
        <div className="flex justify-between text-[10px] font-mono text-[var(--text-muted)]">
          <span>1.0σ (High sensitivity)</span>
          <span>4.0σ (Strict faults only)</span>
        </div>
      </div>
    </div>
  );
}
