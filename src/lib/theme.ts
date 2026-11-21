/**
 * Theme management for Obsidian Dark (default with neon accents) and Midnight Slate (alternate)
 */

export type Theme = "obsidian" | "midnight";

export const DEFAULT_THEME: Theme = "obsidian";
export const THEME_STORAGE_KEY = "ansh_portfolio_theme";

/**
 * Inline pre-paint script executed synchronously in <head> before DOM paint
 * Prevents flash of unstyled/incorrect theme. Forces dark mode.
 */
export const PRE_PAINT_THEME_SCRIPT = `
(function() {
  try {
    var stored = localStorage.getItem("${THEME_STORAGE_KEY}");
    var theme = stored === "midnight" ? "midnight" : "obsidian";
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.add("dark");
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "obsidian");
    document.documentElement.classList.add("dark");
  }
})();
`;

