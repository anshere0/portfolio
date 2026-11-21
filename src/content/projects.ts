import { FeaturedProject, CompactProject } from "./types";

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    slug: "nse-momentum-breadth-scanner",
    name: "NSE Momentum & Breadth Scanner",
    tagline: "Real-time market breadth analytics over binary WebSocket feeds",
    status: "live",
    summary:
      "A real-time NSE Cash and F&O scanner streaming binary WebSocket ticks via Angel One SmartAPI, decoding packet structures, and pushing live market breadth over Server-Sent Events to a React dashboard.",
    stages: [
      { name: "AUTH", ms: 42, description: "TOTP session authentication and token generation" },
      { name: "WEBSOCKET", ms: 12, description: "Binary tick stream ingestion over TLS" },
      { name: "DECODE", ms: 4, description: "Buffer packet decoding and price normalization" },
      { name: "ANALYTICS", ms: 8, description: "Advance/decline ratio & net breadth calculation" },
      { name: "BROADCAST", ms: 14, description: "Server-Sent Events fan-out to connected clients" },
    ],
    metricIds: ["nse-zero-bias"],
    whatBroke:
      "Handling erratic price spikes during IST market pre-open required building a dedicated session engine that checks against NSE market holidays and serves the last valid close without look-ahead bias.",
    nextStep: "Implement tick-by-tick order-flow volume absorption delta histograms.",
    stack: [
      "React 19",
      "Node.js",
      "Express",
      "Angel One SmartAPI",
      "Server-Sent Events",
      "Tailwind CSS",
      "node:test",
    ],
    links: {
      source: "https://github.com/anshere0/portfolio",
    },
    demo: "nse-scanner",
    demoTag: "recorded run",
  },
  {
    slug: "gridguard-ai",
    name: "GridGuard AI",
    tagline: "Smart-meter telemetry with explainable anomaly flags",
    status: "building",
    summary:
      "Streams simulated smart-meter electrical telemetry over WebSockets into an XGBoost anomaly model, explains flagged readings with SHAP feature importance, and visualizes the distribution topology via React Flow.",
    stages: [
      { name: "STREAM", ms: 18, description: "50Hz simulated smart-meter WebSocket feed" },
      { name: "WINDOW", ms: 6, description: "Time-series sliding window aggregation" },
      { name: "INFERENCE", ms: 34, description: "XGBoost anomaly classification" },
      { name: "EXPLAIN", ms: 48, description: "SHAP feature contribution calculation" },
      { name: "TOPOLOGY", ms: 12, description: "Substation-to-meter fault mapping" },
    ],
    metricIds: ["gridguard-telemetry"],
    whatBroke:
      "Early iterations suffered memory pressure when buffering thousands of high-frequency telemetry points. Fixed by moving aggregation logic into fixed-size circular memory buffers.",
    nextStep: "Integrate synthetic load forecasting using temporal fusion transformers.",
    stack: [
      "Next.js",
      "FastAPI",
      "PostgreSQL",
      "WebSockets",
      "XGBoost",
      "SHAP",
      "React Flow",
      "Docker",
    ],
    links: {
      source: "https://github.com/anshere0/gridguard-ai",
    },
    demo: "gridguard",
    demoTag: "synthetic data",
  },
  {
    slug: "ragforge",
    name: "RAGForge",
    tagline: "Multi-tenant document Q&A with strict inline citations",
    status: "live",
    summary:
      "Parses multi-format documents (PDF, DOCX, TXT), chunks them into ~500-word sliding windows with 50-word overlap, generates 768-dim embeddings, and performs pgvector HNSW cosine recall with grounded, multilingual cited answers in English and Hindi.",
    stages: [
      { name: "INGEST", ms: 14, description: "Document normalization and UTF-8 extraction" },
      { name: "CHUNK", ms: 9, description: "500-word semantic windowing with overlap" },
      { name: "EMBED", ms: 38, description: "Google Gemini 768-dim vector generation" },
      { name: "RETRIEVE", ms: 42, description: "pgvector HNSW cosine similarity search" },
      { name: "ANSWER", ms: 89, description: "Grounded multi-tenant synthesis with citations" },
    ],
    metricIds: ["ragforge-latency"],
    whatBroke:
      "Fixed-size chunking caused sentence truncations across boundary points. Replaced with sliding token-aware context windows preserving paragraph sentence boundaries.",
    nextStep: "Add cross-encoder reranking to re-score candidate pools before synthesis.",
    stack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "pgvector",
      "Gemini API",
      "Tailwind CSS",
    ],
    links: {
      source: "https://github.com/anshere0/ragforge",
    },
    demo: "ragforge",
    demoTag: "recorded run",
  },
  {
    slug: "delta-exchange-options-hud",
    name: "Delta Exchange Options Risk-Reward Engine",
    tagline: "Live crypto options analytics and execution HUD",
    status: "building",
    summary:
      "A Chrome extension HUD powered by a FastAPI backend that consumes live Delta Exchange WebSocket order-flow data on 5m BTC charts to calculate real-time risk-reward ratios for at-the-money options and issues a definitive NO TRADE flag when setup strength fails criteria.",
    stages: [
      { name: "FEED", ms: 16, description: "Delta Exchange WebSocket tick subscription" },
      { name: "ORDERFLOW", ms: 8, description: "Volume absorption and order-flow delta check" },
      { name: "PRICING", ms: 12, description: "Real-time Black-Scholes Greeks calculation" },
      { name: "RATIO", ms: 6, description: "Risk-reward boundary calculation" },
      { name: "HUD", ms: 5, description: "Chrome MV3 floating overlay rendering" },
    ],
    metricIds: ["nse-zero-bias"],
    whatBroke:
      "WebSocket reconnections during sudden crypto volatility spikes caused desynced order books. Solved by implementing sequence-number validation and automated snapshot re-polling.",
    nextStep: "Support multi-leg options spread risk-reward calculations.",
    stack: [
      "Python",
      "FastAPI",
      "WebSockets",
      "Chrome Extensions MV3",
      "JavaScript",
    ],
    links: {
      source: "https://github.com/anshere0/portfolio",
    },
    demo: "delta-options",
    demoTag: "recorded run",
  },
];

