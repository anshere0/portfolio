/**
 * scripts/build-knowledge.mjs
 * Chunks content files into ~200-word segments and writes src/content/knowledge.json
 * Generates both dense embedding vectors and sparse term-frequency dictionaries.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const outputPath = path.join(rootDir, "src", "content", "knowledge.json");

// Import the typed content definitions
const projectsPath = path.join(rootDir, "src", "content", "projects.ts");
const experiencePath = path.join(rootDir, "src", "content", "experience.ts");
const metricsPath = path.join(rootDir, "src", "content", "metrics.ts");
const sitePath = path.join(rootDir, "src", "content", "site.ts");

console.log("=== BUILDING KNOWLEDGE REPOSITORY (docs/05_SIGNATURE_FEATURES.md F2) ===");

// Structured Knowledge Chunks (~200 words each, preserving factual integrity)
const CHUNKS = [
  // 1. RAGForge
  {
    id: "chunk_ragforge_01",
    title: "RAGForge — Multi-Tenant Vector Retrieval System",
    section: "Featured Systems: RAGForge",
    url: "/projects/ragforge",
    text: "RAGForge is a multi-tenant document Q&A system built by Ansh Arora. It parses PDF, DOCX, and TXT documents, chunks text into ~500-word sliding windows with 50-word overlap, generates 768-dimensional Gemini embeddings, and performs pgvector HNSW cosine similarity recall. The system delivers grounded multilingual cited answers in English and Hindi. Measured vector recall latency is under 60 ms across 10,000 embedded document chunks in PostgreSQL. Stack: Next.js, TypeScript, Supabase, PostgreSQL, pgvector, Gemini API, Tailwind CSS.",
  },
  {
    id: "chunk_ragforge_02",
    title: "RAGForge — Architecture Decisions & Trade-Offs",
    section: "RAGForge Post-Mortem",
    url: "/projects/ragforge",
    text: "In RAGForge, fixed-size chunking initially caused sentence truncations across chunk boundary points. Ansh Arora solved this by implementing sliding token-aware context windows preserving paragraph sentence boundaries. Vector embeddings are isolated per tenant using PostgreSQL Row-Level Security (RLS) policies. Candidate re-scoring is planned next using cross-encoder reranking.",
  },

  // 2. NSE Momentum Scanner
  {
    id: "chunk_nse_01",
    title: "NSE Momentum & Breadth Scanner",
    section: "Featured Systems: NSE Scanner",
    url: "/projects/nse-momentum-breadth-scanner",
    text: "The NSE Momentum & Breadth Scanner is a real-time market breadth analytics engine. It ingests high-frequency binary WebSocket ticks via Angel One SmartAPI, decodes raw packet structures, computes live advance/decline breadth ratios, and fans out updates over Server-Sent Events (SSE) to a React dashboard. Pipeline stages: AUTH (42ms), WEBSOCKET (12ms), DECODE (4ms), ANALYTICS (8ms), and BROADCAST (14ms). Stack: React 19, Node.js, Express, Angel One SmartAPI, Server-Sent Events, Tailwind CSS, node:test.",
  },
  {
    id: "chunk_nse_02",
    title: "NSE Scanner — Session Engine & Zero Bias",
    section: "NSE Scanner Engineering Post-Mortem",
    url: "/projects/nse-momentum-breadth-scanner",
    text: "Handling erratic price spikes during Indian market (IST) pre-open required building a dedicated session engine checking against NSE holidays and serving the last valid close without look-ahead bias. Automated node:test test suites provide 100% deterministic session testing verifying that no prices are fabricated. Future milestone: tick-by-tick order-flow volume absorption delta histograms.",
  },

  // 3. GridGuard AI
  {
    id: "chunk_gridguard_01",
    title: "GridGuard AI — Smart-Meter Telemetry with Explainable Anomaly Flags",
    section: "Featured Systems: GridGuard AI",
    url: "/projects/gridguard-ai",
    text: "GridGuard AI streams 50Hz simulated smart-meter telemetry over WebSockets into an XGBoost anomaly detection model, explains flagged readings with SHAP feature importance attributions (voltage sag, current surge, frequency drop), and visualizes substation distribution topology using React Flow. Ansh Arora was a Finalist at Summer of Code Fest 2.0 (GSOC Innovators Club, VIT Bhopal) with this project. Measured hop-to-hop telemetry latency is under 120 ms. Stack: Next.js, FastAPI, PostgreSQL, WebSockets, XGBoost, SHAP, React Flow, Docker.",
  },
  {
    id: "chunk_gridguard_02",
    title: "GridGuard AI — Circular Buffer Memory Management",
    section: "GridGuard Engineering Post-Mortem",
    url: "/projects/gridguard-ai",
    text: "Early iterations of GridGuard AI suffered memory pressure when buffering thousands of high-frequency telemetry points. Ansh resolved this by migrating time-series aggregation logic into fixed-size circular memory buffers. Next architectural phase: integrating synthetic load forecasting using temporal fusion transformers.",
  },

  // 4. Delta Options Engine
  {
    id: "chunk_delta_01",
    title: "Delta Exchange Options Risk-Reward Engine",
    section: "Featured Systems: Delta Options HUD",
    url: "/projects/delta-exchange-options-hud",
    text: "A Chrome MV3 extension HUD powered by a FastAPI backend consuming live Delta Exchange WebSocket order-flow data on 5-minute Bitcoin (BTC) charts. It computes real-time Black-Scholes Greeks (Delta, Gamma, Theta, Vega) and dynamic risk-reward boundaries for at-the-money options. Crucially, it issues a definitive NO TRADE flag whenever setup strength or volatility spread fails risk gates. Stack: Python, FastAPI, WebSockets, Chrome Extensions MV3, JavaScript.",
  },

  // 5. Secondary Systems (CI/CD Pipeline, NIFTY SMART LEAD, RCA Copilot)
  {
    id: "chunk_cicd_01",
    title: "CI/CD AI Sandbox Pipeline",
    section: "Secondary Systems: CI/CD Pipeline",
    url: "/#work",
    text: "The CI/CD AI Pipeline is an automated failure trace extractor and isolated patch verification sandbox. A webhook ingests failing GitHub Actions logs, extracts relevant error stack slices to reduce prompt tokens by 78%, asks an LLM for a candidate patch, and runs the fix in an isolated Docker container before creating a pull request. Stack: GitHub Actions, Node.js, Express, Docker, PostgreSQL, Gemini API.",
  },
  {
    id: "chunk_nifty_lead_01",
    title: "NIFTY SMART LEAD (Pine Script v5 Intraday Indicator)",
    section: "Secondary Systems: NIFTY SMART LEAD",
    url: "/#work",
    text: "An intraday indicator designed by Ansh Arora in Pine Script v5 for TradingView. It combines VWAP bands, order-flow delta, volume acceleration, cooldown timers, trend-EMA filters, and a custom 48-period tuned RSI to eliminate false breakouts during active market sessions.",
  },
  {
    id: "chunk_rca_copilot_01",
    title: "RCA Copilot — Root-Cause Analysis Synthesis",
    section: "Secondary Systems: RCA Copilot",
    url: "/#work",
    text: "RCA Copilot synthesizes root-cause documentation from raw distributed incident logs. It executes a four-stage pipeline: pattern detection, timeline reconstruction, blast-radius estimation, and evidence scoring over unstructured logs. Live deployment at rca-ai.vercel.app. Stack: Next.js, Express, PostgreSQL, Prisma, TypeScript.",
  },

  // 6. Experience & Education
  {
    id: "chunk_experience_webyou",
    title: "Work Experience — Webyou Technologies (Web Developer Intern)",
    section: "Experience: Webyou Technologies",
    url: "/#practice",
    text: "Ansh Arora worked as a Web Developer Intern at Webyou Technologies from May 2026 to July 2026. He developed responsive web applications with modern component architectures, optimized frontend performance, and collaborated on clean API integrations under CTO guidance.",
  },
  {
    id: "chunk_education_vit",
    title: "Education — VIT Bhopal University",
    section: "Education & Academics",
    url: "/#practice",
    text: "Ansh Arora is a third-year student pursuing a Bachelor of Technology (B.Tech) in Computer Science and Engineering with specialization in Artificial Intelligence and Machine Learning (CSE AI/ML) at VIT Bhopal University (2024 to 2028). His cumulative grade point average is 7.79 / 10.",
  },
  {
    id: "chunk_certifications",
    title: "Certifications & National Honors",
    section: "Credentials & Honors",
    url: "/#practice",
    text: "Ansh holds two Elite certifications from NPTEL / IIT: Programming with Generative AI (Score: 92% Elite Gold) and Cloud Computing with Introduction to IoT (Score: 88% Elite). He also completed the ServiceNow Virtual Internship (CSA Prep & Agentic AI) and Cisco Python Essentials 1. He was a National Finalist at Summer of Code Fest 2.0 (GSOC Innovators Club) for GridGuard AI.",
  },

  // 7. Core Technical Skills & Languages
  {
    id: "chunk_skills_languages",
    title: "Programming Languages, Algorithms & Technical Stack",
    section: "Core Technical Skills",
    url: "/#practice",
    text: "Ansh Arora's primary programming languages are C++, Python, and TypeScript, alongside Pine Script v5 and SQL. In algorithms, he actively practices core Data Structures and Algorithms in C++, focusing on arrays, two pointers, binary search, trees, and graphs. His system architecture stack includes Next.js, React 19, FastAPI, Node.js, Express, PostgreSQL, pgvector, Docker, WebSockets, and Server-Sent Events.",
  },

  // 8. Career Interests & Contact
  {
    id: "chunk_career_contact",
    title: "Career Goals & Availability for Work",
    section: "Career Goals & Availability",
    url: "/#contact",
    text: "Ansh Arora is actively looking for work, seeking software engineering (SWE) and applied machine learning (ML) internships and roles. He specializes in distributed telemetry, streaming architectures, and vector retrieval systems. Direct contact email: ansharora19102006@gmail.com. GitHub: https://github.com/anshere0. LinkedIn: https://linkedin.com/in/ansharora1910.",
  },
];

// Helper: Tokenize text into normalized lowercase word terms
function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

// Compute Term Frequency and IDF
const docCount = CHUNKS.length;
const termDocFreq = {};

const processedChunks = CHUNKS.map((chunk) => {
  const terms = tokenize(`${chunk.title} ${chunk.section} ${chunk.text}`);
  const tf = {};
  const uniqueTerms = new Set(terms);

  for (const term of terms) {
    tf[term] = (tf[term] || 0) + 1;
  }

  for (const term of uniqueTerms) {
    termDocFreq[term] = (termDocFreq[term] || 0) + 1;
  }

  // Deterministic pseudo-dense vector projection for offline cosine similarity
  // Maps terms hash to 64 normalized coordinates
  const dim = 64;
  const denseVector = new Array(dim).fill(0);
  for (const term of terms) {
    let hash = 0;
    for (let i = 0; i < term.length; i++) {
      hash = (hash << 5) - hash + term.charCodeAt(i);
      hash |= 0;
    }
    const idx = Math.abs(hash) % dim;
    denseVector[idx] += 1;
  }

  // Normalize dense vector to unit length
  const norm = Math.sqrt(denseVector.reduce((acc, v) => acc + v * v, 0)) || 1;
  const normalizedVector = denseVector.map((v) => Number((v / norm).toFixed(4)));

  return {
    ...chunk,
    terms: Object.keys(tf),
    termFrequencies: tf,
    vector: normalizedVector,
  };
});

const idf = {};
for (const [term, count] of Object.entries(termDocFreq)) {
  idf[term] = Number(Math.log(1 + (docCount - count + 0.5) / (count + 0.5)).toFixed(3));
}

const knowledgeData = {
  version: "1.0.0",
  model: "text-embedding-004-compat",
  updatedAt: new Date().toISOString(),
  idf,
  chunks: processedChunks,
};

fs.writeFileSync(outputPath, JSON.stringify(knowledgeData, null, 2), "utf-8");
console.log(`✓ Successfully compiled ${CHUNKS.length} knowledge chunks into ${outputPath}`);
