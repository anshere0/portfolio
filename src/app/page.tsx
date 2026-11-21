import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import WorkSection from "@/components/sections/WorkSection";
import AskSection from "@/components/sections/AskSection";
import PracticeSection from "@/components/sections/PracticeSection";
import WritingSection from "@/components/sections/WritingSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      {/* Sticky blueprint header */}
      <Header />

      <main id="main-content" className="flex-1">
        {/* Phase 2: Hero Section with 2D Canvas Topology Query Field */}
        <Hero />

        {/* Phase 3: Work Block (Sticky Pipeline Rails, Runnable Demos, Receipts) */}
        <WorkSection />

        {/* Phase 4: Ask Ansh Retrieval Box (Streaming RAG Engine) */}
        <AskSection />

        {/* Phase 5: Observable Practice (Load Curve, Spans Waterfall, Evidence Matrix) */}
        <PracticeSection />

        {/* Phase 6: System Design Notes & Post-Mortems */}
        <WritingSection />

        {/* Phase 6: Direct Transmission Channels & Contact Form */}
        <ContactSection />
      </main>

      {/* Blueprint Footer */}
      <Footer />
    </>
  );
}
