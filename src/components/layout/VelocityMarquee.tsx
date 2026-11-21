"use client";

import { useEffect, useRef, useState } from "react";

const MARQUEE_ITEMS = [
  "MULTI-TENANT RAG PIPELINES",
  "PGVECTOR HNSW RECALL",
  "SUB-200MS LATENCY BUDGET",
  "VIT BHOPAL '28 · CGPA 7.51/10",
  "FASTAPI & DOCKER SANDBOXES",
  "PYTORCH & XGBOOST INFERENCE",
  "120+ DSA BENCHMARKS IN C++",
  "EVENT-DRIVEN WEBSOCKETS",
  "SYSTEMS ARCHITECTURE NOTEBOOK",
  "WEBYOU TECHNOLOGIES INTERN",
  "THREE.JS WEBGL SIMULATIONS",
];

export default function VelocityMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef<number>(0);
  const velocityRef = useRef<number>(1.2);
  const targetVelocityRef = useRef<number>(1.2);
  const [velocityTelemetry, setVelocityTelemetry] = useState<number>(1.2);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = performance.now();
      const deltaY = Math.abs(currentScrollY - lastScrollY);
      const deltaTime = Math.max(currentTime - lastTime, 1);

      // Calculate instantaneous scroll velocity
      const instantaneousVelocity = (deltaY / deltaTime) * 12;
      targetVelocityRef.current = Math.min(1.2 + instantaneousVelocity, 18);

      lastScrollY = currentScrollY;
      lastTime = currentTime;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    let animId = 0;
    let telemetryCount = 0;

    const tick = () => {
      // Smoothly interpolate towards target velocity, then decay back to idle cruising speed
      velocityRef.current += (targetVelocityRef.current - velocityRef.current) * 0.08;
      targetVelocityRef.current += (1.2 - targetVelocityRef.current) * 0.04;

      offsetRef.current -= velocityRef.current;

      // Wrap around seamlessly
      if (containerRef.current) {
        const fullWidth = containerRef.current.scrollWidth / 2;
        if (Math.abs(offsetRef.current) >= fullWidth) {
          offsetRef.current = 0;
        }
        containerRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }

      telemetryCount++;
      if (telemetryCount % 15 === 0) {
        setVelocityTelemetry(parseFloat(velocityRef.current.toFixed(1)));
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="w-full bg-[var(--bg-paper-darker)] hairline-t hairline-b overflow-hidden select-none py-2.5 relative">
      {/* Velocity Telemetry Tag */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center gap-1.5 px-2 py-0.5 bg-[var(--bg-paper)] hairline-border font-mono text-[10px] text-[var(--ink-secondary)] pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal-vermilion)] animate-pulse" />
        <span>TICKER VELOCITY: <strong>{velocityTelemetry}x</strong></span>
      </div>

      {/* Track */}
      <div ref={containerRef} className="flex items-center whitespace-nowrap will-change-transform">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
          <div key={idx} className="inline-flex items-center gap-4 px-4 font-mono text-xs uppercase tracking-wider text-[var(--ink-secondary)]">
            <span className="text-[var(--ink-primary)] font-bold">{item}</span>
            <span className="text-[var(--signal-vermilion)] text-xs font-bold select-none">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
