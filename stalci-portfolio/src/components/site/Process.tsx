import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "./Brand";
import {
  Compass,
  Layers,
  Zap,
  ShieldAlert,
  Activity,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface ProcessStep {
  n: string;
  title: string;
  badge: string;
  duration: string;
  icon: any;
  copy: string;
  deliverables: string[];
  tools: string[];
  slaTarget: string;
}

const steps: ProcessStep[] = [
  {
    n: "01",
    title: "Strategic Discovery & Threat Modeling",
    badge: "Foundation Phase",
    duration: "Week 1 – 2",
    icon: Compass,
    copy: "Deep-dive technical audits, security perimeter analysis, and stakeholder roadmap formulation before writing a single line of code.",
    deliverables: [
      "Architecture Threat Matrix & Risk Assessment",
      "Executive Technical Roadmap & Sprint Milestones",
      "Regulatory Compliance & Data Privacy Plan",
      "Zero-Trust Ingress & Network Blueprint",
    ],
    tools: ["ISO 27001", "OWASP Top 10", "Threat Modeling", "Figma"],
    slaTarget: "100% Architecture Audit Sign-off",
  },
  {
    n: "02",
    title: "Systems Architecture & Schema Specification",
    badge: "Specification Phase",
    duration: "Week 2 – 3",
    icon: Layers,
    copy: "Blueprint high-concurrency microservices, GraphQL/REST API gateways, database schemas, and multi-region failover protocols.",
    deliverables: [
      "Microservices Interaction Topology Graph",
      "PostgreSQL / pgvector Database ERD & Indexes",
      "Strict OpenAPI 3.1 & gRPC Contract Definitions",
      "Event Bus & In-Memory Cache Invalidation Protocols",
    ],
    tools: ["NestJS & Go", "PostgreSQL", "Apache Kafka", "Redis"],
    slaTarget: "100% Type-Safe Contracts",
  },
  {
    n: "03",
    title: "High-Velocity Agile Sprints & CI/CD",
    badge: "Engineering Phase",
    duration: "Sprint Iterations",
    icon: Zap,
    copy: "Bi-weekly sprint increments with strict 100% type-safety, automated unit/integration testing, and automated GitHub Actions pipelines.",
    deliverables: [
      "Production-Ready Code Increments Shipped Every 14 Days",
      "Automated CI/CD Test Coverage (>95%)",
      "Continuous Dynamic Security Testing (DAST/SAST)",
      "Strict Code Reviews by Principal Engineers",
    ],
    tools: ["GitHub Actions", "Vitest & Playwright", "Docker Containers", "TypeScript"],
    slaTarget: "Zero Broken Builds Policy",
  },
  {
    n: "04",
    title: "Hardened Production Rollout & Telemetry",
    badge: "Hardening Phase",
    duration: "Deployment Sprint",
    icon: ShieldAlert,
    copy: "Chaos testing, automated pentesting, canary zero-downtime deployments, and real-time observability telemetry setup.",
    deliverables: [
      "Zero-Downtime Blue/Green Canary Deployment",
      "Kernel eBPF & APM Observability Dashboards",
      "Penetration Test Sign-off & Audit Log",
      "Disaster Recovery & Multi-AZ Automated Failover Verification",
    ],
    tools: ["Kubernetes", "Cloudflare WAF", "eBPF", "Prometheus"],
    slaTarget: "Zero-Downtime Deployment",
  },
  {
    n: "05",
    title: "Scale, SRE & 24/7 SLA Support",
    badge: "Enterprise SLA",
    duration: "Continuous 24/7",
    icon: Activity,
    copy: "24/7 proactive NOC monitoring, FinOps cloud cost optimization, automated horizontal scaling, and enterprise SLA guarantees.",
    deliverables: [
      "99.99% Production Uptime SLA Guarantee",
      "FinOps Infrastructure Cost Optimization",
      "Dedicated SRE Incident Response Pod (< 15 min MTTR)",
      "Quarterly Architectural Roadmapping & Security Reviews",
    ],
    tools: ["Grafana", "K8s Auto-Scaler", "Datadog APM", "Vault"],
    slaTarget: "99.99% Uptime Guarantee",
  },
];

export function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const currentStep = steps[activeStep];

  return (
    <section
      id="process"
      className="relative bg-[#FAFAFD] py-20 sm:py-28 overflow-hidden text-black border-t border-zinc-200/90"
    >
      <div className="mx-auto max-w-6xl px-5 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Delivery Methodology"
          title="How We Architect & Deliver"
          subtitle="Five disciplined engineering stages with transparent governance, automated quality gates, and production value shipped every sprint."
          tone="light"
        />

        {/* ─── Interactive Process Grid ─── */}
        <div className="mt-12 grid items-start gap-8 lg:grid-cols-12">
          
          {/* Left Column: 5 Step Tabs */}
          <div className="lg:col-span-5 relative">
            <div className="space-y-2.5">
              {steps.map((s, idx) => {
                const isActive = activeStep === idx;

                return (
                  <button
                    key={s.n}
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-start gap-3.5 cursor-pointer relative ${
                      isActive
                        ? "bg-black text-white border-black shadow-md"
                        : "bg-white text-zinc-800 border-zinc-200/90 hover:border-zinc-400 hover:shadow-2xs"
                    }`}
                  >
                    {/* Node Number */}
                    <div
                      className={`h-9 w-9 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-colors ${
                        isActive
                          ? "bg-white text-zinc-950 font-bold"
                          : "bg-zinc-100 text-zinc-700 border border-zinc-200"
                      }`}
                    >
                      {s.n}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4
                          className={`font-bold text-xs sm:text-sm leading-snug transition-colors ${
                            isActive ? "text-white" : "text-zinc-950"
                          }`}
                        >
                          {s.title}
                        </h4>
                        <span className={`text-[10px] font-mono shrink-0 ${isActive ? "text-neutral-400" : "text-zinc-500"}`}>
                          {s.duration}
                        </span>
                      </div>
                      <p className={`mt-0.5 text-xs line-clamp-1 font-normal ${isActive ? "text-neutral-300" : "text-zinc-500"}`}>
                        {s.copy}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Step Detail Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.n}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="rounded-3xl border border-zinc-200/90 bg-white p-6 sm:p-8 shadow-sm text-black"
              >
                {/* Step Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="h-10 w-10 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-950 flex items-center justify-center font-mono font-bold text-sm">
                      {currentStep.n}
                    </span>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-copper">
                        Phase {currentStep.n} &bull; {currentStep.badge}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-zinc-950 leading-tight">
                        {currentStep.title}
                      </h3>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 bg-zinc-100 border border-zinc-200 text-[11px] font-mono font-bold text-zinc-800 self-start sm:self-auto">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                    {currentStep.slaTarget}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-4 text-xs sm:text-sm leading-relaxed text-zinc-600 font-normal">
                  {currentStep.copy}
                </p>

                {/* Key Deliverables Checklist */}
                <div className="mt-6">
                  <h5 className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-800 mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Key Phase Deliverables
                  </h5>
                  <div className="space-y-2">
                    {currentStep.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAFAFC] border border-zinc-200/80 text-xs text-zinc-700 font-medium"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-zinc-950 shrink-0 mt-1.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tools & Next Button */}
                <div className="mt-6 pt-5 border-t border-zinc-100 flex items-center justify-between flex-wrap gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {currentStep.tools.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg bg-zinc-100 border border-zinc-200 px-2.5 py-1 text-[11px] font-mono font-medium text-zinc-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-950 hover:text-copper transition-colors cursor-pointer"
                  >
                    <span>Next: Phase {steps[(activeStep + 1) % steps.length].n}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
