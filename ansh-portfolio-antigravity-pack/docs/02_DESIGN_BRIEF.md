# 02 — Design brief: "The working drawing"

## One-line concept
An engineer's blueprint that actually runs. Every section is a drawing of a real system you built, and each drawing has something live in it.

## Audience and job
Audience: engineering recruiters, hiring managers, and senior engineers skimming for 60 seconds to 3 minutes. Primary job: make them believe you can build and measure real systems, then email you. Secondary: be memorable enough that they mention it.

## Where the boldness goes (and only there)
1. **Hero query field**: the memorable moment.
2. **Ask Ansh**: the second memorable thing, and a working proof of your RAG skills.
Everything else is calm, precise, and quiet so those two land.

## Identity
- Cyanotype blueprint (default) and "Night shift" graphite (alternate), toggle in the header.
- Fine drawing-line aesthetic: hairlines, dimension arrows, callout leaders, a faint grid used only in the hero and project pages.
- Voice: plain, first person, specific. State what the system does and what you measured. No hype words.
- No numbering unless it's truly a sequence (the pipeline stages are; section headers are not).

## Information architecture (8 blocks, down from 12)
```
Header        name · Work · Ask · Writing · Contact · theme toggle · Résumé
1 Hero        query field + name + one sentence + two actions
2 Work        4 featured systems as pipeline rails + runnable demos; compact list of 3 more
3 Ask Ansh    retrieval Q&A with visible sources
4 Load curve  GitHub activity as a smart-meter profile (small, one screen)
5 Spans       experience + projects as a trace waterfall; education here once
6 Evidence    interactive tech x project matrix + practice (LeetCode) + credentials drawer
7 Writing     3 notes (real ones)
8 Contact     working form, direct email, links
Footer        one line, colophon with what it's built with
```

## Wireframes
### Hero (desktop)
```
┌──────────────────────────────────────────────────────────────────────┐
│ Ansh Arora          Work  Ask  Writing  Contact      [◐ theme] Résumé │
│                                                                      │
│     ·  ·      ·   chunking          ·                                │
│   RAGForge ·──── pgvector ·     ·                                    │
│      ·    ╲      ·       latency budgets   · GridGuard               │
│  ·         ● (your cursor = the query)  ·────· SHAP                  │
│     Docker sandbox ·      ·       ·   XGBoost                        │
│                                                                      │
│  Ansh Arora                                                          │
│  I build retrieval, telemetry and developer tooling,                 │
│  and I publish the measurements.                                     │
│  [See the systems]   [Ask my portfolio a question]                   │
└──────────────────────────────────────────────────────────────────────┘
```
Left-aligned text, bottom-left of the viewport. The field fills the whole hero behind it. Text sits on a calm area (the layout reserves it).

### Work block, one case study
```
┌─────────────────────────────────────────────────────────────────┐
│ RAGForge                                    Live · Source        │
│ Multi-tenant document Q&A with cited answers                     │
│ ┌──────────┐   ┌──────────────────────────────────────────────┐ │
│ │ pipeline │   │  RUN IT (recorded run / sample doc)           │ │
│ │  rail    │   │  [Ask: "What is the refund policy?"] ▸        │ │
│ │ ●─ ingest│   │  chunks → top-k with scores → cited answer   │ │
│ │ │─ window│   └──────────────────────────────────────────────┘ │
│ │ │─ embed │   What I measured     <60 ms retrieval  [receipt]    │
│ │ │─ search│   What broke / what I'd change next                  │
│ │ ●─ answer│                                                      │
│ └──────────┘                                                      │
└─────────────────────────────────────────────────────────────────┘
```
Rail is sticky on the left while the right column scrolls. Packet animation moves down the rail (see motion spec).

## Layout rules
- 12-column grid, max content width 1200px, text blocks max 68ch.
- Left aligned everywhere. Centre-alignment only for the footer line.
- Generous vertical rhythm: 120 to 160px between blocks on desktop, 80 to 96px on mobile.
- Panels use two radii on purpose: 4px for data (tables, charts, code) and 16px for containers (demo panels). Not one radius for all.
- Depth by line weight and background tint, not shadows.

## Content principles
Each block answers one question a recruiter has: What have you built? (Work). Can I test how you think? (Ask). Do you ship consistently? (Load curve). Where have you worked? (Spans). Can I trust the claims? (Evidence + receipts). Can you explain things? (Writing). How do I reach you? (Contact).

## Things deliberately not included
Terminal/OS shell, snake/games, 3D skyline, WebGL particles, audio, "systems status" bars, certificates carousel, hackathon list as its own section (becomes lines in Spans), CGPA in the header.
