import { PROFILE_DATA } from "@/content/profile";
import { Award, FileCheck, ArrowUpRight, Trophy, ShieldCheck } from "lucide-react";

export default function CredentialsLedger() {
  const { certifications, achievements } = PROFILE_DATA;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 hairline-b bg-[var(--bg-paper)]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-12 hairline-b pb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 bg-[var(--signal-emerald)] inline-block" />
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink-secondary)] font-bold">
              09 / VERIFIED CREDENTIALS & HONORS
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif text-[var(--ink-primary)] tracking-tight">
            Certifications & Hackathon Achievements
          </h2>
          <p className="font-mono text-xs text-[var(--ink-secondary)] mt-1">
            Every entry links directly to its verified document file in the public repository archive.
          </p>
        </div>

        <div className="font-mono text-xs text-[var(--ink-tertiary)] uppercase">
          8 VERIFIED AUDIT RECORDS
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Hackathon Achievements */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--ink-primary)] font-bold hairline-b pb-3">
            <Trophy className="w-4 h-4 text-[var(--signal-amber)]" />
            <span>HACKATHON STANDINGS & CONTRIBUTIONS</span>
          </div>

          <div className="space-y-4">
            {achievements.map((item, idx) => (
              <div
                key={idx}
                className="p-6 bg-[var(--bg-paper-subtle)] hairline-border space-y-3 hover:border-[var(--ink-primary)] transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="font-mono text-xs text-[var(--signal-vermilion)] font-bold">
                      HONOR 0{idx + 1} //
                    </span>
                    <h3 className="font-serif text-2xl text-[var(--ink-primary)] tracking-tight">
                      {item.title}
                    </h3>
                  </div>

                  <span className="px-2.5 py-1 text-xs font-mono uppercase tracking-wider hairline-border bg-amber-50 text-[var(--signal-amber)] border-amber-300 shrink-0">
                    {item.badge}
                  </span>
                </div>

                <div className="font-mono text-xs text-[var(--ink-secondary)]">
                  {item.event}
                </div>

                <p className="font-sans text-sm text-[var(--ink-primary)] leading-relaxed">
                  {item.detail}
                </p>

                <div className="pt-2 hairline-t flex justify-end">
                  <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--ink-primary)] hover:text-[var(--signal-vermilion)] underline uppercase"
                  >
                    <span>Inspect Certificate Document</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Industry Certifications */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--ink-primary)] font-bold hairline-b pb-3">
            <FileCheck className="w-4 h-4 text-[var(--signal-emerald)]" />
            <span>INDUSTRY & ACADEMIC CERTIFICATIONS</span>
          </div>

          <div className="space-y-4">
            {certifications.map((cert, cIdx) => (
              <div
                key={cIdx}
                className="p-5 bg-[var(--bg-paper-subtle)] hairline-border space-y-3 hover:border-[var(--ink-primary)] transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="font-mono text-[11px] text-[var(--signal-emerald)] font-bold">
                      CERT 0{cIdx + 1} // {cert.category}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-[var(--ink-primary)] tracking-tight">
                      {cert.title}
                    </h3>
                  </div>

                  <span className="font-mono text-xs text-[var(--ink-tertiary)] shrink-0">
                    {cert.date}
                  </span>
                </div>

                <div className="font-mono text-xs text-[var(--ink-secondary)]">
                  ISSUER: <strong className="text-[var(--ink-primary)]">{cert.issuer}</strong>
                </div>

                <div className="pt-2 hairline-t flex justify-between items-center font-mono text-xs">
                  <span className="text-[var(--signal-emerald)] font-medium">
                    ● VERIFIED CREDENTIAL
                  </span>
                  <a
                    href={cert.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[var(--ink-primary)] hover:text-[var(--signal-vermilion)] underline uppercase"
                  >
                    <span>View PDF</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
