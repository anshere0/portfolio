import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { PRE_PAINT_THEME_SCRIPT } from "@/lib/theme";
import { CANONICAL_SITE_URL } from "@/lib/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  fallback: ["monospace"],
});

export const viewport: Viewport = {
  themeColor: "#0D2F6B",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_SITE_URL),
  title: "Ansh Arora — Systems, Telemetry & Retrieval Engineer",
  description:
    "An engineer's working drawing that executes. Real-time market telemetry (NSE WebSocket scanner), smart-meter anomaly detection (GridGuard AI), and multi-tenant RAG pipelines (RAGForge). B.Tech CSE (AI/ML), VIT Bhopal (CGPA 7.79/10).",
  authors: [{ name: "Ansh Arora", url: CANONICAL_SITE_URL }],
  creator: "Ansh Arora",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ansh Arora — Systems, Telemetry & Retrieval Engineer",
    description:
      "The working drawing: an engineer's blueprint that actually runs. Real-time telemetry, verifiable receipts, and zero fluff.",
    url: CANONICAL_SITE_URL,
    siteName: "Ansh Arora Engineering Blueprint",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ansh Arora — Systems, Telemetry & Retrieval Engineer",
    description:
      "Real-time streaming telemetry, retrieval pipelines, and financial execution systems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="blueprint"
      suppressHydrationWarning
      className={`${bricolage.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: PRE_PAINT_THEME_SCRIPT,
          }}
        />
      </head>
      <body className="font-body bg-[var(--bg)] text-[var(--text)] min-h-screen flex flex-col antialiased selection:bg-[var(--accent)] selection:text-[var(--accent-ink)]">
        {children}
      </body>
    </html>
  );
}
