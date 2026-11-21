import Image from "next/image";
import { PROFILE_DATA } from "@/content/profile";
import { GraduationCap, BookOpen, MapPin, Award } from "lucide-react";

export default function AboutSection() {
  const { identity, narrative } = PROFILE_DATA;

  return (
    <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 hairline-b bg-[var(--bg-paper)]">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-12 hairline-b pb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 bg-[var(--signal-vermilion)] inline-block" />
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink-secondary)] font-bold">
              04 / BIOGRAPHICAL DOSSIER
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif text-[var(--ink-primary)] tracking-tight">
            Engineering Background & Philosophy
          </h2>
        </div>

        <div className="font-mono text-xs text-[var(--ink-tertiary)] uppercase">
          VIT BHOPAL · 2024–2028 COHORT
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Portrait Photograph with Hairline Borders */}
        <div className="lg:col-span-4 space-y-4">
          <div className="relative p-2 bg-[var(--bg-paper-subtle)] hairline-border shadow-sm">
            <div className="relative w-full aspect-[4/5] overflow-hidden hairline-border bg-[var(--bg-paper-darker)]">
              <Image
                src={identity.avatarUrl}
                alt="Ansh Arora Portrait"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
                priority
              />
            </div>
            <div className="pt-3 pb-1 flex justify-between items-center font-mono text-[11px] text-[var(--ink-tertiary)]">
              <span>PHOTO REF // ANSH_ARORA</span>
              <span className="text-[var(--signal-emerald)]">● ACTIVE</span>
            </div>
          </div>

          {/* Education Summary Card */}
          <div className="p-5 bg-[var(--bg-paper-subtle)] hairline-border space-y-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-[var(--ink-primary)] font-bold uppercase tracking-wider hairline-b pb-2">
              <GraduationCap className="w-4 h-4 text-[var(--signal-vermilion)]" />
              <span>ACADEMIC ENROLLMENT</span>
            </div>
            <div className="space-y-2 text-[var(--ink-secondary)]">
              <div>
                <span className="text-[var(--ink-tertiary)] block text-[11px]">INSTITUTION</span>
                <span className="text-[var(--ink-primary)] font-medium">{identity.institution}</span>
              </div>
              <div>
                <span className="text-[var(--ink-tertiary)] block text-[11px]">DEGREE & SPECIALIZATION</span>
                <span className="text-[var(--ink-primary)]">{identity.degree} — {identity.specialization}</span>
              </div>
              <div className="flex justify-between py-1 hairline-t">
                <span className="text-[var(--ink-tertiary)]">GRADUATION COHORT</span>
                <span className="text-[var(--ink-primary)]">{identity.batch}</span>
              </div>
              <div className="flex justify-between py-1 hairline-t">
                <span className="text-[var(--ink-tertiary)]">ACADEMIC CGPA</span>
                <span className="text-[var(--signal-vermilion)] font-bold">{identity.cgpa}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative Biography & Coursework Ledger */}
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-4">
            <p className="text-xl sm:text-2xl font-serif text-[var(--ink-primary)] leading-relaxed">
              {narrative.lead}
            </p>

            {narrative.paragraphs.map((p, idx) => (
              <p
                key={idx}
                className="text-base sm:text-lg font-sans text-[var(--ink-secondary)] leading-relaxed"
              >
                {p}
              </p>
            ))}
          </div>

          {/* Core Technical Coursework Ledger */}
          <div className="space-y-4 hairline-t pt-8">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--ink-tertiary)]">
              <BookOpen className="w-4 h-4 text-[var(--signal-vermilion)]" />
              <span>VERIFIED ACADEMIC COURSEWORK // VIT BHOPAL</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
              {narrative.coursework.map((course, cIdx) => (
                <div
                  key={cIdx}
                  className="p-3 bg-[var(--bg-paper-subtle)] hairline-border text-[var(--ink-primary)] flex items-start gap-2"
                >
                  <span className="text-[var(--signal-vermilion)] font-bold text-[11px]">
                    0{cIdx + 1}
                  </span>
                  <span>{course}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Placement Positioning Callout */}
          <div className="p-6 bg-[var(--bg-paper-subtle)] hairline-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[var(--signal-vermilion)] font-bold uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>PLACEMENT READINESS TARGET</span>
              </div>
              <p className="text-[var(--ink-secondary)] max-w-xl">
                Preparing for product-based company hiring for Software Engineering (SDE) and Applied Machine Learning roles. Available for 2026–2028 internships and early graduation placement.
              </p>
            </div>

            <a
              href="#contact"
              className="shrink-0 px-4 py-2.5 bg-[var(--ink-primary)] text-white uppercase tracking-wider hover:bg-[var(--signal-vermilion)] transition-colors"
            >
              Initiate Contact →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
