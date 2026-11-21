/**
 * Precomputed 2D Semantic Topology Field Nodes
 * Aligned with docs/04_MOTION_SPEC.md (Moment 1) and docs/05_SIGNATURE_FEATURES.md (F1)
 */

export interface FieldNode {
  id: string;
  label: string;
  kind: "project" | "tool" | "concept";
  cluster: "telemetry" | "retrieval" | "ml" | "tooling" | "web";
  x: number; // Normalized coordinate [0..100]
  y: number; // Normalized coordinate [0..100]
  href?: string;
  mobile?: boolean; // Included in mobile reduced set (~40 nodes)
}

/**
 * Cluster Centroids:
 * - telemetry (Top-Right): x: ~72, y: ~28
 * - retrieval (Top-Left/Center): x: ~42, y: ~22
 * - ml (Mid-Right): x: ~82, y: ~62
 * - tooling (Mid-Left/Top): x: ~22, y: ~32
 * - web (Center): x: ~55, y: ~52
 *
 * Calm Zone (Bottom-Left: x: 0..48, y: 55..100) reserved for H1 and Hero copy.
 */

export const FIELD_NODES: FieldNode[] = [
  // --- 1. TELEMETRY & MARKET PROTOCOLS (Cluster Centroid ~ 72, 28) ---
  { id: "nse-scanner", label: "NSE Momentum Scanner", kind: "project", cluster: "telemetry", x: 74, y: 22, href: "#nse-momentum-breadth-scanner", mobile: true },
  { id: "smartapi", label: "Angel One SmartAPI", kind: "tool", cluster: "telemetry", x: 82, y: 18, mobile: true },
  { id: "websockets", label: "WebSockets", kind: "tool", cluster: "telemetry", x: 68, y: 26, mobile: true },
  { id: "sse", label: "Server-Sent Events", kind: "tool", cluster: "telemetry", x: 78, y: 32, mobile: true },
  { id: "bin-decode", label: "Binary tick decoding", kind: "concept", cluster: "telemetry", x: 86, y: 28, mobile: true },
  { id: "breadth", label: "Market breadth ratio", kind: "concept", cluster: "telemetry", x: 64, y: 34, mobile: true },
  { id: "session-engine", label: "IST session engine", kind: "concept", cluster: "telemetry", x: 70, y: 16, mobile: false },
  { id: "no-lookahead", label: "Zero look-ahead bias", kind: "concept", cluster: "telemetry", x: 88, y: 12, mobile: false },
  { id: "node-test", label: "node:test", kind: "tool", cluster: "telemetry", x: 62, y: 22, mobile: false },
  { id: "order-flow", label: "Order-flow delta", kind: "concept", cluster: "telemetry", x: 76, y: 38, mobile: true },
  { id: "vwap", label: "VWAP bands", kind: "concept", cluster: "telemetry", x: 84, y: 36, mobile: false },
  { id: "totp", label: "TOTP authentication", kind: "concept", cluster: "telemetry", x: 66, y: 12, mobile: false },
  { id: "open-interest", label: "Open interest filters", kind: "concept", cluster: "telemetry", x: 92, y: 24, mobile: false },
  { id: "vol-absorption", label: "Volume absorption", kind: "concept", cluster: "telemetry", x: 80, y: 44, mobile: false },

  // --- 2. RETRIEVAL & VECTOR SYSTEMS (Cluster Centroid ~ 42, 22) ---
  { id: "ragforge", label: "RAGForge", kind: "project", cluster: "retrieval", x: 42, y: 18, href: "#ragforge", mobile: true },
  { id: "pgvector", label: "pgvector", kind: "tool", cluster: "retrieval", x: 48, y: 24, mobile: true },
  { id: "hnsw", label: "HNSW indexing", kind: "concept", cluster: "retrieval", x: 36, y: 26, mobile: true },
  { id: "cosine", label: "Cosine similarity", kind: "concept", cluster: "retrieval", x: 44, y: 30, mobile: true },
  { id: "chunking", label: "500-word chunking", kind: "concept", cluster: "retrieval", x: 38, y: 14, mobile: true },
  { id: "gemini-embed", label: "Gemini text-embedding", kind: "tool", cluster: "retrieval", x: 50, y: 16, mobile: true },
  { id: "sliding-window", label: "Sliding context windows", kind: "concept", cluster: "retrieval", x: 32, y: 20, mobile: false },
  { id: "multi-tenancy", label: "Tenant isolation", kind: "concept", cluster: "retrieval", x: 46, y: 10, mobile: true },
  { id: "citations", label: "Passage citations", kind: "concept", cluster: "retrieval", x: 54, y: 28, mobile: true },
  { id: "supabase", label: "Supabase", kind: "tool", cluster: "retrieval", x: 34, y: 32, mobile: false },
  { id: "pdf-parser", label: "Document normalization", kind: "concept", cluster: "retrieval", x: 28, y: 24, mobile: false },
  { id: "reranking", label: "Candidate re-scoring", kind: "concept", cluster: "retrieval", x: 56, y: 20, mobile: false },
  { id: "grounded-rag", label: "Grounded synthesis", kind: "concept", cluster: "retrieval", x: 40, y: 36, mobile: false },

  // --- 3. MACHINE LEARNING & ANOMALIES (Cluster Centroid ~ 82, 62) ---
  { id: "gridguard", label: "GridGuard AI", kind: "project", cluster: "ml", x: 82, y: 60, href: "#gridguard-ai", mobile: true },
  { id: "xgboost", label: "XGBoost", kind: "tool", cluster: "ml", x: 88, y: 54, mobile: true },
  { id: "shap", label: "SHAP explainability", kind: "tool", cluster: "ml", x: 78, y: 68, mobile: true },
  { id: "anomalies", label: "Anomaly detection", kind: "concept", cluster: "ml", x: 86, y: 66, mobile: true },
  { id: "react-flow", label: "React Flow topology", kind: "tool", cluster: "ml", x: 74, y: 58, mobile: true },
  { id: "smart-meter", label: "Smart-meter telemetry", kind: "concept", cluster: "ml", x: 92, y: 62, mobile: true },
  { id: "nptel-cloud-node", label: "NPTEL Cloud (92%)", kind: "tool", cluster: "ml", x: 84, y: 74, mobile: true },
  { id: "z-score", label: "z-score anomaly thresholds", kind: "concept", cluster: "ml", x: 76, y: 76, mobile: false },
  { id: "substation", label: "Fault isolation", kind: "concept", cluster: "ml", x: 94, y: 70, mobile: false },
  { id: "fastapi", label: "FastAPI", kind: "tool", cluster: "ml", x: 72, y: 64, mobile: true },
  { id: "circular-buffer", label: "Circular memory buffers", kind: "concept", cluster: "ml", x: 88, y: 78, mobile: false },
  { id: "feature-importance", label: "Feature attribution", kind: "concept", cluster: "ml", x: 80, y: 50, mobile: false },

  // --- 4. TOOLING, EXECUTION & SANDBOXES (Cluster Centroid ~ 22, 32) ---
  { id: "delta-options", label: "Delta Options HUD", kind: "project", cluster: "tooling", x: 22, y: 32, href: "#delta-exchange-options-hud", mobile: true },
  { id: "chrome-mv3", label: "Chrome Extensions MV3", kind: "tool", cluster: "tooling", x: 16, y: 26, mobile: true },
  { id: "risk-reward", label: "Risk-reward modeling", kind: "concept", cluster: "tooling", x: 26, y: 38, mobile: true },
  { id: "docker", label: "Docker sandboxing", kind: "tool", cluster: "tooling", x: 18, y: 44, mobile: true },
  { id: "cicd", label: "CI/CD AI Pipeline", kind: "project", cluster: "tooling", x: 24, y: 22, href: "#cicd-ai-pipeline", mobile: true },
  { id: "gh-actions", label: "GitHub Actions", kind: "tool", cluster: "tooling", x: 14, y: 36, mobile: false },
  { id: "black-scholes", label: "Options Greeks", kind: "concept", cluster: "tooling", x: 30, y: 28, mobile: false },
  { id: "latency-budget", label: "Latency budgets", kind: "concept", cluster: "tooling", x: 12, y: 48, mobile: true },
  { id: "token-reduction", label: "Prompt token reduction", kind: "concept", cluster: "tooling", x: 28, y: 16, mobile: false },
  { id: "posix", label: "POSIX signals", kind: "concept", cluster: "tooling", x: 20, y: 12, mobile: false },
  { id: "rca-copilot-node", label: "RCA Copilot", kind: "project", cluster: "tooling", x: 10, y: 28, href: "#rca-copilot", mobile: false },
  { id: "blast-radius", label: "Blast-radius scoring", kind: "concept", cluster: "tooling", x: 16, y: 18, mobile: false },

  // --- 5. PLATFORM, LANGUAGES & CORE SYSTEMS (Cluster Centroid ~ 55, 52) ---
  { id: "cpp", label: "C++ (DSA Practice)", kind: "tool", cluster: "web", x: 54, y: 46, mobile: true },
  { id: "python", label: "Python", kind: "tool", cluster: "web", x: 62, y: 50, mobile: true },
  { id: "typescript", label: "TypeScript", kind: "tool", cluster: "web", x: 48, y: 52, mobile: true },
  { id: "nextjs", label: "Next.js", kind: "tool", cluster: "web", x: 58, y: 58, mobile: true },
  { id: "react", label: "React 19", kind: "tool", cluster: "web", x: 50, y: 42, mobile: true },
  { id: "postgresql", label: "PostgreSQL", kind: "tool", cluster: "web", x: 64, y: 42, mobile: true },
  { id: "node", label: "Node.js", kind: "tool", cluster: "web", x: 44, y: 48, mobile: false },
  { id: "tailwind", label: "Tailwind CSS", kind: "tool", cluster: "web", x: 56, y: 64, mobile: false },
  { id: "pinescript", label: "Pine Script v5", kind: "tool", cluster: "web", x: 68, y: 48, mobile: false },
  { id: "two-pointers", label: "Two pointers & binary search", kind: "concept", cluster: "web", x: 46, y: 58, mobile: false },
  { id: "graph-traversal", label: "Graph traversal & trees", kind: "concept", cluster: "web", x: 52, y: 68, mobile: false },
  { id: "idempotency", label: "Idempotency", kind: "concept", cluster: "web", x: 62, y: 56, mobile: false },
  { id: "backpressure", label: "Backpressure management", kind: "concept", cluster: "web", x: 70, y: 54, mobile: false },
  { id: "state-machine", label: "Finite state machines", kind: "concept", cluster: "web", x: 42, y: 64, mobile: false },
  { id: "nifty-smart-lead-node", label: "NIFTY SMART LEAD", kind: "project", cluster: "web", x: 66, y: 60, href: "#nifty-smart-lead", mobile: false },
];
