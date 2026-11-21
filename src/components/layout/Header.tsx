"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { SITE_CONFIG } from "@/content/site";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Ask", href: "#ask" },
  { label: "Practice", href: "#practice" },
  { label: "Writing", href: "#writing" },
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
      className={`sticky top-0 z-40 transition-colors duration-200 ${
        isScrolled
          ? "bg-[var(--bg-raised)]/95 backdrop-blur-md hairline-b"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Brand Name / Title */}
        <Link
          href="/"
          className="font-display font-semibold text-base sm:text-lg text-[var(--text)] tracking-tight hover:text-[var(--accent)] transition-colors"
        >
          {SITE_CONFIG.name}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 font-body text-sm text-[var(--text-muted)]">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[var(--text)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls: Theme Toggle & Resume */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="/Ansh_Arora_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 text-xs font-medium rounded-[4px] hairline text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--line-strong)] transition-colors"
          >
            Résumé
          </a>
        </div>
      </div>
    </header>
  );
}
