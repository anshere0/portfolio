# 01 — Audit of the current site and the originality line

Audited: portfolio-orcin-rho-92.vercel.app, compared with the two reference sites.

## A. Things that are actively hurting you (fix first)
| # | Finding | Fix |
|---|---|---|
| 1 | Placeholder text is live: "TODO: Confirm dates (Legacy listed Jul–Sep 2026 Incoming)", "TODO: Verification Pending", "TODO: Reconfirm role timeline…", "TODO: Confirm Retention", "TODO: Confirm whether to retain non-engineering role…" | Resolve each (see 06_CONTENT). Add the build check that fails on TODO. |
| 2 | Trust theatre: "PGP VERIFIED", a SHA-256 "identity repository" hash, "cryptographically verifiable", "Zero Ghost Commits", "ALL VERIFIED PRODUCTION METRICS PROTECTED", "100% PASSING" | Delete all. Replace with real receipts (link to proof). A recruiter who knows what PGP is will read these as bluff. |
| 3 | Stray form chrome visible: "Do not fill this field" (the honeypot label) | Hide the honeypot properly (`aria-hidden`, off-screen, no visible label). |
| 4 | CGPA 7.51 is repeated roughly six times, including the top status bar and the hero | Show once in Education. Lead with work, not marks. |
| 5 | Skills matrix has a C++ row with zero ticks, while the site claims "C++ mastery" | Either tie C++ to real projects or drop the row. Don't leave a visible contradiction. |
| 6 | LeetCode block: 120+ solved, 54% easy, 4% hard, titled "Mastery" | Keep it small, rename to "Practice", drop the word mastery. |
| 7 | Eight sections of credentials, certificates and matrices before contact | Collapse certificates into one drawer. Recruiters spend about a minute. |
| 8 | Heavy stack for a portfolio: WebGL particles + 3D skyline + GSAP + Lenis + audio | Remove WebGL/Three from home, drop audio, lazy-load everything else. |
| 9 | "Hackathon Finalist" and "07+ systems built" as headline stats | Keep the finalist line (it's real, linkable). Cut "07+" unless you can list seven. |

## B. Why it feels "made by AI"
- Background #F4F1EA + serif display (Newsreader) + near-black ink: the most common AI-site look right now.
- Every block has a tracked-out ALL-CAPS mono label ("SYSTEM STATUS", "PROOF OF ENGINEERING DEPTH & CREDENTIALS").
- Numbered markers (01 / 02 / 03 …) on content that is not a sequence.
- Section labels in the shape `WORD // fragment`.
- Copy that sells instead of saying ("zero fluff", "production-ready systems, verifiable telemetry").
- One border radius and one shadow on everything; same fade-up on every section.

## C. The line: inspiration vs copying
You said the animated reference "is sexy" and you want that feeling. Good. Here is what is fair game and what is not.

**Fair game (technique level):** scroll-driven storytelling where one story advances as you scroll; a signature interactive hero; pinned sections; scroll-velocity-reactive motion; case studies that feel like opening a real thing; real GitHub data visualised; a dark, cinematic mood; a fast command-palette feel. These are common techniques across the web and are available in open libraries (GSAP, Aceternity UI, Magic UI, etc. — check each licence).

**Not fair game (concept, copy, naming, assets):** an "OS" metaphor with a boot log, Finder windows and a shell; neofetch and games in a terminal; a commit "city skyline"; a particle cloud that morphs into your name; "Act I–XII" section framing; the same section order and headline patterns; identical microcopy ("Things I've built & shipped", "The human behind the commits", "Still here? Open a terminal"); a cricket/chess/"click me I spin" personal section.

Your current site already overlaps in concept in at least five places. Both of you are VIT Bhopal '28 using Next.js and FastAPI with similar one-liners, so overlap will be noticed by exactly the people you want to impress.

| Reference idea | Ansh version (built from your own work) |
|---|---|
| OS metaphor, boot log, Finder, shell | **Dropped.** Case studies become a *pipeline rail* with runnable mini-demos of your actual systems. |
| Terminal playground with games | **Replaced by "Ask Ansh"**: a real retrieval-augmented Q&A over this site (you built RAGForge, so the portfolio is a demo of it). |
| 28k particles that spell a name | **Query-field hero**: your cursor is the search query; your projects, tools and ideas are points in a semantic map that light up by proximity. |
| Commit skyline (city of towers) | **Load curve**: your GitHub activity drawn as a smart-meter load profile, with anomaly flags on spike days (GridGuard's language). |
| Journey line that fills while scrolling | **Spans view**: your timeline drawn as a distributed-trace waterfall (roles as spans, projects as child spans). |
| Playable personal section | **A margin note section** with one small interactive thing that is genuinely yours (see backlog). |
| Terminal "neofetch" | Cut. |
| Velocity marquee of tech | Optional and tiny; the real stack proof is the interactive evidence matrix. |

## D. What to keep from the current site
Your real content is strong: RAGForge, the CI/CD sandbox pipeline, GridGuard (finalist), RCA Copilot (live), the Webyou internship with a named reference, the evidence matrix idea, the "Architecture blueprint" project pages. The structure was fine. The packaging was the problem.
