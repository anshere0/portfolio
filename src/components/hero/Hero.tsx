"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { PROFILE_DATA } from "@/content/profile";
import RagPipelineSvg from "./RagPipelineSvg";
import { Mail, Code2, ArrowDown, FileText, Sparkles, Cpu, Layers } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Dynamically import Three.js 3D Particle Field to ensure pure client-side WebGL mounting
const SystemsParticleField = dynamic(() => import("./SystemsParticleField"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[360px] bg-[var(--bg-paper-subtle)] hairline-border flex items-center justify-center font-mono text-xs text-[var(--ink-tertiary)]">
      INITIALIZING 3D WEBGL PARTICLE ENGINE...
    </div>
  ),
});

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const [activeVisualTab, setActiveVisualTab] = useState<"particles" | "pipeline" | "specs">("particles");

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Character split entrance
      tl.from(".hero-char", {
        y: 60,
        opacity: 0,
        stagger: 0.03,
        duration: 0.8,
      })
        .from(
          ".hero-fade",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
          },
          "-=0.4"
        )
        .from(
          ".hero-telemetry",
          {
            opacity: 0,
            scale: 0.98,
            duration: 0.6,
          },
          "-=0.4"
        );
    },
    { scope: containerRef }
  );

  const { identity } = PROFILE_DATA;
  const nameLetters = identity.name.split("");

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-14 lg:pb-24 hairline-b"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Name, Positioning, CTAs, Socials */}
        <div className="lg:col-span-6 space-y-6 sm:space-y-8">
          {/* Section Marker */}
          <div className="hero-fade inline-flex items-center gap-2.5 px-3 py-1 bg-[var(--bg-paper-darker)] hairline-border text-xs font-mono uppercase tracking-widest text-[var(--ink-secondary)]">
            <span className="w-2 h-2 bg-[var(--signal-vermilion)] inline-block" />
            <span>01 / SYSTEMS NOTEBOOK</span>
            <span className="text-[var(--hairline-strong)]">|</span>
            <span className="text-[var(--ink-primary)] font-semibold">
              ENGINEERING PORTFOLIO
            </span>
          </div>

          {/* Large Editorial Headline with split-char reveal */}
          <div className="overflow-hidden py-1">
            <h1
              ref={nameRef}
              className="text-6xl sm:text-7xl lg:text-8xl font-serif text-[var(--ink-primary)] tracking-tight leading-[0.92] select-none"
            >
              {nameLetters.map((char, index) => (
                <span
                  key={index}
                  className="hero-char inline-block"
                  style={{ whiteSpace: char === " " ? "pre" : "normal" }}
                >
                  {char}
                </span>
              ))}
              <span className="text-[var(--signal-vermilion)]">.</span>
            </h1>
          </div>

          {/* Positioning statement */}
          <p className="hero-fade text-xl sm:text-2xl font-sans text-[var(--ink-primary)] font-medium leading-relaxed max-w-2xl">
            {identity.subheadline}
          </p>

          <p className="hero-fade text-base sm:text-lg font-sans text-[var(--ink-secondary)] leading-relaxed max-w-2xl">
            Third-year B.Tech Computer Science student specializing in AI/ML at{" "}
            <strong className="text-[var(--ink-primary)] font-semibold">
              VIT Bhopal (2024–2028, CGPA: {identity.cgpa})
            </strong>
            . Preparing for software engineering & AI/ML roles with production-ready systems, verifiable telemetry, and zero fluff.
          </p>

          {/* Action CTAs */}
          <div className="hero-fade flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#projects"
              className="px-6 py-3.5 bg-[var(--ink-primary)] text-white font-mono text-xs uppercase tracking-wider hover:bg-[var(--signal-vermilion)] transition-colors duration-200 inline-flex items-center gap-2 shadow-xs"
            >
              <span>Explore Projects</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <a
              href="#terminal"
              className="px-6 py-3.5 bg-[var(--bg-paper-darker)] hairline-border text-[var(--ink-primary)] font-mono text-xs uppercase tracking-wider hover:bg-[var(--ink-primary)] hover:text-white transition-colors duration-200 inline-flex items-center gap-2"
            >
              <Cpu className="w-4 h-4 text-[var(--signal-vermilion)]" />
              <span>Launch AnshOS Terminal</span>
            </a>

            <a
              href={identity.resumePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 bg-transparent hairline-border text-[var(--ink-secondary)] font-mono text-xs uppercase tracking-wider hover:bg-[var(--bg-paper-darker)] hover:text-[var(--ink-primary)] transition-colors duration-200 inline-flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-[var(--signal-vermilion)]" />
              <span>Resume (PDF)</span>
            </a>
          </div>

          {/* Verified Social Channels */}
          <div className="hero-fade pt-3 flex items-center gap-3">
            <span className="text-xs font-mono text-[var(--ink-tertiary)] uppercase tracking-wider mr-2">
              DISPATCH CHANNELS:
            </span>

            <a
              href={identity.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 hairline-border bg-[var(--bg-paper-subtle)] text-[var(--ink-primary)] hover:text-[var(--signal-vermilion)] hover:border-[var(--ink-primary)] transition-all"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
              </svg>
            </a>

            <a
              href={identity.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 hairline-border bg-[var(--bg-paper-subtle)] text-[var(--ink-primary)] hover:text-[var(--signal-vermilion)] hover:border-[var(--ink-primary)] transition-all"
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            </a>

            <a
              href={identity.leetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 hairline-border bg-[var(--bg-paper-subtle)] text-[var(--ink-primary)] hover:text-[var(--signal-vermilion)] hover:border-[var(--ink-primary)] transition-all"
              title="LeetCode Profile"
              aria-label="LeetCode Profile"
            >
              <Code2 className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${identity.email}`}
              className="p-2.5 hairline-border bg-[var(--bg-paper-subtle)] text-[var(--ink-primary)] hover:text-[var(--signal-vermilion)] hover:border-[var(--ink-primary)] transition-all"
              title="Direct Email"
              aria-label="Direct Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right Column: Interactive 3D WebGL Vector Field & Lab Showcases */}
        <div className="lg:col-span-6 space-y-4">
          {/* Interactive Visual Tabs Switcher */}
          <div className="flex items-center justify-between p-1 bg-[var(--bg-paper-subtle)] hairline-border">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveVisualTab("particles")}
                className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs font-bold uppercase transition-all ${
                  activeVisualTab === "particles"
                    ? "bg-[var(--ink-primary)] text-[var(--bg-paper)] shadow-xs"
                    : "text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:bg-[var(--bg-paper-darker)]"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[var(--signal-vermilion)]" />
                <span>3D VECTOR FIELD (18K PTS)</span>
              </button>

              <button
                onClick={() => setActiveVisualTab("pipeline")}
                className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs font-bold uppercase transition-all ${
                  activeVisualTab === "pipeline"
                    ? "bg-[var(--ink-primary)] text-[var(--bg-paper)] shadow-xs"
                    : "text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:bg-[var(--bg-paper-darker)]"
                }`}
              >
                <Cpu className="w-3.5 h-3.5 text-[var(--signal-amber)]" />
                <span>RAG SIMULATOR</span>
              </button>

              <button
                onClick={() => setActiveVisualTab("specs")}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs font-bold uppercase transition-all ${
                  activeVisualTab === "specs"
                    ? "bg-[var(--ink-primary)] text-[var(--bg-paper)] shadow-xs"
                    : "text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:bg-[var(--bg-paper-darker)]"
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-[var(--signal-emerald)]" />
                <span>LAB SPECS</span>
              </button>
            </div>

            <span className="font-mono text-[10px] text-[var(--signal-vermilion)] font-bold hidden md:inline px-2">
              ● LIVE WEBGL
            </span>
          </div>

          {/* Active Visual Component Render */}
          <div className="hero-telemetry">
            {activeVisualTab === "particles" && <SystemsParticleField />}
            {activeVisualTab === "pipeline" && <RagPipelineSvg />}
            {activeVisualTab === "specs" && (
              <div className="p-6 bg-[var(--bg-paper-subtle)] hairline-border space-y-4">
                <div className="flex items-center justify-between hairline-b pb-3 text-xs font-mono uppercase tracking-widest">
                  <span className="text-[var(--ink-primary)] font-semibold">
                    LAB LOG ENTRY // 2026.10
                  </span>
                  <span className="text-[var(--signal-emerald)] flex items-center gap-1.5 font-bold">
                    <span className="w-2 h-2 rounded-full bg-[var(--signal-emerald)] inline-block" />
                    VERIFIED
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs text-[var(--ink-secondary)]">
                  <div className="flex justify-between py-1 hairline-b">
                    <span className="text-[var(--ink-tertiary)]">ENGINEER</span>
                    <span className="text-[var(--ink-primary)] font-bold">{identity.name}</span>
                  </div>
                  <div className="flex justify-between py-1 hairline-b">
                    <span className="text-[var(--ink-tertiary)]">PROGRAM / MAJOR</span>
                    <span className="text-[var(--ink-primary)]">B.Tech CSE (AI/ML)</span>
                  </div>
                  <div className="flex justify-between py-1 hairline-b">
                    <span className="text-[var(--ink-tertiary)]">INSTITUTION</span>
                    <span className="text-[var(--ink-primary)]">VIT Bhopal (2024–2028)</span>
                  </div>
                  <div className="flex justify-between py-1 hairline-b">
                    <span className="text-[var(--ink-tertiary)]">ACADEMIC CGPA</span>
                    <span className="text-[var(--ink-primary)] font-bold">{identity.cgpa}</span>
                  </div>
                  <div className="flex justify-between py-1 hairline-b">
                    <span className="text-[var(--ink-tertiary)]">PRIMARY DOMAINS</span>
                    <span className="text-[var(--ink-primary)]">RAG, Telemetry, CI Sandboxing</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[var(--ink-tertiary)]">INTERNSHIP STATUS</span>
                    <span className="text-[var(--signal-emerald)] font-semibold">
                      Webyou Technologies (Completed)
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
