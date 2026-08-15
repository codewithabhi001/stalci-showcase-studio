import { useState } from "react";
import { SectionHeading } from "./Brand";
import {
  ExternalLink,
  X,
  Maximize2,
  ChevronRight,
  Award,
  Layers,
  Cpu,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CaseStudyItem {
  id: string;
  title: string;
  client: string;
  category: "Mobile Apps" | "Web Platforms" | "Enterprise IT" | "AI Systems";
  summary: string;
  fullDescription: string;
  imageUrl: string;
  liveUrl?: string;
  metrics: { label: string; value: string }[];
  technologies: string[];
  clientFeedback?: string;
}

const featuredCaseStudies: CaseStudyItem[] = [
  {
    id: "la-savista",
    title: "La Savista",
    client: "Accessibility Foundation",
    category: "Mobile Apps",
    summary:
      "Smart accessibility app enabling guided navigation, indoor beacon routing, and location-based audio cues for visually impaired citizens.",
    fullDescription:
      "Engineered an offline-first accessibility application for La Savista that pairs high-accuracy Bluetooth Low Energy (BLE) indoor beacons with spatial audio feedback, voice synthesis, and real-time transit routing across high-density public hubs.",
    imageUrl:
      "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&auto=format&fit=crop&q=80",
    liveUrl: "https://lasavista.app",
    metrics: [
      { label: "Nav Latency", value: "<12ms" },
      { label: "Crash-Free Rate", value: "99.8%" },
      { label: "Indoor Accuracy", value: "0.5m" },
      { label: "Active Users", value: "45k+" },
    ],
    technologies: ["React Native", "TypeScript", "BLE Beacons", "Node.js", "WebSockets", "Cloudflare"],
    clientFeedback:
      "STALCI crafted an empowering, lightning-fast mobile experience that sets the gold standard for accessibility software.",
  },
  {
    id: "melly",
    title: "Melly",
    client: "Melly Health Inc.",
    category: "Mobile Apps",
    summary:
      "AI-powered mental wellness app that pairs Gemini-driven coaching with CBT exercises, journals, and streak tracking to build daily self-awareness.",
    fullDescription:
      "Architected and deployed the Melly mental wellness platform. Incorporates conversational AI agents running fine-tuned cognitive behavioral therapy (CBT) reflection models, biometric stress sync, end-to-end encrypted journaling, and positive habit gamification.",
    imageUrl:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80",
    liveUrl: "https://mellywellness.com",
    metrics: [
      { label: "Daily Active Retention", value: "78%" },
      { label: "App Store Rating", value: "4.9★" },
      { label: "Journal Encryption", value: "AES-256" },
      { label: "Response Latency", value: "<400ms" },
    ],
    technologies: ["React Native", "Expo", "Python", "FastAPI", "PostgreSQL", "Gemini AI", "Tailwind"],
    clientFeedback:
      "The STALCI engineering squad brought our AI wellness vision to life with extreme care for data privacy and user delight.",
  },
  {
    id: "streambase",
    title: "StreamBase",
    client: "StreamBase AV Networks",
    category: "Enterprise IT",
    summary:
      "AV over IP platform that replaces matrix switches with ultra-low latency streaming, real-time diagnostics, and centralized control on every connected device.",
    fullDescription:
      "Built the mission-critical distributed control plane and browser interface for StreamBase AV. Enables uncompressed 4K60 video switching over 10GbE network fabrics with sub-frame 1ms switching latency, telemetry logging, and dynamic matrix routing.",
    imageUrl:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    liveUrl: "https://streambase.io",
    metrics: [
      { label: "Switching Latency", value: "<1ms" },
      { label: "Concurrent Streams", value: "1,000+" },
      { label: "Network Uptime", value: "99.999%" },
      { label: "Bandwidth Util", value: "10GbE" },
    ],
    technologies: ["Next.js 16", "Go (Golang)", "WebSockets", "WebRTC", "Docker", "eBPF", "PostgreSQL"],
    clientFeedback:
      "StreamBase revolutionized our enterprise AV installations. The stability and responsiveness are unmatched in our industry.",
  },
  {
    id: "gr-class",
    title: "GR Class",
    client: "GR Class Directorate",
    category: "Web Platforms",
    summary:
      "Recognized Organization (RO) digital vessel classification, statutory survey tracking, and maritime certification suite across 120+ global ports.",
    fullDescription:
      "Architected and built the enterprise digital infrastructure for GR Class — a Recognized Organization (RO) and Classification Society. The platform handles statutory vessel surveys, fleet compliance tracking, digital ISO certificate issuance, and real-time surveyor dispatch.",
    imageUrl: "/projects/grclass-preview.jpg",
    liveUrl: "https://grclass.com/",
    metrics: [
      { label: "Global Ports Covered", value: "120+" },
      { label: "Certificates Issued", value: "500+" },
      { label: "ISO Aligned", value: "9001/14001" },
      { label: "Dispatch Latency", value: "<15 Mins" },
    ],
    technologies: ["Next.js 16", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Docker", "Cloudflare"],
    clientFeedback:
      "STALCI delivered a digital classification system that elevated our global maritime compliance operations instantly.",
  },
  {
    id: "konvo-shoes",
    title: "Konvo Shoes",
    client: "Konvo Footwear Group",
    category: "Web Platforms",
    summary:
      "High-volume B2B wholesale storefront with automated GST tax-compliant invoicing, real-time inventory reservation, and express dispatch logistics.",
    fullDescription:
      "Engineered the modern B2B wholesale storefront and ERP inventory engine for Konvo Shoes, enabling footwear retailers across India to place bulk wholesale orders with automated GST ITC invoicing, multi-warehouse stock reservation, and express dispatch integration.",
    imageUrl: "/projects/konvoshoes-preview.jpg",
    liveUrl: "https://konvoshoes.com/",
    metrics: [
      { label: "Annual GMV", value: "₹15 Cr+" },
      { label: "Retail Partners", value: "10,000+" },
      { label: "Invoice Accuracy", value: "100%" },
      { label: "Dispatch Speed", value: "Same Day" },
    ],
    technologies: ["React 19", "Vite", "TanStack Query", "Tailwind CSS", "NestJS", "PostgreSQL", "Razorpay"],
    clientFeedback:
      "STALCI built our complete wholesale engine — handling bulk ordering, GST invoicing and payments flawlessly.",
  },
  {
    id: "apnisabha",
    title: "ApniSabha",
    client: "ApniSabha Foundation",
    category: "AI Systems",
    summary:
      "Apna Manch, Apni Awaaz — Real-time community civic discussion, problem resolution escalation, and transparent public collaboration platform.",
    fullDescription:
      "Designed and implemented ApniSabha, a digital civic engagement platform where citizens raise verified local issues, participate in transparent polls, collaborate with municipal representatives, and amplify community progress.",
    imageUrl: "/projects/apnisabha-preview.jpg",
    liveUrl: "https://apnisabha.com/",
    metrics: [
      { label: "Active Citizens", value: "250k+" },
      { label: "Issues Resolved", value: "85k+" },
      { label: "Engagement", value: "4.8M Posts" },
      { label: "Platform Uptime", value: "99.9%" },
    ],
    technologies: ["React 19", "Vite", "Tailwind CSS", "Node.js", "WebSockets", "PostgreSQL", "Cloudflare"],
    clientFeedback:
      "ApniSabha gives power back to the community. STALCI engineered a fast, secure, and beautiful platform.",
  },
];

const categories = ["All", "Mobile Apps", "Web Platforms", "Enterprise IT", "AI Systems"] as const;

export function ProjectsShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudyItem | null>(null);

  const filteredProjects = featuredCaseStudies.filter((p) => {
    if (selectedCategory === "All") return true;
    return p.category === selectedCategory;
  });

  return (
    <section id="projects" className="bg-[#FFFFFF] py-20 sm:py-28 text-black border-t border-zinc-200/90 relative">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          tone="light"
          eyebrow="Proven Track Record"
          title="Explore Our Featured Case Studies"
          subtitle="We are proud of the mobile and web platforms we deliver. Here is a glimpse of the real results and architecture for businesses."
        />

        {/* Filter Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const count =
              cat === "All"
                ? featuredCaseStudies.length
                : featuredCaseStudies.filter((p) => p.category === cat).length;
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-black text-white font-semibold shadow-xs"
                    : "bg-zinc-50 text-zinc-700 border border-zinc-200 hover:border-zinc-400 hover:text-black"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                    isSelected ? "bg-white/20 text-white" : "bg-zinc-200 text-zinc-700"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Case Studies Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => setActiveCaseStudy(p)}
              className="group rounded-2xl bg-white border border-zinc-200/90 p-5 shadow-xs hover:border-zinc-400 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail */}
                <div className="relative h-48 w-full rounded-xl overflow-hidden bg-zinc-100 border border-zinc-100">
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&auto=format&fit=crop&q=80";
                    }}
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-black/85 text-white backdrop-blur-md">
                      {p.category}
                    </span>
                  </div>
                  <div className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/80 text-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="h-3.5 w-3.5" />
                  </div>
                </div>

                {/* Content */}
                <div className="mt-4">
                  <h3 className="font-display text-lg font-bold text-zinc-950 group-hover:text-zinc-700 transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 font-normal line-clamp-3">
                    {p.summary}
                  </p>
                </div>
              </div>

              {/* Bottom Info */}
              <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-950 group-hover:text-zinc-700 flex items-center gap-1">
                  View Case Study <ChevronRight className="h-3 w-3" />
                </span>

                <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-500">
                  <Award className="h-3 w-3 text-zinc-600" />
                  <span className="font-medium">{p.metrics[0].value}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {activeCaseStudy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white text-black shadow-xl my-6 max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-100 bg-zinc-50">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-black text-white">
                    {activeCaseStudy.category}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">
                    Client: {activeCaseStudy.client}
                  </span>
                </div>

                <button
                  onClick={() => setActiveCaseStudy(null)}
                  className="p-1.5 rounded-full bg-zinc-200 text-zinc-700 hover:text-black transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-5">
                <div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-zinc-950 leading-tight">
                    {activeCaseStudy.title}
                  </h2>
                  <p className="mt-1.5 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    {activeCaseStudy.summary}
                  </p>
                </div>

                {/* Banner */}
                <div className="h-52 sm:h-64 w-full rounded-xl overflow-hidden border border-zinc-200 relative">
                  <img
                    src={activeCaseStudy.imageUrl}
                    alt={activeCaseStudy.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* KPIs */}
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-800 mb-2.5 flex items-center gap-1.5">
                    <Award className="h-3.5 w-3.5 text-zinc-700" /> Key Performance Indicators (KPIs)
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {activeCaseStudy.metrics.map((m, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-center">
                        <span className="block font-mono text-lg font-bold text-zinc-950">
                          {m.value}
                        </span>
                        <span className="block text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5 font-medium">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scope */}
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-800 mb-2 flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-zinc-700" /> Architecture & Scope
                  </h4>
                  <p className="text-xs sm:text-sm leading-relaxed text-zinc-600">
                    {activeCaseStudy.fullDescription}
                  </p>
                </div>

                {/* Client Quote */}
                {activeCaseStudy.clientFeedback && (
                  <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 italic text-xs sm:text-sm text-zinc-700 flex items-start gap-2.5">
                    <span className="text-xl text-zinc-400 font-serif leading-none">“</span>
                    <p>{activeCaseStudy.clientFeedback}</p>
                  </div>
                )}

                {/* Technologies */}
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-800 mb-2 flex items-center gap-1.5">
                    <Cpu className="h-3.5 w-3.5 text-zinc-700" /> Technology Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeCaseStudy.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-zinc-100 text-zinc-700 border border-zinc-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 py-3 border-t border-zinc-100 bg-zinc-50 flex items-center justify-between">
                {activeCaseStudy.liveUrl ? (
                  <a
                    href={activeCaseStudy.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-semibold text-white bg-black hover:bg-zinc-800 transition-colors"
                  >
                    <span>Visit Live Website</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <span className="text-xs text-zinc-500 font-mono">Enterprise Platform</span>
                )}

                <button
                  onClick={() => setActiveCaseStudy(null)}
                  className="text-xs font-medium text-zinc-500 hover:text-black cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
