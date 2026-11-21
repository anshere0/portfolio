console.log("=== WCAG AA CONTRAST AUDIT (docs/03_DESIGN_SYSTEM.md) ===");

// Hex to sRGB helper
function hexToRgb(hex) {
  let c = hex.replace("#", "");
  if (c.length === 3) c = c.split("").map(x => x + x).join("");
  const num = parseInt(c, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

// Relative luminance (sRGB -> Linear luminance)
function getLuminance({ r, g, b }) {
  const [rs, gs, bs] = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Contrast ratio
function getContrast(hex1, hex2) {
  const lum1 = getLuminance(hexToRgb(hex1));
  const lum2 = getLuminance(hexToRgb(hex2));
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

const THEMES = {
  blueprint: {
    bg: "#0D2F6B",
    bgRaised: "#123B80",
    bgSunken: "#0A2556",
    text: "#F3F6FF",
    textMuted: "#A9BEE8",
    accent: "#FFD84D",
    accentInk: "#1A1400",
    signal: "#7FE3FF",
  },
  night: {
    bg: "#0F161D",
    bgRaised: "#17212B",
    bgSunken: "#0B1116",
    text: "#E9E4DA",
    textMuted: "#9AA6B2",
    accent: "#FFB547",
    accentInk: "#1C1100",
    signal: "#6FD6C4",
  }
};

let failures = 0;

function testPair(themeName, name, fg, bg, minRatio) {
  const ratio = getContrast(fg, bg);
  const passed = ratio >= minRatio;
  const status = passed ? "✓ PASS" : "✕ FAIL";
  console.log(`  [${themeName.toUpperCase()}] ${status}: ${name} (${fg} on ${bg}) => ${ratio.toFixed(2)}:1 (min ${minRatio}:1)`);
  if (!passed) failures++;
}

for (const [themeName, tokens] of Object.entries(THEMES)) {
  console.log(`\nEvaluating ${themeName.toUpperCase()} Theme Contrast:`);
  // Body text on background (WCAG AA normal text: 4.5:1)
  testPair(themeName, "--text on --bg", tokens.text, tokens.bg, 4.5);
  testPair(themeName, "--text on --bg-raised", tokens.text, tokens.bgRaised, 4.5);
  // Muted text on background (WCAG AA normal text: 4.5:1)
  testPair(themeName, "--text-muted on --bg", tokens.textMuted, tokens.bg, 4.5);
  testPair(themeName, "--text-muted on --bg-raised", tokens.textMuted, tokens.bgRaised, 4.5);
  // Accent text on accent button (WCAG AA normal text: 4.5:1)
  testPair(themeName, "--accent-ink on --accent", tokens.accentInk, tokens.accent, 4.5);
  // Data signal on sunken wells (min 3.0:1)
  testPair(themeName, "--signal on --bg-sunken", tokens.signal, tokens.bgSunken, 3.0);
}

if (failures > 0) {
  console.error(`\nFAILED: ${failures} token pair(s) failed WCAG AA contrast floor.`);
  process.exit(1);
} else {
  console.log("\n✓ All theme token pairs satisfy WCAG AA contrast criteria.");
  process.exit(0);
}
