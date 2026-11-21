"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function IntroMonogram() {
  const [show, setShow] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef1 = useRef<SVGPathElement>(null);
  const pathRef2 = useRef<SVGPathElement>(null);

  useEffect(() => {
    // Only play once per session, and skip if direct section anchor requested or CI/test flag
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const hasHash = window.location.hash && window.location.hash.length > 1;
      const skipIntro = urlParams.get("skipIntro") === "true" || hasHash;
      const hasSeen = sessionStorage.getItem("ansh_portfolio_intro_seen");

      if (hasSeen || skipIntro) {
        setShow(false);
        return;
      }
      setShow(true);
    }
  }, []);

  const handleDismiss = () => {
    if (!containerRef.current) {
      setShow(false);
      return;
    }
    sessionStorage.setItem("ansh_portfolio_intro_seen", "true");
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.out",
      onComplete: () => setShow(false),
    });
  };

  useGSAP(
    () => {
      if (!show) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
          handleDismiss();
        }
      };
      window.addEventListener("keydown", handleKeyDown);

      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("ansh_portfolio_intro_seen", "true");
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.35,
            ease: "power2.inOut",
            delay: 0.15,
            onComplete: () => setShow(false),
          });
        },
      });

      // Prepare SVG strokes
      const path1 = pathRef1.current;
      const path2 = pathRef2.current;

      if (path1 && path2) {
        const len1 = path1.getTotalLength();
        const len2 = path2.getTotalLength();

        gsap.set([path1, path2], {
          strokeDasharray: (i) => (i === 0 ? len1 : len2),
          strokeDashoffset: (i) => (i === 0 ? len1 : len2),
          opacity: 1,
        });

        tl.to([path1, path2], {
          strokeDashoffset: 0,
          duration: 0.75,
          ease: "power2.inOut",
          stagger: 0.08,
        })
          .from(".intro-label", {
            opacity: 0,
            y: 8,
            duration: 0.25,
            ease: "power2.out",
          }, "-=0.2")
          .from(".intro-mono", {
            opacity: 0,
            duration: 0.2,
          }, "-=0.1");
      }

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    },
    { scope: containerRef, dependencies: [show] }
  );

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      onClick={handleDismiss}
      className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-[var(--bg-paper)] cursor-pointer select-none"
      title="Click or press Esc to skip"
    >
      <div className="absolute top-6 right-6">
        <button
          onClick={handleDismiss}
          className="text-xs font-mono tracking-widest text-[var(--ink-secondary)] hover:text-[var(--signal-vermilion)] uppercase hairline-border px-3 py-1 bg-[var(--bg-paper-subtle)]"
        >
          SKIP [ESC]
        </button>
      </div>

      <div className="relative flex flex-col items-center space-y-6">
        {/* Architectural Monogram SVG */}
        <svg
          width="130"
          height="110"
          viewBox="0 0 130 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-[var(--ink-primary)]"
        >
          {/* First A */}
          <path
            ref={pathRef1}
            d="M 15 100 L 45 15 L 75 100 M 27 70 L 63 70"
            strokeWidth="3.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
          {/* Second A (interlocking offset) */}
          <path
            ref={pathRef2}
            d="M 55 100 L 85 15 L 115 100 M 67 70 L 103 70"
            strokeWidth="3.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>

        <div className="text-center space-y-1">
          <div className="intro-label text-xl font-serif tracking-wide text-[var(--ink-primary)]">
            ANSH ARORA
          </div>
          <div className="intro-mono text-xs font-mono tracking-widest text-[var(--signal-vermilion)] uppercase">
            SYSTEMS & ML ENGINEERING LAB
          </div>
        </div>
      </div>
    </div>
  );
}
