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
              className="font-display text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight leading-tight"
            >
              {project.name}
            </h3>
            <p className="text-sm text-[var(--text-muted)] font-body">
              {project.tagline}
            </p>
          </div>

          {/* Pipeline Rail */}
          <PipelineRail
            stages={project.stages}
            activeStageIndex={activeStage}
          />

          {/* Deep Case Study Link */}
          <div className="pt-2">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 font-body text-xs font-medium text-[var(--accent)] hover:underline underline-offset-4"
            >
              Open case study blueprint →
            </Link>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Demo, Summary, Telemetry & Post-Mortem (lg:col-span-8) --- */}
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

          {/* Telemetry Metric & Engineering Reality Block */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-[8px] bg-[var(--bg-raised)] hairline">
            {/* Measured Metric */}
            {primaryMetric && (
              <div className="space-y-1">
                <span className="text-xs text-[var(--text-muted)] block">
                  Measured telemetry
                </span>
                <Metric
                  value={primaryMetric.value}
                  label={primaryMetric.label}
                  onReceiptClick={() => onReceiptClick(primaryMetric.id)}
                />
              </div>
            )}

            {/* Source Repo & Status */}
            <div className="space-y-1 flex flex-col justify-between">
              <span className="text-xs text-[var(--text-muted)] block">
                Sources
              </span>
              <div className="flex items-center gap-4 text-xs font-body">
                {project.links.source && (
                  <a
                    href={project.links.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text)] hover:text-[var(--accent)] underline underline-offset-4"
                  >
                    Source code on GitHub
                  </a>
                )}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text)] hover:text-[var(--accent)] underline underline-offset-4"
                  >
                    Live deployment
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Engineering Post-Mortem */}
          <div className="space-y-3 p-5 rounded-[8px] bg-[var(--bg-sunken)] hairline">
            <div>
              <span className="font-semibold text-xs text-[var(--text)] block mb-1">
                What broke &amp; how I solved it:
              </span>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body leading-relaxed">
                {project.whatBroke}
              </p>
            </div>

            <div className="pt-2 border-t border-[var(--line)]">
              <span className="font-semibold text-xs text-[var(--text)] block mb-1">
                What&apos;s next:
              </span>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body leading-relaxed">
                {project.nextStep}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
