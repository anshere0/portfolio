"use client";

import React, { useEffect } from "react";
import Drawer from "@/components/ui/Drawer";
import { METRICS } from "@/content/metrics";
import Tag from "@/components/ui/Tag";

interface ReceiptsDrawerProps {
  metricId: string | null;
  onClose: () => void;
}

export default function ReceiptsDrawer({ metricId, onClose }: ReceiptsDrawerProps) {
  const metric = METRICS.find((m) => m.id === metricId);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (metricId) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [metricId, onClose]);

  if (!metricId || !metric) return null;

  const isExternalUrl =
    metric.source.startsWith("http://") || metric.source.startsWith("https://");
  const isDocument = metric.source.startsWith("/certificates/");

  return (
    <Drawer isOpen={!!metricId} onClose={onClose} title="Telemetry Measurement Receipt">
      <div className="space-y-6 font-body text-sm">
        {/* Metric Value & Label Banner */}
        <div className="p-4 rounded-[4px] bg-[var(--bg-sunken)] hairline space-y-1">
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-mono text-3xl font-bold text-[var(--accent)]">
              {metric.value}
            </span>
            <Tag variant="accent">{metric.category}</Tag>
          </div>
          <div className="font-display font-medium text-base text-[var(--text)]">
            {metric.label}
          </div>
        </div>

        {/* Measurement Method */}
        <div className="space-y-2">
          <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
            Measurement Method &amp; Setup
          </h4>
          <p className="text-[var(--text)] leading-relaxed bg-[var(--bg-raised)] p-3 rounded-[4px] hairline">
            {metric.method}
          </p>
        </div>

        {/* Recorded Date */}
        <div className="flex items-center justify-between py-2 hairline-b">
          <span className="text-[var(--text-muted)]">Benchmark Date</span>
          <span className="font-mono text-[var(--text)]">{metric.date}</span>
        </div>

        {/* Source Evidence Verification Link */}
        <div className="space-y-2 pt-2">
          <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
            Verifiable Source &amp; Artifact
          </h4>

          {metric.source === "self-reported" ? (
            <div className="p-3 bg-[var(--bg-sunken)] rounded-[4px] text-xs text-[var(--text-muted)] font-mono">
              Source: Self-reported / Official university academic ledger (VIT Bhopal).
            </div>
          ) : isExternalUrl ? (
            <a
              href={metric.source}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between w-full p-3 rounded-[4px] hairline bg-[var(--bg-raised)] hover:bg-[var(--bg-sunken)] transition-colors group"
            >
              <span className="font-mono text-xs text-[var(--text)] truncate max-w-[280px]">
                {metric.source}
              </span>
              <span className="text-xs text-[var(--accent)] group-hover:underline">
                View repository →
              </span>
            </a>
          ) : isDocument ? (
            <a
              href={metric.source}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between w-full p-3 rounded-[4px] hairline bg-[var(--bg-raised)] hover:bg-[var(--bg-sunken)] transition-colors group"
            >
              <span className="font-mono text-xs text-[var(--text)] truncate max-w-[280px]">
                {metric.source.split("/").pop()}
              </span>
              <span className="text-xs text-[var(--accent)] group-hover:underline">
                Open certificate PDF →
              </span>
            </a>
          ) : (
            <div className="p-3 bg-[var(--bg-sunken)] rounded-[4px] text-xs font-mono text-[var(--text)]">
              {metric.source}
            </div>
          )}
        </div>

        <p className="text-[11px] font-mono text-[var(--text-muted)] pt-2">
          Note: This measurement is logged in the project metrics registry. No fabricated claims or simulated benchmarks are presented as production measurements.
        </p>
      </div>
    </Drawer>
  );
}
