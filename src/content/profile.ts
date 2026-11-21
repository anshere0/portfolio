/**
 * SINGLE SOURCE OF TRUTH — Ansh Arora Portfolio
 * Aligned strictly with Ansh_Arora_Resume.pdf & Master Prompt Specification.
 */

export interface ProjectDecision {
  title: string;
  decision: string;
  tradeOff: string;
}

export interface ArchitectureStep {
  step: string;
  label: string;
  detail: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  featured: boolean;
  status: "Completed" | "In Progress" | "Actively Building";
  oneLiner: string;
  problem: string;
  role: string;
  stack: string[];
  keyDecisions: ProjectDecision[];
  architectureSteps: ArchitectureStep[];
  metrics: ProjectMetric[];
  futureWork: string;
  repoUrl: string | null;
  liveUrl: string | null;
  demoVideoUrl: string | null;
}

export interface CompactProject {
  slug: string;
  title: string;
  subtitle: string;
  status: "In Progress" | "Completed";
  summary: string;
  stack: string[];
  repoUrl: string | null;
  liveUrl: string | null;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  statusBadge: string;
  certificateUrl?: string;
  testimonial?: {
    quote: string;
    author: string;
    title: string;
  };
  bullets: string[];
  tech: string[];

}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  fileUrl: string;
  category: "AI/ML" | "Programming" | "Web" | "Enterprise Systems";
}

export interface AchievementItem {
  title: string;
  event: string;
  detail: string;
  fileUrl: string;
  badge: string;
}

export interface ProofMetric {
  label: string;
  value: string;
  sublabel: string;
}

export interface ProfileData {
  identity: {
    name: string;
    firstName: string;
    lastName: string;
    headline: string;
    subheadline: string;
    institution: string;
    degree: string;
    specialization: string;
    cgpa: string; // Strictly 7.79/10 per latest transcript
    batch: string;
    standing: string;
    phone: string;
    email: string;
    location: string;
    githubUrl: string;
    linkedinUrl: string;
    leetcodeUrl: string;
    resumePdfUrl: string;
    avatarUrl: string;
  };
  narrative: {
    lead: string;
    paragraphs: string[];
    coursework: string[];
  };
  technicalSkills: {
    languages: string[];
    frameworks: string[];
    databasesAndAI: string[];
    tools: string[];
  };
  proofMetrics: ProofMetric[];
  experiences: ExperienceItem[];
  featuredProjects: Project[];
  compactProjects: CompactProject[];
  techMatrix: {
    technologies: string[];
    projects: { name: string; slug: string; usedTech: string[] }[];
  };
  certifications: CertificationItem[];
  achievements: AchievementItem[];
  leetcode: {
    username: string;
    profileUrl: string;
    solvedTotal: number;
    easyCount: number;
    mediumCount: number;
    hardCount: number;
    topTopics: string[];
    note: string;
  };
}

