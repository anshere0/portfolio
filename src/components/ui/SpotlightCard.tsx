"use client";

import React, { useRef, useState, useCallback } from "react";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  enableTilt?: boolean;
}

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "var(--signal)",
  enableTilt = true,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [transformStyle, setTransformStyle] = useState<string>("");

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePos({ x, y });

      if (enableTilt && typeof window !== "undefined") {
        const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!isReduced) {
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -4; // Max -4deg to 4deg
          const rotateY = ((x - centerX) / centerX) * 4; // Max -4deg to 4deg

          setTransformStyle(
            `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.005, 1.005, 1.005)`
          );
        }
      }
    },
    [enableTilt]
  );

  const handleMouseLeave = useCallback(() => {
    setMousePos(null);
    setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: mousePos ? "transform 0.08s ease-out" : "transform 0.4s ease-out",
      }}
      className={`relative overflow-hidden rounded-[12px] bg-[var(--bg-raised)] hairline ${className}`}
    >
      {/* Radial Spotlight Overlay following mouse */}
      {mousePos && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(127, 227, 255, 0.12), transparent 70%)`,
          }}
        />
      )}

      {/* Card Content */}
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
}
