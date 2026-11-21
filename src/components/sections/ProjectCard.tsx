"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FeaturedProject } from "@/content/types";
import { METRICS } from "@/content/metrics";
import PipelineRail from "@/components/features/PipelineRail";
import Metric from "@/components/ui/Metric";
import Tag from "@/components/ui/Tag";
import NseScannerDemo from "@/components/demos/NseScannerDemo";
import GridGuardDemo from "@/components/demos/GridGuardDemo";
import RagForgeDemo from "@/components/demos/RagForgeDemo";
import DeltaOptionsDemo from "@/components/demos/DeltaOptionsDemo";
import SpotlightCard from "@/components/ui/SpotlightCard";

interface ProjectCardProps {
  project: FeaturedProject;
  onReceiptClick: (metricId: string) => void;
}

export default function ProjectCard({ project, onReceiptClick }: ProjectCardProps) {
  const [activeStage, setActiveStage] = useState(0);

  // Look up the primary metric for this project from METRICS
  const primaryMetric = METRICS.find((m) => project.metricIds.includes(m.id));

  return (
    <article
      id={project.slug}
      className="py-16 first:pt-8 last:pb-8 hairline-b"
      aria-labelledby={`heading-${project.slug}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* --- LEFT COLUMN: Sticky Pipeline Rail (lg:col-span-4) --- */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          <div className="space-y-2">
            <h3
              id={`heading-${project.slug}`}
              className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight"
            >
              {project.name}
            </h3>
            <p className="text-sm sm:text-base text-[var(--signal)] font-body font-medium">
              {project.tagline}
            </p>
          </div>

          {/* Pipeline Rail */}
          <PipelineRail
            stages={project.stages}
            activeStageIndex={activeStage}
          />

          {/* Action Links */}
          <div className="pt-3 flex flex-wrap items-center gap-4">
            <Link
              href={`/projects/${project.slug}`}
              className="px-4 py-2 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] font-body text-xs font-bold hover:brightness-110 transition-all shadow-md"
            >
              Open case study
            </Link>
            {project.links.source && (
              <a
                href={project.links.source}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-[var(--text-muted)] hover:text-white transition-colors"
              >
                GitHub
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-[var(--signal)] hover:underline"
              >
                Live demo
              </a>
            )}
          </div>
        </div>

        {/* --- RIGHT COLUMN: Interactive Demo, Summary, & Telemetry (lg:col-span-8) --- */}
        <div className="lg:col-span-8 space-y-6">
          {/* Summary & Tags */}
          <div className="space-y-4">
            <p className="text-base sm:text-lg text-[var(--text)] font-body leading-relaxed">
              {project.summary}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <Tag key={tech} variant="outline">
                  {tech}
                </Tag>
              ))}
            </div>
          </div>

          {/* "Run It" Interactive Client-Side Demo */}
          <div className="pt-2">
            {project.demo === "nse-scanner" && (
              <NseScannerDemo onStageChange={setActiveStage} />
            )}
            {project.demo === "gridguard" && (
              <GridGuardDemo onStageChange={setActiveStage} />
            )}
            {project.demo === "ragforge" && (
              <RagForgeDemo onStageChange={setActiveStage} />
            )}
            {project.demo === "delta-options" && (
              <DeltaOptionsDemo onStageChange={setActiveStage} />
            )}
          </div>

          {/* Key Measured Achievement Block with Spotlight Beam */}
          {primaryMetric && (
            <SpotlightCard className="p-5 bg-[#121420]/90">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs text-[var(--text-muted)] block">
                    Telemetry measured in production
                  </span>
                  <Metric
                    value={primaryMetric.value}
                    label={primaryMetric.label}
                    onReceiptClick={() => onReceiptClick(primaryMetric.id)}
                  />
                </div>
                <div className="text-xs font-mono text-[var(--text-muted)]">
                  Benchmark date: {primaryMetric.date}
                </div>
              </div>
            </SpotlightCard>
          )}
        </div>
      </div>
    </article>
  );
}
