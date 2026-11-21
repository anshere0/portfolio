"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import githubData from "@/content/github.json";

interface DayData {
  date: string;
  count: number;
  topRepo: string;
}

export default function CommitSkyline3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [hoveredDay, setHoveredDay] = useState<{
    day: DayData;
    x: number;
    y: number;
  } | null>(null);

  // Compute best day from days array
  const { bestDayCount, bestDayDate } = useMemo(() => {
    let max = 0;
    let date = "";
    for (const d of githubData.days) {
      if (d.count > max) {
        max = d.count;
        date = d.date;
      }
    }
    return { bestDayCount: max, bestDayDate: date };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let mouseX = -1000;
    let mouseY = -1000;
    let isVisible = true;

    // Arrange 365 days into 53 weeks x 7 days
    const days: DayData[] = githubData.days;
    const totalDays = days.length;
    const weeks = Math.ceil(totalDays / 7);

    // Responsive Canvas Resizing
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Pause off-screen via IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      setHoveredDay(null);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Render loop
    let progress = 0;
    const startTime = performance.now();

    const render = (time: number) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const elapsed = time - startTime;
      progress = Math.min(elapsed / 1200, 1); // 1.2s ease-in growth
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Read theme colors
      const isNight = document.documentElement.getAttribute("data-theme") === "night";
      const groundGridColor = isNight ? "rgba(233, 228, 218, 0.08)" : "rgba(255, 255, 255, 0.1)";

      // Isometric projection constants
      const tileW = Math.max(width / 62, 10);
      const tileD = tileW * 0.58; // Isometric aspect ratio
      const originX = width * 0.5;
      const originY = height * 0.72;

      let foundHover: { day: DayData; x: number; y: number } | null = null;

      // Draw ground base platform
      ctx.beginPath();
      const basePoints = [
        { x: originX + (0 - 0) * tileW, y: originY + (0 + 0) * tileD },
        { x: originX + (weeks - 0) * tileW, y: originY + (weeks + 0) * tileD },
        { x: originX + (weeks - 7) * tileW, y: originY + (weeks + 7) * tileD },
        { x: originX + (0 - 7) * tileW, y: originY + (0 + 7) * tileD },
      ];
      ctx.moveTo(basePoints[0].x, basePoints[0].y);
      for (let i = 1; i < 4; i++) ctx.lineTo(basePoints[i].x, basePoints[i].y);
      ctx.closePath();
      ctx.fillStyle = isNight ? "#0A0E13" : "#071B3E";
      ctx.fill();
      ctx.strokeStyle = groundGridColor;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Render isometric pillars back-to-front (depth sort: (w + r))
      const pillars: {
        w: number;
        r: number;
        day: DayData;
        depth: number;
      }[] = [];

      for (let w = 0; w < weeks; w++) {
        for (let r = 0; r < 7; r++) {
          const index = w * 7 + r;
          if (index < totalDays) {
            pillars.push({
              w,
              r,
              day: days[index],
              depth: w + r,
            });
          }
        }
      }

      // Sort by isometric draw order so towers in front occlude towers behind
      pillars.sort((a, b) => a.depth - b.depth);

      for (const pillar of pillars) {
        const { w, r, day } = pillar;
        const count = day.count;

        // Base 2D isometric point on grid
        const bx = originX + (w - r) * tileW;
        const by = originY + (w + r) * tileD;

        // Height proportional to count
        const maxH = 80;
        const targetH = count === 0 ? 3 : Math.min(count * 6 + 6, maxH);
        const currentH = targetH * easeProgress;

        const tx = bx;
        const ty = by - currentH;

        // Check mouse collision on top face
        const topPolygon = [
          { x: tx, y: ty },
          { x: tx + tileW * 0.9, y: ty + tileD * 0.9 },
          { x: tx, y: ty + tileD * 1.8 },
          { x: tx - tileW * 0.9, y: ty + tileD * 0.9 },
        ];

        let isHovered = false;
        if (mouseX > 0 && mouseY > 0) {
          // Bounding box approximation for hover
          if (
            mouseX >= tx - tileW &&
            mouseX <= tx + tileW &&
            mouseY >= ty &&
            mouseY <= by + tileD * 2
          ) {
            isHovered = true;
            foundHover = { day, x: tx, y: ty };
          }
        }

        // Shading palette depending on count
        let topColor: string;
        let leftColor: string;
        let rightColor: string;

        if (count === 0) {
          topColor = isNight ? "#141C24" : "#0D2654";
          leftColor = isNight ? "#0F161D" : "#0A1F45";
          rightColor = isNight ? "#0A0F14" : "#081938";
        } else if (count >= 10) {
          // Intense activity: Sodium Amber / Coral
          topColor = isHovered ? "#FFFFFF" : isNight ? "#FFB547" : "#FFD84D";
          leftColor = isNight ? "#E09028" : "#E5BC32";
          rightColor = isNight ? "#A86512" : "#997A18";
        } else if (count >= 5) {
          // Medium activity: Electric Cyan / Signal
          topColor = isHovered ? "#FFFFFF" : isNight ? "#6FD6C4" : "#7FE3FF";
          leftColor = isNight ? "#4FB8A6" : "#56BEDB";
          rightColor = isNight ? "#2F7E70" : "#2E7C94";
        } else {
          // Light activity: Royal Cyanotype Blue
          topColor = isHovered ? "#FFFFFF" : isNight ? "#3B82F6" : "#2F5BFF";
          leftColor = isNight ? "#2563EB" : "#2446DB";
          rightColor = isNight ? "#1D4ED8" : "#172F9E";
        }

        // 1. Left Facet
        ctx.beginPath();
        ctx.moveTo(tx - tileW * 0.9, ty + tileD * 0.9);
        ctx.lineTo(tx, ty + tileD * 1.8);
        ctx.lineTo(bx, by + tileD * 1.8);
        ctx.lineTo(bx - tileW * 0.9, by + tileD * 0.9);
        ctx.closePath();
        ctx.fillStyle = leftColor;
        ctx.fill();

        // 2. Right Facet
        ctx.beginPath();
        ctx.moveTo(tx, ty + tileD * 1.8);
        ctx.lineTo(tx + tileW * 0.9, ty + tileD * 0.9);
        ctx.lineTo(bx + tileW * 0.9, by + tileD * 0.9);
        ctx.lineTo(bx, by + tileD * 1.8);
        ctx.closePath();
        ctx.fillStyle = rightColor;
        ctx.fill();

        // 3. Top Facet
        ctx.beginPath();
        ctx.moveTo(topPolygon[0].x, topPolygon[0].y);
        ctx.lineTo(topPolygon[1].x, topPolygon[1].y);
        ctx.lineTo(topPolygon[2].x, topPolygon[2].y);
        ctx.lineTo(topPolygon[3].x, topPolygon[3].y);
        ctx.closePath();
        ctx.fillStyle = topColor;
        ctx.fill();

        if (isHovered) {
          ctx.strokeStyle = "#FFFFFF";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      setHoveredDay(foundHover);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[var(--bg-raised)] rounded-[12px] hairline p-4 sm:p-6 space-y-6 overflow-hidden select-none"
    >
      {/* Title & Concept */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--line)] pb-4">
        <div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight">
            A year of commits, built as a city.
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body mt-1">
            Every tower is one day on GitHub for @{githubData.username}. Taller means more shipped. Hover one to read it.
          </p>
        </div>
        <div className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--signal)] animate-pulse" />
          <span>Interactive 3D isometric projection</span>
        </div>
      </div>

      {/* 3D Canvas Viewport */}
      <div className="relative w-full h-[320px] sm:h-[400px] flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair block"
        />

        {/* Hover Tooltip */}
        {hoveredDay && (
          <div
            className="absolute z-20 pointer-events-none transform -translate-x-1/2 -translate-y-full px-3 py-1.5 rounded-[4px] bg-[var(--bg-sunken)]/95 hairline text-xs font-mono text-[var(--text)] shadow-xl backdrop-blur-md"
            style={{
              left: `${hoveredDay.x}px`,
              top: `${hoveredDay.y - 12}px`,
            }}
          >
            <div className="font-bold text-[var(--signal)]">
              {hoveredDay.day.count} {hoveredDay.day.count === 1 ? "contribution" : "contributions"}
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">
              {hoveredDay.day.date}
              {hoveredDay.day.topRepo && ` · ${hoveredDay.day.topRepo}`}
            </div>
          </div>
        )}
      </div>

      {/* 4 Authentic Numbers (matching Pranav's layout) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[var(--line)]">
        <div className="p-3 sm:p-4 rounded-[6px] bg-[var(--bg-sunken)] hairline">
          <div className="font-mono text-xl sm:text-2xl font-bold text-[var(--text)]">
            {githubData.stats.totalCommits.toLocaleString()}
          </div>
          <div className="text-[10px] sm:text-xs text-[var(--text-muted)] font-body uppercase tracking-wider mt-1">
            Contributions · 12 Months
          </div>
        </div>

        <div className="p-3 sm:p-4 rounded-[6px] bg-[var(--bg-sunken)] hairline">
          <div className="font-mono text-xl sm:text-2xl font-bold text-[var(--accent)]">
            {bestDayCount}
          </div>
          <div className="text-[10px] sm:text-xs text-[var(--text-muted)] font-body uppercase tracking-wider mt-1">
            Best Day · {bestDayDate}
          </div>
        </div>

        <div className="p-3 sm:p-4 rounded-[6px] bg-[var(--bg-sunken)] hairline">
          <div className="font-mono text-xl sm:text-2xl font-bold text-[var(--signal)]">
            {githubData.stats.longestStreak}
          </div>
          <div className="text-[10px] sm:text-xs text-[var(--text-muted)] font-body uppercase tracking-wider mt-1">
            Day Longest Streak
          </div>
        </div>

        <div className="p-3 sm:p-4 rounded-[6px] bg-[var(--bg-sunken)] hairline">
          <div className="font-mono text-xl sm:text-2xl font-bold text-[var(--text)]">
            {githubData.stats.activeDays}
          </div>
          <div className="text-[10px] sm:text-xs text-[var(--text-muted)] font-body uppercase tracking-wider mt-1">
            Days with Commits
          </div>
        </div>
      </div>

      <div className="text-center font-mono text-[10px] text-[var(--text-muted)]">
        Real activity data from @{githubData.username} · {githubData.period}
      </div>
    </div>
  );
}