export const PROFILE_DATA: ProfileData = {
  identity: {
    name: "Ansh Arora",
    firstName: "Ansh",
    lastName: "Arora",
    headline: "B.Tech CSE (AI/ML) · Systems & ML Developer",
    subheadline: "Engineering multi-tenant RAG pipelines, real-time smart-grid anomaly detection, and sandboxed CI debugging agents.",
    institution: "Vellore Institute of Technology, Bhopal",
    degree: "B.Tech, Computer Science Engineering",
    specialization: "Artificial Intelligence and Machine Learning (AI/ML)",
    cgpa: "7.51 / 10", // Verified strictly from Ansh_Arora_Resume.pdf
    batch: "2024 – 2028",
    standing: "Third-Year B.Tech Student",
    phone: "+91 9023573649",
    email: "ansharora19102006@gmail.com",
    location: "Bhopal, Madhya Pradesh, India",
    githubUrl: "https://github.com/anshere0",
    linkedinUrl: "https://www.linkedin.com/in/ansh-arora0/",
    leetcodeUrl: "https://leetcode.com/u/anshere19/",
    resumePdfUrl: "/Ansh_Arora_Resume.pdf",
    avatarUrl: "/ansh_arora_profile.jpg",
  },

  narrative: {
    lead: "Third-year Computer Science Engineering student specializing in AI/ML at VIT Bhopal (2024–2028, CGPA: 7.51/10). I architect end-to-end machine learning pipelines, real-time telemetry systems, and sandboxed developer tooling.",
    paragraphs: [
      "My development philosophy treats software and ML systems as empirical science: every pipeline is engineered with explicit context boundaries, observable latency, and reproducible benchmarks.",
      "My core stack spans Python, C++, TypeScript, Next.js, and PostgreSQL. From building multi-tenant RAG architectures with 768-dim Gemini embeddings and pgvector cosine similarity, to streaming smart-meter IoT telemetry over WebSockets into XGBoost with SHAP explainability, I build systems that work under real-world constraints.",
      "I have completed a production Web Developer internship at Webyou Technologies, placed as a National Hackathon Finalist at Summer of Code Fest 2.0 with GridGuard AI, and contributed to open-source tooling through GirlScript Summer of Code (GSSoC 2026)."
    ],
    coursework: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming (OOP)",
      "Database Management Systems (DBMS)",
      "Operating Systems (OS)",
      "Machine Learning Fundamentals",
      "Theory of Computation",
      "Compiler Design",
      "Computer Networks"
    ]
  },

  technicalSkills: {
    languages: ["Python", "Java", "C++", "JavaScript", "TypeScript", "SQL"],
    frameworks: ["React", "Next.js", "Node.js", "Express.js", "FastAPI", "Flask"],
    databasesAndAI: [
      "PostgreSQL",
      "Supabase",
      "pgvector",
      "XGBoost",
      "SHAP",
      "RAG Pipelines",
      "OpenAI API",
      "Gemini API"
    ],
    tools: ["Git", "Docker", "GitHub Actions", "Vercel", "Prisma ORM"]
  },

  proofMetrics: [
    { label: "Systems Built", value: "07+", sublabel: "RAG, Anomaly Telemetry, CI Sandbox, Triage" },
    { label: "Production Internship", value: "01", sublabel: "Webyou Technologies (Verified Credential)" },
    { label: "Hackathon Standing", value: "Finalist", sublabel: "Summer of Code Fest 2.0 (GridGuard AI)" },
    { label: "Industry Credentials", value: "05", sublabel: "ServiceNow, NPTEL, Cisco, Coursera, VITyarthi" },
    { label: "Academic CGPA", value: "7.79", sublabel: "B.Tech CSE (AI/ML) · VIT Bhopal" }
  ],

  experiences: [],

  featuredProjects: [
    {
      slug: "ragforge",
      title: "RAGForge",
      subtitle: "Multi-Tenant Document RAG Engine with Cosine Similarity Retrieval",
      featured: true,
      status: "Completed",
      oneLiner: "Multi-tenant RAG pipeline with PDF/DOCX/TXT parsing, 500-word chunked embeddings (Gemini text-embedding-004, 768-dim), pgvector cosine-similarity retrieval, and LLM answer generation with source citations.",
      problem: "Standard LLM systems lack domain-specific grounding and hallucinate on proprietary enterprise documentation. Multi-tenant implementations require strict row-level tenant boundary isolation.",
      role: "Full-Stack & Systems Developer — Built document parsing pipeline, pgvector cosine search, Supabase RLS security boundary, and interactive client widget.",
      stack: ["Next.js", "TypeScript", "Supabase", "pgvector", "Gemini API", "Tailwind CSS", "Vercel"],
      keyDecisions: [
        {
          title: "500-Word Context Windows with 50-Word Overlap",
          decision: "Segmented uploaded documents into 500-word sliding windows rather than arbitrary character splits.",
          tradeOff: "Maintains semantic coherence across paragraph boundaries with minimal storage overhead (+10% token storage)."
        },
        {
          title: "768-Dim Gemini Embeddings with pgvector HNSW Index",
          decision: "Paired Google Gemini text-embedding-004 with PostgreSQL pgvector using Hierarchical Navigable Small World (HNSW) indexing.",
          tradeOff: "Delivers sub-60ms vector retrieval directly inside existing relational database without maintaining expensive external vector clusters."
        },
        {
          title: "Multi-Language Auto-Detection & Tenant Isolation",
          decision: "Engineered automatic language routing for English and Hindi queries alongside Postgres Row Level Security (RLS).",
          tradeOff: "Guarantees zero data leakage across company accounts while increasing multi-language comprehension."
        }
      ],
      architectureSteps: [
        { step: "01. INGEST", label: "Document Ingestion", detail: "PDF / DOCX / TXT parsed into clean UTF-8 text streams" },
        { step: "02. CHUNK", label: "Semantic Windowing", detail: "500-word chunked embeddings preserving contextual coherence" },
        { step: "03. EMBED", label: "Vector Transformation", detail: "Gemini text-embedding-004 maps chunks to 768-dim space" },
        { step: "04. RETRIEVE", label: "pgvector Cosine Search", detail: "HNSW index retrieves top-K nearest document chunks" },
        { step: "05. SYNTHESIS", label: "Cited Response", detail: "LLM synthesizes answers with strict inline document citations" }
      ],
      metrics: [
        { label: "Embedding Dimensions", value: "768-dim" },
        { label: "Chunk Target", value: "500 words" },
        { label: "Retrieval Latency", value: "<60ms" },
        { label: "Languages", value: "EN / HI / TA" }
      ],
      futureWork: "Implement hybrid BM25 lexical reranking and integrate automated RAGAS evaluation metrics for continuous grounding verification.",
      repoUrl: "https://github.com/anshere0",
      liveUrl: null,
      demoVideoUrl: null
    },
    {
      slug: "cicd-pipeline",
      title: "CI/CD AI Pipeline",
      subtitle: "Autonomous Failure Ingestion & Sandboxed Patch Generator",
      featured: true,
      status: "Completed",
      oneLiner: "Webhook-triggered pipeline ingesting CI failure logs and auto-generating code fixes via Gemini API, validated in an isolated Docker sandbox before opening PRs.",
      problem: "Engineering teams lose continuous sprint velocity to repetitive CI build breaks, broken dependencies, and lint regressions that can be resolved autonomously.",
      role: "DevOps & Systems Developer — Built GitHub webhook listener, Docker sandbox executor, PostgreSQL audit store, and real-time Next.js dashboard.",
      stack: ["GitHub Actions", "Express.js", "Gemini API", "Docker", "PostgreSQL", "Next.js", "TypeScript"],
      keyDecisions: [
        {
          title: "Ephemeral Docker Sandboxing Prior to Git Push",
          decision: "Executed AI-generated patches in isolated Docker containers with no network egress or host file mounts before opening pull requests.",
          tradeOff: "Adds 15–20s of container spin-up time, but completely eliminates security risks of untested LLM code executing in production environments."
        },
        {
          title: "AST Context Window Pruning",
          decision: "Extracted only the relevant stack trace, changed files, and surrounding AST context rather than dumping whole repositories into the LLM.",
          tradeOff: "Reduced token consumption by 78% while boosting first-pass compilation rate of generated fixes."
        }
      ],
      architectureSteps: [
        { step: "01. WEBHOOK", label: "CI Failure Event", detail: "GitHub Action workflow failure webhook received by Express" },
        { step: "02. PARSE", label: "Log & Trace Extraction", detail: "Isolates failing test, exit codes, and diff context" },
        { step: "03. SYNTHESIS", label: "Gemini Patch Generation", detail: "Constructs surgical code patch with explanation" },
        { step: "04. SANDBOX", label: "Docker Build & Test", detail: "Validates build & tests pass inside disposable container" },
        { step: "05. DISPATCH", label: "Automated Pull Request", detail: "Pushes verified commit and opens PR with diagnostic log" }
      ],
      metrics: [
        { label: "Sandbox Isolation", value: "100% Docker" },
        { label: "Token Reduction", value: "78%" },
        { label: "Patch Verification", value: "Automated" },
        { label: "Target Ecosystem", value: "Node / Python" }
      ],
      futureWork: "Add support for multi-file semantic diffs and automated git bisect for regression identification.",
      repoUrl: "https://github.com/anshere0",
      liveUrl: null,
      demoVideoUrl: null
    },
    {
      slug: "gridguard-ai",
      title: "GridGuard AI",
      subtitle: "Smart-Meter Telemetry Stream & Anomaly Detection Pipeline",
      featured: true,
      status: "Actively Building",
      oneLiner: "Real-time smart-grid telemetry dashboard streaming smart-meter data over WebSockets into an XGBoost anomaly-detection pipeline with SHAP-based explainability.",
      problem: "Power distribution utilities face catastrophic equipment burnouts and massive electricity theft because legacy telemetry lacks real-time explainability and instant localized triage.",
      role: "Lead Systems & ML Engineer — Built WebSocket stream ingestion, feature engineering pipeline, XGBoost anomaly model, and React Flow topology inspector.",
      stack: ["Next.js", "FastAPI", "PostgreSQL", "WebSockets", "XGBoost", "React Flow", "SHAP", "Docker", "Python"],
      keyDecisions: [
        {
          title: "Sub-Second WebSocket Streaming Gateway",
          decision: "Streamed synthetic smart-meter voltage, phase imbalance, and load drops over persistent WebSockets directly to FastAPI workers.",
          tradeOff: "Maintains continuous event processing without HTTP polling latency, requiring robust connection lifecycle management."
        },
        {
          title: "XGBoost Detection with SHAP Decompositions",
          decision: "Coupled tree-based anomaly classification with real-time SHAP waterfall attributions.",
          tradeOff: "Provides electrical grid operators with transparent root cause telemetry rather than black-box alarms."
        },
        {
          title: "Hierarchical React Flow Grid Topology",
          decision: "Rendered electrical transmission networks from regional substation down to distribution transformers and individual smart meters.",
          tradeOff: "Enables instant visual blast-radius tracing during overload events with automated PDF/CSV audit data ingestion."
        }
      ],
      architectureSteps: [
        { step: "01. TELEMETRY", label: "IoT Smart Meter Feed", detail: "Continuous voltage, current, and phase telemetry" },
        { step: "02. INGESTION", label: "WebSocket Gateway", detail: "FastAPI stream receiver with token verification & queue" },
        { step: "03. INFERENCE", label: "XGBoost Anomaly Scoring", detail: "Feature vector scored against baseline consumption profiles" },
        { step: "04. EXPLAIN", label: "SHAP Decomposition", detail: "Decomposes contributing risk factors per telemetry point" },
        { step: "05. TOPOLOGY", label: "React Flow Grid Map", detail: "Propagates incident alerts from substation to meter" }
      ],
      metrics: [
        { label: "Hackathon Result", value: "Finalist" },
        { label: "Telemetry Latency", value: "<120ms" },
        { label: "Detection Pipeline", value: "XGBoost + SHAP" },
        { label: "Network Inspection", value: "React Flow" }
      ],
      futureWork: "Deploy on Edge IoT gateways (Raspberry Pi/NVIDIA Jetson) using quantized ONNX Runtime models.",
      repoUrl: "https://github.com/anshere0",
      liveUrl: null,
      demoVideoUrl: null
    },
    {
      slug: "rca-copilot",
      title: "RCA Copilot (Triage)",
      subtitle: "Structured Incident Root Cause Analysis & Evidence Engine",
      featured: true,
      status: "Completed",
      oneLiner: "Transforms raw distributed logs and incident reports into structured Root Cause Analysis documents via a 4-stage pipeline with evidence scoring.",
      problem: "Incident post-mortems in production environments often require manual log parsing across disjointed services, causing high MTTR and incomplete root-cause documentation.",
      role: "Full-Stack Developer — Built log normalization parser, anomaly correlation engine, Prisma database schema, and live web interface.",
      stack: ["Next.js", "Express.js", "PostgreSQL", "OpenAI API", "Prisma ORM", "TypeScript", "Tailwind CSS"],
      keyDecisions: [
        {
          title: "4-Stage Sequential Processing Pipeline",
          decision: "Separated analysis into Log Parsing -> Anomaly Detection -> Timeline Reconstruction -> Blast-Radius Analysis.",
          tradeOff: "Linear execution takes ~25s total, but produces far more accurate attribution than single-shot prompts."
        },
        {
          title: "Weighted Evidence Scoring",
          decision: "Every generated hypothesis is backed by cited log lines and an evidence confidence score from 0.0 to 1.0.",
          tradeOff: "Allows on-call engineers to immediately distinguish verified facts from speculative correlations."
        }
      ],
      architectureSteps: [
        { step: "01. PARSE", label: "Raw Log Ingestion", detail: "Normalizes unstructured log lines into timestamped event schemas" },
        { step: "02. ANOMALY", label: "Pattern Detection", detail: "Identifies error spikes, unhandled exceptions, and timeouts" },
        { step: "03. TIMELINE", label: "Chrono Reconstruction", detail: "Builds causal sequence leading up to the degradation event" },
        { step: "04. BLAST", label: "Radius Assessment", detail: "Maps impacted downstream services and customer tenants" },
        { step: "05. REPORT", label: "Evidence Scoring", detail: "Compiles formatted RCA report with confidence metrics" }
      ],
      metrics: [
        { label: "Investigation Time", value: "<30s" },
        { label: "Pipeline Stages", value: "4 Distinct" },
        { label: "Evidence Scoring", value: "Weighted" },
        { label: "Live Deployment", value: "rca-ai.vercel.app" }
      ],
      futureWork: "Connect directly to Datadog and AWS CloudWatch APIs for real-time incident polling.",
      repoUrl: "https://github.com/anshere0",
      liveUrl: "https://rca-ai.vercel.app",
      demoVideoUrl: null
    }
  ],

  compactProjects: [
    {
      slug: "likhai",
      title: "LikhAI",
      subtitle: "AI Handwriting Synthesis & Vector Stroke Engine",
      status: "In Progress",
      summary: "Vector stroke-based handwriting synthesis engine learning individual human writing variations, generating exportable high-res PDFs and vector SVG strokes rather than static font approximations.",
      stack: ["PyTorch", "OpenCV", "FastAPI", "React", "TypeScript", "Tailwind CSS"],
      repoUrl: "https://github.com/anshere0",
      liveUrl: null
    },
    {
      slug: "stacksensei",
      title: "StackSensei",
      subtitle: "Codebase Architectural Analyzer & Visualizer",
      status: "Completed",
      summary: "Developer productivity tool scanning GitHub repositories to map dependencies, architectural layers, API routes, and provide an interactive AI chat assistant for onboarding.",
      stack: ["React", "TypeScript", "Node.js", "Express", "Supabase", "Gemini API"],
      repoUrl: "https://github.com/anshere0",
      liveUrl: null
    },
    {
      slug: "airpredict-nyc",
      title: "AirPredict NYC",
      subtitle: "Ensemble Price Modeling & SHAP Explainability",
      status: "Completed",
      summary: "Production ML application predicting NYC Airbnb prices using an ensemble of Linear Regression, Random Forest, and XGBoost with SHAP waterfall explanations and KNN similar listings.",
      stack: ["Python", "scikit-learn", "XGBoost", "SHAP", "Streamlit", "Plotly"],
      repoUrl: "https://github.com/anshere0",
      liveUrl: null
    }
  ],

  techMatrix: {
    technologies: [
      "Python",
      "C++",
      "TypeScript",
      "JavaScript",
      "SQL",
      "Next.js",
      "React",
      "FastAPI",
      "Express.js",
      "PostgreSQL",
      "Supabase",
      "pgvector",
      "Docker",
      "GitHub Actions",
      "XGBoost",
      "SHAP",
      "Gemini API",
      "OpenAI API",
      "Prisma ORM"
    ],
    projects: [
      {
        name: "RAGForge",
        slug: "ragforge",
        usedTech: ["TypeScript", "Next.js", "React", "SQL", "pgvector", "Gemini API", "Supabase"]
      },
      {
        name: "CI/CD AI Pipeline",
        slug: "cicd-pipeline",
        usedTech: ["JavaScript", "TypeScript", "Next.js", "Express.js", "Gemini API", "Docker", "GitHub Actions", "PostgreSQL", "SQL"]
      },
      {
        name: "GridGuard AI",
        slug: "gridguard-ai",
        usedTech: ["Python", "FastAPI", "Next.js", "React", "TypeScript", "PostgreSQL", "SQL", "XGBoost", "SHAP", "Docker"]
      },
      {
        name: "RCA Copilot",
        slug: "rca-copilot",
        usedTech: ["TypeScript", "Next.js", "React", "Express.js", "SQL", "PostgreSQL", "Prisma ORM", "OpenAI API"]
      },
      {
        name: "LikhAI",
        slug: "likhai",
        usedTech: ["Python", "FastAPI", "React", "TypeScript"]
      },
      {
        name: "StackSensei",
        slug: "stacksensei",
        usedTech: ["JavaScript", "TypeScript", "React", "Express.js", "Gemini API", "Supabase"]
      },
      {
        name: "AirPredict NYC",
        slug: "airpredict-nyc",
        usedTech: ["Python", "XGBoost", "SHAP"]
      },
      {
        name: "Webyou Intern",
        slug: "webyou",
        usedTech: ["JavaScript", "HTML", "CSS"]
      }
    ]
  },

  certifications: [
    {
      title: "ServiceNow Virtual Internship — CSA Exam Prep, Agentic AI, ATF, Flows",
      issuer: "ServiceNow University · AICTE · SmartBridge",
      date: "Jun 2026",
      fileUrl: "/certificates/service now certificate.pdf",
      category: "Enterprise Systems"
    },
    {
      title: "Programming in Java",
      issuer: "VITyarthi · VIT Bhopal University",
      date: "Jul 2026",
      fileUrl: "/certificates/programming in java vityarthi.png",
      category: "Programming"
    },
    {
      title: "Programming with Generative AI",
      issuer: "NPTEL",
      date: "2025",
      fileUrl: "/certificates/Programming with Generative AI.pdf",
      category: "AI/ML"
    },
    {
      title: "Python Essentials 1 & 2",
      issuer: "Cisco Networking Academy",
      date: "2025",
      fileUrl: "/certificates/Python_Essentials_1_certificate_ansh-24bai10709-vitbhopal-ac-in_7056eb69-06ec-4e82-aebc-ca3f97edf959.pdf",
      category: "Programming"
    },
    {
      title: "HTML, CSS, and JavaScript for Web Developers",
      issuer: "Johns Hopkins University · Coursera",
      date: "2024",
      fileUrl: "/certificates/HTML CSS JS john hopkins.pdf",
      category: "Web"
    }
  ],

  achievements: [
    {
      title: "Finalist — Summer of Code Fest 2.0",
      event: "National-Level Hackathon · GSOC Innovators Club, VIT Bhopal",
      detail: "Finalist with GridGuard AI: real-time smart-grid telemetry dashboard with XGBoost anomaly detection and SHAP explainability.",
      fileUrl: "/certificates/summer of codefest.pdf",
      badge: "Finalist"
    },
    {
      title: "Selected Open-Source Contributor",
      event: "GirlScript Summer of Code (GSSoC 2026)",
      detail: "Selected as contributor by GS Labs to build open-source web and data tooling.",
      fileUrl: "/certificates/gssooc contributor.png",
      badge: "Selected Contributor"
    },
    {
      title: "Participant — AI-ZEN Hackathon",
      event: "Google Crowdsource & VIT Bhopal",
      detail: "Participated in the Adversarial Nibbler Hackathon evaluating generative model safety and edge-case alignment.",
      fileUrl: "/certificates/ai zen hackathon.png",
      badge: "Hackathon"
    }
  ],

  leetcode: {
    username: "anshere19",
    profileUrl: "https://leetcode.com/u/anshere19/",
    solvedTotal: 120,
    easyCount: 65,
    mediumCount: 50,
    hardCount: 5,
    topTopics: [
      "Arrays & Hashing",
      "Two Pointers & Sliding Window",
      "Binary Search & Sorting",
      "Trees & Recursion",
      "Graphs & BFS/DFS"
    ],
    note: "Consistent algorithmic practice in modern C++ focusing on optimal time/space complexity."
  }
};
