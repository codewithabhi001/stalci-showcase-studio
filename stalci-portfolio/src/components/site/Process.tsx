import { useState } from "react";
import { 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Server,
  Zap
} from "lucide-react";
import { BadgePill } from "./Brand";
import { motion, AnimatePresence } from "framer-motion";

interface Stage {
  num: string;
  phase: string;
  name: string;
  tag: string;
  duration: string;
  sla: string;
  description: string;
  deliverables: string[];
  tools: string[];
  image: string;
  imageAlt: string;
}

const stages: Stage[] = [
  {
    num: "01",
    phase: "Phase 01",
    name: "Discovery & Threat Modeling",
    tag: "Architecture",
    duration: "Week 1",
    sla: "Zero Tech Debt Blueprint",
    description:
      "We audit your existing systems, model edge-case failure modes, and define strict OpenAPI data contracts before writing production code.",
    deliverables: [
      "System Architecture Blueprint & Threat Matrix",
      "OpenAPI 3.1 & Type-Safe Schema Contracts",
      "Cloud Infrastructure & Ingress Specification",
      "14-Day Sprint Milestone & Risk Roadmap",
    ],
    tools: ["OpenAPI 3.1", "Threat Modeling", "Figma RFCs", "AWS / GCP"],
    image: "/images/process/stage_01.jpg",
    imageAlt: "Discovery and Architectural Blueprint Phase",
  },
  {
    num: "02",
    phase: "Phase 02",
    name: "Design Systems & High-Fidelity Specs",
    tag: "UI/UX & Tokens",
    duration: "Week 1 – 2",
    sla: "100% WCAG AAA Compliant",
    description:
      "Interactive Figma prototypes mapped 1:1 to Tailwind CSS variables, establishing accessible component hierarchies with zero design drift.",
    deliverables: [
      "Multi-Theme Token Architecture (Light & Dark)",
      "Interactive High-Fidelity Prototypes",
      "Accessible Design Component Library",
      "Micro-Interactions & Animation Contracts",
    ],
    tools: ["Figma", "Tailwind CSS", "Storybook", "Framer Motion"],
    image: "/images/process/stage_02.jpg",
    imageAlt: "Design Systems and Component Library",
  },
  {
    num: "03",
    phase: "Phase 03",
    name: "Agile Engineering & Ephemeral PRs",
    tag: "High Velocity",
    duration: "14-Day Sprints",
    sla: "Bi-Weekly Production Ships",
    description:
      "Deterministic 14-day sprint cycles. Every single pull request automatically deploys an isolated preview environment for instant testing.",
    deliverables: [
      "Ephemeral Preview Staging Environments",
      "> 92% Automated Test Gate Coverage",
      "Type-Safe Distributed Microservices",
      "Continuous CI/CD Release Pipelines",
    ],
    tools: ["TypeScript", "Next.js", "FastAPI", "Docker", "GitHub Actions"],
    image: "/images/process/stage_03.jpg",
    imageAlt: "Agile Software Engineering and Sprints",
  },
  {
    num: "04",
    phase: "Phase 04",
    name: "Automated QA & Penetration Audits",
    tag: "Hardening",
    duration: "Continuous",
    sla: "Zero Critical Vulnerabilities",
    description:
      "End-to-end integration test suites, fuzz testing, chaos engineering, and dynamic IAM permission auditing to guarantee bulletproof stability.",
    deliverables: [
      "End-to-End Automated Browser Tests",
      "Static & Dynamic Penetration Scans",
      "Core Web Vitals & Load Benchmark (> 5k TPS)",
      "Vault Key Rotation & Encryption Verifications",
    ],
    tools: ["Playwright", "Vitest", "SonarQube", "HashiCorp Vault"],
    image: "/images/process/stage_04.jpg",
    imageAlt: "Automated Quality Assurance and Security",
  },
  {
    num: "05",
    phase: "Phase 05",
    name: "Blue/Green Zero-Downtime Rollout",
    tag: "Deployment",
    duration: "Cutover Sprint",
    sla: "99.99% Availability",
    description:
      "Zero-downtime production cutover using automated canary traffic shifting, instant rollback triggers, and multi-region CDN cache warming.",
    deliverables: [
      "Automated Blue/Green Canary Cutover",
      "Distributed APM & Real-Time Distributed Tracing",
      "Disaster Recovery & Multi-Region Failover",
      "Edge CDN Ingress & Static Asset Pre-warming",
    ],
    tools: ["Kubernetes", "Cloudflare", "Datadog", "AWS Route 53"],
    image: "/images/process/stage_05.jpg",
    imageAlt: "Zero-Downtime Production Deployment",
  },
  {
    num: "06",
    phase: "Phase 06",
    name: "SRE, FinOps & Continuous Evolution",
    tag: "Scale & SLA",
    duration: "24/7 Retained",
    sla: "< 15min P1 Incident SLA",
    description:
      "Proactive 24/7 telemetry monitoring, monthly cloud infrastructure cost reclamation, model retraining, and dedicated principal architect oversight.",
    deliverables: [
      "24/7 Distributed NOC & APM Monitoring",
      "Monthly Cloud FinOps Waste Pruning (-30%)",
      "Zero-Downtime Security & Dependency Updates",
      "Quarterly Performance Scaling Benchmarks",
    ],
    tools: ["Prometheus", "Grafana", "OpenTelemetry", "PagerDuty"],
    image: "/images/process/stage_06.jpg",
    imageAlt: "Site Reliability and Performance Scale",
  },
];

