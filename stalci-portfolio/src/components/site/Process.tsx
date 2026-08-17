import { useState } from "react";
import { 
  CheckCircle2, 
  ArrowRight, 
  ChevronDown,
  ShieldCheck
} from "lucide-react";
import { SectionHeading } from "./Brand";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    n: "01",
    title: "Strategic Discovery & Threat Modeling",
    duration: "Week 1 – 2",
    badge: "Foundation Phase",
    slaTarget: "100% Architecture Audit Sign-off",
    copy: "Deep-dive technical audits, security perimeter analysis, and stakeholder roadmap formulation before writing a single line of code.",
    deliverables: [
      "Architecture Threat Matrix & Risk Assessment",
      "Executive Technical Roadmap & Sprint Milestones",
      "Regulatory Compliance & Data Privacy Plan",
      "Zero-Trust Ingress & Network Blueprint",
    ],
    tools: ["ISO 27001", "OWASP Top 10", "Threat Modeling", "Figma", "Notion RFCs"],
    metric: "0 Architectural Blinds",
  },
  {
    n: "02",
    title: "Systems Architecture & Schema Specification",
    duration: "Week 2 – 3",
    badge: "System Blueprint",
    slaTarget: "Deterministic API Contract",
    copy: "Blueprint high-concurrency microservices, GraphQL/REST API contracts, distributed event streams, and database schemas with strict type guarantees.",
    deliverables: [
      "OpenAPI 3.1 & GraphQL Schema Definitions",
      "Normalized PostgreSQL / MongoDB DB Models",
      "Kafka / RabbitMQ Event Architecture",
      "High-Fidelity Interaction Wireframes",
    ],
    tools: ["TypeScript", "Prisma ORM", "Docker", "PostgreSQL", "Swagger"],
    metric: "100% Type-Safe API",
  },
  {
    n: "03",
    title: "High-Velocity Agile Sprints & CI/CD",
    duration: "Sprint Iterations",
    badge: "Execution Pod",
    slaTarget: "Bi-Weekly Production Ships",
    copy: "Bi-weekly sprint increments with strict 100% type-safety, automated unit & integration testing, and ephemeral branch environments for stakeholder review.",
    deliverables: [
      "Continuous Preview Environments per PR",
      "Deterministic Test Coverage (> 85%)",
      "Real-time Burndown Telemetry Dashboard",
      "Production-Grade Clean Code Commits",
    ],
    tools: ["GitHub Actions", "Turborepo", "Vitest", "Playwright", "SonarQube"],
    metric: "14-Day Sprint Cadence",
  },
  {
    n: "04",
    title: "Hardened Production Rollout & Telemetry",
    duration: "Deployment Sprint",
    badge: "Zero-Downtime",
    slaTarget: "99.99% Cutover SLA",
    copy: "Chaos testing, automated pentesting, canary zero-downtime deployments, and real-time observability telemetry across distributed clusters.",
    deliverables: [
      "Zero-Downtime Blue/Green Deployments",
      "Automated Vulnerability Penetration Report",
      "Distributed Trace Logging & APM Integration",
      "Rollback Automation & Disaster Recovery SOP",
    ],
    tools: ["Kubernetes", "Datadog", "Grafana", "AWS / Cloudflare", "Terraform"],
    metric: "< 14ms Global Latency",
  },
  {
    n: "05",
    title: "Scale, SRE & 24/7 SLA Support",
    duration: "Continuous 24/7",
    badge: "Managed Operations",
    slaTarget: "< 15min Incident Response",
    copy: "24/7 proactive NOC monitoring, FinOps cloud cost optimization, continuous model retraining, and dedicated principal engineering support.",
    deliverables: [
      "24/7 Active Incident Escalation Team",
      "Monthly Cloud FinOps Cost Audits",
      "Automated Security Patching Pipelines",
      "Quarterly Scalability Benchmarks",
    ],
    tools: ["PagerDuty", "AWS Cost Explorer", "Prometheus", "OpenTelemetry"],
    metric: "99.9% Uptime Guarantee",
  },
];

