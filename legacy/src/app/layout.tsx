import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/components/layout/SmoothScroll";
import GridOverlay from "@/components/layout/GridOverlay";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-code",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F4F1EA",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ansharora.dev"),
  title: "Ansh Arora — Systems & ML Engineer | Portfolio",
  description:
    "Personal portfolio and engineering lab notebook of Ansh Arora, third-year B.Tech CSE (AI/ML) at VIT Bhopal (2024–2028, CGPA: 7.51/10). Multi-tenant RAG pipelines, smart-meter IoT telemetry, and sandboxed CI tooling.",
  authors: [{ name: "Ansh Arora", url: "https://ansharora.dev" }],
  creator: "Ansh Arora",
  keywords: [
    "Ansh Arora",
    "Systems Engineer",
    "Machine Learning Engineer",
    "VIT Bhopal",
    "RAG",
    "FastAPI",
    "Next.js",
    "TypeScript",
    "PostgreSQL",
    "pgvector",
    "CI/CD Pipeline",
    "GridGuard AI",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ansh Arora — Systems & ML Engineer",
    description:
      "Engineering lab notebook & portfolio of Ansh Arora. Real systems, verifiable metrics, and architectural blueprints.",
    url: "https://ansharora.dev",
    siteName: "Ansh Arora Engineering Notebook",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ansh Arora — Systems & ML Engineer",
    description:
      "Engineering lab notebook of Ansh Arora (VIT Bhopal, CGPA 7.51/10). Multi-tenant RAG, IoT telemetry, CI debugging.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ansh Arora",
  givenName: "Ansh",
  familyName: "Arora",
  url: "https://ansharora.dev",
  email: "ansharora19102006@gmail.com",
  telephone: "+919023573649",
  jobTitle: "Systems & Machine Learning Engineer",
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Vellore Institute of Technology, Bhopal",
  },
  sameAs: [
    "https://github.com/anshere0",
    "https://www.linkedin.com/in/ansh-arora0/",
    "https://leetcode.com/u/anshere19/",
  ],
  knowsAbout: [
    "Machine Learning",
    "Retrieval-Augmented Generation (RAG)",
    "Distributed Systems",
    "TypeScript",
    "Python",
    "PostgreSQL",
    "C++",
    "Docker",
    "CI/CD Systems",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[var(--bg-paper)] text-[var(--ink-primary)] font-sans antialiased selection:bg-[var(--signal-vermilion)] selection:text-white">
        {/* Skip to main content accessibility landmark */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[99999] px-4 py-2 bg-[var(--ink-primary)] text-white text-xs font-mono uppercase tracking-wider border border-[var(--hairline)]"
        >
          Skip to content
        </a>

        <GridOverlay />
        <SmoothScroll>
          <div className="relative z-10 flex min-h-screen flex-col">
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