export const COMPACT_PROJECTS: CompactProject[] = [
  {
    slug: "nifty-smart-lead",
    name: "NIFTY SMART LEAD (Intraday Indicator)",
    tagline: "Composite TradingView indicator combining VWAP bands, order-flow delta, and volume acceleration",
    summary:
      "Designed an intraday indicator in Pine Script v5 featuring cooldown timers, trend-EMA filters, candle confirmation logic, and custom 48-period tuned RSI to eliminate false breakouts.",
    stack: ["Pine Script v5", "TradingView", "Technical Analysis"],
    status: "live",
    links: {
      source: "https://github.com/anshere0/portfolio",
    },
  },
  {
    slug: "cicd-ai-pipeline",
    name: "CI/CD AI Sandbox Pipeline",
    tagline: "Automated failure trace extraction and isolated Docker patch verification",
    summary:
      "Webhook receiver that captures failing GitHub Actions logs, extracts relevant error stack slices to save 78% of prompt tokens, generates a candidate patch via LLM, and tests it in an isolated Docker container before creating a PR.",
    stack: ["GitHub Actions", "Node.js", "Express", "Docker", "PostgreSQL", "Gemini API"],
    status: "done",
    links: {
      source: "https://github.com/anshere0/portfolio",
    },
  },
  {
    slug: "rca-copilot",
    name: "RCA Copilot",
    tagline: "Automated root-cause analysis synthesis from raw distributed incident logs",
    summary:
      "Four-stage incident analysis engine executing pattern detection, timeline reconstruction, blast-radius estimation, and evidence scoring over unstructured server logs.",
    stack: ["Next.js", "Express", "PostgreSQL", "Prisma", "TypeScript"],
    status: "live",
    links: {
      live: "https://rca-ai.vercel.app",
      source: "https://github.com/anshere0/rca-copilot",
    },
  },
];
