/**
 * Strict TypeScript Schema for Ansh Arora's Portfolio
 * Aligned with docs/03_DESIGN_SYSTEM.md, docs/05_SIGNATURE_FEATURES.md, and docs/06_CONTENT.md
 */

export interface MetricItem {
  id: string;
  value: string;
  label: string;
  method: string;
  date: string;
  source: string; // URL, repo path, benchmark script, or 'self-reported'
  category?: "latency" | "accuracy" | "reduction" | "academic";
}

export interface ProjectStage {
  name: string;
  ms?: number;
  description: string;
}

export interface FeaturedProject {
  slug: string;
  name: string;
  tagline: string;
  status: "live" | "building" | "done";
  summary: string;
  stages: ProjectStage[];
  metricIds: string[];
  whatBroke?: string;
  nextStep?: string;
  stack: string[];
  links: {
    live?: string;
    source?: string;
  };
  demo: "nse-scanner" | "gridguard" | "ragforge" | "delta-options";
  demoTag: "recorded run" | "synthetic data" | "illustrative";
}

export interface CompactProject {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  stack: string[];
  status: "live" | "building" | "done";
  links: {
    live?: string;
    source?: string;
  };
}

export interface TraceMilestone {
  id: string;
  title: string;
  org: string;
  start: string;
  end?: string;
  kind: "education" | "project" | "hackathon" | "open-source";
  bullets: string[];
  links?: { label: string; url: string }[];
  accent?: boolean;
}

export interface CertificationReceipt {
  id: string;
  title: string;
  issuer: string;
  score?: string; // e.g., "92% Elite Gold", "88% Elite"
  date: string;
  fileUrl: string;
  category: "AI & Cloud" | "Programming & Web" | "Hackathon";
}
