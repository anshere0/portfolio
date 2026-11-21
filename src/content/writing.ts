/**
 * Technical Writing & Architecture Notes Schema
 * Aligned with docs/06_CONTENT.md and Ansh Arora's production systems
 */

export interface TechnicalNote {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  tags: string[];
  summary: string;
  takeaways: string[];
}

export const TECHNICAL_NOTES: TechnicalNote[] = [
  {
    slug: "binary-websockets-nse",
    title: "Decoding Binary WebSocket Ticks in Node.js Without Look-Ahead Bias",
    subtitle: "Memory layout, binary buffer unpacking, and deterministic IST session state engines",
    date: "November 2026",
    readTime: "5 min read",
    tags: ["WebSockets", "Node.js", "Binary Protocols", "Market Data"],
    summary:
      "High-frequency broker feeds (like Angel One SmartAPI) stream price updates as packed binary byte arrays over WebSockets. Unpacking integer floats, maintaining IST session boundaries without look-ahead bias, and testing edge cases with node:test.",
    takeaways: [
      "Binary buffer offsets: Reading 16-byte fixed packet frames with Buffer.readInt32BE and float decoders.",
      "Zero look-ahead bias: Pre-market orders and market holidays must serve the previous valid close rather than unverified ticks.",
      "100% deterministic test coverage: Validating packet boundaries under high-throughput burst simulation.",
    ],
  },
  {
    slug: "sliding-windows-rag",
    title: "Why Fixed-Size Chunking Breaks Multi-Tenant RAG: 500-Word Sliding Windows",
    subtitle: "Boundary truncation failure modes, pgvector HNSW cosine recall, and tenant isolation via PostgreSQL RLS",
    date: "October 2026",
    readTime: "6 min read",
    tags: ["RAG", "pgvector", "PostgreSQL", "Gemini API"],
    summary:
      "Naive fixed-character chunking slices sentences in half, ruining embedding semantic fidelity. An architectural post-mortem on engineering 500-word sliding windows with 50-word overlap, grounded citation synthesis, and multi-tenant isolation.",
    takeaways: [
      "Context preservation: Sliding overlap prevents key semantic clauses from being lost across split boundaries.",
      "Tenant safety: Enforcing immutable tenant_id foreign keys inside pgvector HNSW vector indices using Postgres Row-Level Security.",
      "Observable latency: Sub-60ms vector recall across 10,000 embedded documents.",
    ],
  },
  {
    slug: "smart-meter-anomalies",
    title: "Real-Time 50Hz Smart-Meter Telemetry: Combining XGBoost and SHAP in FastAPI",
    subtitle: "High-throughput time-series streaming, circular memory buffers, and real-time tree explainability",
    date: "August 2026",
    readTime: "7 min read",
    tags: ["FastAPI", "WebSockets", "XGBoost", "SHAP", "IoT"],
    summary:
      "Ingesting simulated 50Hz AC electrical grid telemetry without memory leaks. How circular memory buffers enable low-overhead sliding window inference, and how tree-based SHAP values explain grid anomalies in real time.",
    takeaways: [
      "Circular buffers: Fixed-size ring buffers prevent JavaScript and Python garbage collection pauses during continuous streams.",
      "Explainability under latency budgets: Computing SHAP feature attributions on flagged anomalies within a 120ms round-trip budget.",
      "Substation fault isolation: Visualizing downstream affected meters using React Flow DAG topologies.",
    ],
  },
];
