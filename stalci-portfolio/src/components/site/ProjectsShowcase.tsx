import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "@/lib/api";
import { SectionHeading } from "./Brand";
import {
  ArrowUpRight,
  ExternalLink,
  Building,
  CheckCircle2,
  X,
  Globe,
  Award,
  Maximize2,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const fallbackProjects = [
  {
    id: 9,
    title: "GR Class — Ship Classification & Statutory Surveys Portal",
    slug: "gr-class-maritime-survey-platform",
    description: "Recognized Organization (RO) digital vessel classification, statutory survey tracking, and maritime certification suite.",
    fullDescription: "Architected and built the enterprise digital infrastructure for GR Class — a Recognized Organization (RO) and Classification Society. The platform handles statutory vessel surveys, fleet compliance tracking, digital ISO certificate issuance, and real-time surveyor dispatch across 120+ global ports worldwide.",
    category: "Maritime Tech & Cloud",
    client: { company: "GR Class Directorate", name: "Capt. Alex Carter" },
    services: JSON.stringify(["Custom Software", "Cloud Architecture", "Cyber Security & Compliance", "DevOps & SRE"]),
    technologies: JSON.stringify(["Next.js 16", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Docker", "Cloudflare"]),
    imageUrl: "/projects/grclass-preview.jpg",
    liveUrl: "https://grclass.com/",
    githubUrl: "https://github.com/stalci/grclass-maritime-portal",
    metrics: JSON.stringify([
      { label: "Global Ports Covered", value: "120+" },
      { label: "Certificates Issued", value: "500+" },
      { label: "ISO Aligned", value: "9001 / 14001" },
      { label: "Dispatch Latency", value: "<15 Mins" },
    ]),
    clientFeedback: "STALCI delivered a digital classification system that elevated our global maritime compliance operations instantly.",
    featured: true,
  },
  {
    id: 10,
    title: "Konvo Shoes — B2B & Wholesale Footwear E-Commerce Hub",
    slug: "konvo-shoes-b2b-e-commerce-portal",
    description: "High-volume B2B wholesale storefront with GST tax-compliant invoicing, real-time inventory, and express dispatch logistics.",
    fullDescription: "Engineered the modern B2B storefront and inventory engine for Konvo Shoes, enabling footwear retailers across India to place bulk wholesale orders with automated GST Input Tax Credit (ITC) invoicing, multi-warehouse stock reservation, factory quality verification badges, and instant express dispatch integration.",
    category: "E-Commerce & Retail Tech",
    client: { company: "Konvo Footwear Group", name: "Rajesh Sharma" },
    services: JSON.stringify(["E-Commerce Solutions", "Full Stack Development", "Payment & ERP Integration", "UI/UX Design"]),
    technologies: JSON.stringify(["React 19", "Vite", "TanStack Query", "Tailwind CSS", "NestJS", "PostgreSQL", "Razorpay UPI"]),
    imageUrl: "/projects/konvoshoes-preview.jpg",
    liveUrl: "https://konvoshoes.com/",
    githubUrl: "https://github.com/stalci/konvoshoes-b2b-platform",
    metrics: JSON.stringify([
      { label: "Annual GMV Processed", value: "₹15 Cr+" },
      { label: "Retail Partners", value: "10,000+" },
      { label: "GST Invoice Accuracy", value: "100%" },
      { label: "Dispatch Speed", value: "Same Day" },
    ]),
    clientFeedback: "STALCI built our complete wholesale engine — handling bulk ordering, GST invoicing and payments flawlessly.",
    featured: true,
  },
  {
    id: 11,
    title: "ApniSabha — Digital Civic Engagement & Community Platform",
    slug: "apnisabha-civic-community-platform",
    description: "Apna Manch, Apni Awaaz — Real-time community discussion, civic problem-solving, and transparent public collaboration platform.",
    fullDescription: "Designed and implemented ApniSabha ('Apna Manch, Apni Awaaz'), a digital community engagement platform where citizens raise local issues, participate in verified polls, collaborate on civic improvements, and amplify their voice with complete trust and transparency.",
    category: "Civic Tech & Community",
    client: { company: "ApniSabha Foundation", name: "Priya Verma" },
    services: JSON.stringify(["Custom Software", "AI & Agentic Systems", "Cloud Engineering", "UI/UX Design"]),
    technologies: JSON.stringify(["React 19", "Vite", "Tailwind CSS", "Node.js", "WebSockets", "PostgreSQL", "Cloudflare"]),
    imageUrl: "/projects/apnisabha-preview.jpg",
    liveUrl: "https://apnisabha.com/",
    githubUrl: "https://github.com/stalci/apnisabha-community-engine",
    metrics: JSON.stringify([
      { label: "Active Members", value: "250,000+" },
      { label: "Issues Resolved", value: "85,000+" },
      { label: "Engagement", value: "4.8M Posts" },
      { label: "Platform Uptime", value: "99.9%" },
    ]),
    clientFeedback: "ApniSabha gives power back to the community. STALCI engineered a fast, secure, and beautiful platform.",
    featured: true,
  },
];

export function ProjectsShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeCaseStudy, setActiveCaseStudy] = useState<any | null>(null);
  const [modalTab, setModalTab] = useState<"overview" | "preview">("overview");

  const { data: apiProjects } = useQuery({
    queryKey: ["portfolio-projects", selectedCategory],
    queryFn: () => fetchProjects(selectedCategory),
  });

  const projects = apiProjects && apiProjects.length > 0 ? apiProjects : fallbackProjects;

  const categories = ["All", ...Array.from(new Set(projects.map((p: any) => p.category).filter(Boolean)))];

  const filtered = projects.filter((p: any) => {
    if (selectedCategory === "All") return true;
    return p.category === selectedCategory;
  });

  return (
    <section id="projects" className="relative bg-[#F8FAFC] py-24 sm:py-32 overflow-hidden text-slate-900 border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="Featured Live Projects"
          title="Flagship Client Showcase"
          subtitle="Explore our real-world, high-impact enterprise platforms currently serving thousands of users worldwide."
          tone="light"
        />

        {/* Category Filter Pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          {categories.map((cat) => {
            const count = cat === "All" ? projects.length : projects.filter((p: any) => p.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-white text-slate-700 border border-slate-200/90 hover:border-[#D89B5B] hover:text-slate-950"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                    isSelected ? "bg-[#D89B5B] text-slate-950 font-bold" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filtered.map((p: any, idx: number) => {
            let techList: string[] = [];
            try {
              techList = typeof p.technologies === "string" ? JSON.parse(p.technologies) : p.technologies || [];
            } catch {
              techList = [];
            }

            let metricsList: { label: string; value: string }[] = [];
            try {
              metricsList = typeof p.metrics === "string" ? JSON.parse(p.metrics) : p.metrics || [];
            } catch {
              metricsList = [];
            }

            let displayDomain = "live-app.com";
            try {
              if (p.liveUrl) {
                const parsed = new URL(p.liveUrl);
                displayDomain = parsed.hostname;
              }
            } catch {
              displayDomain = p.liveUrl || "live-app.com";
            }

            return (
              <motion.div
                key={p.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D89B5B]/80 hover:shadow-2xl"
              >
                {/* Simulated Browser Frame Header */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100/90 border-b border-slate-200">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400 inline-block" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400 inline-block" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 inline-block" />
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-mono text-slate-600 max-w-[170px] truncate shadow-2xs">
                    <Globe className="h-3 w-3 text-[#9E6229] shrink-0" />
                    <span className="truncate">{displayDomain}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider">
                      Live
                    </span>
                  </div>
                </div>

                {/* Project Image Preview Container */}
                <div 
                  className="relative h-60 w-full overflow-hidden bg-slate-100 cursor-pointer" 
                  onClick={() => { setActiveCaseStudy(p); setModalTab("overview"); }}
                >
                  <img
                    src={p.imageUrl || "/projects/grclass-preview.jpg"}
                    alt={p.title}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  {/* Category Pill Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-[10.5px] font-bold uppercase tracking-wider bg-white text-slate-900 border border-slate-200 shadow-md font-mono">
                      {p.category}
                    </span>
                  </div>

                  {/* Expand Modal Quick Trigger */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCaseStudy(p);
                      setModalTab("overview");
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 border border-slate-200 text-slate-800 hover:bg-[#9E6229] hover:text-white transition-all duration-200 shadow-md cursor-pointer"
                    title="Expand Case Study"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4 bg-white">
                  <div>
                    {p.client?.company && (
                      <div className="flex items-center gap-1.5 text-xs text-[#9E6229] font-bold mb-1">
                        <Building className="h-3.5 w-3.5" />
                        <span>{p.client.company}</span>
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-slate-950 group-hover:text-[#9E6229] transition-colors leading-snug">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-3">
                      {p.description}
                    </p>
                  </div>

                  {/* High-Impact Metric Cards */}
                  {metricsList.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 py-2.5 border-y border-slate-100 bg-[#F8FAFC] rounded-2xl px-2.5">
                      {metricsList.slice(0, 2).map((m, mIdx) => (
                        <div key={mIdx} className="bg-white p-2.5 rounded-xl border border-slate-200/80 text-center shadow-2xs">
                          <span className="block font-mono text-sm font-black text-[#9E6229]">
                            {m.value}
                          </span>
                          <span className="block text-[9.5px] text-slate-500 uppercase tracking-wider font-semibold truncate font-mono">
                            {m.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {techList.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-[#F8FAFC] text-slate-700 border border-slate-200"
                      >
                        {t}
                      </span>
                    ))}
                    {techList.length > 4 && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-100 text-slate-500 border border-slate-200">
                        +{techList.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Primary CTA Buttons */}
                  <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-[#9E6229] transition-all duration-200 shadow-xs cursor-pointer"
                      >
                        <span>Visit Live Website</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}

                    <button
                      onClick={() => {
                        setActiveCaseStudy(p);
                        setModalTab("overview");
                      }}
                      className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:text-[#9E6229] transition-all duration-200 cursor-pointer"
                    >
                      <span>Explore Case Study & Specs</span>
                      <ChevronRight className="h-3.5 w-3.5 text-[#9E6229]" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {activeCaseStudy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-2xl my-6 max-h-[92vh] overflow-hidden flex flex-col"
            >
              {/* Modal Top Nav Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-[10.5px] font-bold uppercase tracking-wider bg-[#FDF6ED] text-[#9E6229] border border-[#EED7BF] font-mono">
                    {activeCaseStudy.category}
                  </span>
                  <div className="flex items-center gap-1 rounded-lg bg-slate-200/80 p-1">
                    <button
                      onClick={() => setModalTab("overview")}
                      className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                        modalTab === "overview" ? "bg-white text-slate-900 shadow-2xs font-bold" : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Overview & Architecture
                    </button>
                    {activeCaseStudy.liveUrl && (
                      <button
                        onClick={() => setModalTab("preview")}
                        className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                          modalTab === "preview" ? "bg-white text-slate-900 shadow-2xs font-bold" : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <Globe className="h-3.5 w-3.5" />
                        <span>Live Site Frame</span>
                      </button>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setActiveCaseStudy(null)}
                  className="p-2 rounded-full bg-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-300 transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-8">
                {modalTab === "preview" && activeCaseStudy.liveUrl ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-slate-100 p-3 rounded-xl border border-slate-200">
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-700">
                        <Globe className="h-4 w-4 text-[#9E6229]" />
                        <span>{activeCaseStudy.liveUrl}</span>
                      </div>
                      <a
                        href={activeCaseStudy.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9E6229] hover:underline"
                      >
                        Open in New Tab <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>

                    <div className="w-full h-[500px] rounded-2xl overflow-hidden border border-slate-300 bg-white shadow-inner relative">
                      <iframe
                        src={activeCaseStudy.liveUrl}
                        title={activeCaseStudy.title}
                        className="w-full h-full border-none"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Header Details */}
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight leading-tight">
                        {activeCaseStudy.title}
                      </h2>
                      {activeCaseStudy.client?.company && (
                        <p className="mt-2 text-sm text-[#9E6229] font-medium flex items-center gap-2">
                          <Building className="h-4 w-4 text-[#9E6229]" />
                          <span>Client Partner: {activeCaseStudy.client.company}</span>
                        </p>
                      )}
                    </div>

                    {/* Preview Image Banner */}
                    <div className="h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-slate-200 relative shadow-md">
                      <img
                        src={activeCaseStudy.imageUrl}
                        alt={activeCaseStudy.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Key Metric Highlights */}
                    {activeCaseStudy.metrics && (
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5 font-mono">
                          <Award className="h-4 w-4 text-[#9E6229]" /> Key Performance Indicators (KPIs)
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {(() => {
                            let mList = [];
                            try {
                              mList = typeof activeCaseStudy.metrics === "string" ? JSON.parse(activeCaseStudy.metrics) : activeCaseStudy.metrics;
                            } catch {
                              mList = [];
                            }
                            return mList.map((m: any, idx: number) => (
                              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                                <span className="block font-mono text-xl font-black text-[#9E6229]">
                                  {m.value}
                                </span>
                                <span className="block text-[10.5px] text-slate-500 uppercase tracking-wider mt-1 font-semibold font-mono">
                                  {m.label}
                                </span>
                              </div>
                            ));
                          })()}
                        </div>
                      </div>
                    )}

                    {/* Full Description & Narrative */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5 font-mono">
                        Architecture & Full Scope
                      </h4>
                      <p className="text-sm sm:text-base leading-relaxed text-slate-700 whitespace-pre-line">
                        {activeCaseStudy.fullDescription || activeCaseStudy.description}
                      </p>
                    </div>

                    {/* Client Quote */}
                    {activeCaseStudy.clientFeedback && (
                      <div className="p-5 rounded-2xl bg-[#FDF6ED] border border-[#EED7BF] italic text-sm text-slate-900 flex items-start gap-3">
                        <span className="text-2xl text-[#9E6229] font-serif">“</span>
                        <p>{activeCaseStudy.clientFeedback}</p>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Modal Footer Actions */}
              <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  {activeCaseStudy.liveUrl && (
                    <a
                      href={activeCaseStudy.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-[#9E6229] transition-all duration-200 shadow-sm"
                    >
                      <ExternalLink className="h-4 w-4" /> Launch Live Website
                    </a>
                  )}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" /> Verified Production Deployment
                  </span>
                </div>

                <button
                  onClick={() => setActiveCaseStudy(null)}
                  className="text-xs text-slate-500 hover:text-slate-900 font-semibold cursor-pointer"
                >
                  Close Modal
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
