# 07 — Tech, performance, accessibility, SEO

## Stack
- Next.js App Router, TypeScript (strict), Tailwind (tokens mapped to the CSS variables in 03).
- GSAP + ScrollTrigger (+ MotionPathPlugin if needed). Lenis optional.
- Canvas 2D for the hero field and the load curve if SVG is too heavy.
- `motion` (framer-motion) only for Drawer/Toast/Panel state transitions, lazy-loaded.
- `@xyflow/react` (React Flow) only on `/projects/gridguard-ai` (dynamic import).
- `web-vitals` for the optional badge. `lucide-react` for icons (import individual icons).
- MDX for writing (`@next/mdx` or `next-mdx-remote`), `shiki` for code highlighting at build time.
- Pin dependency versions; check each library's current docs and licence before use (Aceternity/Magic UI components are copy-in and licence-specific).
- **Remove from the old site:** Three.js/WebGL, audio, the 3D skyline, the terminal.

## Performance budgets (targets; verify with Lighthouse and the vitals badge)
| Metric | Target |
|---|---|
| LCP (mobile, throttled 4G) | < 2.0 s |
| CLS | < 0.05 |
| INP | < 150 ms |
| Initial JS (gzip) | < 180 KB on `/` |
| Hero canvas frame cost | ≤ 2 ms on mid-range Android |
| Images | AVIF/WebP via `next/image`, explicit width/height, lazy below fold |
| Fonts | `next/font`, Latin subset, max 3 families, variable fonts |

Tactics: server components by default; client components only for interactive features; dynamic-import `AskAnsh`, `RunIt` demos, `LoadCurve`, `Spans` with `ssr:false` where they need the browser; start the hero canvas after first paint (`requestIdleCallback` fallback `setTimeout`); no layout shift from fonts (use `size-adjust` via next/font).

## Accessibility
- WCAG AA contrast, tested for both themes with a script.
- All interactive things reachable and operable by keyboard; skip link to `#main`.
- Hero H1 and sentence are real text. The canvas is `aria-hidden`; a visually-hidden list of project links duplicates the nodes.
- Every animation has a reduced-motion path (04). Test with OS setting on.
- Charts have a text summary and a data table behind a "Show data" button.
- Forms: real `<label>`, `aria-describedby` for errors, honeypot hidden with `aria-hidden` and `tabindex=-1`.
- `aria-live="polite"` on Ask Ansh answer; focus returns to the input after submit.

## SEO and sharing
- Fix `canonical` and `og:url` to your real domain once decided (they currently point at ansharora.dev while served from a vercel.app URL; make them match).
- Metadata API per page; dynamic OG image per project (`opengraph-image.tsx`) showing the project name and one metric.
- JSON-LD `Person` (name, url, sameAs: GitHub, LinkedIn, alumniOf).
- `sitemap.ts`, `robots.ts`. Meaningful `<title>` per page.
- Keep phone number off the public page unless you want recruiter calls and spam; email form is enough. **[YOU]**

## Environment variables
```
GEMINI_API_KEY=            # server only
GITHUB_TOKEN=              # read-only, for contributions
CONTACT_TO_EMAIL=
RESEND_API_KEY=            # or any email provider
TURNSTILE_SECRET_KEY=      # optional bot protection
NEXT_PUBLIC_SITE_URL=
```
Never prefix secrets with `NEXT_PUBLIC_`. Add `.env.example` to the repo.

## Contact form backend
`/api/contact`: validate with zod, honeypot check, rate limit, send via Resend (or similar), return JSON `{ok:true}`; never reveal provider errors to the client. Store nothing else.

## Analytics
Vercel Analytics or Plausible (cookie-free). No cookie banner needed if you avoid cookies.

## Deployment
Vercel. Preview deployment per branch. Add the domain, set env vars, verify `/api/ask` rate limiting in production, run Lighthouse on the production URL.
