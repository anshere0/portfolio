"use client";

import { useState, useRef } from "react";
import { PROFILE_DATA } from "@/content/profile";
import {
  Mail,
  Copy,
  Check,
  Phone,
  MapPin,
  ArrowUpRight,
  Send,
  Terminal,
  ShieldCheck,
  Clock,
  ArrowUp,
} from "lucide-react";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "Software Engineering Role",
    message: "",
    honeypot: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_DATA.identity.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Full name is required";
    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Valid email address required";
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formData.honeypot) {
      console.warn("Bot detected via honeypot trap");
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);
    setLogs(["[01] Validating transmission payload structure..."]);

    setTimeout(() => {
      setLogs((prev) => [...prev, "[02] Honeypot check passed · Zero telemetry anomalies"]);
    }, 400);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        `[03] Dispatching packet to ${PROFILE_DATA.identity.email}...`,
      ]);
    }, 900);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        "[04] TRANSMISSION RECORDED (HTTP 200 OK) · ACKNOWLEDGED",
      ]);
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 1500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="hairline-t bg-[var(--bg-paper)] text-[var(--ink-primary)]">
      {/* Contact Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 hairline-b">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-16 hairline-b pb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 bg-[var(--signal-vermilion)] inline-block" />
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink-secondary)] font-bold">
                10 / INITIATE CONTACT
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-serif text-[var(--ink-primary)] tracking-tight">
              Communications & Engineering Inquiry
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[var(--ink-tertiary)]">
            <span className="w-2 h-2 rounded-full bg-[var(--signal-emerald)] inline-block animate-pulse" />
            <span>DISPATCH CHANNELS ACTIVE</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Dossier & Social Coordinates */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="font-serif text-2xl text-[var(--ink-primary)]">
                Direct Dispatch Ledger
              </h3>
              <p className="font-sans text-base text-[var(--ink-secondary)] leading-relaxed">
                Available for Software Engineering, Applied AI/ML Systems, and Internship opportunities across 2026–2028 cohorts. Inquiries receive replies within 24 business hours.
              </p>
            </div>

            {/* Quick Action Email Box */}
            <div className="p-6 bg-[var(--bg-paper-subtle)] hairline-border space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--ink-tertiary)] uppercase">
                <span>PRIMARY TRANSMISSION ADDRESS</span>
                <span className="text-[var(--signal-emerald)] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> PGP VERIFIED
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 bg-[var(--bg-paper)] p-3 hairline-border">
                <span className="font-mono text-sm sm:text-base text-[var(--ink-primary)] truncate font-semibold">
                  {PROFILE_DATA.identity.email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1 text-xs font-mono uppercase tracking-wider hairline-border bg-[var(--bg-paper-subtle)] hover:bg-[var(--bg-paper-darker)] transition-colors inline-flex items-center gap-1.5 shrink-0"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[var(--signal-emerald)]" />
                      <span className="text-[var(--signal-emerald)] font-bold">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[var(--ink-secondary)]" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono pt-2 text-[var(--ink-secondary)]">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[var(--signal-vermilion)] shrink-0" />
                  <span>SLA: &lt; 24h REPLY</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[var(--signal-vermilion)] shrink-0" />
                  <span>BHOPAL / REMOTE</span>
                </div>
              </div>
            </div>

            {/* Contact Metadata Table */}
            <div className="hairline-border bg-[var(--bg-paper)] divide-y divide-[var(--hairline)] font-mono text-xs">
              <div className="p-3.5 flex justify-between items-center">
                <span className="text-[var(--ink-tertiary)] uppercase">TELEPHONE</span>
                <a
                  href={`tel:${PROFILE_DATA.identity.phone.replace(/\s+/g, "")}`}
                  className="text-[var(--ink-primary)] hover:text-[var(--signal-vermilion)] transition-colors font-medium"
                >
                  {PROFILE_DATA.identity.phone}
                </a>
              </div>
              <div className="p-3.5 flex justify-between items-center">
                <span className="text-[var(--ink-tertiary)] uppercase">GITHUB PROFILE</span>
                <a
                  href={PROFILE_DATA.identity.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--ink-primary)] hover:text-[var(--signal-vermilion)] transition-colors inline-flex items-center gap-1"
                >
                  <span>@anshere0</span>
                  <ArrowUpRight className="w-3 h-3 text-[var(--ink-tertiary)]" />
                </a>
              </div>
              <div className="p-3.5 flex justify-between items-center">
                <span className="text-[var(--ink-tertiary)] uppercase">LINKEDIN DISPATCH</span>
                <a
                  href={PROFILE_DATA.identity.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--ink-primary)] hover:text-[var(--signal-vermilion)] transition-colors inline-flex items-center gap-1"
                >
                  <span>in/ansh-arora0</span>
                  <ArrowUpRight className="w-3 h-3 text-[var(--ink-tertiary)]" />
                </a>
              </div>
              <div className="p-3.5 flex justify-between items-center">
                <span className="text-[var(--ink-tertiary)] uppercase">LEETCODE METRICS</span>
                <a
                  href={PROFILE_DATA.identity.leetcodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--ink-primary)] hover:text-[var(--signal-vermilion)] transition-colors inline-flex items-center gap-1"
                >
                  <span>u/anshere19</span>
                  <ArrowUpRight className="w-3 h-3 text-[var(--ink-tertiary)]" />
                </a>
              </div>
              <div className="p-3.5 flex justify-between items-center">
                <span className="text-[var(--ink-tertiary)] uppercase">RESUME ARCHIVE</span>
                <a
                  href={PROFILE_DATA.identity.resumePdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--signal-vermilion)] hover:underline inline-flex items-center gap-1 font-bold"
                >
                  <span>PDF REVISION 2026</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Systems Identity Stamp */}
            <div className="p-4 bg-[var(--bg-paper-darker)]/40 hairline-border text-[11px] font-mono text-[var(--ink-secondary)] space-y-1">
              <div className="flex justify-between">
                <span>IDENTITY REPOSITORY</span>
                <span className="text-[var(--ink-primary)]">SHA-256 VERIFIED</span>
              </div>
              <div className="text-[var(--ink-tertiary)] break-all font-mono">
                E49B 081C 7A22 9F01 C683 D105 B9A2 E774 2190 F6C2
              </div>
            </div>
          </div>

          {/* Right Column: Transmission Form & Real-time Console */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 bg-[var(--bg-paper-subtle)] hairline-border space-y-6">
              <div className="flex items-center justify-between hairline-b pb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[var(--signal-vermilion)]" />
                  <span className="font-mono text-xs uppercase tracking-wider font-bold text-[var(--ink-primary)]">
                    Direct Inquiry Transmission Protocol
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[var(--ink-tertiary)] uppercase">
                  ENC: UTF-8 / TLS
                </span>
              </div>

              {formSubmitted ? (
                <div className="p-8 bg-[var(--bg-paper)] hairline-border space-y-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-[var(--signal-emerald)] mx-auto flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-serif text-[var(--ink-primary)]">
                      Transmission Acknowledged
                    </h4>
                    <p className="font-sans text-sm text-[var(--ink-secondary)] max-w-md mx-auto leading-relaxed">
                      Thank you, <strong>{formData.name}</strong>. Your packet has been logged. Ansh Arora will review your inquiry and follow up at <strong>{formData.email}</strong> shortly.
                    </p>
                  </div>

                  <div className="p-3 bg-[var(--bg-paper-subtle)] font-mono text-xs text-[var(--ink-tertiary)] hairline-border max-w-md mx-auto text-left space-y-1">
                    <div>TIMESTAMP: 2026-10-12T12:00:00Z · VERIFIED</div>
                    <div>STATUS: 200 OK · QUEUED FOR DISPATCH</div>
                  </div>

                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          inquiryType: "Software Engineering Role",
                          message: "",
                          honeypot: "",
                        });
                        setLogs([]);
                      }}
                      className="px-4 py-2 text-xs font-mono uppercase tracking-wider hairline-border bg-[var(--bg-paper)] hover:bg-[var(--bg-paper-darker)] transition-colors"
                    >
                      Transmit Another Packet
                    </button>
                    <a
                      href={`mailto:${PROFILE_DATA.identity.email}?subject=${encodeURIComponent(
                        formData.inquiryType + " - " + formData.name
                      )}&body=${encodeURIComponent(formData.message)}`}
                      className="px-4 py-2 text-xs font-mono uppercase tracking-wider bg-[var(--ink-primary)] text-white hover:bg-[var(--signal-vermilion)] transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>Open in Mail Client</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot field (hidden from legitimate users) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="hp_field">Do not fill this field</label>
                    <input
                      id="hp_field"
                      type="text"
                      name="botCheck"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.honeypot}
                      onChange={(e) =>
                        setFormData({ ...formData, honeypot: e.target.value })
                      }
                    />
                  </div>

                  {/* Name and Email Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="fullName"
                        className="block font-mono text-xs uppercase tracking-wider text-[var(--ink-secondary)]"
                      >
                        Full Name <span className="text-[var(--signal-vermilion)]">*</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        required
                        placeholder="e.g. Elena Rostova"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className={`w-full px-3.5 py-2.5 bg-[var(--bg-paper)] hairline-border text-sm font-sans text-[var(--ink-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--ink-primary)] transition-shadow ${
                          errors.name ? "border-[var(--signal-vermilion)] ring-1 ring-[var(--signal-vermilion)]" : ""
                        }`}
                      />
                      {errors.name && (
                        <p className="font-mono text-[11px] text-[var(--signal-vermilion)]">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="senderEmail"
                        className="block font-mono text-xs uppercase tracking-wider text-[var(--ink-secondary)]"
                      >
                        Sender Email <span className="text-[var(--signal-vermilion)]">*</span>
                      </label>
                      <input
                        id="senderEmail"
                        type="email"
                        required
                        placeholder="elena@systems-lab.org"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className={`w-full px-3.5 py-2.5 bg-[var(--bg-paper)] hairline-border text-sm font-sans text-[var(--ink-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--ink-primary)] transition-shadow ${
                          errors.email ? "border-[var(--signal-vermilion)] ring-1 ring-[var(--signal-vermilion)]" : ""
                        }`}
                      />
                      {errors.email && (
                        <p className="font-mono text-[11px] text-[var(--signal-vermilion)]">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Inquiry Classification */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="inquiryType"
                      className="block font-mono text-xs uppercase tracking-wider text-[var(--ink-secondary)]"
                    >
                      Inquiry Classification
                    </label>
                    <select
                      id="inquiryType"
                      value={formData.inquiryType}
                      onChange={(e) =>
                        setFormData({ ...formData, inquiryType: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-[var(--bg-paper)] hairline-border text-sm font-sans text-[var(--ink-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--ink-primary)]"
                    >
                      <option value="Software Engineering Role">
                        Software Engineering Role (Full-Time / Campus)
                      </option>
                      <option value="AI/ML Systems Engineering">
                        AI/ML Systems Engineering (RAG, Agents, Pipelines)
                      </option>
                      <option value="Internship Opportunity">
                        Internship Opportunity (2026–2028 Cohort)
                      </option>
                      <option value="Hackathon / Research Collaboration">
                        Hackathon / Research Collaboration
                      </option>
                      <option value="General Technical Inquiry">
                        General Technical Inquiry
                      </option>
                    </select>
                  </div>

                  {/* Message Payload */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="messagePayload"
                      className="block font-mono text-xs uppercase tracking-wider text-[var(--ink-secondary)]"
                    >
                      Message Payload <span className="text-[var(--signal-vermilion)]">*</span>
                    </label>
                    <textarea
                      id="messagePayload"
                      required
                      rows={5}
                      placeholder="Outline the scope, engineering stack, or opportunity specifications..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className={`w-full px-3.5 py-2.5 bg-[var(--bg-paper)] hairline-border text-sm font-sans text-[var(--ink-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--ink-primary)] transition-shadow ${
                        errors.message ? "border-[var(--signal-vermilion)] ring-1 ring-[var(--signal-vermilion)]" : ""
                      }`}
                    />
                    {errors.message && (
                      <p className="font-mono text-[11px] text-[var(--signal-vermilion)]">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit CTA button */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="font-mono text-[11px] text-[var(--ink-tertiary)]">
                      * ALL INQUIRIES STRICTLY CONFIDENTIAL
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-[var(--ink-primary)] text-white hover:bg-[var(--signal-vermilion)] disabled:opacity-50 transition-colors duration-200 font-mono text-xs uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                          <span>TRANSMITTING...</span>
                        </>
                      ) : (
                        <>
                          <span>TRANSMIT INQUIRY</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Real-time telemetry feedback log */}
                  {logs.length > 0 && (
                    <div className="p-3 bg-[var(--bg-paper)] hairline-border font-mono text-xs text-[var(--ink-secondary)] space-y-1 animate-fadeIn">
                      {logs.map((log, lIdx) => (
                        <div key={lIdx} className="flex items-center gap-2">
                          <span className="text-[var(--signal-emerald)]">✔</span>
                          <span>{log}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Colophon & Architectural Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8 font-mono text-xs text-[var(--ink-secondary)]">
          <div className="md:col-span-5 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--signal-vermilion)] inline-block" />
              <span className="font-serif text-lg font-bold text-[var(--ink-primary)]">
                Ansh Arora
              </span>
              <span className="text-[var(--ink-tertiary)]">·</span>
              <span className="uppercase text-[11px] tracking-wider text-[var(--ink-secondary)]">
                Systems & ML Engineer
              </span>
            </div>
            <p className="text-[var(--ink-secondary)] leading-relaxed font-sans text-sm">
              Third-year B.Tech CSE (AI/ML) student at VIT Bhopal (2024–2028, CGPA: 7.51/10). Engineered as a Systems Notebook with strict adherence to verified production evidence.
            </p>
          </div>

          <div className="md:col-span-4 space-y-1 text-xs">
            <div className="uppercase tracking-wider font-bold text-[var(--ink-primary)] mb-1">
              SYSTEM ARCHITECTURE & CREDITS
            </div>
            <div>STACK: Next.js 16 App Router · TypeScript · Tailwind CSS</div>
            <div>MOTION: GSAP 3 &amp; Lenis Smooth Scroll</div>
            <div>TYPE: Newsreader (Editorial Serif) &amp; Geist Mono</div>
            <div>PALETTE: Warm Paper (#F4F1EA) · Carbon Ink (#121212)</div>
          </div>

          <div className="md:col-span-3 space-y-3 md:text-right">
            <button
              onClick={scrollToTop}
              className="px-4 py-2 hairline-border bg-[var(--bg-paper-subtle)] hover:bg-[var(--bg-paper-darker)] transition-colors inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider"
            >
              <span>RETURN TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <div className="text-[11px] text-[var(--ink-tertiary)]">
              BUILD STAMP: OCT 2026 // v2.4.0
            </div>
          </div>
        </div>

        <div className="hairline-t pt-6 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-[var(--ink-tertiary)]">
          <div>
            © 2026 ANSH ARORA. ALL VERIFIED PRODUCTION METRICS PROTECTED.
          </div>
          <div className="flex items-center gap-4">
            <a
              href={PROFILE_DATA.identity.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--ink-primary)] transition-colors"
            >
              GITHUB
            </a>
            <span>·</span>
            <a
              href={PROFILE_DATA.identity.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--ink-primary)] transition-colors"
            >
              LINKEDIN
            </a>
            <span>·</span>
            <a
              href={PROFILE_DATA.identity.leetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--ink-primary)] transition-colors"
            >
              LEETCODE
            </a>
            <span>·</span>
            <a
              href={PROFILE_DATA.identity.resumePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--ink-primary)] transition-colors text-[var(--signal-vermilion)]"
            >
              RESUME (PDF)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
