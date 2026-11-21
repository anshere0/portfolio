"use client";

import React, { useState, useEffect } from "react";

interface VitalsMetrics {
  fcp: number | null;
  lcp: number | null;
  cls: number | null;
  ttfb: number | null;
}

export default function VitalsHud() {
  const [isOpen, setIsOpen] = useState(false);
  const [metrics, setMetrics] = useState<VitalsMetrics>({
    fcp: null,
    lcp: null,
    cls: null,
    ttfb: null,
  });

  useEffect(() => {
    // Keyboard shortcut 'v' listener
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === "v" || e.key === "V") {
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !("PerformanceObserver" in window)) return;

    try {
      // TTFB
      const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
      if (navEntry) {
        setMetrics((prev) => ({
          ...prev,
          ttfb: Math.round(navEntry.responseStart),
        }));
      }

      // FCP & LCP observer
      const paintObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.name === "first-contentful-paint") {
            setMetrics((prev) => ({
              ...prev,
              fcp: Math.round(entry.startTime),
            }));
          }
        }
      });
      paintObserver.observe({ type: "paint", buffered: true });

      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          setMetrics((prev) => ({
            ...prev,
            lcp: Math.round(lastEntry.startTime),
          }));
        }
      });
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });

      // CLS observer
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if (!(entry as any).hadRecentInput) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            clsValue += (entry as any).value || 0;
            setMetrics((prev) => ({
              ...prev,
              cls: Number(clsValue.toFixed(3)),
            }));
          }
        }
      });
      clsObserver.observe({ type: "layout-shift", buffered: true });
    } catch {
      // ignore in older browsers
    }
  }, []);

  if (!isOpen) return null;

  return (
    <aside
      aria-label="Real-time Web Vitals HUD"
      className="fixed bottom-4 right-4 z-50 p-4 rounded-[6px] bg-[var(--bg-raised)] hairline shadow-2xl font-mono text-xs w-72 space-y-3"
    >
      <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--signal)] animate-pulse" />
          <span className="font-bold text-[var(--text)] uppercase tracking-wider text-[11px]">
            CORE VITALS TELEMETRY
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="text-[var(--text-muted)] hover:text-[var(--text)] text-xs cursor-pointer"
          aria-label="Close vitals HUD"
        >
          ✕
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <div className="p-2 bg-[var(--bg-sunken)] rounded-[3px] hairline">
          <span className="text-[10px] text-[var(--text-muted)] block">LCP</span>
          <span
            className={`font-bold ${
              metrics.lcp !== null && metrics.lcp < 2500
                ? "text-[var(--signal)]"
                : "text-[var(--text)]"
            }`}
          >
            {metrics.lcp !== null ? `${metrics.lcp} ms` : "—"}
          </span>
        </div>

        <div className="p-2 bg-[var(--bg-sunken)] rounded-[3px] hairline">
          <span className="text-[10px] text-[var(--text-muted)] block">CLS</span>
          <span
            className={`font-bold ${
              metrics.cls !== null && metrics.cls < 0.1
                ? "text-[var(--signal)]"
                : "text-[var(--text)]"
            }`}
          >
            {metrics.cls !== null ? metrics.cls : "—"}
          </span>
        </div>

        <div className="p-2 bg-[var(--bg-sunken)] rounded-[3px] hairline">
          <span className="text-[10px] text-[var(--text-muted)] block">FCP</span>
          <span className="font-bold text-[var(--text)]">
            {metrics.fcp !== null ? `${metrics.fcp} ms` : "—"}
          </span>
        </div>

        <div className="p-2 bg-[var(--bg-sunken)] rounded-[3px] hairline">
          <span className="text-[10px] text-[var(--text-muted)] block">TTFB</span>
          <span className="font-bold text-[var(--text)]">
            {metrics.ttfb !== null ? `${metrics.ttfb} ms` : "—"}
          </span>
        </div>
      </div>

      <div className="text-[10px] text-[var(--text-muted)] border-t border-[var(--line)] pt-2 flex items-center justify-between">
        <span>Press &apos;v&apos; to toggle</span>
        <span className="text-[var(--accent)]">Observable stack</span>
      </div>
    </aside>
  );
}
