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
        <Hero />
        <RoiShowcase />
        <StatsBento />
        <Services />
        <TechStack />

        {/* ─── Section Breaker 1: Engineering to Case Studies Transition ─── */}
        <SectionBreaker
          badge="⚡ Engineering Velocity &amp; Precision"
          title="Let's Move Your Project From"
          titleHighlight="'Someday'"
          titleEnd="to 'Sprint One'"
          subtitle="We've shipped 700+ enterprise systems across 50+ toolchains. Tell us what you're engineering, and our principal architects will return with a deterministic sprint blueprint."
          buttonText="Start Your Project Blueprint"
          variant="grid"
        />

        <ProjectsShowcase />
        <About />
        <Industries />
        <Products />

        {/* ─── Section Breaker 2: Platforms to Methodology Transition ─── */}
        <SectionBreaker
          badge="✦ Autonomous AI &amp; Cloud Scale"
          title="The Future Doesn't Wait."
          titleHighlight="Neither Should You."
          subtitle="You've got the vision. We've got the architects, the sovereign AI engineers, and 120+ specialists to build it. Book a 30-minute call and let's sketch the blueprint together."
          buttonText="Schedule a Strategic Discovery"
          variant="glow"
        />

        <Process />
        <WhyStalci />

        {/* ─── Section Breaker 3: Advantage to Client Proof Transition ─── */}
        <SectionBreaker
          badge="🛡️ 100% Contractual SLA Guarantee"
          title="Ready to Scale With"
          titleHighlight="Zero Technical Debt?"
          subtitle="Experience predictable engineering sprints, enterprise zero-trust security standards, and dedicated senior squad allocation with complete intellectual property ownership."
          buttonText="Consult With Principal Architects"
          variant="wave"
        />

        <Testimonials />
        <Insights />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
