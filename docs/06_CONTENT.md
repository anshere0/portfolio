# 06 — Content: rewritten copy, decisions, schema

All facts below come from your current site. Items in **[YOU]** need your input; the build must not ship until none remain.

## Decisions only you can make (from the TODOs currently live)
| Item | Problem | Recommendation |
|---|---|---|
| FlyRank AI, ML Engineering Intern | "TODO: Verification pending", dates unclear, bullets are generic | If it's real and you have a letter: write 2 to 3 specific bullets and exact dates. If not: remove from the site. A vague line hurts more than no line. **[YOU]** |
| Kraaft Entertainment, Writer | "TODO: Confirm retention" | Move it out of Experience. If the writing is technical, link 1 to 2 pieces under Writing. Otherwise remove. **[YOU]** |
| Navodita Infotech, AI Intern (May–Jun 2025) | Fine, bullets generic | Add one concrete outcome (dataset size, model, metric). **[YOU]** |
| Webyou Technologies, Web Developer Intern (May–Jul 2026) | Good; has a named reference | Keep the quote. Add one shipped thing (a page/site link) if allowed. **[YOU]** |
| "07+ systems built" | Only 7 listed including archived ones | Say "7 projects" only if all 7 are linkable. Otherwise drop. |
| Metrics (<60ms, 78% token reduction, <120ms, <30s, "100% Docker") | No method shown | For each, fill `metrics.ts` with method + proof. Cut any you can't back. **[YOU]** |
| GridGuard "Actively building" vs "Finalist" | Fine | Keep both: "Finalist, Summer of Code Fest 2.0; still building." |

## Hero copy
- Name (H1): **Ansh Arora**
- Line: **I build retrieval, telemetry and developer-tooling systems, and I publish the measurements.**
- Sub (one sentence, small): Third-year CSE (AI/ML) student at VIT Bhopal, open to software engineering and applied ML internships and roles.
- Primary button: **See the systems**. Secondary: **Ask my portfolio a question**.
- Field hint (small, appears after 2s): *Move your cursor. You're the search query.* (mobile: *Drag to search.*)

## Work block intro
"Four systems I built end to end. Each has a runnable demo and the numbers I measured, with where they came from."

### Project cards (rewrite; keep technical facts, remove hype)
**RAGForge** — Multi-tenant document Q&A with cited answers.
Parses PDF, DOCX and TXT, splits text into ~500-word windows, embeds them (768-dim Gemini embeddings), retrieves with pgvector cosine search and writes answers that cite their source passages. Answers in English, Hindi and Tamil.
Measured: retrieval <60 ms **[YOU: dataset size, hardware, how timed]**.
What I'd change next: **[YOU]**
Stack: Next.js, TypeScript, Supabase, pgvector, Gemini API, Tailwind, Vercel.

**CI/CD AI pipeline** — A CI failure comes in, a verified patch goes out.
A webhook ingests failing CI logs, extracts the relevant trace, asks Gemini for a fix, runs the patch in an isolated Docker sandbox, and opens a pull request only if the tests pass.
Measured: 78% fewer tokens sent per failure **[YOU: relative to what baseline?]**.
What broke: **[YOU]**
Stack: GitHub Actions, Express, Gemini API, Docker, PostgreSQL, Next.js.

**GridGuard AI** — Smart-meter telemetry with explainable anomaly flags.
Streams meter readings over WebSockets into an XGBoost anomaly model, explains each flag with SHAP, and shows the network on a React Flow map. Finalist at Summer of Code Fest 2.0 (GSOC Innovators Club, VIT Bhopal).
Measured: telemetry latency <120 ms **[YOU: hop-to-hop or end-to-end?]**.
Status: still building. What's next: **[YOU]**
Stack: Next.js, FastAPI, PostgreSQL, WebSockets, XGBoost, SHAP, React Flow, Docker.

**RCA Copilot** — Raw incident logs to a structured root-cause document.
Four stages: pattern detection, timeline reconstruction, blast-radius assessment, evidence scoring. Live at rca-ai.vercel.app.
Measured: investigation in <30 s **[YOU: on what size of log?]**.
Stack: Next.js, Express, PostgreSQL, Prisma, OpenAI API, TypeScript.

