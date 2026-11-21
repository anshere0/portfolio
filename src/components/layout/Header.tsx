"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { SITE_CONFIG } from "@/content/site";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Ask", href: "#ask" },
  { label: "Practice", href: "#practice" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-200 ${
        isScrolled
          ? "bg-[#0A0B10]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Brand Name / Title */}
        <Link
          href="/"
          className="font-display font-bold text-base sm:text-lg text-white tracking-tight hover:text-[var(--signal)] transition-colors flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--signal)] animate-pulse" />
          <span>{SITE_CONFIG.name}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 font-body text-sm text-[var(--text-muted)]">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls: Theme Toggle & Resume */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/resume"
            className="px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-xs font-mono text-white transition-colors border border-white/[0.1] font-semibold"
          >
            Résumé
          </Link>
        </div>
      </div>
    </header>
  );
}
