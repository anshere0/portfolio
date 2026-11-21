# Start here

You are rebuilding your portfolio in Antigravity. This pack gives the agent everything it needs so you do not have to explain the design again in every prompt.

## What is in the pack
| File | What it is | When the agent reads it |
|---|---|---|
| `AGENTS.md` | Standing rules (stack, banned patterns, budgets) | Every task |
| `docs/01_AUDIT.md` | What is wrong with the current site and where the originality line is | Phase 0 |
| `docs/02_DESIGN_BRIEF.md` | Concept, page structure, wireframes | Phase 0 to 1 |
| `docs/03_DESIGN_SYSTEM.md` | Colors, type, spacing, components, CSS tokens | Phase 1 |
| `docs/04_MOTION_SPEC.md` | The five signature animations and how to build them | Phases 2 to 5 |
| `docs/05_SIGNATURE_FEATURES.md` | The unique features, with acceptance criteria | Phases 2 to 6 |
| `docs/06_CONTENT.md` | Rewritten copy, TODO resolutions, content schema | Phase 1 and 6 |
| `docs/07_TECH_AND_PERF.md` | Stack, budgets, SEO, a11y, env vars | Phase 1 and 7 |
| `docs/08_ANTIGRAVITY_PROMPTS.md` | Copy-paste prompts, phase by phase | You, in order |
| `docs/09_QA_CHECKLIST.md` | Pre-launch checklist | Phase 7 |
| `docs/10_IDEAS_BACKLOG.md` | Extra ideas ranked by impact and effort | Later |

## Setup (10 minutes)
1. Make a new git branch, or a new repo, called `portfolio-v3`. Move the current site into a `legacy/` folder. Do not delete it.
2. Copy `AGENTS.md` to the repo root and the `docs/` folder next to it.
3. Open the project in Antigravity. In Agent Manager, use **Planning** mode for phases 0 to 4. Pick the strongest model your plan offers.
4. Open `docs/08_ANTIGRAVITY_PROMPTS.md` and paste Phase 0. Review the plan artifact before saying go.
5. Work phase by phase. Do not paste two phases at once. After each phase, run the app, click through it yourself, and only then continue.

## Before you start: fill these in (the agent cannot guess them)
- Decide the fate of the FlyRank AI and Kraaft entries (see `docs/06_CONTENT.md`, "Decisions only you can make").
- For each metric on the site (<60ms retrieval, 78% token reduction, <120ms telemetry, etc.), write down where it was measured. If you cannot, it gets cut. This is the whole point of the "Receipts" feature.
- Find 3 small real things for the "Writing" section (a note per project is enough).
- Get your best 1 or 2 screenshots/recordings per project.

## The three findings that shaped this pack (details in 01_AUDIT)
1. Your live site currently shows internal TODO text to visitors (for example "TODO: Confirm dates" and "TODO: Verification Pending" inside the experience section).
2. Several of your headline features (a terminal OS with neofetch and snake, a 3D commit skyline, a WebGL particle field) are the same concepts as the portfolio you are inspired by. A recruiter who opens both will see it. The pack replaces each with something tied to your own projects.
3. Your palette and type (warm paper #F4F1EA, serif display, mono labels, numbered "01 /" markers) is the most common look of AI-generated sites right now. That is a big part of why it feels generic to you. The new direction is a cyanotype blueprint.
