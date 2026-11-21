import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { PROFILE_DATA, Project } from "@/content/profile";
import ArchitectureDiagram from "@/components/projects/ArchitectureDiagram";
import Header from "@/components/layout/Header";
import { ArrowLeft, ArrowUpRight, Cpu, Layers, ShieldCheck, Wrench } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROFILE_DATA.featuredProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROFILE_DATA.featuredProjects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found // Ansh Arora",
    };
  }

  return {
    title: `${project.title} — Case Study Blueprint | Ansh Arora`,
    description: project.oneLiner,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = PROFILE_DATA.featuredProjects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Header />

      <main className="min-h-screen py-10 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Breadcrumbs Navigation */}
          <div className="flex items-center justify-between font-mono text-xs text-[var(--ink-secondary)] hairline-b pb-4">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-1.5 hover:text-[var(--signal-vermilion)] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETURN TO SYSTEMS LEDGER</span>
            </Link>

            <span className="text-[var(--ink-tertiary)] uppercase hidden sm:inline">
              SYS-DOC // {project.slug.toUpperCase()}
            </span>
          </div>

          {/* Blueprint Title Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--bg-paper-darker)] hairline-border text-xs font-mono uppercase tracking-widest text-[var(--ink-secondary)]">
              <span className="w-2 h-2 bg-[var(--signal-vermilion)] inline-block" />
              <span>ARCHITECTURAL CASE STUDY BLUEPRINT</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-serif text-[var(--ink-primary)] tracking-tight">
              {project.title}
            </h1>

            <p className="font-mono text-sm sm:text-base text-[var(--ink-secondary)]">
              {project.subtitle}
            </p>

            <div className="p-4 bg-[var(--bg-paper-subtle)] hairline-border font-sans text-base sm:text-lg text-[var(--ink-primary)] leading-relaxed">
              <strong>Executive Summary:</strong> {project.oneLiner}
            </div>
          </div>

          {/* Project Technical Telemetry Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-[var(--bg-paper-subtle)] hairline-border font-mono text-xs">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="space-y-1">
                <span className="text-[var(--ink-tertiary)] uppercase text-[11px]">
                  {metric.label}
                </span>
                <div className="text-base font-bold text-[var(--ink-primary)]">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>

          {/* Problem & Role Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 hairline-t pt-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--signal-vermilion)] font-bold">
                <Wrench className="w-4 h-4" />
                <span>01 / THE PROBLEM STATEMENT</span>
              </div>
              <p className="font-sans text-base text-[var(--ink-primary)] leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--signal-vermilion)] font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>02 / MY ROLE & RESPONSIBILITY</span>
              </div>
              <p className="font-sans text-base text-[var(--ink-primary)] leading-relaxed">
                {project.role}
              </p>
            </div>
          </div>

          {/* Interactive Architecture Schema */}
          <div className="space-y-3 hairline-t pt-8">
            <div className="font-mono text-xs uppercase tracking-widest text-[var(--ink-tertiary)] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[var(--signal-vermilion)]" />
              <span>03 / SYSTEM ARCHITECTURE SCHEMA</span>
            </div>
            <ArchitectureDiagram
              steps={project.architectureSteps}
              projectTitle={project.title}
            />
          </div>

          {/* Key Engineering Decisions & Trade-Offs */}
          <div className="space-y-6 hairline-t pt-8">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--ink-tertiary)]">
              <Cpu className="w-4 h-4 text-[var(--signal-vermilion)]" />
              <span>04 / KEY ENGINEERING DECISIONS & TRADE-OFF ANALYSIS</span>
            </div>

            <div className="space-y-6">
              {project.keyDecisions.map((decision, dIdx) => (
                <div
                  key={dIdx}
                  className="p-6 bg-[var(--bg-paper-subtle)] hairline-border space-y-3"
                >
                  <div className="flex items-center gap-2 font-mono text-sm font-bold text-[var(--ink-primary)]">
                    <span className="text-[var(--signal-vermilion)]">DECISION {dIdx + 1} //</span>
                    <span>{decision.title}</span>
                  </div>

                  <p className="font-sans text-base text-[var(--ink-primary)] leading-relaxed">
                    <strong>Architectural Decision:</strong> {decision.decision}
                  </p>

                  <div className="p-3 bg-[var(--bg-paper)] hairline-border font-mono text-xs text-[var(--ink-secondary)]">
                    <strong className="text-[var(--signal-amber)] uppercase font-semibold">
                      Evaluated Trade-Off:
                    </strong>{" "}
                    {decision.tradeOff}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Stack Ledger */}
          <div className="space-y-4 hairline-t pt-8 font-mono text-xs">
            <div className="uppercase tracking-widest text-[var(--ink-tertiary)]">
              05 / PRODUCTION TECHNOLOGY STACK
            </div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 bg-[var(--bg-paper-subtle)] hairline-border text-[var(--ink-primary)] font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Future Optimizations */}
          <div className="space-y-3 hairline-t pt-8">
            <div className="font-mono text-xs uppercase tracking-widest text-[var(--ink-tertiary)]">
              06 / PLANNED OPTIMIZATIONS & ROADMAP
            </div>
            <p className="font-sans text-base text-[var(--ink-primary)] leading-relaxed">
              {project.futureWork}
            </p>
          </div>

          {/* Action Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-[var(--bg-paper-subtle)] hairline-border font-mono text-xs">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-1.5 text-[var(--ink-primary)] hover:text-[var(--signal-vermilion)] uppercase tracking-wider"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Systems Ledger</span>
            </Link>

            <div className="flex items-center gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[var(--ink-primary)] text-white uppercase tracking-wider hover:bg-[var(--signal-vermilion)] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Visit Live App</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}

              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 hairline-border bg-[var(--bg-paper)] uppercase tracking-wider hover:bg-[var(--bg-paper-darker)] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>GitHub Repository</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