export function Process() {
  const [activeStep, setActiveStep] = useState<number | null>(0);

  const toggleStep = (idx: number) => {
    setActiveStep((prev) => (prev === idx ? null : idx));
  };

  const currentStep = activeStep !== null ? steps[activeStep] : steps[0];

  return (
    <section
      id="process"
      className="relative bg-[#000000] py-14 sm:py-20 overflow-hidden text-white border-t border-white/10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Delivery Methodology"
          title="How We Architect & Deliver"
          subtitle="Five disciplined engineering stages with transparent governance, automated quality gates, and production value shipped every sprint."
          tone="dark"
        />

        {/* ─── Interactive Process Grid ─── */}
        <div className="mt-12 grid items-start gap-8 lg:grid-cols-12">
          
          {/* Left Column: 5 Step Cards (with inline mobile accordion expansion) */}
          <div className="lg:col-span-5 relative">
            <div className="space-y-3">
              {steps.map((s, idx) => {
                const isActive = activeStep === idx;

                return (
                  <div key={s.n} className="flex flex-col">
                    <button
                      onClick={() => toggleStep(idx)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-start gap-3.5 cursor-pointer relative ${
                        isActive
                          ? "bg-copper/10 text-white border-copper/40 glow-copper"
                          : "bg-[#0D0D0D] text-neutral-300 border-white/10 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {/* Node Number */}
                      <div
                        className={`h-9 w-9 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-colors ${
                          isActive
                            ? "bg-copper text-black font-bold shadow-xs"
                            : "bg-white/5 text-neutral-300 border border-white/10"
                        }`}
                      >
                        {s.n}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4
                            className={`font-bold text-xs sm:text-sm leading-snug transition-colors ${
                              isActive ? "text-white" : "text-neutral-200"
                            }`}
                          >
                            {s.title}
                          </h4>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className={`text-[10px] font-mono hidden sm:inline ${isActive ? "text-copper" : "text-neutral-400"}`}>
                              {s.duration}
                            </span>
                            <ChevronDown
                              className={`h-4 w-4 transition-transform duration-200 ${
                                isActive ? "rotate-180 text-copper" : "text-neutral-500"
                              }`}
                            />
                          </div>
                        </div>
                        <p className={`mt-1 text-xs line-clamp-1 font-normal ${isActive ? "text-neutral-300" : "text-neutral-400"}`}>
                          {s.copy}
                        </p>
                      </div>
                    </button>

                    {/* Mobile Inline Accordion Content */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden lg:hidden mt-2.5"
                        >
                          <div className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-5 shadow-xl text-white space-y-4">
                            {/* Step Header */}
                            <div className="flex flex-col gap-2 border-b border-white/10 pb-3">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-copper">
                                  Phase {s.n} &bull; {s.badge}
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-400">
                                  <ShieldCheck className="h-3 w-3 text-emerald-400" />
                                  {s.slaTarget}
                                </span>
                              </div>
                              <h3 className="text-sm font-bold text-white leading-tight">
                                {s.title}
                              </h3>
                            </div>

                            {/* Description */}
                            <p className="text-xs leading-relaxed text-neutral-300 font-normal">
                              {s.copy}
                            </p>

                            {/* Deliverables */}
                            <div>
                              <h5 className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-300 mb-2 flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Key Phase Deliverables
                              </h5>
                              <div className="space-y-1.5">
                                {s.deliverables.map((item, dIdx) => (
                                  <div
                                    key={dIdx}
                                    className="flex items-start gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-neutral-300 font-medium"
                                  >
                                    <span className="h-1.5 w-1.5 rounded-full bg-copper shrink-0 mt-1.5" />
                                    <span>{item}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Tools & Next Button */}
                            <div className="pt-3 border-t border-white/10 flex items-center justify-between flex-wrap gap-2">
                              <div className="flex flex-wrap gap-1">
                                {s.tools.map((t) => (
                                  <span
                                    key={t}
                                    className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-mono font-medium text-neutral-300"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>

                              <button
                                onClick={() => setActiveStep((idx + 1) % steps.length)}
                                className="inline-flex items-center gap-1 text-xs font-bold text-copper hover:text-copper-soft transition-colors cursor-pointer"
                              >
                                <span>Next: Phase {steps[(idx + 1) % steps.length].n}</span>
                                <ArrowRight className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Step Detail Card (Desktop Only: lg:block) */}
          <div className="hidden lg:block lg:col-span-7">
            <AnimatePresence mode="wait">
              {currentStep && (
                <motion.div
                  key={currentStep.n}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-3xl border border-white/10 bg-[#0A0A0A] p-6 sm:p-8 shadow-xl text-white"
                >
                  {/* Step Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="h-10 w-10 rounded-2xl bg-copper text-black flex items-center justify-center font-mono font-bold text-sm shadow-xs">
                        {currentStep.n}
                      </span>
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-copper">
                          Phase {currentStep.n} &bull; {currentStep.badge}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                          {currentStep.title}
                        </h3>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono font-bold text-emerald-400 self-start sm:self-auto">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                      {currentStep.slaTarget}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-xs sm:text-sm leading-relaxed text-neutral-300 font-normal">
                    {currentStep.copy}
                  </p>

                  {/* Key Deliverables Grid */}
                  <div className="mt-6">
                    <h5 className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-300 mb-3 flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Key Phase Deliverables
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {currentStep.deliverables.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-neutral-300 font-medium"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-copper shrink-0 mt-1.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tools & Next Button */}
                  <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between flex-wrap gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {currentStep.tools.map((t) => (
                        <span
                          key={t}
                          className="rounded-lg bg-white/5 border border-white/10 px-2.5 py-1 text-[11px] font-mono font-medium text-neutral-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        const activeIdx = activeStep !== null ? activeStep : 0;
                        setActiveStep((activeIdx + 1) % steps.length);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-copper hover:text-copper-soft transition-colors cursor-pointer"
                    >
                      <span>
                        Next: Phase {steps[((activeStep !== null ? activeStep : 0) + 1) % steps.length].n}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
