/**
 * Theme management for Blueprint (Cyanotype default) and Night Shift (alternate)
 * Aligned with docs/03_DESIGN_SYSTEM.md and docs/04_MOTION_SPEC.md
 */

export type Theme = "blueprint" | "night";

export const DEFAULT_THEME: Theme = "blueprint";
export const THEME_STORAGE_KEY = "ansh_portfolio_theme";

/**
 * Inline pre-paint script executed synchronously in <head> before DOM paint
 * Prevents flash of unstyled/incorrect theme
 */
export const PRE_PAINT_THEME_SCRIPT = `
(function() {
  try {
    var stored = localStorage.getItem("${THEME_STORAGE_KEY}");
    var theme = stored === "night" ? "night" : "${DEFAULT_THEME}";
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "night");
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "${DEFAULT_THEME}");
  }
})();
`;
