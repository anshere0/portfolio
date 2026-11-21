import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import WorkSection from "@/components/sections/WorkSection";
import AskSection from "@/components/sections/AskSection";
import PracticeSection from "@/components/sections/PracticeSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      {/* Sticky modern header */}
      <Header />

      <main id="main-content" className="flex-1 bg-[#0A0B10]">
        {/* Hero Section with Interactive 2D Canvas Topology Query Field */}
        <Hero />

        {/* Work Block (Clean Project Cards, 3D Spotlight, Runnable Demos) */}
        <WorkSection />

        {/* Ask Ansh Retrieval Box (Live AI-powered RAG Engine) */}
        <AskSection />

        {/* Observable Practice: 3D Three.js Commit City, Velocity Toolkit Marquee & Spans */}
        <PracticeSection />

        {/* Direct Contact Channels & Transmission Form */}
        <ContactSection />
      </main>

      {/* Modern Footer */}
      <Footer />
    </>
  );
}
