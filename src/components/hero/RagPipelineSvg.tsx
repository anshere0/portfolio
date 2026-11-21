"use client";

import { useState, useRef } from "react";
import { Database, FileText, Cpu, Search, CheckCircle2, Play, Sparkles, RefreshCw } from "lucide-react";

interface PipelineNode {
  id: string;
  number: string;
  title: string;
  sub: string;
  spec: string;
  latency: number;
  icon: typeof FileText;
}

const PIPELINE_NODES: PipelineNode[] = [
  {
    id: "ingest",
    number: "01",
    title: "INGEST",
    sub: "Doc Parser",
    spec: "PDF / DOCX / TXT raw stream normalization into UTF-8 text",
    latency: 14,
    icon: FileText,
  },
  {
    id: "chunk",
    number: "02",
    title: "CHUNK",
    sub: "Semantic Window",
    spec: "~500-word sliding windows with 50-word context boundary overlap",
    latency: 9,
    icon: Cpu,
  },
  {
    id: "embed",
    number: "03",
    title: "EMBED",
    sub: "Gemini Embed",
    spec: "Google Gemini text-embedding-004 mapping chunks to 768-dim space",
    latency: 38,
    icon: Database,
  },
  {
    id: "retrieve",
    number: "04",
    title: "RETRIEVE",
    sub: "pgvector HNSW",
    spec: "Cosine distance indexing with sub-60ms top-K similarity recall",
    latency: 42,
    icon: Search,
  },
  {
    id: "answer",
    number: "05",
    title: "ANSWER",
    sub: "Cited Output",
    spec: "Multi-tenant grounded synthesis with strict inline document citations",
    latency: 89,
    icon: CheckCircle2,
  },
];

const PRESET_QUERIES = [
  "SEC 10-K: Retrieve FY26 operating margin risk disclosures",
  "pgvector: Benchmark HNSW indexing against 100,000 document embeddings",
  "Tenant isolation: Verify tenant_id partition barrier across shared Postgres cluster",
];

