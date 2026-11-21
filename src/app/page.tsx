import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import WorkSection from "@/components/sections/WorkSection";
import AskSection from "@/components/sections/AskSection";
import PracticeSection from "@/components/sections/PracticeSection";
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

        {/* Phase 6 Target: Writing & Contact */}
        <section id="writing" aria-label="Technical Writing" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto hairline-t">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--text)] tracking-tight">
              Technical notes
            </h2>
            <p className="mt-2 text-sm text-[var(--text-muted)] font-body">
              System architecture notes on binary streaming protocols, vector chunking, and latency engineering.
            </p>
          </div>
        </section>

        <section id="contact" aria-label="Contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto hairline-t">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--text)] tracking-tight">
              Contact
            </h2>
            <p className="mt-2 text-sm text-[var(--text-muted)] font-body">
              Available for software engineering and applied ML internships and roles.
            </p>
          </div>
        </section>
      </main>

      {/* Blueprint Footer */}
      <Footer />
    </>
  );
}
