# 08 — Antigravity prompts (paste in order, one phase at a time)

How to use: open Agent Manager, start a new task in **Planning** mode, paste the prompt. Read the plan artifact and edit it before approving. When the agent finishes, you test it yourself, then continue. If something is wrong, paste the matching "fix" prompt at the end.

---
## Phase 0 — Audit and plan (no code)
```
Read AGENTS.md and every file in /docs, in numeric order. Then inspect the existing site in /legacy.

Do NOT write application code yet. Produce a plan artifact containing:
1. A list of everything in /legacy that will be reused (content, assets, certificates) and everything that will be dropped, matching docs/01_AUDIT.md.
2. The folder structure from AGENTS.md, with every file you intend to create in Phases 1 to 7.
3. Any conflict or ambiguity you found between the docs, listed as questions for me.
4. A risk list (performance, accessibility, API cost) and how you will handle each.
Wait for my approval.
```
Done when: you've answered its questions and approved the plan.

---
## Phase 1 — Foundation
```
Implement Phase 1 from the approved plan.
- Scaffold the Next.js + TypeScript + Tailwind app in the repo root (legacy stays in /legacy).
- Implement design tokens from docs/03_DESIGN_SYSTEM.md as CSS variables with both themes (blueprint default, night alternate), wire them into Tailwind, set up next/font (Bricolage Grotesque, Geist Sans, Geist Mono).
- Build Header (with ThemeToggle, instant switch for now), Footer, Button, Panel, Tag, Metric, Drawer.
- Create content/types.ts, and content files (site.ts, projects.ts, metrics.ts, experience.ts) using the copy in docs/06_CONTENT.md. Leave any [YOU] item as a clearly marked placeholder in a separate file content/_todo.md, NOT in rendered strings.
- Create scripts/check-content.mjs as specified in docs/06_CONTENT.md, and a script that verifies WCAG AA contrast for every text/background token pair in both themes.
- Set up an inline pre-paint theme script to prevent flash.
- Build a /styleguide route that shows every token and component in both themes.
Run lint, build, content check and contrast check. Use the browser agent to screenshot /styleguide at 375, 768 and 1440 in both themes. Report results.
```
Done when: styleguide looks right in both themes and the checks pass.

---
## Phase 2 — Hero query field
```
Implement feature F1 and motion moment 1 exactly as specified in docs/05_SIGNATURE_FEATURES.md and docs/04_MOTION_SPEC.md.
- Canvas 2D, no WebGL, no new heavy dependencies.
- Create content/field.ts with ~70 nodes (my 7 projects, ~25 tools, ~25 concepts) in 5 clusters, with deterministic seeded positions.
- Hero text is real DOM and renders before the canvas starts. Add the visually-hidden list of project links for keyboard users.
- Implement settle animation, spring-smoothed cursor query, top-5 connections, idle wander, touch behaviour, reduced-motion fallback, IntersectionObserver pause.
- Label the proximity indicator "proximity (illustrative)".
Measure frame time with 4x CPU throttle in the browser agent and report the numbers. Screenshot at 375/768/1440, both themes.
```
Done when: it feels alive, text stays readable over the field, and frame cost is within budget.

---
## Phase 3 — Work block: pipeline rails and demos
```
Implement the Work block, feature F3 and motion moment 2.
- PipelineRail component with sticky rail, SVG line, packet and per-stage latency labels (only where the data has ms).
- Four featured project panels (RAGForge, CI/CD pipeline, GridGuard AI, RCA Copilot) with: tagline, summary, Metric with receipt link, "What I'd change next" text from content, links.
- RunIt demos per docs/05 (all client-side, bundled data, honest tags). Start with RAGForge and GridGuard; make CI/CD and RCA simpler if needed. Create bundled sample data under content/demos/.
- Compact list for LikhAI, StackSensei, AirPredict NYC.
- /projects/[slug] pages: for now, a clean case-study layout with the blueprint grid background and Callout components. Lazy-load React Flow only on the GridGuard page.
- Mobile: horizontal stepper, no pinning.
- Receipts drawer reading from metrics.ts.
Verify keyboard operation of every demo and the reduced-motion path. Screenshot all breakpoints, both themes.
```

