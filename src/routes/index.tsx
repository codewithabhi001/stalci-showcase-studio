import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Industries } from "@/components/site/Industries";
import { TechStack } from "@/components/site/TechStack";
import { Products } from "@/components/site/Products";
import { Process } from "@/components/site/Process";
import { WhyStalci } from "@/components/site/WhyStalci";
import { Testimonials } from "@/components/site/Testimonials";
import { FAQ } from "@/components/site/FAQ";
import { Insights } from "@/components/site/Insights";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

const title = "STALCI — Global IT Services, Cloud, AI & Cyber Security";
const description =
  "STALCI is a global technology company delivering custom software, mobile, cloud, AI, data and cyber security services across 12 industries.";

export const Route = createFileRoute("/")(
  {
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
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Industries />
        <TechStack />
        <Products />
        <Process />
        <WhyStalci />
        <Testimonials />
        <Insights />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
