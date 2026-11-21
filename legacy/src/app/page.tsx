import Header from "@/components/layout/Header";
import IntroMonogram from "@/components/layout/IntroMonogram";
import Hero from "@/components/hero/Hero";
import VelocityMarquee from "@/components/layout/VelocityMarquee";
import ProofStrip from "@/components/hero/ProofStrip";
import FeaturedProjectsHorizontal from "@/components/projects/FeaturedProjectsHorizontal";
import CompactProjectsGrid from "@/components/projects/CompactProjectsGrid";
import AboutSection from "@/components/about/AboutSection";
import ExperienceTimeline from "@/components/experience/ExperienceTimeline";
import TechMatrixHeatmap from "@/components/graphs/TechMatrixHeatmap";
import GithubActivity from "@/components/graphs/GithubActivity";
import LeetCodePanel from "@/components/graphs/LeetCodePanel";
import CredentialsLedger from "@/components/credentials/CredentialsLedger";
import SystemsTerminal from "@/components/terminal/SystemsTerminal";
import ContactSection from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <>
      {/* Skippable session intro monogram */}
      <IntroMonogram />

      {/* Sticky navigation with telemetry progress */}
      <Header />

      <main id="main-content" className="flex-1">
        {/* 01 / Hero Section with 3D WebGL Particle Field, Character Reveal & RAG Simulator */}
        <Hero />

        {/* Dynamic Velocity-Driven Systems Marquee */}
        <VelocityMarquee />

        {/* 02 / Proof Strip with Verified Metrics */}
        <ProofStrip />

        {/* 03 / Pinned Horizontal Featured Case Studies (Desktop) / Vertical Stack (Mobile) */}
        <FeaturedProjectsHorizontal />

        {/* 03.1 / Extended Systems Ledger for Secondary Projects */}
        <CompactProjectsGrid />

        {/* 04 / Biographical Dossier & Coursework Ledger */}
        <AboutSection />

        {/* 05 / Work Experience Timeline (Webyou, Navodita, FlyRank) */}
        <ExperienceTimeline />

        {/* 06 / Skills as Evidence (Tech x Project Proof Matrix Heatmap) */}
        <TechMatrixHeatmap />

        {/* 07 / GitHub Telemetry & 3D Isometric Commit Skyline */}
        <GithubActivity />

        {/* 08 / Algorithmic Problem Solving (LeetCode DSA in C++) */}
        <LeetCodePanel />

        {/* 09 / Verified Credentials & Hackathon Honors Ledger */}
        <CredentialsLedger />

        {/* 10 / Interactive REPL // AnshOS Shell & Engineering Arcade Playground */}
        <SystemsTerminal />
      </main>

      {/* 11 / Direct Communications, Form & Colophon Architecture Footer */}
      <ContactSection />
    </>
  );
}
