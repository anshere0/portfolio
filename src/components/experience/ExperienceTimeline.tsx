"use client";

import { useRef } from "react";
import { PROFILE_DATA, ExperienceItem } from "@/content/profile";
import { Briefcase, ArrowUpRight, Quote, CheckCircle2, AlertCircle } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // Vertical line drawing animation as user scrolls
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              end: "bottom 80%",
              scrub: 1,
            },
          }
        );
      }

      // Nodes entrance
      const nodes = gsap.utils.toArray<HTMLElement>(".timeline-card");
      nodes.forEach((node) => {
        gsap.from(node, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: node,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: containerRef }
  );

  const { experiences } = PROFILE_DATA;

  return (
    <section
      id="experience"
      ref={containerRef}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 hairline-b bg-[var(--bg-paper)]"
    >
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-16 hairline-b pb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 bg-[var(--signal-vermilion)] inline-block" />
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink-secondary)] font-bold">
              05 / PRODUCTION EXPERIENCE
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif text-[var(--ink-primary)] tracking-tight">
            Work Experience & Industry Internships
          </h2>
        </div>

        <div className="font-mono text-xs text-[var(--ink-tertiary)] uppercase">
          CHRONOLOGICAL AUDIT TRAIL
        </div>
      </div>

      {/* Vertical Timeline Container */}
      <div className="relative pl-6 sm:pl-10">
        {/* Animated vertical guide line */}
        <div
          ref={lineRef}
          className="absolute left-2.5 sm:left-4 top-2 bottom-8 w-[2px] bg-[var(--ink-primary)]"
        />

        <div className="space-y-12">
          {experiences.map((exp: ExperienceItem) => {
            const isWebyou = exp.id === "webyou";

            return (
              <div
                key={exp.id}
                className="timeline-card relative space-y-4"
              >
                {/* Node icon marker */}
                <div className="absolute -left-[30px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-[var(--bg-paper)] hairline-border flex items-center justify-center">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      exp.isFlaggedTodo
                        ? "bg-[var(--signal-amber)]"
                        : "bg-[var(--signal-emerald)]"
                    }`}
                  />
                </div>

                <div
                  className={`p-6 sm:p-8 bg-[var(--bg-paper-subtle)] hairline-border space-y-5 ${
                    isWebyou ? "ring-1 ring-[var(--ink-primary)] shadow-sm" : ""
                  }`}
                >
                  {/* Top Metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-3 hairline-b pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[var(--signal-vermilion)]">
                          {exp.period}
                        </span>
                        <span className="text-[var(--hairline-strong)]">|</span>
                        <span className="font-mono text-xs text-[var(--ink-tertiary)] uppercase">
                          {exp.location}
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-serif text-[var(--ink-primary)] tracking-tight">
                        {exp.role} <span className="font-sans text-xl text-[var(--ink-secondary)] font-normal">@ {exp.company}</span>
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-1 text-xs font-mono uppercase tracking-wider hairline-border inline-flex items-center gap-1.5 ${
                          exp.isFlaggedTodo
                            ? "bg-amber-50 text-[var(--signal-amber)] border-amber-300"
                            : "bg-emerald-50 text-[var(--signal-emerald)] border-emerald-300"
                        }`}
                      >
                        {exp.isFlaggedTodo ? (
                          <AlertCircle className="w-3.5 h-3.5" />
                        ) : (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        )}
                        <span>{exp.statusBadge}</span>
                      </span>

                      {exp.certificateUrl && (
                        <a
                          href={exp.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 text-xs font-mono uppercase tracking-wider hairline-border bg-[var(--bg-paper)] hover:bg-[var(--bg-paper-darker)] transition-colors inline-flex items-center gap-1"
                        >
                          <span>Credential</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Mr. Jay Soni Testimonial Quote (Webyou Technologies) */}
                  {exp.testimonial && (
                    <div className="p-4 bg-[var(--bg-paper)] hairline-border space-y-2 border-l-4 border-l-[var(--signal-vermilion)]">
                      <div className="flex items-start gap-2">
                        <Quote className="w-4 h-4 text-[var(--signal-vermilion)] shrink-0 mt-0.5" />
                        <p className="font-serif italic text-base sm:text-lg text-[var(--ink-primary)] leading-relaxed">
                          "{exp.testimonial.quote}"
                        </p>
                      </div>
                      <div className="font-mono text-xs text-[var(--ink-secondary)] pl-6">
                        — <strong>{exp.testimonial.author}</strong>, {exp.testimonial.title}
                      </div>
                    </div>
                  )}

                  {/* Responsibilities & Impact Bullets */}
                  <ul className="space-y-2.5 font-sans text-base text-[var(--ink-primary)] leading-relaxed">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <span className="text-[var(--signal-vermilion)] font-mono text-sm leading-6">
                          ▪
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech chips */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 hairline-t">
                    <span className="font-mono text-[11px] text-[var(--ink-tertiary)] uppercase mr-1">
                      ENVIRONMENT:
                    </span>
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 bg-[var(--bg-paper-darker)] text-[var(--ink-primary)] font-mono text-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
