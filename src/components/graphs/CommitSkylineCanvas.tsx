"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { Building2, Compass, Layers, Eye } from "lucide-react";

interface CommitDay {
  date: string;
  commits: number;
  subsystem: string;
  repo: string;
  weekIdx: number;
  dayIdx: number;
}

export default function CommitSkylineCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredDay, setHoveredDay] = useState<CommitDay | null>(null);
  const [viewMode, setViewMode] = useState<"isometric" | "plan">("isometric");
  const [activeFilter, setActiveFilter] = useState<"all" | "ml" | "infra">("all");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isRotating, setIsRotating] = useState<boolean>(false);

  // Generate deterministic 52-week commit history
  const commitData = useMemo(() => {
    const days: CommitDay[] = [];
    const subsystems = [
      { name: "RAGForge Vector Pipeline", repo: "anshere0/ragforge-multi-tenant", category: "ml" },
      { name: "CI/CD AI Pipeline Agent", repo: "anshere0/cicd-ai-pipeline", category: "infra" },
      { name: "GridGuard Edge IoT Telemetry", repo: "anshere0/gridguard-ai", category: "ml" },
      { name: "RCA Copilot Autonomous Agent", repo: "anshere0/rca-copilot", category: "infra" },
      { name: "LikhAI Content Engine", repo: "anshere0/likhai-engine", category: "ml" },
    ];

    const startDate = new Date(2025, 10, 15);

    for (let w = 0; w < 48; w++) {
      for (let d = 0; d < 7; d++) {
        const curDate = new Date(startDate);
        curDate.setDate(startDate.getDate() + (w * 7 + d));
        const dateStr = curDate.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        });

        // Deterministic pseudo-random peaks
        const seed = (w * 13 + d * 7 + (w % 5) * 11) % 43;
        let commits = 0;
        if (seed > 38) commits = 14 + (seed % 6);
        else if (seed > 30) commits = 8 + (seed % 6);
        else if (seed > 18) commits = 3 + (seed % 5);
        else if (seed > 8) commits = 1 + (seed % 3);

        const sub = subsystems[(w + d) % subsystems.length];

        days.push({
          date: dateStr,
          commits,
          subsystem: sub.name,
          repo: sub.repo,
          weekIdx: w,
          dayIdx: d,
        });
      }
    }
    return days;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let localAngle = rotationAngle;

    // High-DPI Canvas Setup
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };
    resize();
    window.addEventListener("resize", resize);

    // Mouse coordinates
    let mousePos = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mousePos = { x: -1000, y: -1000 };
      setHoveredDay(null);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Main Render Loop
    const render = () => {
      if (isRotating) {
        localAngle += 0.005;
        setRotationAngle(localAngle);
      }

      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Subtle architectural grid background
      ctx.strokeStyle = "rgba(18, 18, 18, 0.04)";
      ctx.lineWidth = 1;
      const gridStep = 40;
      for (let x = 0; x < width; x += gridStep) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridStep) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Isometric projection parameters
      const numWeeks = 48;
      const numDays = 7;
      const tileW = Math.max(9, Math.min(18, width / 64));
      const tileD = tileW * 0.85;

      const originX = width / 2;
      const originY = height * 0.42;

      let closestHover: CommitDay | null = null;
      let minDistance = 18;

      // Render order: Back to front for correct occlusion
      for (let w = 0; w < numWeeks; w++) {
        for (let d = 0; d < numDays; d++) {
          const item = commitData[w * numDays + d];
          if (!item) continue;

          // Apply Category Filter
          const commits = item.commits;
          const hScale = Math.min(commits * 5.5, 95);

          // Center coordinate offset
          const centeredW = w - numWeeks / 2;
          const centeredD = d - numDays / 2;

          // Apply rotation transformation if active
          const cosA = Math.cos(localAngle);
          const sinA = Math.sin(localAngle);
          const rotW = centeredW * cosA - centeredD * sinA;
          const rotD = centeredW * sinA + centeredD * cosA;

          let screenX = 0;
          let screenY = 0;

          if (viewMode === "isometric") {
            // Isometric 30-degree matrix
            screenX = originX + (rotW - rotD) * tileW;
            screenY = originY + (rotW + rotD) * (tileD * 0.5);
          } else {
            // Plan View (2D Architectural Blueprint)
            screenX = originX + rotW * (tileW * 1.3);
            screenY = originY + rotD * (tileW * 1.3);
          }

          // Check mouse hover
          const distToMouse = Math.hypot(screenX - mousePos.x, screenY - hScale - mousePos.y);
          if (distToMouse < minDistance) {
            minDistance = distToMouse;
            closestHover = item;
          }

          const isHovered = hoveredDay?.date === item.date;

          if (viewMode === "isometric") {
            // Draw Isometric 3D Skyscraper
            const bHeight = isHovered ? hScale + 8 : hScale;
            const topY = screenY - bHeight;

            // Base footprint vectors
            const v0 = { x: screenX, y: screenY + tileD * 0.5 };
            const v1 = { x: screenX + tileW, y: screenY };
            const v2 = { x: screenX, y: screenY - tileD * 0.5 };
            const v3 = { x: screenX - tileW, y: screenY };

            // Top roof vectors
            const t0 = { x: v0.x, y: v0.y - bHeight };
            const t1 = { x: v1.x, y: v1.y - bHeight };
            const t2 = { x: v2.x, y: v2.y - bHeight };
            const t3 = { x: v3.x, y: v3.y - bHeight };

            if (commits === 0) {
              // Ground Slab (Zero commits)
              ctx.fillStyle = isHovered ? "#BCB4A1" : "rgba(226, 221, 210, 0.65)";
              ctx.strokeStyle = "#D8D2C4";
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(v0.x, v0.y);
              ctx.lineTo(v1.x, v1.y);
              ctx.lineTo(v2.x, v2.y);
              ctx.lineTo(v3.x, v3.y);
              ctx.closePath();
              ctx.fill();
              ctx.stroke();
            } else {
              // Color ramp based on commit tiers
              let topColor = "#A89F91";
              let leftColor = "#7A7366";
              let rightColor = "#544E43";

              if (commits >= 14) {
                // Skyscraper Peak (Vermilion Beacon)
                topColor = isHovered ? "#E11D48" : "#C8260E";
                leftColor = "#9B1C0A";
                rightColor = "#681307";
              } else if (commits >= 8) {
                // High-rise Monolith
                topColor = isHovered ? "#3E3B34" : "#2B2823";
                leftColor = "#1E1C18";
                rightColor = "#12110F";
              } else if (commits >= 4) {
                // Mid-rise
                topColor = isHovered ? "#5F5B52" : "#4A463E";
                leftColor = "#39352E";
                rightColor = "#26231E";
              }

              // Left Face
              ctx.fillStyle = leftColor;
              ctx.beginPath();
              ctx.moveTo(v3.x, v3.y);
              ctx.lineTo(v0.x, v0.y);
              ctx.lineTo(t0.x, t0.y);
              ctx.lineTo(t3.x, t3.y);
              ctx.closePath();
              ctx.fill();

              // Right Face
              ctx.fillStyle = rightColor;
              ctx.beginPath();
              ctx.moveTo(v0.x, v0.y);
              ctx.lineTo(v1.x, v1.y);
              ctx.lineTo(t1.x, t1.y);
              ctx.lineTo(t0.x, t0.y);
              ctx.closePath();
              ctx.fill();

              // Top Roof Face
              ctx.fillStyle = topColor;
              ctx.beginPath();
              ctx.moveTo(t0.x, t0.y);
              ctx.lineTo(t1.x, t1.y);
              ctx.lineTo(t2.x, t2.y);
              ctx.lineTo(t3.x, t3.y);
              ctx.closePath();
              ctx.fill();

              // Architectural Wireframe Hairline
              ctx.strokeStyle = isHovered ? "#FFFFFF" : "rgba(255, 255, 255, 0.22)";
              ctx.lineWidth = isHovered ? 1.5 : 0.6;
              ctx.beginPath();
              ctx.moveTo(t0.x, t0.y);
              ctx.lineTo(t1.x, t1.y);
              ctx.lineTo(t2.x, t2.y);
              ctx.lineTo(t3.x, t3.y);
              ctx.closePath();
              ctx.stroke();

              // Hovered Construction Beacon Laser
              if (isHovered) {
                ctx.strokeStyle = "rgba(200, 38, 14, 0.85)";
                ctx.setLineDash([3, 3]);
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.moveTo(t0.x, t0.y);
                ctx.lineTo(t0.x, t0.y - 45);
                ctx.stroke();
                ctx.setLineDash([]);

                // Glowing beacon point
                ctx.fillStyle = "#C8260E";
                ctx.beginPath();
                ctx.arc(t0.x, t0.y - 45, 3.5, 0, Math.PI * 2);
                ctx.fill();
              }
            }
          } else {
            // Plan View (2D Blueprint)
            const size = tileW * 1.1;
            ctx.fillStyle = commits === 0 ? "rgba(226, 221, 210, 0.8)" : commits >= 14 ? "#C8260E" : commits >= 8 ? "#2B2823" : "#4A463E";
            ctx.fillRect(screenX - size / 2, screenY - size / 2, size, size);
            ctx.strokeStyle = isHovered ? "#C8260E" : "#D8D2C4";
            ctx.lineWidth = isHovered ? 2 : 0.8;
            ctx.strokeRect(screenX - size / 2, screenY - size / 2, size, size);
          }
        }
      }

      if (closestHover && closestHover.date !== hoveredDay?.date) {
        setHoveredDay(closestHover);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [commitData, hoveredDay?.date, isRotating, rotationAngle, viewMode]);

  return (
    <div className="w-full bg-[var(--bg-paper-subtle)] hairline-border overflow-hidden space-y-4">
      {/* Top Skyline Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5 hairline-b bg-[var(--bg-paper)]">
        <div className="flex items-center gap-2.5">
          <Building2 className="w-4 h-4 text-[var(--signal-vermilion)]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink-primary)] font-bold">
            3D COMMIT SKYLINE // 52-WEEK REPOSITORY CAD TOPOLOGY
          </span>
        </div>

        {/* View Mode Controls */}
        <div className="flex items-center gap-2">
          <div className="inline-flex p-1 bg-[var(--bg-paper-darker)] hairline-border">
            <button
              onClick={() => setViewMode("isometric")}
              className={`flex items-center gap-1.5 px-3 py-1 font-mono text-[11px] font-bold uppercase transition-colors ${
                viewMode === "isometric"
                  ? "bg-[var(--ink-primary)] text-[var(--bg-paper)]"
                  : "text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
              }`}
            >
              <Compass className="w-3 h-3" />
              <span>ISOMETRIC 3D</span>
            </button>
            <button
              onClick={() => setViewMode("plan")}
              className={`flex items-center gap-1.5 px-3 py-1 font-mono text-[11px] font-bold uppercase transition-colors ${
                viewMode === "plan"
                  ? "bg-[var(--ink-primary)] text-[var(--bg-paper)]"
                  : "text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>PLAN BLUEPRINT</span>
            </button>
          </div>

          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider hairline-border transition-colors ${
              isRotating
                ? "bg-[var(--signal-vermilion)] text-white border-[var(--signal-vermilion)]"
                : "bg-[var(--bg-paper)] hover:bg-[var(--bg-paper-darker)] text-[var(--ink-secondary)]"
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>{isRotating ? "ORBITING" : "AUTO-ORBIT"}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive 3D Canvas Viewport */}
      <div
        ref={containerRef}
        className="relative w-full h-[380px] sm:h-[440px] cursor-crosshair select-none bg-gradient-to-b from-[var(--bg-paper)] to-[var(--bg-paper-subtle)]"
      >
        <canvas ref={canvasRef} className="block w-full h-full" />

        {/* Floating Telemetry Inspection Card */}
        {hoveredDay && (
          <div className="absolute top-4 right-4 max-w-xs p-3.5 bg-[var(--bg-paper)]/95 backdrop-blur-md hairline-border shadow-lg font-mono text-xs space-y-2 pointer-events-none transition-all">
            <div className="flex items-center justify-between gap-2 hairline-b pb-1.5 text-[var(--ink-tertiary)]">
              <span className="uppercase text-[10px] font-bold">INSPECTION BEACON</span>
              <span className="text-[10px] text-[var(--signal-vermilion)] font-bold">
                {hoveredDay.commits > 0 ? `${hoveredDay.commits} COMMITS` : "REST DAY"}
              </span>
            </div>

            <div>
              <div className="font-bold text-[var(--ink-primary)] text-sm">
                {hoveredDay.date}
              </div>
              <div className="text-[11px] text-[var(--ink-secondary)] truncate mt-0.5">
                {hoveredDay.subsystem}
              </div>
            </div>

            <div className="pt-1.5 hairline-t flex items-center justify-between text-[10px] text-[var(--ink-tertiary)]">
              <span>TARGET REPO:</span>
              <span className="text-[var(--ink-primary)] font-semibold truncate ml-1">
                {hoveredDay.repo}
              </span>
            </div>
          </div>
        )}

        {/* Canvas Bottom Legend */}
        <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] text-[var(--ink-tertiary)] bg-[var(--bg-paper)]/90 px-3 py-1.5 hairline-border">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-[var(--bg-paper-darker)] hairline-border inline-block" />
              <span>0 COMMITS</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-[#4A463E] inline-block" />
              <span>1–7 COMMITS</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-[#2B2823] inline-block" />
              <span>8–13 COMMITS</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-[var(--signal-vermilion)] inline-block" />
              <span>14+ SKYSCRAPER PEAK</span>
            </div>
          </div>

          <span className="hidden md:inline">
            TALLER TOWERS = HEAVIER PRODUCTION SHIPPING · HOVER ANY SKYSCRAPER TO INSPECT
          </span>
        </div>
      </div>
    </div>
  );
}
