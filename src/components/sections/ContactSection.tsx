"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  honeypot: string; // Anti-bot field, must remain empty
}

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
    honeypot: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("ansharora19102006@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => {
      setCopiedEmail(false);
    }, 1500); // 1.5s copy feedback per docs/04_MOTION_SPEC.md
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message. Please try again.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "", honeypot: "" });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact and communication"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto hairline-t space-y-12"
    >
      {/* Header */}
      <div className="max-w-3xl">
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
          Let&apos;s build{" "}
          <span className="text-gradient-coral">something together.</span>
        </h2>
        <p className="mt-3 text-base sm:text-lg text-[var(--text-muted)] font-body leading-relaxed">
          Open to software engineering and applied machine learning internships and roles.
          Drop a note below or reach out directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Left: Direct Channel Directory */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-[8px] bg-[var(--bg-raised)] hairline space-y-5">
            <span className="text-xs font-sans text-[var(--text-muted)] block border-b border-[var(--line)] pb-3">
              Direct channels
            </span>

            <div className="space-y-4 font-body text-xs">
              {/* Email with 1.5s Copy Micro-interaction */}
              <div className="space-y-1">
                <span className="text-[11px] text-[var(--text-muted)] block">
                  Email
                </span>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href="mailto:ansharora19102006@gmail.com"
                    className="text-sm font-bold text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                  >
                    ansharora19102006@gmail.com
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="px-2 py-1 rounded-[3px] bg-[var(--bg-sunken)] hairline text-[11px] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-ink)] transition-colors cursor-pointer"
                  >
                    {copiedEmail ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Direct Phone */}
              <div className="space-y-1 pt-2 border-t border-[var(--line)]">
                <span className="text-[11px] text-[var(--text-muted)] block">
                  Phone
                </span>
                <a
                  href="tel:+919023573649"
                  className="text-sm font-bold text-[var(--text)] hover:text-[var(--accent)] transition-colors block"
                >
                  +91 9023573649
                </a>
              </div>

              {/* Social Profiles */}
              <div className="space-y-1 pt-2 border-t border-[var(--line)]">
                <span className="text-[11px] text-[var(--text-muted)] block">
                  Profiles
                </span>
                <div className="flex items-center gap-4 text-xs font-body pt-1">
                  <a
                    href="https://github.com/anshere0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text)] hover:text-[var(--accent)] underline underline-offset-4"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/ansharora1910"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text)] hover:text-[var(--accent)] underline underline-offset-4"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="/resume"
                    className="text-[var(--accent)] hover:underline underline-offset-4 font-semibold"
                  >
                    Printable résumé
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-[6px] bg-[var(--bg-sunken)] hairline text-xs text-[var(--text-muted)] space-y-1">
            <div>Bhopal, Madhya Pradesh · VIT Bhopal University</div>
            <div>Active undergraduate student (Class of 2028)</div>
          </div>
        </div>

        {/* Right: Working Contact Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-[12px] bg-[var(--bg-raised)] hairline space-y-5"
          >
            {/* Hidden honeypot input for anti-bot protection */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="form-honeypot">Leave empty</label>
              <input
                id="form-honeypot"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={formData.honeypot}
                onChange={(e) =>
                  setFormData({ ...formData, honeypot: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 font-body">
                <label
                  htmlFor="contact-name"
                  className="text-xs text-[var(--text-muted)] block"
                >
                  Your name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="e.g. Maya Lin"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-2.5 rounded-[4px] bg-[var(--bg-sunken)] hairline text-sm text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--signal)] transition-colors"
                />
              </div>

              <div className="space-y-1.5 font-body">
                <label
                  htmlFor="contact-email"
                  className="text-xs text-[var(--text-muted)] block"
                >
                  Your email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full p-2.5 rounded-[4px] bg-[var(--bg-sunken)] hairline text-sm text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--signal)] transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5 font-body">
              <label
                htmlFor="contact-message"
                className="text-xs text-[var(--text-muted)] block"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                placeholder="Discussing engineering roles, streaming telemetry architectures, or questions about RAGForge..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full p-2.5 rounded-[4px] bg-[var(--bg-sunken)] hairline text-sm text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--signal)] transition-colors resize-y font-body"
              />
            </div>

            {status === "error" && (
              <div
                role="alert"
                className="p-3 rounded-[4px] bg-[var(--anomaly)]/15 border border-[var(--anomaly)] text-xs text-[var(--anomaly)] font-mono"
              >
                {errorMessage}
              </div>
            )}

            {status === "success" && (
              <div
                role="status"
                className="p-3 rounded-[4px] bg-[var(--signal)]/15 border border-[var(--signal)] text-xs text-[var(--signal)] font-mono"
              >
                Message sent. Thank you for reaching out.
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-[var(--text-muted)]">
                Delivered directly to inbox
              </span>
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Sending..." : "Send message"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
