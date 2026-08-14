import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { RoiShowcase } from "@/components/site/RoiShowcase";
import { StatsBento } from "@/components/site/StatsBento";
import { Services } from "@/components/site/Services";
import { TechStack } from "@/components/site/TechStack";
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
    <div className="min-h-screen bg-background text-foreground selection:bg-slate-800 selection:text-white">
      <Nav />
      <main>
        <Hero />
        <RoiShowcase />
        <StatsBento />
        <Services />
        <TechStack />
        <ProjectsShowcase />
        <About />
        <Industries />
        <Products />
        <Process />
        <WhyStalci />
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
