"use client";

import React, { useState, useMemo } from "react";
import githubData from "@/content/github.json";

interface DayData {
  date: string;
  count: number;
  topRepo: string;
}

export default function LoadCurve() {
  const [thresholdZ, setThresholdZ] = useState(2.0);
  const [hoveredDay, setHoveredDay] = useState<{
    day: DayData;
    z: number;
    x: number;
    y: number;
  } | null>(null);

  const days: DayData[] = githubData.days;
  const { stats } = githubData;

  // Compute Mean and Standard Deviation for genuine z-scores
  const { mean, stdDev, zScores } = useMemo(() => {
    const counts = days.map((d) => d.count);
    const n = counts.length || 1;
    const avg = counts.reduce((a, b) => a + b, 0) / n;
    const variance =
      counts.reduce((acc, c) => acc + Math.pow(c - avg, 2), 0) / n;
    const sd = Math.sqrt(variance) || 1;

    const zs = counts.map((c) => (c - avg) / sd);
    return { mean: avg, stdDev: sd, zScores: zs };
  }, [days]);

  // SVG Coordinates
  const width = 800;
  const height = 180;
  const paddingX = 20;
  const paddingY = 25;
  const innerWidth = width - paddingX * 2;
  const innerHeight = height - paddingY * 2;

  const maxCount = Math.max(...days.map((d) => d.count), 16);

  // Generate smooth SVG polyline path
  const points = useMemo(() => {
    return days.map((d, i) => {
      const x = paddingX + (i / Math.max(1, days.length - 1)) * innerWidth;
      const y = paddingY + innerHeight - (d.count / maxCount) * innerHeight;
      return { x, y, day: d, z: zScores[i] };
    });
  }, [days, zScores, maxCount, innerWidth, innerHeight]);

  const pathD = useMemo(() => {
    if (points.length === 0) return "";
    return points.reduce((acc, pt, i) => {
      return i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
    }, "");
  }, [points]);

  // Days flagged above current threshold
  const anomalies = useMemo(() => {
    return points.filter((pt) => pt.z >= thresholdZ && pt.day.count > 0);
  }, [points, thresholdZ]);

  return (
    <div className="w-full bg-[var(--bg-raised)] rounded-[12px] hairline p-5 sm:p-6 space-y-6">
      {/* Header & 3 Honest Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text)] tracking-tight">
            Commit load curve
          </h3>
          <p className="text-xs text-[var(--text-muted)] font-body mt-1">
            Daily activity for @{githubData.username} analyzed like a smart-meter profile. Days exceeding the z-score threshold flag as anomalies.
          </p>
        </div>

        {/* 3 Honest Numbers */}
        <div className="flex items-center gap-4 sm:gap-6 font-mono text-xs">
          <div className="space-y-0.5">
            <span className="text-[10px] text-[var(--text-muted)] uppercase block">
              12M TOTAL
            </span>
            <span className="font-bold text-[var(--text)] text-sm">
              {stats.totalCommits}
            </span>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] text-[var(--text-muted)] uppercase block">
              STREAK
            </span>
            <span className="font-bold text-[var(--signal)] text-sm">
              {stats.longestStreak}d
            </span>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] text-[var(--text-muted)] uppercase block">
              ACTIVE DAYS
            </span>
            <span className="font-bold text-[var(--accent)] text-sm">
              {stats.activeDays}d
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Oscilloscope Chart Area */}
      <div className="relative bg-[var(--bg-sunken)] rounded-[6px] hairline p-2 sm:p-4 overflow-hidden">
        {/* Subtle Oscilloscope Grid Background */}
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto block select-none"
          role="img"
          aria-label="GitHub commit load profile line chart with anomaly flags"
        >
          {/* Grid lines */}
          <line
            x1={paddingX}
            y1={paddingY}
            x2={width - paddingX}
            y2={paddingY}
            stroke="var(--line)"
            strokeDasharray="3 3"
          />
          <line
            x1={paddingX}
            y1={paddingY + innerHeight * 0.5}
            x2={width - paddingX}
            y2={paddingY + innerHeight * 0.5}
            stroke="var(--line)"
            strokeDasharray="3 3"
          />
          <line
            x1={paddingX}
            y1={height - paddingY}
            x2={width - paddingX}
            y2={height - paddingY}
            stroke="var(--line)"
          />

          {/* Oscilloscope Wave Trace */}
          <path
            d={pathD}
            fill="none"
            stroke="var(--signal)"
            strokeWidth="1.8"
            strokeLinejoin="round"
            strokeLinecap="round"
            className="transition-all duration-300"
          />

          {/* Anomaly Flag Points */}
          {anomalies.map((pt, idx) => (
            <g key={idx}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r={4}
                fill="var(--accent)"
                className="animate-pulse"
              />
              <circle
                cx={pt.x}
                cy={pt.y}
                r={7}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1"
                opacity={0.6}
              />
            </g>
          ))}

          {/* Interactive Transparent Hover Targets */}
          {points.map((pt, idx) => (
            <rect
              key={idx}
              x={pt.x - 3}
              y={0}
              width={6}
              height={height}
              fill="transparent"
              className="cursor-crosshair"
              onMouseEnter={() =>
                setHoveredDay({ day: pt.day, z: pt.z, x: pt.x, y: pt.y })
              }
              onMouseLeave={() => setHoveredDay(null)}
            />
          ))}
        </svg>

        {/* Live Hover Tooltip */}
        {hoveredDay && (
          <div
            className="absolute z-20 pointer-events-none p-2 rounded-[4px] bg-[var(--bg-raised)] hairline font-mono text-[11px] space-y-0.5 shadow-lg"
            style={{
              left: `${Math.min(75, Math.max(10, (hoveredDay.x / width) * 100))}%`,
              top: "12px",
            }}
          >
            <div className="font-bold text-[var(--text)]">
              {hoveredDay.day.date}: {hoveredDay.day.count} commits
            </div>
            <div className="text-[var(--text-muted)] text-[10px]">
              Top repo: {hoveredDay.day.topRepo || "none"} (z: {hoveredDay.z.toFixed(2)}σ)
            </div>
          </div>
        )}
      </div>

      {/* Threshold Slider Controls */}
      <div className="space-y-2">
        <div className="flex items-center justify-between font-mono text-xs">
          <span className="text-[var(--text-muted)]">
            Anomaly Threshold (z-score):
          </span>
          <span className="text-[var(--accent)] font-bold">
            {thresholdZ.toFixed(1)} σ ({anomalies.length} days flagged)
          </span>
        </div>

        <input
          type="range"
          min="1.5"
          max="3.5"
          step="0.1"
          value={thresholdZ}
          onChange={(e) => setThresholdZ(parseFloat(e.target.value))}
          className="w-full accent-[var(--accent)] cursor-pointer"
          aria-label="Commit anomaly z-score threshold slider"
        />

        <div className="flex justify-between font-mono text-[10px] text-[var(--text-muted)]">
          <span>1.5σ (Sensitive)</span>
          <span>Mean: {mean.toFixed(1)} commits/day, StdDev: {stdDev.toFixed(1)}</span>
          <span>3.5σ (Extreme spikes only)</span>
        </div>
      </div>

      {/* Accessible Table Disclosure */}
      <details className="text-xs font-mono text-[var(--text-muted)]">
        <summary className="cursor-pointer hover:text-[var(--text)] transition-colors">
          View accessible commit data table
        </summary>
        <div className="mt-3 max-h-48 overflow-y-auto hairline rounded-[4px] p-2 bg-[var(--bg-sunken)]">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--line)]">
                <th className="py-1">Date</th>
                <th className="py-1">Commits</th>
                <th className="py-1">Top Repo</th>
                <th className="py-1">z-Score</th>
              </tr>
            </thead>
            <tbody>
              {days.slice(0, 30).map((d, i) => (
                <tr key={d.date} className="border-b border-[var(--line)]/50">
                  <td className="py-0.5">{d.date}</td>
                  <td className="py-0.5">{d.count}</td>
                  <td className="py-0.5">{d.topRepo || "-"}</td>
                  <td className="py-0.5">{zScores[i].toFixed(2)}σ</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-[10px] pt-2 text-[var(--text-muted)]">
            Showing first 30 days of 12-month snapshot.
          </p>
        </div>
      </details>
    </div>
  );
}
