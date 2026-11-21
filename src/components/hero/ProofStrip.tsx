"use client";

import { useRef } from "react";
import { PROFILE_DATA } from "@/content/profile";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ProofStrip() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // Smooth subtle reveal on scroll
      gsap.from(".proof-number", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%",
          toggleActions: "play none none none",
        },
        scale: 0.9,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 hairline-b bg-[var(--bg-paper)]"
    >
      <div className="flex items-center gap-2 mb-8">
        <span className="w-2 h-2 bg-[var(--signal-vermilion)] inline-block" />
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink-secondary)] font-semibold">
          02 / PROOF OF ENGINEERING DEPTH & CREDENTIALS
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-10">
        {PROFILE_DATA.proofMetrics.map((metric, idx) => (
          <div
            key={idx}
            className="proof-item space-y-2 relative border-l border-[var(--hairline)] pl-4 first:border-l-0 first:pl-0 md:first:border-l md:first:pl-4"
          >
            <div className="proof-number text-4xl sm:text-5xl lg:text-6xl font-serif text-[var(--ink-primary)] tracking-tight">
              {metric.value}
            </div>
            <div className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[var(--ink-primary)] font-bold">
              {metric.label}
            </div>
            <div className="text-xs font-mono text-[var(--ink-secondary)] leading-relaxed">
              {metric.sublabel}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
