import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Wordmark } from "@/components/site/Brand";
import { Globe, Cpu, ShieldCheck, Zap, ArrowRight, Award, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — STALCI Global Technology & Software Studio" },
      {
        name: "description",
        content:
          "Learn about STALCI: Our mission, sovereign AI principles, multi-cloud architectures, leadership team, and global engineering hubs in San Francisco, London, and Singapore.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const leadership = [
    {
      name: "Dr. Elena Rostova",
      role: "Chief Technology Officer & AI Principal",
      bio: "Former Distributed Systems Lead at MIT AI Lab. 14+ years engineering high-concurrency vector engines and sovereign AI models.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    },
    {
      name: "Marcus Vance",
      role: "VP of Cloud & Security Infrastructure",
      bio: "Ex-AWS Principal Cloud Architect. Pioneer in zero-trust service mesh design, Kubernetes FinOps, and multi-region failover topologies.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    },
    {
      name: "Aria Thorne",
      role: "Director of Product Engineering",
      bio: "Specializes in React 19 micro-frontend architectures, high-frequency design tokens, and fluid 120 FPS mobile frameworks.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    },
  ];

  const locations = [
    { city: "San Francisco", region: "Americas Hub", address: "500 Howard Street, Suite 400", tz: "PST (UTC-8)" },
    { city: "London", region: "EMEA Hub", address: "30 St Mary Axe, 14th Floor", tz: "GMT (UTC+0)" },
    { city: "Singapore", region: "APAC Hub", address: "1 Marina Boulevard, Level 28", tz: "SGT (UTC+8)" },
  ];

  const principles = [
    {
      title: "1. Zero-Surprise Deterministic Delivery",
      description: "We don't deal in vague roadmaps. Every project operates on strict 14-day sprint cycles with explicit code deliverables and verifiable benchmark proofs.",
    },
    {
      title: "2. Absolute Data Sovereignty",
      description: "Client data belongs solely to the client. Our sovereign AI architectures run within isolated, air-gapped VPC enclaves with zero third-party telemetry leakage.",
    },
    {
      title: "3. Production-First Quality Standard",
      description: "No fragile prototypes or proof-of-concept scripts. Every line of code is strictly typed, covered by automated integration tests, and ready for production load.",
    },
    {
      title: "4. Senior Architectural Staffing",
      description: "You work directly with principal systems architects and staff engineers who have built and scaled systems handling millions of requests per second.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-zinc-800 selection:text-white font-sans">
      <Nav solid />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24 border-b border-white/10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[20rem] bg-white/[0.03] blur-[140px] pointer-events-none" />
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-medium text-zinc-300">
              <Award className="h-3.5 w-3.5 text-amber-400" />
              Global Engineering Excellence
            </span>
            <h1 className="mt-5 font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              We Build Software That <br />
              <span className="text-zinc-400">Powers Enterprise Scale</span>
            </h1>
            <p className="mt-5 max-w-3xl mx-auto text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
              STALCI is a global technology company and software studio. We design, build, and operate sovereign AI systems, multi-cloud platforms, and high-performance digital products for ambitious enterprises worldwide.
            </p>
          </div>
        </section>

        {/* Operating Model / Empirical Numbers */}
        <section className="py-16 sm:py-20 border-b border-white/10 bg-[#060608]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-6 rounded-2xl border border-white/10 bg-[#0C0C0E]">
                <div className="text-3xl sm:text-4xl font-bold font-mono text-white">45+</div>
                <div className="text-xs text-zinc-400 mt-1">Enterprise Platforms Shipped</div>
              </div>
              <div className="p-6 rounded-2xl border border-white/10 bg-[#0C0C0E]">
                <div className="text-3xl sm:text-4xl font-bold font-mono text-white">99.99%</div>
                <div className="text-xs text-zinc-400 mt-1">Guaranteed SLA Uptime</div>
              </div>
              <div className="p-6 rounded-2xl border border-white/10 bg-[#0C0C0E]">
                <div className="text-3xl sm:text-4xl font-bold font-mono text-white">100%</div>
                <div className="text-xs text-zinc-400 mt-1">Data Sovereignty Control</div>
              </div>
              <div className="p-6 rounded-2xl border border-white/10 bg-[#0C0C0E]">
                <div className="text-3xl sm:text-4xl font-bold font-mono text-white">14-Day</div>
                <div className="text-xs text-zinc-400 mt-1">Sprint Delivery Lifecycles</div>
              </div>
            </div>
          </div>
        </section>

        {/* Engineering Principles */}
        <section className="py-16 sm:py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Our Core Engineering Principles
            </h2>
            <p className="mt-3 text-sm text-zinc-400">
              The foundational pillars that guide how we write code, architect infrastructure, and partner with clients.
            </p>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto">
            {principles.map((p, idx) => (
              <div key={idx} className="rounded-2xl border border-white/10 bg-[#0C0C0E] p-7">
                <h3 className="text-lg font-bold text-white tracking-tight">{p.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-16 sm:py-24 border-t border-white/10 bg-[#060608]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                Architectural Leadership
              </h2>
              <p className="mt-3 text-sm text-zinc-400">
                Led by veteran systems architects, AI researchers, and cloud infrastructure engineers.
              </p>
            </div>

            <div className="grid gap-8 grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto">
              {leadership.map((member) => (
                <div key={member.name} className="rounded-3xl border border-white/10 bg-[#0C0C0E] p-6 text-center">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-white/10 shadow-lg"
                  />
                  <h3 className="mt-4 text-lg font-bold text-white">{member.name}</h3>
                  <p className="text-xs font-mono text-emerald-400 mt-0.5">{member.role}</p>
                  <p className="mt-3 text-xs text-zinc-400 leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Hubs */}
        <section className="py-16 sm:py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Globe className="h-8 w-8 text-white mx-auto mb-3" />
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Global Engineering Hubs
            </h2>
            <p className="mt-3 text-sm text-zinc-400">
              Distributed operational centers supporting continuous 24/7 client delivery across time zones.
            </p>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto">
            {locations.map((loc) => (
              <div key={loc.city} className="rounded-2xl border border-white/10 bg-[#0C0C0E] p-6">
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-400">{loc.region}</span>
                <h3 className="text-xl font-bold text-white mt-1">{loc.city}</h3>
                <p className="text-xs text-zinc-400 mt-2">{loc.address}</p>
                <span className="inline-block mt-4 text-[10px] font-mono text-zinc-500 bg-white/5 px-2.5 py-1 rounded border border-white/10">
                  {loc.tz}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-xs sm:text-sm font-semibold text-black hover:bg-zinc-200 transition-colors shadow-lg"
            >
              <span>Schedule an Architectural Intake</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
