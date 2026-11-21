import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { FEATURED_PROJECTS, COMPACT_PROJECTS } from "@/content/projects";
import { METRICS } from "@/content/metrics";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PipelineRail from "@/components/features/PipelineRail";
import Tag from "@/components/ui/Tag";
import Metric from "@/components/ui/Metric";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const featured = FEATURED_PROJECTS.map((p) => ({ slug: p.slug }));
  const compact = COMPACT_PROJECTS.map((p) => ({ slug: p.slug }));
  return [...featured, ...compact];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project =
    FEATURED_PROJECTS.find((p) => p.slug === slug) ||
    COMPACT_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.name} — Architecture Case Study | Ansh Arora`,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const featured = FEATURED_PROJECTS.find((p) => p.slug === slug);
  const compact = COMPACT_PROJECTS.find((p) => p.slug === slug);

  if (!featured && !compact) {
    notFound();
  }

  const project = featured || compact!;
  const isFeatured = !!featured;
  const primaryMetric = isFeatured
    ? METRICS.find((m) => featured.metricIds.includes(m.id))
    : null;

  return (
    <>
      <Header />

      <main className="min-h-screen py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="font-mono text-xs text-[var(--text-muted)] hairline-b pb-4">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 hover:text-[var(--accent)] transition-colors"
            >
              <span>← Back to featured systems</span>
            </Link>
          </nav>

          {/* Project Title & Overview */}
          <header className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--accent)]">
              <span>{isFeatured ? "Featured System Architecture" : "Tooling & System Ledger"}</span>
              <span>•</span>
              <span className="text-[var(--text-muted)]">{project.status}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-bold text-[var(--text)] tracking-tight">
              {project.name}
            </h1>

            <p className="font-body text-lg sm:text-xl text-[var(--text-muted)] leading-relaxed">
              {project.tagline}
            </p>

            <div className="p-4 rounded-[6px] bg-[var(--bg-raised)] hairline font-body text-sm sm:text-base text-[var(--text)] leading-relaxed">
              {project.summary}
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {project.stack.map((tech) => (
                <Tag key={tech} variant="outline">
                  {tech}
                </Tag>
              ))}
            </div>
          </header>

          {/* Featured System Pipeline Rail */}
          {isFeatured && featured.stages && (
            <section className="space-y-4 hairline-t pt-8" aria-label="System Pipeline Sequence">
              <div className="space-y-1">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] block">
                  EXECUTION STAGES &amp; LATENCY BUDGETS
                </span>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--text)] tracking-tight">
                  Pipeline trace sequence
                </h2>
              </div>

              <div className="p-6 rounded-[8px] bg-[var(--bg-sunken)] hairline">
                <PipelineRail stages={featured.stages} activeStageIndex={featured.stages.length - 1} />
              </div>
            </section>
          )}

          {/* Measured Telemetry Banner */}
          {primaryMetric && (
            <section className="space-y-4 hairline-t pt-8" aria-label="Measured Telemetry">
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] block">
                BENCHMARK TELEMETRY
              </span>
              <div className="p-6 rounded-[8px] bg-[var(--bg-raised)] hairline space-y-3">
                <Metric value={primaryMetric.value} label={primaryMetric.label} />
                <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body leading-relaxed pt-2 hairline-t">
                  <strong>Measurement method:</strong> {primaryMetric.method}
                </p>
                <div className="flex items-center justify-between text-xs font-mono pt-1 text-[var(--text-muted)]">
                  <span>Recorded: {primaryMetric.date}</span>
                  {primaryMetric.source.startsWith("http") && (
                    <a
                      href={primaryMetric.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--accent)] hover:underline"
                    >
                      Verify benchmark repo →
                    </a>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Engineering Post-Mortem */}
          {isFeatured && (
            <section className="space-y-6 hairline-t pt-8" aria-label="Engineering Post-Mortem">
              <div className="space-y-2">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--text)] tracking-tight">
                  Engineering post-mortem
                </h2>
              </div>

              <div className="space-y-4 font-body text-sm leading-relaxed">
                <div className="p-5 rounded-[6px] bg-[var(--bg-raised)] hairline space-y-1.5">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--text)] font-semibold">
                    What broke &amp; how it was solved
                  </h3>
                  <p className="text-[var(--text-muted)]">{featured.whatBroke}</p>
                </div>

                <div className="p-5 rounded-[6px] bg-[var(--bg-raised)] hairline space-y-1.5">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--text)] font-semibold">
                    What&apos;s next
                  </h3>
                  <p className="text-[var(--text-muted)]">{featured.nextStep}</p>
                </div>
              </div>
            </section>
          )}

          {/* Source and Reference Links */}
          <footer className="hairline-t pt-8 flex items-center gap-4 text-sm font-body">
            {project.links.source && (
              <a
                href={project.links.source}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-[4px] bg-[var(--accent)] text-[var(--accent-ink)] font-medium hover:brightness-105 transition-all"
              >
                View source on GitHub
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-[4px] hairline text-[var(--text)] hover:bg-[var(--bg-raised)] transition-all"
              >
                Open live deployment
              </a>
            )}
          </footer>
        </div>
      </main>

      <Footer />
    </>
  );
}
