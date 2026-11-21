import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ResumeActions } from "@/components/features/ResumeActions";

export const metadata: Metadata = {
  title: "Ansh Arora — Résumé",
  description:
    "Curriculum Vitae of Ansh Arora. Third-year B.Tech CSE (AI/ML) student at VIT Bhopal (CGPA 7.79/10). Specializing in streaming telemetry, vector retrieval, and distributed systems.",
};

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-sans py-8 sm:py-12 px-4 sm:px-6 print:p-0 print:bg-white print:text-black">
      {/* Top Utility Header (Hidden when printing) */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <Link
          href="/"
          className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1.5"
        >
          <span>Back to portfolio</span>
        </Link>

        <ResumeActions />
      </div>

      {/* Main Single-Page Résumé Document */}
      <main className="max-w-4xl mx-auto p-8 sm:p-12 rounded-[8px] bg-[var(--bg-raised)] hairline print:border-none print:shadow-none print:p-0 print:bg-white print:text-black space-y-6 text-sm">
        {/* Résumé Header */}
        <header className="text-center space-y-1.5 border-b border-[var(--line)] print:border-black pb-4">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text)] print:text-black">
            Ansh Arora
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-body text-xs text-[var(--text-muted)] print:text-gray-700">
            <a href="tel:+919023573649" className="hover:underline">
              +91 9023573649
            </a>
            <span>•</span>
            <a href="mailto:ansharora19102006@gmail.com" className="hover:underline">
              ansharora19102006@gmail.com
            </a>
            <span>•</span>
            <a
              href="https://linkedin.com/in/ansharora1910"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>
            <span>•</span>
            <a
              href="https://github.com/anshere0"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
          </div>
        </header>

        {/* Education Section */}
        <section aria-labelledby="resume-education" className="space-y-2">
          <h2
            id="resume-education"
            className="font-serif text-base font-bold uppercase tracking-wider text-[var(--text)] print:text-black border-b border-[var(--line)] print:border-black pb-0.5"
          >
            Education
          </h2>
          <div className="flex items-start justify-between text-xs sm:text-sm">
            <div>
              <div className="font-bold text-[var(--text)] print:text-black">
                Vellore Institute of Technology
              </div>
              <div className="text-xs text-[var(--text-muted)] print:text-gray-800 italic">
                B.Tech, Computer Science Engineering (AI/ML) — CGPA: 7.79 / 10
              </div>
            </div>
            <div className="text-right text-xs font-mono text-[var(--text-muted)] print:text-gray-800">
              <div>2024 – 2028</div>
              <div>Bhopal, Madhya Pradesh</div>
            </div>
          </div>
        </section>

        {/* Technical Skills Section */}
        <section aria-labelledby="resume-skills" className="space-y-2">
          <h2
            id="resume-skills"
            className="font-serif text-base font-bold uppercase tracking-wider text-[var(--text)] print:text-black border-b border-[var(--line)] print:border-black pb-0.5"
          >
            Technical Skills
          </h2>
          <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed">
            <div>
              <strong className="font-semibold text-[var(--text)] print:text-black">Languages:</strong>{" "}
              <span className="text-[var(--text-muted)] print:text-gray-800">
                Python, Java, C++, JavaScript/TypeScript, SQL, Pine Script v5
              </span>
            </div>
            <div>
              <strong className="font-semibold text-[var(--text)] print:text-black">Markets &amp; Trading:</strong>{" "}
              <span className="text-[var(--text-muted)] print:text-gray-800">
                NSE Equity/F&amp;O, crypto options (Delta Exchange), VWAP &amp; order-flow analysis, open-interest and breadth analysis, risk–reward modelling
              </span>
            </div>
            <div>
              <strong className="font-semibold text-[var(--text)] print:text-black">Data, APIs &amp; ML:</strong>{" "}
              <span className="text-[var(--text-muted)] print:text-gray-800">
                WebSockets/SSE, Angel One SmartAPI, Delta Exchange API, XGBoost, SHAP, PostgreSQL, Supabase, pgvector, RAG, OpenAI/Gemini APIs
              </span>
            </div>
            <div>
              <strong className="font-semibold text-[var(--text)] print:text-black">Frameworks &amp; Tools:</strong>{" "}
              <span className="text-[var(--text-muted)] print:text-gray-800">
                React, Next.js, Node.js/Express.js, FastAPI, Flask, Git, Docker, GitHub Actions, Vercel
              </span>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section aria-labelledby="resume-projects" className="space-y-3">
          <h2
            id="resume-projects"
            className="font-serif text-base font-bold uppercase tracking-wider text-[var(--text)] print:text-black border-b border-[var(--line)] print:border-black pb-0.5"
          >
            Projects
          </h2>

          <div className="space-y-3.5 text-xs sm:text-sm">
            {/* NSE Scanner */}
            <div className="space-y-1">
              <div className="flex items-baseline justify-between">
                <span className="font-bold text-[var(--text)] print:text-black">
                  NSE Momentum &amp; Breadth Scanner
                </span>
                <span className="font-mono text-xs text-[var(--text-muted)] print:text-gray-800 italic">
                  React 19, Node.js/Express, Angel One SmartAPI, SSE, Tailwind | Live
                </span>
              </div>
              <ul className="list-disc list-outside pl-4 space-y-0.5 text-xs text-[var(--text-muted)] print:text-gray-800 leading-relaxed">
                <li>
                  Built a real-time NSE Cash and F&amp;O scanner streaming Angel One SmartAPI WebSocket ticks (binary packet decoding, TOTP auth) and pushing live updates to a React dashboard over Server-Sent Events.
                </li>
                <li>
                  Implemented market-breadth analytics (advance/decline ratio, net breadth %, sentiment classification), configurable open-interest change filters, and PDH/PDL/PMH/PML breakout detection with no look-ahead bias.
                </li>
                <li>
                  Engineered an IST-aware session engine (pre-open, regular, post-close, NSE holidays) that serves the last valid close and never fabricates prices; covered with automated node:test suites.
                </li>
              </ul>
            </div>

            {/* Delta Exchange Options Engine */}
            <div className="space-y-1">
              <div className="flex items-baseline justify-between">
                <span className="font-bold text-[var(--text)] print:text-black">
                  Delta Exchange Options Risk-Reward Engine
                </span>
                <span className="font-mono text-xs text-[var(--text-muted)] print:text-gray-800 italic">
                  Python, FastAPI, WebSockets, Chrome MV3 | In progress
                </span>
              </div>
              <ul className="list-disc list-outside pl-4 space-y-0.5 text-xs text-[var(--text-muted)] print:text-gray-800 leading-relaxed">
                <li>
                  Building a Chrome extension HUD with a FastAPI engine that consumes live Delta Exchange WebSocket data (5m BTC chart) and outputs a risk–reward estimate for the at-the-money option the trader is viewing, or a NO TRADE call when the setup is weak.
                </li>
              </ul>
            </div>

            {/* NIFTY SMART LEAD */}
            <div className="space-y-1">
              <div className="flex items-baseline justify-between">
                <span className="font-bold text-[var(--text)] print:text-black">
                  NIFTY SMART LEAD (Intraday Indicator)
                </span>
                <span className="font-mono text-xs text-[var(--text-muted)] print:text-gray-800 italic">
                  Pine Script v5, TradingView
                </span>
              </div>
              <ul className="list-disc list-outside pl-4 space-y-0.5 text-xs text-[var(--text-muted)] print:text-gray-800 leading-relaxed">
                <li>
                  Designed a composite Nifty 50 intraday signal combining VWAP bands, order-flow delta, volume absorption and momentum acceleration; added cooldown logic, a trend-EMA filter and candle confirmation to cut false signals, and tuned RSI length (48 vs. default 14).
                </li>
              </ul>
            </div>

            {/* GridGuard AI */}
            <div className="space-y-1">
              <div className="flex items-baseline justify-between">
                <span className="font-bold text-[var(--text)] print:text-black">
                  GridGuard AI
                </span>
                <span className="font-mono text-xs text-[var(--text-muted)] print:text-gray-800 italic">
                  Next.js, FastAPI, PostgreSQL, WebSockets, XGBoost, SHAP
                </span>
              </div>
              <ul className="list-disc list-outside pl-4 space-y-0.5 text-xs text-[var(--text-muted)] print:text-gray-800 leading-relaxed">
                <li>
                  Built a real-time smart-grid telemetry dashboard streaming smart-meter data over WebSockets into an XGBoost anomaly-detection pipeline with SHAP-based explainability.
                </li>
                <li>
                  Built a React Flow topology viewer tracing anomalies from substation to meter, with automated PDF/CSV audit-data ingestion via FastAPI; national hackathon finalist.
                </li>
              </ul>
            </div>

            {/* RAGForge */}
            <div className="space-y-1">
              <div className="flex items-baseline justify-between">
                <span className="font-bold text-[var(--text)] print:text-black">
                  RAGForge
                </span>
                <span className="font-mono text-xs text-[var(--text-muted)] print:text-gray-800 italic">
                  Next.js, TypeScript, Supabase, pgvector, Gemini API
                </span>
              </div>
              <ul className="list-disc list-outside pl-4 space-y-0.5 text-xs text-[var(--text-muted)] print:text-gray-800 leading-relaxed">
                <li>
                  Built a multi-tenant RAG pipeline (PDF/DOCX/TXT parsing, 768-dim embeddings, pgvector cosine retrieval, cited answers) with an embeddable chat widget and admin dashboard.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section aria-labelledby="resume-achievements" className="space-y-2">
          <h2
            id="resume-achievements"
            className="font-serif text-base font-bold uppercase tracking-wider text-[var(--text)] print:text-black border-b border-[var(--line)] print:border-black pb-0.5"
          >
            Achievements
          </h2>
          <ul className="list-disc list-outside pl-4 space-y-1 text-xs sm:text-sm text-[var(--text-muted)] print:text-gray-800 leading-relaxed">
            <li>
              <strong className="font-semibold text-[var(--text)] print:text-black">Finalist</strong> — Summer of Code Fest 2.0, national-level hackathon (GSOC Innovators Club, VIT Bhopal), with GridGuard AI
            </li>
            <li>
              <strong className="font-semibold text-[var(--text)] print:text-black">GSSoC 2026 Contributor</strong> — selected open-source contributor, GirlScript Summer of Code
            </li>
            <li>
              <strong className="font-semibold text-[var(--text)] print:text-black">Participant</strong> — AI-ZEN Adversarial Nibbler Hackathon (Google Crowdsource &amp; VIT Bhopal)
            </li>
          </ul>
        </section>

        {/* Certifications Section */}
        <section aria-labelledby="resume-certifications" className="space-y-2">
          <h2
            id="resume-certifications"
            className="font-serif text-base font-bold uppercase tracking-wider text-[var(--text)] print:text-black border-b border-[var(--line)] print:border-black pb-0.5"
          >
            Certifications
          </h2>
          <div className="space-y-1 text-xs sm:text-sm leading-relaxed text-[var(--text-muted)] print:text-gray-800">
            <div>
              <strong className="font-semibold text-[var(--text)] print:text-black">AI &amp; Cloud:</strong>{" "}
              ServiceNow Virtual Internship — Agentic AI, CSA Prep (Jun 2026) • NPTEL: Cloud Computing (92%), Intro to IoT (88%)
            </div>
            <div>
              <strong className="font-semibold text-[var(--text)] print:text-black">Programming &amp; Web:</strong>{" "}
              Programming in Java, VITyarthi (Jul 2026) • Python Essentials 1 &amp; 2, Cisco • HTML, CSS &amp; JavaScript, Johns Hopkins (Coursera)
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
