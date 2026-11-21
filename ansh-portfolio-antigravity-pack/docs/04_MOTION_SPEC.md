# 04 — Motion spec

Motion is rationed. There are exactly **five signature moments**. Everything else is instant or a ≤200ms response to a user action. Do not add scroll fade-ins to sections.

## Global setup
- Smooth scrolling: Lenis is optional. If used, `lerp: 0.1`, disabled when `prefers-reduced-motion` is set, and ScrollTrigger synced to it (`lenis.on('scroll', ScrollTrigger.update)`). If it causes any jank on a mid-range phone, remove it. Native scroll is fine.
- Easing tokens in `lib/motion.ts`: `out: [0.22, 1, 0.36, 1]`, `inOut: [0.65, 0, 0.35, 1]`. Durations: 120ms (state), 200ms (panel), 600ms (reveal), 1400ms (hero settle, once).
- Reduced motion: every moment below has a static fallback (listed per moment).
- Performance: one rAF loop per canvas; pause with IntersectionObserver when off-screen and on `visibilitychange`; cap DPR at 2; no layout-thrashing reads inside rAF; animate only `transform` and `opacity` for DOM.

## Moment 1 — Hero: the field settles, then listens
- **What:** ~70 labelled nodes (projects, tools, concepts) start scattered, then ease into semantic clusters over 1.4s (once per session). After that the cursor acts as the query. Nodes within a radius brighten; the top 5 nearest connect to the cursor with hairlines and show a proximity bar.
- **Build:** Canvas 2D. Node positions precomputed in `content/field.ts` (cluster centres + jitter, seeded RNG so it's deterministic). Proximity = `exp(-d²/2σ²)` with σ about 14% of the shorter viewport side. Cursor position smoothed with a critically damped spring so lines glide.
- **Idle:** if no pointer movement for 3s, the query wanders along a slow Lissajous path.
- **Mobile/touch:** query follows touch drag; otherwise auto-wander. Node count drops to ~40.
- **Reduced motion:** nodes render already settled, query stays at a default position, hover/touch still updates highlights without animation.
- **Honesty:** label the proximity bar "proximity (illustrative)". Do not call it cosine similarity.
- **Budget:** ≤ 2ms/frame on a mid Android; lazy-init after first paint; hero text is real DOM and visible before canvas starts.

## Moment 2 — Work: the packet travels the pipeline
- **What:** In each case study, a small dot (the "packet") travels down the sticky stage rail as you scroll through that project. Each stage lights up (fill + label brighten) when the packet reaches it. If a stage has a measured latency, it prints next to the stage as a mono number.
- **Build:** GSAP ScrollTrigger with `scrub: 0.6`, pin the rail container (`pin: true`, `anticipatePin: 1`), SVG path with `strokeDashoffset` for the line, packet moved with `MotionPathPlugin` or manual lerp along path length.
- **Reduced motion:** rail shows all stages lit, no packet, numbers visible.
- **Mobile:** rail becomes a horizontal stepper above the demo; no pinning; packet animates once when the card enters view.

## Moment 3 — Load curve: the trace draws, then the anomalies flag
- **What:** On entering view, the GitHub activity line draws left to right over 1.2s like an oscilloscope sweep; on completion, days above a threshold get a small flag (anomaly colour) with a tooltip listing the repo and commit count.
- **Build:** SVG path (or canvas) with dash-offset draw, then flags fade in (staggered 30ms). Tooltip on hover/focus. Threshold slider lets the visitor change what counts as an anomaly (it's a real z-score, computed client-side).
- **Reduced motion:** line fully drawn, flags visible.

## Moment 4 — Ask Ansh: sources first, then the answer streams
- **What:** After submitting a question, the retrieved source chips appear first (staggered 60ms) with their similarity scores, then the answer streams token by token with inline citation markers that highlight the matching chip on hover.
- **Build:** Server-sent stream from `/api/ask`. First event: `sources`. Then `delta` events. UI uses `aria-live="polite"` on the answer region.
- **Reduced motion:** sources and answer appear without staggering; streaming still allowed (it is content, not decoration).

## Moment 5 — Theme toggle: the blueprint wipe
- **What:** Switching theme wipes from the toggle position as an expanding circle (clip-path) so the page appears to be redrawn on a different sheet.
- **Build:** View Transitions API (`document.startViewTransition`) with `clip-path: circle()` animation from the click point; fall back to an instant switch where unsupported.
- **Reduced motion:** instant switch.

## Micro-interactions (the complete list, nothing else)
- Link underline thickens on hover (120ms).
- Buttons: translateY(1px) on press.
- Metric "receipt" link opens a drawer (200ms slide).
- Matrix: hovering a technology highlights the projects that use it and dims the rest (120ms).
- Copy email: button label changes to "Copied" for 1.5s.

## Anti-list
No parallax on text, no scroll-triggered fade-ups on every section, no tilt cards, no cursor trails, no custom cursor, no sound, no loaders that block content, no confetti.
