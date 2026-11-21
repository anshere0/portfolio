# AGENTS.md — project rules for Antigravity (read before every task)

> Put this file at the repo root. If your Antigravity version uses `.agent/rules/` or `GEMINI.md`, copy it there too. The full spec lives in `/docs`. When this file and a doc disagree, this file wins.

## Project
Rebuild of Ansh Arora's portfolio (B.Tech CSE AI/ML, VIT Bhopal '28). Goal: a site that proves engineering depth by being *itself* a working system, not a template. Concept: **"The working drawing"**, a blueprint that executes. Read `docs/02_DESIGN_BRIEF.md` first.

## Stack
Next.js (App Router) + TypeScript + Tailwind. GSAP + ScrollTrigger for scroll choreography. Canvas 2D for the hero field (NO Three.js / WebGL on the home page). Motion (framer-motion) only for UI state transitions. Content lives in `/content` as typed data, never hard-coded in components.

## Hard rules
1. **Plan first.** For any task touching more than 2 files, produce a plan artifact and wait for approval before writing code.
2. **No fabricated claims.** Every number on the site must exist in `content/metrics.ts` with a `source` field (repo link, benchmark file, certificate, or "self-reported"). If a metric has no source, do not render it. Never write "verified", "cryptographic", "PGP", "SHA-256" or "zero fluff" anywhere.
3. **No placeholder text ships.** Strings containing `TODO`, `CONFIRM`, `lorem`, or `FIXME` must fail the build (see `scripts/check-content.mjs` in Phase 1).
4. **Label simulated things honestly.** Anything synthetic, recorded or illustrative gets a visible tag: `synthetic data`, `recorded run`, or `illustrative`.
5. **Originality.** Do not reproduce text, layout, naming, code or assets from any other portfolio. Inspiration is at technique level only (see `docs/01_AUDIT.md`, section "The line"). Never use the names: PranavOS, AnshOS, "Act I/II...", "Things I've built & shipped", commit skyline/city, particle-name-spelling.
6. **Performance budget** (see `docs/07_TECH_AND_PERF.md`): LCP < 2.0s on throttled mobile, CLS < 0.05, INP < 150ms, initial JS < 180 KB gzip. Check before declaring a phase done.
7. **Accessibility floor:** WCAG AA contrast, visible focus rings, full keyboard operation, `prefers-reduced-motion` respected on every animation, semantic HTML, hero text is real DOM text.

## Banned design patterns (these are the tells of a generated site)
- Warm cream background + serif headline + terracotta accent.
- Tracked-out ALL-CAPS eyebrow above every heading.
- `01 / 02 / 03` numbering on things that are not a real sequence.
- Labels shaped like `WORD // fragment` or `SYSTEM STATUS: OPERATIONAL`.
- Monospace for decorative small labels (mono is for real data and code only).
- Identical rounded cards with the same soft shadow everywhere.
- Fade-up-on-scroll on every section; hover-lift on every card.
- Gradient blobs, glow orbs, glassmorphism as decoration.
- Accenting one word in a headline.
- Arrows appended to every link ("Read more →").
Use sentence case for all UI text. Buttons say what they do ("Send message", "Open case study").

## Motion rules
Motion is rationed: exactly five signature moments (docs/04). Everything else is instant or a ≤200ms state change that answers a user action. One `requestAnimationFrame` loop per canvas, paused off-screen via IntersectionObserver. Cap devicePixelRatio at 2.

## Workflow per phase
1. Re-read the relevant doc. 2. Plan artifact. 3. Implement. 4. Run `pnpm lint && pnpm build && node scripts/check-content.mjs`. 5. Use the browser agent to screenshot at 375, 768, 1440 widths, in both themes, and with reduced motion on. 6. Critique your own screenshots against the banned list, remove one decorative element, then report what you changed.

## Folder layout
```
app/                 routes (page.tsx, projects/[slug], writing/[slug], api/ask, api/contact)
components/          ui/, sections/, features/ (QueryField, AskAnsh, PipelineRail, LoadCurve, Spans, Receipts, ThemeToggle, VitalsHud)
content/             site.ts, projects.ts, metrics.ts, experience.ts, writing/*.mdx, knowledge.json (generated)
lib/                 motion.ts, theme.ts, retrieval.ts, github.ts
scripts/             build-knowledge.mjs, check-content.mjs
docs/                this pack
legacy/              the old site, untouched, for reference only
```
