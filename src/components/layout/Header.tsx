"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { PROFILE_DATA } from "@/content/profile";
import { Menu, X, FileText, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "3D Skyline", href: "#github-activity" },
  { label: "AnshOS Shell", href: "#terminal" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));

      // Active section observer
      const sections = ["hero", "about", "experience", "projects", "skills", "github-activity", "terminal", "contact"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            setActiveSection(`#${sectionId}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(
    () => {
      if (mobileOpen && mobileMenuRef.current) {
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }
        );
        gsap.fromTo(
          ".mobile-nav-item",
          { opacity: 0, x: -15 },
          { opacity: 1, x: 0, stagger: 0.05, duration: 0.2, ease: "power2.out" }
        );
      }
    },
    { dependencies: [mobileOpen] }
  );

  return (
    <>
      {/* Top Telemetry & Status Bar */}
      <div className="w-full hairline-b bg-[var(--bg-paper-subtle)] text-[13px] font-mono text-[var(--ink-secondary)] py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[var(--signal-emerald)] inline-block animate-pulse" />
            <span className="tracking-wider uppercase font-medium text-[var(--ink-primary)]">
              SYSTEM STATUS: OPERATIONAL
            </span>
            <span className="text-[var(--hairline-strong)] hidden md:inline">|</span>
            <span className="hidden md:inline text-[var(--ink-tertiary)]">
              ANSH ARORA · {PROFILE_DATA.identity.standing} (2024–2028)
            </span>
          </div>

          <div className="flex items-center gap-4 text-[var(--ink-secondary)]">
            <span className="hidden sm:inline">
              CGPA: <strong className="text-[var(--ink-primary)]">7.51 / 10</strong>
            </span>
            <span className="text-[var(--hairline-strong)] hidden sm:inline">|</span>
            <span>VIT BHOPAL, IN</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-50 bg-[var(--bg-paper)]/95 backdrop-blur-md hairline-b">
        {/* Scroll progress line */}
        <div
          className="absolute top-0 left-0 h-[2px] bg-[var(--signal-vermilion)] transition-all duration-75"
          style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo / Monogram */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-8 h-8 hairline-border bg-[var(--bg-paper-subtle)] flex items-center justify-center font-serif text-lg font-bold group-hover:bg-[var(--ink-primary)] group-hover:text-white transition-colors duration-200">
              AA
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl tracking-tight leading-none text-[var(--ink-primary)]">
                Ansh Arora
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--signal-vermilion)] font-medium">
                Systems & ML
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 font-mono text-[13px] uppercase tracking-wider">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 transition-colors duration-150 rounded-none relative ${
                    isActive
                      ? "text-[var(--signal-vermilion)] font-semibold"
                      : "text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[1px] bg-[var(--signal-vermilion)]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={PROFILE_DATA.identity.resumePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider text-[var(--ink-primary)] hairline-border bg-[var(--bg-paper-subtle)] hover:bg-[var(--bg-paper-darker)] transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-[var(--signal-vermilion)]" />
              <span>Resume</span>
              <ArrowUpRight className="w-3 h-3 text-[var(--ink-tertiary)]" />
            </a>

            <a
              href="#contact"
              className="px-4 py-1.5 font-mono text-xs uppercase tracking-wider bg-[var(--ink-primary)] text-white hover:bg-[var(--signal-vermilion)] transition-colors duration-200"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={PROFILE_DATA.identity.resumePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden px-2.5 py-1 font-mono text-xs uppercase tracking-wider hairline-border bg-[var(--bg-paper-subtle)]"
            >
              Resume
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-[var(--ink-primary)] hover:text-[var(--signal-vermilion)] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div
            ref={mobileMenuRef}
            className="lg:hidden hairline-t bg-[var(--bg-paper)] px-4 py-6 space-y-4 max-w-7xl mx-auto"
          >
            <div className="flex flex-col space-y-2 font-mono text-sm uppercase tracking-wider">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="mobile-nav-item py-2 px-3 hairline-b text-[var(--ink-primary)] hover:text-[var(--signal-vermilion)] flex justify-between items-center"
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-[var(--ink-tertiary)] font-mono">→</span>
                </a>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={PROFILE_DATA.identity.resumePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-2.5 hairline-border bg-[var(--bg-paper-subtle)] font-mono text-xs uppercase tracking-wider"
              >
                Download Resume (PDF) ↗
              </a>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-2.5 bg-[var(--ink-primary)] text-white font-mono text-xs uppercase tracking-wider"
              >
                Contact / Hire Me →
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