---
## Phase 4 — Ask Ansh
```
Implement feature F2 and motion moment 4.
- scripts/build-knowledge.mjs to chunk content and write content/knowledge.json with embeddings (use the current Gemini embedding model; check docs and tell me which one you chose).
- /api/ask streaming route: embed query, cosine top-4, strict system prompt from docs/05, SSE events 'sources' then 'delta'. Rate limit, length cap, short cache.
- Client UI with suggested questions, source chips with scores, streamed answer with citations, "How this works" disclosure.
- No-key fallback using client-side keyword search over the same chunks.
- Add Cmd/Ctrl+K to focus the Ask box from anywhere.
Test with the 10 questions and 3 refusal cases in docs/09_QA_CHECKLIST.md and paste the results table in your report. Show me the system prompt you used.
```

---
## Phase 5 — Load curve, Spans, Evidence
```
Implement F4 (Load curve), F5 (Spans view), F6 (Receipts wiring everywhere) and F7 (interactive evidence matrix), plus motion moment 3.
- GitHub data via GraphQL at build/ISR time with a committed JSON snapshot fallback.
- z-score anomaly flags with the threshold slider; accessible text summary and a data table behind "Show data".
- Spans waterfall from content/experience.ts, with the mobile vertical fallback. Education appears once, here.
- Matrix: hover/focus highlighting, no empty rows, domain grouping toggle.
- Certificates and honours in a single drawer.
Report any content you could not render because it still had a [YOU] placeholder.
```

---
## Phase 6 — Writing, Contact, SEO, resume
```
Implement the Writing section (MDX, 3 notes; use my draft notes if I've added them to content/writing, otherwise create the files with clearly named empty drafts that are excluded from the build), the Contact section with a working /api/contact (zod, honeypot, rate limit, Resend), SEO (metadata, JSON-LD, sitemap, robots, dynamic OG images per project), the /resume print route (F10), and the vitals badge (F9).
Make the real canonical URL a single constant in lib/site.ts.
```

---
## Phase 7 — Theme wipe, polish, QA
```
1. Implement motion moment 5 (View Transitions blueprint wipe with fallback).
2. Run through docs/09_QA_CHECKLIST.md item by item and report pass/fail with evidence (screenshots, Lighthouse numbers).
3. Do a design critique against the banned-pattern list in AGENTS.md using screenshots of every section in both themes. List what you see that violates it, fix it, then remove one more decorative element.
4. Fix everything that fails. Re-run lint, build, content check, contrast check.
```

---
## Phase 8 — Ship
```
Prepare for deployment: .env.example, README with setup and the architecture of Ask Ansh, a short 'Colophon' page, and a pre-deploy command list. Do not deploy; give me the exact steps for Vercel including env vars and the rate-limit setup.
```

---
## Fix prompts (use when needed)
**It looks generic**
```
Screenshot every section in both themes. Compare against the banned patterns in AGENTS.md and the concept in docs/02. List every place it looks like a default template. Fix them. Then remove one element that doesn't carry information.
```
**Animations are janky**
```
Profile with 4x CPU throttle. For each of the five signature moments report ms/frame and any layout thrash. Fix the worst offender first. If Lenis is involved, test with it off and tell me if it's better.
```
**Hero text is hard to read over the field**
```
Reserve a calm zone behind the hero text: reduce node density and opacity within the text bounding box, and verify AA contrast of the text against the busiest frame.
```
**Ask Ansh is hallucinating**
```
Show me three failing cases with the retrieved chunks. Tighten the system prompt and add a minimum-similarity threshold below which the answer must be the 'not in my notebook' reply. Re-run the test table.
```
**Too much copy**
```
Cut every paragraph in the Work and Ask blocks by 30% without losing a number or a link. Replace any sentence that sells with a sentence that states.
```
