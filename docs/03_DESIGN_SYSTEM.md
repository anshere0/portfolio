# 03 — Design system

## Color tokens
Two themes share semantic names. Default: **blueprint**. Alternate: **night**.

```css
:root, [data-theme="blueprint"] {
  --bg:        #0D2F6B;   /* cyanotype deep */
  --bg-raised: #123B80;   /* panels */
  --bg-sunken: #0A2556;   /* wells, code */
  --line:      rgba(255,255,255,.14);   /* hairlines */
  --line-strong: rgba(255,255,255,.34);
  --grid:      rgba(255,255,255,.06);
  --text:      #F3F6FF;
  --text-muted:#A9BEE8;   /* AA on --bg */
  --accent:    #FFD84D;   /* marker yellow: links, active nodes, focus ring */
  --accent-ink:#1A1400;   /* text on accent */
  --signal:    #7FE3FF;   /* data lines, packets */
  --anomaly:   #FF7A8A;   /* alerts, anomaly flags */
}
[data-theme="night"] {
  --bg:        #0F161D;
  --bg-raised: #17212B;
  --bg-sunken: #0B1116;
  --line:      rgba(233,228,218,.14);
  --line-strong: rgba(233,228,218,.34);
  --grid:      rgba(233,228,218,.05);
  --text:      #E9E4DA;
  --text-muted:#9AA6B2;
  --accent:    #FFB547;   /* sodium amber */
  --accent-ink:#1C1100;
  --signal:    #6FD6C4;
  --anomaly:   #FF6B81;
}
```
Rules: accent is for interaction and one highlight per screen. Signal is only for data. Anomaly only for flags. No gradients. Verify AA contrast for every text/background pair with a script in Phase 1.

To flip the default theme later, change one constant: `DEFAULT_THEME` in `lib/theme.ts`.

## Typography
| Role | Family | Notes |
|---|---|---|
| Display | **Bricolage Grotesque** (variable) | Use the width axis (condensed on big headings), weight 600 to 800, tracking -0.02em, line-height 0.95 to 1.05 |
| Body | **Geist Sans** | 16 to 18px, line-height 1.6, max 68ch |
| Data | **Geist Mono** | Only for numbers in charts, code, logs, latency values. Never for decorative labels |

Load with `next/font`, subset Latin, `display: swap`. Type scale (rem): 0.8125, 1, 1.125, 1.375, 1.75, 2.5, 3.75, 6 (hero name clamp from 3.5rem to 9rem). Sentence case everywhere. No all-caps labels.

## Spacing and shape
4px base unit. Section gap: 8 to 10 units on desktop (128 to 160px). Panel padding: 24px (mobile) / 32px (desktop). Radii: 4px data, 16px containers, 999px only for the theme toggle. Borders: 1px `--line`. No box shadows, except a focus ring.

## Focus and states
Focus ring: 2px `--accent` outline with 3px offset, always visible. Hover: change colour or underline thickness only, no lift. Active: translateY(1px).

## Components to build
1. `Header` (sticky, transparent over hero, solid after 80px), `ThemeToggle`.
2. `Button` (primary: accent bg; secondary: 1px line; text button).
3. `Panel` (raised container, optional title in sentence case and a tag slot for `recorded run`, `synthetic data`, `illustrative`).
4. `Tag` (small, sentence case, outlined).
5. `Metric` (value in mono + label + "receipt" link that opens the Receipts drawer).
6. `PipelineRail` (vertical, stages, packet).
7. `RunIt` (container for the mini-demos).
8. `Callout` (leader-line annotation used on blueprint pages: a hairline with a dot and a short note).
9. `SpanRow` (for Spans view).
10. `MatrixCell`, `Drawer`, `Toast` (copy email).
11. `FormField` with real labels and inline errors that say what to fix.

## Background treatment
Hero and project pages show a faint 24px grid (`--grid`) with a 120px major grid. Everywhere else: flat `--bg`. Add a very subtle paper-noise only if it costs < 5 KB and no layout shift; otherwise skip.

## Iconography
Thin 1.5px stroke icons (Lucide). Dimension-arrow and callout-leader SVGs are custom and tiny.
