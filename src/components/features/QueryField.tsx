"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { FIELD_NODES, FieldNode } from "@/content/field";

interface QueryPoint {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
}

export default function QueryField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [nearestProjects, setNearestProjects] = useState<FieldNode[]>([]);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Keyboard navigation for project nodes (accessibility)
  const projectNodes = FIELD_NODES.filter((n) => n.kind === "project");

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Accessibility: check reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Check mobile screen
    const mobileCheck = window.innerWidth < 768;
    setIsMobile(mobileCheck);

    const activeNodes: (FieldNode & {
      curX: number;
      curY: number;
      startX: number;
      startY: number;
    })[] = (mobileCheck ? FIELD_NODES.filter((n) => n.mobile) : FIELD_NODES).map(
      (n, i) => {
        // Deterministic pseudo-scatter for initial entry
        const angle = (i * 137.5 * Math.PI) / 180;
        const radius = 35 + ((i % 7) * 4);
        const startX = 50 + Math.cos(angle) * radius;
        const startY = 50 + Math.sin(angle) * radius;
        return {
          ...n,
          curX: prefersReducedMotion ? n.x : startX,
          curY: prefersReducedMotion ? n.y : startY,
          startX,
          startY,
        };
      }
    );

    let animId = 0;
    let isVisible = true;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initial query point (centered slightly top-right)
    const query: QueryPoint = {
      x: width * 0.65,
      y: height * 0.35,
      targetX: width * 0.65,
      targetY: height * 0.35,
      vx: 0,
      vy: 0,
    };

    let lastInteractionTime = performance.now();
    let startTime = performance.now();
    const settleDuration = 1400; // 1.4s ease-in settle

    // Mouse & Touch tracking
    const handlePointerMove = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      query.targetX = clientX - rect.left;
      query.targetY = clientY - rect.top;
      lastInteractionTime = performance.now();
      if (!hasInteracted) setHasInteracted(true);
    };

    const onMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("touchmove", onTouchMove, { passive: true });

    // IntersectionObserver to pause loop when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const onVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Render loop
    const render = (time: number) => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      const elapsed = time - startTime;
      const settleProgress = prefersReducedMotion
        ? 1
        : Math.min(1, elapsed / settleDuration);

      // Settle interpolation (Cubic ease-out)
      const easeOut = 1 - Math.pow(1 - settleProgress, 3);

      for (let i = 0; i < activeNodes.length; i++) {
        const n = activeNodes[i];
        n.curX = n.startX + (n.x - n.startX) * easeOut;
        n.curY = n.startY + (n.y - n.startY) * easeOut;
      }

      // Idle Lissajous wander if no pointer movement for 3s
      const idleTime = time - lastInteractionTime;
      if (idleTime > 3000 && !prefersReducedMotion) {
        const t = (time - lastInteractionTime - 3000) * 0.0006;
        const wanderX = width * 0.62 + Math.sin(t * 1.2) * (width * 0.2);
        const wanderY = height * 0.35 + Math.cos(t * 1.8) * (height * 0.16);
        query.targetX = wanderX;
        query.targetY = wanderY;
      }

      // Spring smoothed query cursor (critically damped spring)
      const springK = 0.08;
      const damping = 0.78;
      const fx = (query.targetX - query.x) * springK;
      const fy = (query.targetY - query.y) * springK;
      query.vx = (query.vx + fx) * damping;
      query.vy = (query.vy + fy) * damping;
      query.x += query.vx;
      query.y += query.vy;

      // Canvas Rendering
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Theme-aware tokens reading
      const isNight = document.documentElement.getAttribute("data-theme") === "night";
      const tokenAccent = isNight ? "#FFB547" : "#FFD84D";
      const tokenSignal = isNight ? "#6FD6C4" : "#7FE3FF";
      const tokenLine = isNight
        ? "rgba(233, 228, 218, 0.14)"
        : "rgba(255, 255, 255, 0.14)";
      const tokenText = isNight ? "#E9E4DA" : "#F3F6FF";
      const tokenTextMuted = isNight ? "#9AA6B2" : "#A9BEE8";

      // Calculate proximity for each node: w = exp(-d² / 2σ²)
      const sigma = Math.min(width, height) * 0.22;
      const sigmaSq2 = 2 * sigma * sigma;

      interface ScoredNode {
        node: typeof activeNodes[0];
        screenX: number;
        screenY: number;
        dist: number;
        weight: number;
      }

      const scoredNodes: ScoredNode[] = [];

      for (let i = 0; i < activeNodes.length; i++) {
        const n = activeNodes[i];
        const screenX = (n.curX / 100) * width;
        const screenY = (n.curY / 100) * height;

        const dx = screenX - query.x;
        const dy = screenY - query.y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);
        const weight = Math.exp(-distSq / sigmaSq2);

        scoredNodes.push({ node: n, screenX, screenY, dist, weight });
      }

      // Sort by proximity to find top 5 nearest nodes
      scoredNodes.sort((a, b) => a.dist - b.dist);
      const top5 = scoredNodes.slice(0, 5);

      // Draw Hairline Connection Rays to top 5 nearest nodes
      for (let i = 0; i < top5.length; i++) {
        const item = top5[i];
        if (item.weight < 0.08) continue;

        ctx.strokeStyle = tokenSignal;
        ctx.globalAlpha = Math.min(0.85, item.weight * 1.2);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(query.x, query.y);
        ctx.lineTo(item.screenX, item.screenY);
        ctx.stroke();

        // Minor distance marker tick along midpoint
        const midX = (query.x + item.screenX) * 0.5;
        const midY = (query.y + item.screenY) * 0.5;
        ctx.fillStyle = tokenSignal;
        ctx.fillRect(midX - 1.5, midY - 1.5, 3, 3);
      }

      // Draw all nodes
      for (let i = 0; i < scoredNodes.length; i++) {
        const { node, screenX, screenY, weight } = scoredNodes[i];
        const isProject = node.kind === "project";
        const isTopNearest = top5.some((t) => t.node.id === node.id);

        const alpha = Math.max(0.25, Math.min(1, weight * 1.5 + (isProject ? 0.35 : 0.1)));
        ctx.globalAlpha = alpha;

        // Node dot
        const dotRadius = isProject ? 3.5 : 2;
        ctx.fillStyle = isTopNearest ? tokenAccent : isProject ? tokenSignal : tokenText;
        ctx.beginPath();
        ctx.arc(screenX, screenY, dotRadius, 0, Math.PI * 2);
        ctx.fill();

        // Node label
        const fontSize = isProject ? 12 : 11;
        ctx.font = `${isProject ? "600" : "400"} ${fontSize}px Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
        ctx.fillStyle = isTopNearest ? tokenAccent : isProject ? tokenText : tokenTextMuted;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(node.label, screenX + 7, screenY);
      }

      // Draw Query Cursor Indicator
      ctx.globalAlpha = 1;
      // Center query dot
      ctx.fillStyle = tokenAccent;
      ctx.beginPath();
      ctx.arc(query.x, query.y, 4, 0, Math.PI * 2);
      ctx.fill();

      // Outer focus ring around cursor
      ctx.strokeStyle = tokenAccent;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(query.x, query.y, 11, 0, Math.PI * 2);
      ctx.stroke();

      // Proximity (illustrative) caption near query point
      ctx.font = '10px "Geist Mono", SFMono-Regular, Menlo, Monaco, Consolas, monospace';
      ctx.fillStyle = tokenAccent;
      ctx.globalAlpha = 0.85;
      ctx.textAlign = "left";
      ctx.textBaseline = "bottom";
      ctx.fillText("query ● proximity (illustrative)", query.x + 16, query.y - 4);

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("touchmove", onTouchMove);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [hasInteracted]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-auto"
      style={{ touchAction: "none" }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="block w-full h-full cursor-crosshair"
      />

      {/* Visually hidden list of semantic project buttons for keyboard & screen reader accessibility */}
      <nav
        aria-label="Interactive project field navigation"
        className="sr-only"
      >
        <ul>
          {projectNodes.map((p) => (
            <li key={p.id}>
              <a href={p.href || `#${p.id}`}>
                {p.label} (Explore case study)
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