export function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const current = stages[activeStep];

  return (
    <section id="process" className="border-t border-zinc-200/90 bg-[#FFFFFF] py-14 sm:py-20 text-black relative isolate overflow-hidden">
      
      {/* Subtle Background Texture */}
      <div 
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#F4F6FB_1px,transparent_1px),linear-gradient(to_bottom,#F4F6FB_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-80" 
        aria-hidden 
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ─── Header Section ─── */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5 mb-12 sm:mb-14">
          <div className="flex justify-center">
            <BadgePill tone="light" variant="gradient">
              <span className="font-semibold text-zinc-950">Deterministic Methodology</span>
            </BadgePill>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl md:text-[32px] font-bold text-zinc-950 tracking-tight leading-[1.2]">
            How We Ship: The <span className="font-extrabold text-black">14-Day Sprint Lifecycle</span>
          </h2>

          <p className="text-xs sm:text-[13.5px] text-zinc-600 font-normal leading-relaxed max-w-2xl mx-auto">
            From initial threat modeling to zero-downtime production deployment, every phase is governed by strict type safety, automated test gates, and continuous client visibility.
          </p>
        </div>

        {/* ─── Horizontal Stage Selector Pills ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 max-w-6xl mx-auto mb-8">
          {stages.map((st, idx) => (
            <button
              key={st.num}
              onClick={() => setActiveStep(idx)}
              className={`rounded-2xl p-3 text-left border transition-all cursor-pointer flex flex-col justify-between min-h-[78px] ${
                activeStep === idx
                  ? "bg-zinc-950 text-white border-zinc-950 shadow-md scale-[1.02]"
                  : "bg-[#FAFAFC] text-zinc-700 border-zinc-200 hover:border-zinc-300 hover:bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${activeStep === idx ? "text-zinc-400" : "text-zinc-400"}`}>
                  {st.num}
                </span>
                <span className={`text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full ${
                  activeStep === idx ? "bg-white/10 text-white" : "bg-zinc-200/60 text-zinc-600"
                }`}>
                  {st.tag}
                </span>
              </div>

              <span className={`text-[11.5px] font-bold tracking-tight line-clamp-1 mt-1.5 ${activeStep === idx ? "text-white" : "text-zinc-900"}`}>
                {st.name}
              </span>
            </button>
          ))}
        </div>

        {/* ─── Active Stage Interactive Showcase Card ─── */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.num}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="rounded-3xl border border-zinc-200/90 bg-[#FAFAFC] p-6 sm:p-9 shadow-2xs hover:border-zinc-300 transition-all"
            >
              <div className="grid gap-8 lg:grid-cols-12 items-center">
                
                {/* Left Side (60%): Stage Narrative & Concrete Deliverables */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="h-8 w-8 rounded-xl bg-zinc-950 text-white flex items-center justify-center font-mono font-bold text-xs">
                      {current.num}
                    </span>
                    <div>
                      <span className="text-[10.5px] font-mono uppercase text-zinc-400 font-bold tracking-wider">
                        {current.phase} &bull; {current.duration}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight">
                        {current.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-[13.5px] leading-relaxed text-zinc-600 font-normal">
                    {current.description}
                  </p>

                  {/* SLA Standard Pill */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-mono font-bold text-zinc-800">
                    <CheckCircle2 className="h-3.5 w-3.5 text-zinc-950" />
                    <span>SLA Standard: {current.sla}</span>
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold tracking-wider block">
                      Core Phase Deliverables
                    </span>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {current.deliverables.map((del, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl bg-white border border-zinc-200/90 p-2.5 text-[11.5px] text-zinc-800 font-medium flex items-start gap-2 shadow-2xs"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-zinc-950 shrink-0 mt-1.5" />
                          <span className="leading-snug">{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tools Strip + Next Stage Advance */}
                  <div className="pt-3.5 border-t border-zinc-200/80 flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold mr-1">Tools</span>
                      {current.tools.map((t) => (
                        <span
                          key={t}
                          className="rounded-lg bg-white border border-zinc-200 px-2 py-0.5 text-[10.5px] font-mono text-zinc-600 font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {activeStep < stages.length - 1 && (
                      <button
                        onClick={() => setActiveStep((prev) => prev + 1)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-zinc-950 hover:text-black transition-colors cursor-pointer"
                      >
                        <span>Next: {stages[activeStep + 1].name}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Right Side (40%): High-Fidelity 3D Visual Render */}
                <div className="lg:col-span-5">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold tracking-wider block">
                      Phase Architecture Visualization
                    </span>
                    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-zinc-200/90 shadow-sm bg-zinc-100">
                      <img
                        src={current.image}
                        alt={current.imageAlt}
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                    </div>
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
