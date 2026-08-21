import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchIndustries } from "@/lib/api";
import { BadgePill } from "./Brand";
import { motion, AnimatePresence } from "framer-motion";

interface IndustryDetail {
  id: string;
  name: string;
  slug: string;
  title: string;
  summary: string;
  bullets: string[];
  imageUrl: string;
}

const industryList: IndustryDetail[] = [
  {
    id: "real-estate",
    name: "Real Estate",
    slug: "proptech",
    title: "Real Estate & PropTech",
    summary:
      "We're digitizing the property lifecycle, from immersive AR-powered virtual tours to AI-driven platforms that optimize property management and predict market trends.",
    bullets: [
      "AI-driven property valuation models",
      "IoT for intelligent building management",
      "VR/AR for immersive property showcases",
      "Predictive analytics for investment opportunities",
      "Smart contract-based transaction platforms",
    ],
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: "fintech",
    name: "FinTech",
    slug: "fintech-banking",
    title: "FinTech & Banking Infrastructure",
    summary:
      "High-throughput transactional ledgers, PCI-DSS compliant payment gateways, and autonomous fraud detection engines running at sub-millisecond execution speeds.",
    bullets: [
      "Sub-millisecond ledger and settlement engines",
      "Automated PCI-DSS v4.0 compliance & tokenization",
      "Real-time ML fraud detection & anomaly scoring",
      "Multi-currency neo-banking & automated payouts",
      "High-frequency market connectivity & analytics",
    ],
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    slug: "healthcare",
    title: "Healthcare & Life Sciences",
    summary:
      "HIPAA-compliant clinical workflows, FHIR data interoperability pipelines, and AI-augmented diagnostic telemetry built for hospitals and health networks.",
    bullets: [
      "100% HIPAA & HL7/FHIR compliant data pipelines",
      "Real-time clinical telemetry & patient monitoring",
      "Secure telemedicine platforms with end-to-end encryption",
      "AI diagnostic assistants for clinical report analysis",
      "Zero-trust biometric access controls for medical records",
    ],
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    slug: "retail",
    title: "E-Commerce & Digital Retail",
    summary:
      "Headless storefronts, real-time omnichannel inventory synchronizers, and algorithmic product recommendation engines engineered for high-concurrency peak sales.",
    bullets: [
      "Sub-second headless storefronts on Next.js 16",
      "Real-time multi-warehouse inventory allocation",
      "AI-driven predictive personalization & upsell engines",
      "Automated omni-channel checkout & tax calculation",
      "Resilient high-traffic flash sale scaling architecture",
    ],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: "entertainment",
    name: "Entertainment",
    slug: "media-telecom",
    title: "Media & Entertainment Streaming",
    summary:
      "Ultra-low latency live video streaming, edge caching distribution, and dynamic content delivery networks handling millions of concurrent subscribers.",
    bullets: [
      "Low-latency HLS/WebRTC video streaming pipelines",
      "Global edge content distribution on Cloudflare",
      "Dynamic DRM protection & watermarking algorithms",
      "Interactive audience engagement & polling engines",
      "Multi-platform native playback SDKs for mobile & web",
    ],
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: "edtech",
    name: "EdTech",
    slug: "education",
    title: "Education & Adaptive Learning",
    summary:
      "Personalized learning management systems, automated assessment engines, and collaborative virtual classrooms supporting global student bodies.",
    bullets: [
      "Adaptive learning paths powered by private LLMs",
      "Automated assignment grading & code sandboxes",
      "Real-time interactive virtual classroom environments",
      "Gamified progress tracking & credential verification",
      "High-concurrency exam proctoring & telemetry",
    ],
    imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: "sports",
    name: "Sports",
    slug: "gaming",
    title: "Gaming & Sports Telemetry",
    summary:
      "Real-time sports state management, low-latency live score tickers, and multiplayer game servers engineered in Go and Rust.",
    bullets: [
      "Sub-20ms WebSocket state synchronization",
      "Real-time sports match telemetry & heatmaps",
      "Scalable matchmaking & leaderboard microservices",
      "Low-latency push notifications for live events",
      "Cross-platform state persistence with Redis clusters",
    ],
    imageUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: "logistics",
    name: "Logistics",
    slug: "logistics",
    title: "Supply Chain & Fleet Logistics",
    summary:
      "Autonomous dispatch routing, IoT telematics ingestion pipelines, and predictive supply chain visibility dashboards.",
    bullets: [
      "Live GPS fleet telematics & geofencing pipelines",
      "Dynamic route optimization & fuel reduction models",
      "Automated bill-of-lading processing with OCR",
      "Real-time carrier tracking & ETA predictions",
      "IoT sensor telemetry for cold-chain monitoring",
    ],
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&auto=format&fit=crop&q=80",
  },
];

export function Industries() {
  const [activeTab, setActiveTab] = useState<string>("real-estate");

  const current = industryList.find((i) => i.id === activeTab) || industryList[0];

  return (
    <section id="industries" className="border-t border-zinc-200/90 bg-[#FFFFFF] py-16 sm:py-24 text-black relative isolate overflow-hidden">
      {/* Subtle Crosshatch SVG Mesh */}
      <div 
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#F1F5F9_1px,transparent_1px),linear-gradient(to_bottom,#F1F5F9_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-80" 
        aria-hidden 
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ─── Header Section (Screenshot 3 Match) ─── */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <h2 className="font-display text-2xl sm:text-3xl md:text-[34px] font-bold text-zinc-950 tracking-tight leading-[1.2]">
            Fluent in the Language of Your <span className="font-extrabold text-black">Industry's Code</span>
          </h2>

          <p className="text-xs sm:text-[14px] text-zinc-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Tech is universal, but every industry has its own rules. We've shipped in FinTech, Healthcare, Real Estate, Logistics, EdTech, Media, Sports, and E-commerce, so we already speak your domain's language on day one.
          </p>
        </div>

        {/* ─── Category Filter Pills Bar (Screenshot 3 Match) ─── */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-2">
          <div className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-white p-1.5 shadow-2xs">
            {industryList.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  activeTab === item.id
                    ? "bg-black text-white shadow-xs"
                    : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* ─── Big Showcase Card (Screenshot 3 Match) ─── */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl border border-zinc-200/90 bg-[#FAFAFC] p-8 sm:p-12 shadow-xs hover:border-zinc-300 transition-all"
            >
              <div className="grid gap-10 lg:grid-cols-12 items-center">
                
                {/* Left Column (60%): Title, Description, Bullets */}
                <div className="lg:col-span-7 space-y-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight">
                    {current.title}
                  </h3>

                  <p className="text-xs sm:text-[14px] leading-relaxed text-zinc-600 font-normal">
                    {current.summary}
                  </p>

                  <div className="space-y-3 pt-2">
                    {current.bullets.map((b, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-xs sm:text-[13.5px] text-zinc-800 font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-zinc-950 shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Link
                      to="/industries/$slug"
                      params={{ slug: current.slug }}
                      className="inline-flex items-center gap-2 text-xs font-bold text-zinc-950 hover:text-blue-600 transition-colors"
                    >
                      <span>Explore {current.name} Solutions</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Right Column (40%): 3D Architectural / Tech Render Image */}
                <div className="lg:col-span-5">
                  <div className="relative h-[280px] sm:h-[340px] w-full rounded-2xl overflow-hidden border border-zinc-200/80 shadow-md bg-zinc-100">
                    <img
                      src={current.imageUrl}
                      alt={current.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
