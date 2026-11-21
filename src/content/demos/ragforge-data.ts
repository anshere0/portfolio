/**
 * RAGForge — Demo Data
 * Tag: recorded run
 * Realistic chunking, precomputed cosine similarity, and cited responses
 */

export interface RagSampleQuestion {
  id: string;
  question: string;
  queryVectorSummary: string;
  retrievedChunks: {
    chunkId: string;
    section: string;
    score: number;
    text: string;
  }[];
  answer: string;
  citations: { id: number; chunkId: string; section: string }[];
}

export const RAGFORGE_DEMO_QUESTIONS: RagSampleQuestion[] = [
  {
    id: "refund-window",
    question: "What is the refund window for enterprise annual subscriptions?",
    queryVectorSummary: "768-dim embedding [0.041, -0.118, 0.084, ...]",
    retrievedChunks: [
      {
        chunkId: "chunk_04",
        section: "Section 4.2 — Annual Enterprise Terms",
        score: 0.892,
        text: "Enterprise annual subscriptions are eligible for a prorated refund if requested within 30 calendar days of invoice issuance. After 30 days, unused compute credits remain valid but non-refundable.",
      },
      {
        chunkId: "chunk_05",
        section: "Section 4.3 — Compute Unit Rollovers",
        score: 0.841,
        text: "Dedicated tier tenants can request service cancellation via their support engineer. Refunds exclude third-party model inference pass-through fees incurred during active billing cycles.",
      },
      {
        chunkId: "chunk_12",
        section: "Section 8.1 — General Cancellation",
        score: 0.774,
        text: "Monthly plan subscribers may terminate agreements prior to billing renewals. All monthly charges are non-refundable once the monthly billing period commences.",
      },
    ],
    answer:
      "Enterprise annual subscriptions qualify for a prorated refund when requested within 30 calendar days of invoice issuance [1]. Cancellations after 30 days forfeit cash refund eligibility, though remaining compute credits stay active [1]. Additionally, pass-through model inference costs incurred during billing cannot be refunded [2].",
    citations: [
      { id: 1, chunkId: "chunk_04", section: "Section 4.2" },
      { id: 2, chunkId: "chunk_05", section: "Section 4.3" },
    ],
  },
  {
    id: "downtime-credit",
    question: "How is SLA downtime compensation and credit calculated?",
    queryVectorSummary: "768-dim embedding [0.092, 0.021, -0.144, ...]",
    retrievedChunks: [
      {
        chunkId: "chunk_09",
        section: "Section 6.1 — High Availability SLA (99.9%)",
        score: 0.914,
        text: "If monthly uptime drops below 99.9%, customers receive a 10% credit. If uptime drops below 99.0%, a 25% service credit applies to the subsequent monthly billing cycle.",
      },
      {
        chunkId: "chunk_10",
        section: "Section 6.2 — Credit Claim Protocol",
        score: 0.838,
        text: "Claims for SLA credits must be submitted within 14 days of an incident resolution, accompanied by timestamped traceroute or HTTP 5xx telemetry logs.",
      },
      {
        chunkId: "chunk_01",
        section: "Section 1.1 — Maintenance Windows",
        score: 0.695,
        text: "Scheduled maintenance communicated 72 hours in advance is excluded from monthly downtime calculations.",
      },
    ],
    answer:
      "Service credits are tiered based on measured monthly availability: a 10% credit applies when uptime falls below 99.9%, and a 25% credit applies if uptime falls below 99.0% [1]. Customers must file claims within 14 days of the incident with timestamped error logs [2]. Scheduled maintenance windows are strictly excluded [3].",
    citations: [
      { id: 1, chunkId: "chunk_09", section: "Section 6.1" },
      { id: 2, chunkId: "chunk_10", section: "Section 6.2" },
      { id: 3, chunkId: "chunk_01", section: "Section 1.1" },
    ],
  },
  {
    id: "tenant-isolation",
    question: "How does the system ensure document isolation across multi-tenant vector indices?",
    queryVectorSummary: "768-dim embedding [-0.015, 0.162, 0.048, ...]",
    retrievedChunks: [
      {
        chunkId: "chunk_15",
        section: "Section 9.1 — Row-Level Security & pgvector HNSW",
        score: 0.931,
        text: "All vector embeddings are tagged with a tenant_id foreign key enforced via PostgreSQL Row-Level Security (RLS) policies. Cosine queries execute with an immutable tenant filter in the WHERE clause.",
      },
      {
        chunkId: "chunk_16",
        section: "Section 9.2 — Key Isolation & Tokenizer Sandboxes",
        score: 0.865,
        text: "Client document normalization scripts run in ephemeral worker sandboxes. No cross-tenant index caching or shared memory segments are permitted.",
      },
    ],
    answer:
      "Vector embeddings are strictly segregated using PostgreSQL Row-Level Security (RLS) policies tied to tenant identifiers, executing HNSW cosine search with forced tenant filters [1]. Document processing runs inside isolated worker environments preventing any cross-tenant memory or cache sharing [2].",
    citations: [
      { id: 1, chunkId: "chunk_15", section: "Section 9.1" },
      { id: 2, chunkId: "chunk_16", section: "Section 9.2" },
    ],
  },
];
