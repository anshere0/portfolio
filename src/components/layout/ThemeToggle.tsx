"use client";

import React, { useEffect, useState } from "react";
import { THEME_STORAGE_KEY, Theme } from "@/lib/theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("obsidian");

  useEffect(() => {
    try {
      const activeTheme =
        (document.documentElement.getAttribute("data-theme") as Theme) ||
        "obsidian";
      setTheme(activeTheme === "midnight" ? "midnight" : "obsidian");
    } catch {
      // SSR fallback
    }
  }, []);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme: Theme = theme === "obsidian" ? "midnight" : "obsidian";

    const applyTheme = () => {
      setTheme(nextTheme);
      document.documentElement.setAttribute("data-theme", nextTheme);
      document.documentElement.classList.add("dark");
      try {
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      } catch {
        // LocalStorage blocked
      }
    };

    const isReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Fall back to instant switch if View Transitions API is unsupported or reduced motion is enabled
    if (
      typeof document === "undefined" ||
      !("startViewTransition" in document) ||
      isReducedMotion
    ) {
      applyTheme();
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = (document as unknown as {
      startViewTransition: (callback: () => void) => { ready: Promise<void> };
    }).startViewTransition(() => {
      applyTheme();
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 400,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 px-3 py-1 rounded-[999px] hairline bg-[var(--bg-sunken)]/60 text-xs font-body text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer select-none"
      title={`Switch to ${theme === "obsidian" ? "Midnight" : "Obsidian"} theme`}
      aria-label={`Toggle theme, currently ${theme}`}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          theme === "obsidian" ? "bg-[var(--accent)]" : "bg-[var(--signal)]"
        }`}
      />
      <span className="capitalize">{theme === "obsidian" ? "Obsidian" : "Midnight"}</span>
    </button>
  );
}
