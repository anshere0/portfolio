"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Panel from "@/components/ui/Panel";
import Tag from "@/components/ui/Tag";
import Metric from "@/components/ui/Metric";
import Drawer from "@/components/ui/Drawer";
import ThemeToggle from "@/components/layout/ThemeToggle";

export default function StyleguidePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState<string | null>(null);

  const openReceipt = (id: string) => {
    setActiveReceipt(id);
    setDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {/* Styleguide Header */}
        <div className="space-y-4 hairline-b pb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs text-[var(--accent)] font-sans block">
                Design system tokens
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mt-1 text-[var(--text)]">
                Component & Token Styleguide
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[var(--text-muted)]">Active Theme:</span>
              <ThemeToggle />
            </div>
          </div>
          <p className="text-base text-[var(--text-muted)] max-w-2xl">
            Live testbed for verifying the Cyanotype Blueprint (default) and Night Shift (alternate) semantic color tokens, typography hierarchy, component radii, and WCAG AA accessibility compliance.
          </p>
        </div>

        {/* 1. Color Palette Tokens */}
        <section className="space-y-6">
          <h2 className="font-display text-2xl font-bold text-[var(--text)]">
            01. Semantic Color Tokens
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-data text-xs">
            <div className="p-4 rounded-[4px] bg-[var(--bg)] hairline space-y-2">
              <div className="h-8 rounded-[4px] bg-[var(--bg)] hairline" />
              <div className="font-bold text-[var(--text)]">--bg</div>
              <div className="text-[var(--text-muted)]">Canvas Base</div>
            </div>
            <div className="p-4 rounded-[4px] bg-[var(--bg-raised)] hairline space-y-2">
              <div className="h-8 rounded-[4px] bg-[var(--bg-raised)] hairline" />
              <div className="font-bold text-[var(--text)]">--bg-raised</div>
              <div className="text-[var(--text-muted)]">Panels & Cards</div>
            </div>
            <div className="p-4 rounded-[4px] bg-[var(--bg-sunken)] hairline space-y-2">
              <div className="h-8 rounded-[4px] bg-[var(--bg-sunken)] hairline" />
              <div className="font-bold text-[var(--text)]">--bg-sunken</div>
              <div className="text-[var(--text-muted)]">Wells & Code</div>
            </div>
            <div className="p-4 rounded-[4px] bg-[var(--bg-raised)] hairline space-y-2">
              <div className="h-8 rounded-[4px] bg-[var(--accent)]" />
              <div className="font-bold text-[var(--text)]">--accent</div>
              <div className="text-[var(--text-muted)]">Marker Yellow / Amber</div>
            </div>
            <div className="p-4 rounded-[4px] bg-[var(--bg-raised)] hairline space-y-2">
              <div className="h-8 rounded-[4px] bg-[var(--signal)]" />
              <div className="font-bold text-[var(--text)]">--signal</div>
              <div className="text-[var(--text-muted)]">Data Lines & Ticks</div>
            </div>
            <div className="p-4 rounded-[4px] bg-[var(--bg-raised)] hairline space-y-2">
              <div className="h-8 rounded-[4px] bg-[var(--anomaly)]" />
              <div className="font-bold text-[var(--text)]">--anomaly</div>
              <div className="text-[var(--text-muted)]">Alerts & Flags</div>
            </div>
            <div className="p-4 rounded-[4px] bg-[var(--bg-raised)] hairline space-y-2">
              <div className="h-8 rounded-[4px] bg-[var(--text)]" />
              <div className="font-bold text-[var(--text)]">--text</div>
              <div className="text-[var(--text-muted)]">Primary Reading Text</div>
            </div>
            <div className="p-4 rounded-[4px] bg-[var(--bg-raised)] hairline space-y-2">
              <div className="h-8 rounded-[4px] bg-[var(--text-muted)]" />
              <div className="font-bold text-[var(--text)]">--text-muted</div>
              <div className="text-[var(--text-muted)]">Secondary (AA Pass)</div>
            </div>
          </div>
        </section>

        {/* 2. Typography Scale */}
        <section className="space-y-6">
          <h2 className="font-display text-2xl font-bold text-[var(--text)]">
            02. Typography Roles
          </h2>
          <Panel variant="container">
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="font-data text-xs text-[var(--text-muted)]">
                  Display (Bricolage Grotesque) — Headings
                </span>
                <div className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text)]">
                  The working drawing: an engineer&apos;s blueprint.
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-data text-xs text-[var(--text-muted)]">
                  Body (Geist Sans) — Explanatory Prose
                </span>
                <p className="font-body text-base text-[var(--text)] leading-relaxed max-w-2xl">
                  Real-time market breadth analytics over binary WebSocket feeds, sub-60ms vector similarity recall with pgvector, and smart-meter anomaly detection with SHAP explainability.
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-data text-xs text-[var(--text-muted)]">
                  Data (Geist Mono) — Numbers, Code, Latency Telemetry
                </span>
                <div className="font-data text-sm text-[var(--signal)] bg-[var(--bg-sunken)] p-3 rounded-[4px] hairline">
                  INGEST: 14ms · EMBED: 38ms · RETRIEVE: 42ms · TOTAL: 94ms [PASS]
                </div>
              </div>
            </div>
          </Panel>
        </section>

        {/* 3. Buttons & Controls */}
        <section className="space-y-6">
          <h2 className="font-display text-2xl font-bold text-[var(--text)]">
            03. Buttons & Action States
          </h2>
          <Panel variant="container">
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" size="md">
                Primary Button
              </Button>
              <Button variant="secondary" size="md">
                Secondary Hairline
              </Button>
              <Button variant="text" size="md">
                Text Button
              </Button>
              <Button variant="primary" size="sm">
                Small
              </Button>
              <Button variant="primary" size="lg">
                Large Button
              </Button>
              <Button variant="primary" size="md" disabled>
                Disabled
              </Button>
            </div>
          </Panel>
        </section>

        {/* 4. Panels & Tags */}
        <section className="space-y-6">
          <h2 className="font-display text-2xl font-bold text-[var(--text)]">
            04. Panels & Honest Metadata Tags
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Panel title="Recorded Run" tag="recorded run" tagType="recorded run">
              <p className="text-sm text-[var(--text-muted)]">
                Sample playback of 10,000 document embedding chunk windows.
              </p>
            </Panel>
            <Panel title="Synthetic Stream" tag="synthetic data" tagType="synthetic data">
              <p className="text-sm text-[var(--text-muted)]">
                Simulated 50Hz smart-meter electrical load with injection slider.
              </p>
            </Panel>
            <Panel title="Illustrative Graph" tag="illustrative" tagType="illustrative">
              <p className="text-sm text-[var(--text-muted)]">
                Conceptual topology map demonstrating node adjacency.
              </p>
            </Panel>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Tag label="Signal Token" variant="signal" />
            <Tag label="Accent Token" variant="accent" />
            <Tag label="Anomaly Alert" variant="anomaly" />
            <Tag label="Default Tag" variant="default" />
          </div>
        </section>

        {/* 5. Metrics & Receipts Drawer */}
        <section className="space-y-6">
          <h2 className="font-display text-2xl font-bold text-[var(--text)]">
            05. Quantitative Metrics with Receipts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Panel variant="data">
              <Metric
                value="7.79 / 10"
                label="Academic CGPA (VIT Bhopal)"
                onReceiptClick={() => openReceipt("cgpa-vit")}
              />
            </Panel>
            <Panel variant="data">
              <Metric
                value="92%"
                label="NPTEL Generative AI (Elite Gold)"
                onReceiptClick={() => openReceipt("nptel-genai")}
              />
            </Panel>
            <Panel variant="data">
              <Metric
                value="<60 ms"
                label="pgvector HNSW Cosine Recall"
                onReceiptClick={() => openReceipt("ragforge-latency")}
              />
            </Panel>
          </div>
        </section>
      </main>

      {/* Receipts Drawer Testbed */}
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Verified Metric Receipt"
      >
        <div className="space-y-4 font-body">
          <div className="font-data text-2xl font-bold text-[var(--text)]">
            {activeReceipt === "cgpa-vit" && "7.79 / 10.00"}
            {activeReceipt === "nptel-genai" && "92% Score (Elite Gold)"}
            {activeReceipt === "ragforge-latency" && "<60 ms Recall Latency"}
          </div>
          <div className="space-y-2 text-sm text-[var(--text-muted)] leading-relaxed">
            <p>
              <strong className="text-[var(--text)]">Measurement Method:</strong>{" "}
              {activeReceipt === "cgpa-vit" &&
                "Official semester grade transcripts across completed CSE (AI/ML) coursework at VIT Bhopal."}
              {activeReceipt === "nptel-genai" &&
                "National proctored examination score certified by Indian Institute of Technology / NPTEL."}
              {activeReceipt === "ragforge-latency" &&
                "pgvector HNSW cosine distance recall timed over 10,000 embedded chunks in PostgreSQL."}
            </p>
            <p>
              <strong className="text-[var(--text)]">Audit Standard:</strong> Zero fabricated claims. Stored in content/metrics.ts.
            </p>
          </div>
          <div className="pt-4 hairline-t">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setDrawerOpen(false)}
            >
              Close Receipt
            </Button>
          </div>
        </div>
      </Drawer>

      <Footer />
    </div>
  );
}
