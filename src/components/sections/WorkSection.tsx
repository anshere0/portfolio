"use client";

import React, { useState } from "react";
import { FEATURED_PROJECTS } from "@/content/projects";
import ProjectCard from "./ProjectCard";
import CompactProjectsLedger from "./CompactProjectsLedger";
import ReceiptsDrawer from "@/components/features/ReceiptsDrawer";

export default function WorkSection() {
  const [activeReceiptId, setActiveReceiptId] = useState<string | null>(null);

  return (
    <section
      id="work"
      aria-label="Featured Systems & Engineering Projects"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto hairline-t space-y-12"
    >
      {/* Work Block Header */}
      <div className="max-w-3xl">
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
          Stuff I&apos;ve built.
        </h2>
        <p className="mt-3 text-base sm:text-lg text-[var(--text-muted)] font-body leading-relaxed">
          Four real systems with interactive client-side simulations you can test directly below.
        </p>
      </div>

      {/* Featured Systems List with Sticky Pipeline Rails */}
      <div className="divide-y divide-[var(--line)]">
        {FEATURED_PROJECTS.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            onReceiptClick={(metricId) => setActiveReceiptId(metricId)}
          />
        ))}
      </div>

      {/* Compact Secondary Systems Ledger */}
      <CompactProjectsLedger />

      {/* Slide-over Telemetry Receipts Drawer */}
      <ReceiptsDrawer
        metricId={activeReceiptId}
        onClose={() => setActiveReceiptId(null)}
      />
    </section>
  );
}
