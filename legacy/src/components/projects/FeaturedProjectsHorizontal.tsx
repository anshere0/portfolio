"use client";

import { useRef } from "react";
import Link from "next/link";
import { PROFILE_DATA, Project } from "@/content/profile";
import { ArrowRight, ArrowUpRight, Cpu, Layers } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function FeaturedProjectsHorizontal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();

      // Desktop Pinned Horizontal Scroll
      mm.add("(min-width: 1024px)", () => {
        const panels = gsap.utils.toArray<HTMLElement>(".horizontal-panel");
        if (panels.length === 0 || !horizontalTrackRef.current) return;

        const totalPanels = panels.length;

        gsap.to(panels, {
          xPercent: -100 * (totalPanels - 1),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            snap: 1 / (totalPanels - 1),
            start: "top top",
            end: () => `+=${window.innerWidth * (totalPanels - 1) * 0.9}`,
            invalidateOnRefresh: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  const { featuredProjects } = PROFILE_DATA;

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative hairline-b bg-[var(--bg-paper)] overflow-hidden"
    >
      {/* Section Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 flex flex-wrap items-center justify-between gap-4 hairline-b">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 bg-[var(--signal-vermilion)] inline-block" />
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink-secondary)] font-bold">
              03 / FEATURED CASE STUDIES
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif text-[var(--ink-primary)] tracking-tight">
            Production Systems & Architectures
          </h2>
        </div>

        <div className="flex items-center gap-4 font-mono text-xs text-[var(--ink-tertiary)] uppercase">
          <span className="hidden lg:inline">HORIZONTAL SCROLL PINNED [01–04]</span>
          <span className="lg:hidden">VERTICAL STACK [01–04]</span>
        </div>
      </div>

      {/* Horizontal Track on Desktop, Vertical Stack on Mobile */}
      <div
        ref={horizontalTrackRef}
        className="flex flex-col lg:flex-row w-full lg:h-[82vh] lg:w-[400%]"
      >
        {featuredProjects.map((project: Project, index: number) => {
          const projectNum = `0${index + 1}`;

          return (
            <div
              key={project.slug}
              className="horizontal-panel w-full lg:w-[100vw] lg:h-full shrink-0 p-4 sm:p-8 lg:p-14 flex items-center justify-center hairline-b lg:hairline-b-0 lg:hairline-r"
            >
              <div className="w-full max-w-5xl bg-[var(--bg-paper-subtle)] hairline-border p-6 sm:p-10 space-y-6 shadow-sm">
                {/* Panel Top Meta */}
                <div className="flex flex-wrap items-center justify-between gap-3 hairline-b pb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xl sm:text-2xl font-bold text-[var(--signal-vermilion)]">
                      {projectNum} //
                    </span>
                    <span className="font-mono text-xs sm:text-sm uppercase tracking-wider text-[var(--ink-secondary)]">
                      CASE STUDY BLUEPRINT
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 text-xs font-mono uppercase tracking-wider hairline-border ${
                        project.status === "Completed"
                          ? "bg-emerald-50 text-[var(--signal-emerald)] border-emerald-300"
                          : "bg-amber-50 text-[var(--signal-amber)] border-amber-300"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div className="space-y-2">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[var(--ink-primary)] tracking-tight">
                    {project.title}
                  </h3>
                  <p className="font-mono text-xs sm:text-sm text-[var(--ink-secondary)]">
                    {project.subtitle}
                  </p>
                </div>

                {/* One Liner & Problem */}
                <p className="text-base sm:text-lg font-sans text-[var(--ink-primary)] leading-relaxed">
                  {project.oneLiner}
                </p>

                {/* Engineering Metrics Preview */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 font-mono text-xs hairline-y">
                  {project.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="space-y-0.5">
                      <div className="text-[var(--ink-tertiary)] uppercase text-[11px]">
                        {metric.label}
                      </div>
                      <div className="font-bold text-[var(--ink-primary)] text-sm">
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Architecture Steps Flow Preview */}
                <div className="space-y-2">
                  <div className="font-mono text-xs uppercase tracking-widest text-[var(--ink-tertiary)] flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[var(--signal-vermilion)]" />
                    <span>SYSTEM STAGE SEQUENCE</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                    {project.architectureSteps.map((step, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-center gap-1.5 px-2.5 py-1 bg-[var(--bg-paper)] hairline-border text-[var(--ink-primary)]"
                      >
                        <span className="text-[var(--signal-vermilion)] font-bold">
                          {step.step.split(".")[0]}
                        </span>
                        <span>{step.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 bg-[var(--bg-paper-darker)]/80 text-[var(--ink-primary)] font-mono text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 hairline-t">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--ink-primary)] text-white font-mono text-xs uppercase tracking-wider hover:bg-[var(--signal-vermilion)] transition-colors duration-200"
                  >
                    <span>Read Architecture Blueprint</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <div className="flex items-center gap-3 font-mono text-xs">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[var(--ink-primary)] underline hover:text-[var(--signal-vermilion)]"
                      >
                        <span>Live Deployment</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}

                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
                      >
                        <span>Source Code</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