### More work (compact rows, no demos)
- **LikhAI** — Handwriting synthesis that outputs vector strokes (SVG/PDF) instead of font approximations. PyTorch, OpenCV, FastAPI. In progress.
- **StackSensei** — Scans a GitHub repo and maps its dependencies, layers and API routes, with a chat assistant for onboarding. React, Node, Supabase, Gemini.
- **AirPredict NYC** — Airbnb price prediction with an ensemble model and SHAP explanations. Python, scikit-learn, XGBoost, Streamlit.

## Ask Ansh block
Heading: **Ask this portfolio anything.**
Body: "This box searches my projects, experience and notes, then answers from what it finds and shows its sources. It's the same retrieval approach as RAGForge."
Suggested questions: "What did you build with pgvector?" · "How did you sandbox AI-generated patches?" · "What was your role in GridGuard?" · "What are you looking for next?"
Empty-source reply: "That isn't in my notebook. You can email me at ansharora19102006@gmail.com."

## Load curve block
Heading: **My commits, read like a smart meter.**
Body: "Daily GitHub activity for the last 12 months. Days that spike above the threshold are flagged, the same way GridGuard flags odd meter readings. Drag the slider to change what counts as unusual."
Footnote: Data from GitHub's contribution calendar for @anshere0.

## Spans block
Heading: **Where I've worked and built, on one timeline.**
Body: "Roles are the long bars; projects and hackathons sit inside them by date. Click a bar for details."

## Evidence block
Heading: **Where each technology was actually used.**
Body: "A tick means I used it in that project. Hover a technology to see where."
Practice sub-block (small): "Practice: 120+ LeetCode problems in C++, mostly arrays, hashing, two pointers, binary search and graph traversal."

## Writing block (do at least 3 real notes; suggested topics from your work)
1. "Why I chunk at ~500 words (and what I measured when I tried other sizes)" **[YOU: only if you actually tested]**
2. "Running AI-written patches in a Docker sandbox: what can go wrong"
3. "Explaining one anomaly: SHAP on a streaming meter"
4. "What I learned shipping RCA Copilot"
Each note: 400 to 800 words, one diagram, one honest mistake.

## Contact block
Heading: **Want to work together?**
Body: "I'm looking for software engineering and applied ML internships and roles. I usually reply within a day or two." (Drop "24 business hours / SLA" unless you can promise it.)
Form: Name, Email, "What's this about?" (select: Role or internship / Collaboration / Question), Message. Button: **Send message**. Success: "Sent. I'll reply to {email}." Error: "That didn't send. Check your connection and try again, or email me directly."
Also: email (with Copy button), GitHub, LinkedIn, LeetCode, Résumé (PDF).

## Footer
"© 2026 Ansh Arora. Built with Next.js, GSAP and Canvas. Source on GitHub." One line. No build stamp, no "protected metrics".

## Education (in Spans, once)
B.Tech CSE (AI/ML), Vellore Institute of Technology, Bhopal, 2024 to 2028. CGPA 7.51/10 shown here only. Coursework line (optional): DSA, OOP, DBMS, OS, ML, Theory of Computation, Compiler Design, Networks.

## Credentials drawer (one button, "Certificates and honours")
Hackathon: Finalist, Summer of Code Fest 2.0 · GSSoC 2026 selected contributor · AI-ZEN hackathon participant. Certificates: ServiceNow (Jun 2026), VITyarthi Java (Jul 2026), NPTEL Generative AI (2025), Cisco Python Essentials (2025), Johns Hopkins HTML/CSS/JS (2024). Each links to the file you already host.

## Content schema (TypeScript, put in `content/types.ts`)
```ts
export type Metric = { id: string; value: string; label: string; method: string; date: string; source: string /* url | 'self-reported' */ };
export type Project = { slug: string; name: string; tagline: string; status: 'live'|'building'|'done'; summary: string; stages: { name: string; ms?: number }[]; metricIds: string[]; whatBroke?: string; nextStep?: string; stack: string[]; links: { live?: string; source?: string }; demo?: 'ragforge'|'cicd'|'gridguard'|'rca' };
export type Role = { id: string; title: string; org: string; start: string; end?: string; kind: 'work'|'project'|'hackathon'|'education'; parent?: string; bullets: string[]; links?: string[] };
```
`scripts/check-content.mjs` must fail if: any string matches /TODO|CONFIRM|lorem|FIXME|\[YOU/, any `metricIds` entry is missing in metrics.ts, or any metric has an empty `method`.
