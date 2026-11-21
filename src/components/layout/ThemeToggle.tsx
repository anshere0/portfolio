"use client";

import React, { useEffect, useState } from "react";
import { THEME_STORAGE_KEY, Theme } from "@/lib/theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("blueprint");

  useEffect(() => {
    try {
      const activeTheme =
        (document.documentElement.getAttribute("data-theme") as Theme) ||
        "blueprint";
      setTheme(activeTheme);
    } catch {
      // SSR fallback
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "blueprint" ? "night" : "blueprint";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "night");
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // LocalStorage blocked
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 px-3 py-1 rounded-[999px] hairline bg-[var(--bg-sunken)]/60 text-xs font-body text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer select-none"
      title={`Switch to ${theme === "blueprint" ? "Night Shift" : "Blueprint"} theme`}
      aria-label={`Toggle theme, currently ${theme}`}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          theme === "blueprint" ? "bg-[var(--accent)]" : "bg-[var(--signal)]"
        }`}
      />
      <span className="capitalize">{theme === "blueprint" ? "Blueprint" : "Night"}</span>
    </button>
  );
}
