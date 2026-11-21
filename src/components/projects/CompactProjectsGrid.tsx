import { PROFILE_DATA } from "@/content/profile";
import { ArrowUpRight, FolderGit2 } from "lucide-react";

export default function CompactProjectsGrid() {
  const { compactProjects } = PROFILE_DATA;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 hairline-b bg-[var(--bg-paper)]">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10 hairline-b pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 bg-[var(--signal-amber)] inline-block" />
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink-secondary)] font-bold">
              03.1 / EXTENDED SYSTEMS LEDGER
            </span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-serif text-[var(--ink-primary)] tracking-tight">
            Specialized Tools & Applied ML Prototypes
          </h3>
        </div>

        <div className="font-mono text-xs text-[var(--ink-tertiary)] uppercase">
          3 COMPACT CASE ENTRIES
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {compactProjects.map((project, idx) => (
          <div
            key={project.slug}
            className="p-6 bg-[var(--bg-paper-subtle)] hairline-border flex flex-col justify-between space-y-5 hover:border-[var(--ink-primary)] transition-colors duration-150"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[var(--signal-vermilion)] font-bold">
                  SYS 0{idx + 5} //
                </span>
                <span
                  className={`text-[11px] font-mono uppercase px-2 py-0.5 hairline-border ${
                    project.status === "In Progress"
                      ? "bg-amber-50 text-[var(--signal-amber)] border-amber-300"
                      : "bg-emerald-50 text-[var(--signal-emerald)] border-emerald-300"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <h4 className="text-2xl font-serif text-[var(--ink-primary)] tracking-tight">
                {project.title}
              </h4>

              <div className="font-mono text-xs text-[var(--ink-secondary)]">
                {project.subtitle}
              </div>

              <p className="text-sm font-sans text-[var(--ink-primary)] leading-relaxed">
                {project.summary}
              </p>
            </div>

            <div className="space-y-4 pt-3 hairline-t">
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 bg-[var(--bg-paper-darker)] text-[var(--ink-primary)] font-mono text-[11px]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs font-mono pt-1">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[var(--ink-secondary)] hover:text-[var(--signal-vermilion)]"
                  >
                    <FolderGit2 className="w-3.5 h-3.5" />
                    <span>Repository</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
                <span className="text-[var(--ink-tertiary)] uppercase text-[10px]">
                  [ARCHIVED SPEC]
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