export default function RagPipelineSvg() {
  const [activeNode, setActiveNode] = useState<string>("retrieve");
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(-1);
  const [elapsedMs, setElapsedMs] = useState<number>(0);
  const [selectedQuery, setSelectedQuery] = useState<string>(PRESET_QUERIES[0]);
  const [simulationResult, setSimulationResult] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Run Step-by-Step Packet Simulation
  const triggerSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setCurrentStepIdx(0);
    setElapsedMs(0);
    setSimulationResult(null);

    let step = 0;
    let accumulatedTime = 0;

    const runNextStep = () => {
      if (step < PIPELINE_NODES.length) {
        const node = PIPELINE_NODES[step];
        setActiveNode(node.id);
        setCurrentStepIdx(step);
        accumulatedTime += node.latency + Math.floor(Math.random() * 4);
        setElapsedMs(accumulatedTime);

        step++;
        setTimeout(runNextStep, 380);
      } else {
        setIsSimulating(false);
        setCurrentStepIdx(5);
        setSimulationResult(
          `[VERIFIED] Pipeline completed in ${accumulatedTime}ms (Sub-200ms latency budget met). Grounded answer synthesized with 3 verified citations from tenant partition.`
        );
      }
    };

    setTimeout(runNextStep, 200);
  };

  return (
    <div className="w-full bg-[var(--bg-paper-subtle)] hairline-border p-5 lg:p-6 space-y-5">
      {/* Blueprint Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 hairline-b pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[var(--signal-vermilion)] inline-block" />
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink-primary)] font-semibold">
            SYSTEM BLUEPRINT: RAGFORGE DATA PIPELINE // INTERACTIVE SIMULATOR
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--ink-tertiary)] uppercase">
          <span>FIG 01.1 // MULTI-TENANT</span>
          <span className="text-[var(--hairline-strong)]">|</span>
          <span className="text-[var(--signal-vermilion)] font-bold">
            {isSimulating ? `PACKET IN FLIGHT · ${elapsedMs}MS` : "IDLE / READY"}
          </span>
        </div>
      </div>

      {/* Interactive Simulation Query Control Bar */}
      <div className="p-3 bg-[var(--bg-paper)] hairline-border space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-[11px] text-[var(--ink-tertiary)] uppercase font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[var(--signal-amber)]" />
            SELECT SAMPLE INPUT VECTOR:
          </span>
          <button
            onClick={triggerSimulation}
            disabled={isSimulating}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 font-mono text-xs font-bold uppercase transition-all ${
              isSimulating
                ? "bg-[var(--bg-paper-darker)] text-[var(--ink-tertiary)] cursor-wait"
                : "bg-[var(--signal-vermilion)] text-white hover:bg-[#A81E0A] shadow-xs cursor-pointer"
            }`}
          >
            {isSimulating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>PROCESSING...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>EXECUTE PIPELINE</span>
              </>
            )}
          </button>
        </div>

        {/* Query Presets Chips */}
        <div className="flex flex-wrap gap-2">
          {PRESET_QUERIES.map((q) => (
            <button
              key={q}
              onClick={() => setSelectedQuery(q)}
              className={`text-left px-2.5 py-1 font-mono text-[11px] transition-colors hairline-border ${
                selectedQuery === q
                  ? "bg-[var(--ink-primary)] text-[var(--bg-paper)] border-[var(--ink-primary)]"
                  : "bg-[var(--bg-paper-darker)]/70 text-[var(--ink-secondary)] hover:bg-[var(--bg-paper)] hover:text-[var(--ink-primary)]"
              }`}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Horizontal Pipeline Nodes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-1">
        {PIPELINE_NODES.map((node, index) => {
          const isSelected = activeNode === node.id;
          const isCurrentlyActiveInSim = isSimulating && currentStepIdx === index;
          const isPassedInSim = currentStepIdx > index;
          const Icon = node.icon;

          return (
            <button
              key={node.id}
              onClick={() => setActiveNode(node.id)}
              className={`text-left p-3 hairline-border transition-all duration-200 relative ${
                isCurrentlyActiveInSim
                  ? "bg-[var(--signal-vermilion)] text-white ring-2 ring-[var(--signal-vermilion)] scale-102 shadow-md"
                  : isSelected
                  ? "bg-[var(--bg-paper)] shadow-sm border-[var(--ink-primary)] ring-1 ring-[var(--ink-primary)]"
                  : "bg-[var(--bg-paper-darker)]/60 hover:bg-[var(--bg-paper)] border-[var(--hairline)]"
              }`}
            >
              {/* Top Row: Stage Number and Icon */}
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`font-mono text-[11px] font-bold ${
                    isCurrentlyActiveInSim
                      ? "text-white"
                      : "text-[var(--signal-vermilion)]"
                  }`}
                >
                  {node.number}
                </span>

                {isPassedInSim ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--signal-emerald)]" />
                ) : (
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      isCurrentlyActiveInSim
                        ? "text-white animate-pulse"
                        : isSelected
                        ? "text-[var(--signal-vermilion)]"
                        : "text-[var(--ink-tertiary)]"
                    }`}
                  />
                )}
              </div>

              {/* Title & Sub */}
              <div
                className={`font-mono text-xs font-bold uppercase tracking-wider ${
                  isCurrentlyActiveInSim ? "text-white" : "text-[var(--ink-primary)]"
                }`}
              >
                {node.title}
              </div>
              <div
                className={`font-mono text-[11px] ${
                  isCurrentlyActiveInSim
                    ? "text-white/80"
                    : "text-[var(--ink-secondary)]"
                }`}
              >
                {node.sub}
              </div>

              {/* Latency Tag */}
              <div
                className={`mt-2 pt-1.5 hairline-t font-mono text-[10px] ${
                  isCurrentlyActiveInSim ? "border-white/20 text-white/90" : "text-[var(--ink-tertiary)]"
                }`}
              >
                BENCHMARK: ~{node.latency}MS
              </div>

              {/* Directional Arrow Indicator */}
              {index < PIPELINE_NODES.length - 1 && (
                <div
                  className={`hidden sm:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-20 font-mono text-xs select-none pointer-events-none ${
                    isPassedInSim
                      ? "text-[var(--signal-vermilion)] font-bold"
                      : "text-[var(--ink-tertiary)]"
                  }`}
                  aria-hidden="true"
                >
                  →
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Live Simulation Output Box */}
      {simulationResult && (
        <div className="p-3.5 bg-[var(--signal-emerald)]/10 hairline-border border-[var(--signal-emerald)]/40 font-mono text-xs text-[var(--signal-emerald)] flex items-start gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[var(--signal-emerald)]" />
          <div className="leading-relaxed">{simulationResult}</div>
        </div>
      )}

      {/* Selected Step Technical Telemetry */}
      {(() => {
        const selected =
          PIPELINE_NODES.find((n) => n.id === activeNode) || PIPELINE_NODES[0];
        return (
          <div className="p-3.5 bg-[var(--bg-paper)] hairline-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="space-y-1">
              <span className="text-[var(--signal-vermilion)] font-bold">
                [STAGE {selected.number} ARCHITECTURE SPEC]
              </span>{" "}
              <span className="text-[var(--ink-primary)] font-medium">
                {selected.spec}
              </span>
            </div>
            <a
              href="#projects"
              className="shrink-0 text-[var(--ink-primary)] underline hover:text-[var(--signal-vermilion)] transition-colors font-semibold"
            >
              Inspect Case Study ↗
            </a>
          </div>
        );
      })()}
    </div>
  );
}
