import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { RoiShowcase } from "@/components/site/RoiShowcase";
import { StatsBento } from "@/components/site/StatsBento";
import { Services } from "@/components/site/Services";
import { TechStack } from "@/components/site/TechStack";
import { SectionBreaker } from "@/components/site/SectionBreaker";
import { ProjectsShowcase } from "@/components/site/ProjectsShowcase";
import { About } from "@/components/site/About";
import { Industries } from "@/components/site/Industries";
import { Products } from "@/components/site/Products";
import { Process } from "@/components/site/Process";
import { WhyStalci } from "@/components/site/WhyStalci";
import { Testimonials } from "@/components/site/Testimonials";
import { Insights } from "@/components/site/Insights";
import { FAQ } from "@/components/site/FAQ";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { BackToTop } from "@/components/site/BackToTop";

const title = "STALCI — Global IT Services, Sovereign AI, Cloud & Cyber Security";
const description =
  "STALCI is a global technology and software studio engineering sovereign AI systems, multi-cloud platforms, data pipelines, and cyber resilience.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-zinc-800 selection:text-white">
      <Nav />
      <main>
        {/* 1. Hero & Strategic Value Proposition */}
        <Hero />

        {/* 2. Core Engineering Capabilities */}
        <Services />

        {/* 3. Interactive Tech Ecosystem */}
        <TechStack />

        {/* ─── Section Breaker 1: Capabilities to Production Proof ─── */}
        <SectionBreaker
          badge="⚡ Engineering Velocity &amp; Precision"
          title="Let's Move Your Project From"
          titleHighlight="'Someday'"
          titleEnd="to 'Sprint One'"
          subtitle="We've shipped 45+ enterprise systems across modern toolchains. Tell us what you're engineering, and our principal architects will return with a deterministic sprint blueprint."
          buttonText="Start Your Project Blueprint"
          variant="grid"
        />

        {/* 4. Featured Production Case Studies */}
        <ProjectsShowcase />

        {/* 5. The Operating Model & 5X Velocity Symbiosis */}
        <About />

        {/* 6. Industry Vertical Solutions & 3D Visuals */}
        <Industries />

        {/* 7. Proprietary Frameworks Born in Production */}
        <Products />

        {/* 8. 14-Day Sprint Engineering Lifecycle */}
        <Process />

        {/* 9. Tangible Return on Intelligence */}
        <WhyStalci />

        {/* 10. Studio Empirical Scale Bento Grid */}
        <StatsBento />

        {/* ─── Section Breaker 2: Methodology to Validation Transition ─── */}
        <SectionBreaker
          badge="✦ Autonomous AI &amp; Cloud Scale"
          title="The Future Doesn't Wait."
          titleHighlight="Neither Should You."
          subtitle="You've got the vision. We've got senior full-stack architects and sovereign AI engineers to build it. Book a 30-minute call and let's sketch the blueprint together."
          buttonText="Schedule a Strategic Discovery"
          variant="glow"
        />

        {/* 11. Client Diaries & Verified Feedback */}
        <Testimonials />

        {/* 12. Engineering Dispatches & Research */}
        <Insights />

        {/* 13. Transparency & Clarity FAQs */}
        <FAQ />

        {/* 14. Sprint Zero Architectural Consultation Intake */}
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
