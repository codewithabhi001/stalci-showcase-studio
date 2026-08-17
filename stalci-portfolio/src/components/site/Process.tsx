import { useState } from "react";
import { 
  CheckCircle2, 
  ArrowRight, 
  ChevronDown,
  ShieldCheck,
  Search,
  Layers,
  Zap,
  Server,
  Activity,
  Check,
  FileCode,
  Lock,
  Workflow,
  Sparkles
} from "lucide-react";
import { SectionHeading, BadgePill } from "./Brand";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    n: "01",
    icon: Search,
    title: "Discovery & Threat Scoping",
    duration: "Week 1 – 2",
    badge: "Foundation",
    slaTarget: "Architecture Sign-off",
    copy: "Technical audits, security perimeter analysis, and milestone blueprints before writing code.",
    deliverables: [
      "Threat Matrix & Risk Audit",
      "Executive Technical Roadmap",
      "Regulatory Compliance Plan",
      "Zero-Trust Network Blueprint",
    ],
    tools: ["ISO 27001", "OWASP", "Threat Modeling", "Notion RFCs"],
    iconBg: "bg-amber-50 text-amber-600 border-amber-200",
    activeBg: "bg-amber-500 text-white",
  },
  {
    n: "02",
    icon: Layers,
    title: "Architecture & Schema Spec",
    duration: "Week 2 – 3",
    badge: "Blueprint",
    slaTarget: "Typed API Contract",
    copy: "High-concurrency microservices, GraphQL/REST API contracts, and strict database schemas.",
    deliverables: [
      "OpenAPI 3.1 & GraphQL Specs",
      "PostgreSQL DB Schema Models",
      "Kafka Event Bus Architecture",
      "Figma Interaction Wireframes",
    ],
    tools: ["TypeScript", "Prisma ORM", "Docker", "PostgreSQL"],
    iconBg: "bg-indigo-50 text-indigo-600 border-indigo-200",
    activeBg: "bg-indigo-500 text-white",
  },
  {
    n: "03",
    icon: Zap,
    title: "Agile Sprints & Automated CI/CD",
    duration: "Sprint Iterations",
    badge: "Execution",
    slaTarget: "Bi-Weekly Ships",
    copy: "Bi-weekly sprint increments with strict 100% type-safety and automated preview PRs.",
    deliverables: [
      "Preview Enclaves per PR",
      "Automated Test Suite (>85%)",
      "Burndown Telemetry Dashboard",
      "Production Clean Commits",
    ],
    tools: ["GitHub Actions", "Turborepo", "Vitest", "Playwright"],
    iconBg: "bg-purple-50 text-purple-600 border-purple-200",
    activeBg: "bg-purple-500 text-white",
  },
  {
    n: "04",
    icon: Server,
    title: "Hardened Cutover & Telemetry",
    duration: "Deployment Sprint",
    badge: "Zero-Downtime",
    slaTarget: "99.99% Cutover SLA",
    copy: "Canary zero-downtime deployments, automated pentesting, and APM cluster telemetry.",
    deliverables: [
      "Zero-Downtime Blue/Green Rollout",
      "Penetration Security Report",
      "APM Trace & APM Telemetry",
      "Disaster Recovery SOP",
    ],
    tools: ["Kubernetes", "Grafana", "Cloudflare", "Terraform"],
    iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
    activeBg: "bg-emerald-500 text-white",
  },
  {
    n: "05",
    icon: Activity,
    title: "Scale, SRE & 24/7 SLA Support",
    duration: "Continuous 24/7",
    badge: "Managed Operations",
    slaTarget: "< 15m Incident SLA",
    copy: "24/7 proactive NOC monitoring, FinOps cloud cost audits, and principal SRE pod support.",
    deliverables: [
      "24/7 Active Escalation Pod",
      "Cloud FinOps Cost Optimization",
      "Automated Patching Pipelines",
      "Quarterly Scale Audits",
    ],
    tools: ["PagerDuty", "AWS FinOps", "Prometheus", "OpenTelemetry"],
    iconBg: "bg-sky-50 text-sky-600 border-sky-200",
    activeBg: "bg-sky-500 text-white",
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
      className="relative bg-white py-16 sm:py-24 overflow-hidden text-slate-900 border-t border-slate-200/90"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-16">
          <div className="flex justify-center">
            <BadgePill tone="light" variant="gradient">
              <Sparkles className="h-3.5 w-3.5 text-amber-500 mr-1.5" />
              <span className="font-semibold text-slate-900">Delivery Methodology</span>
            </BadgePill>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-[1.2]">
            How We Architect &amp; Deliver <span className="font-extrabold text-slate-950">Mission-Critical Systems</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed max-w-xl mx-auto">
            Five disciplined engineering stages with transparent governance, automated quality gates, and production value shipped every sprint.
          </p>
        </div>

        {/* ─── Interactive Process Grid ─── */}
        <div className="grid items-start gap-8 lg:grid-cols-12">
          
          {/* Left Column: 5 Step Cards */}
          <div className="lg:col-span-5 relative">
            <div className="space-y-3">
              {steps.map((s, idx) => {
                const isActive = activeStep === idx;
                const StepIcon = s.icon;

                return (
                  <div key={s.n} className="flex flex-col">
                    <button
                      onClick={() => toggleStep(idx)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center gap-3.5 cursor-pointer relative ${
                        isActive
                          ? "bg-slate-950 text-white border-slate-900 shadow-md"
                          : "bg-gradient-to-b from-white to-slate-50 text-slate-700 border-slate-200/90 hover:border-slate-300 hover:text-slate-900"
                      }`}
                    >
                      {/* Icon & Number Badge */}
                      <div
                        className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                          isActive
                            ? `${s.activeBg} border-transparent shadow-sm`
                            : `${s.iconBg}`
                        }`}
                      >
                        <StepIcon className="h-5 w-5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4
                            className={`font-bold text-xs sm:text-sm leading-snug transition-colors ${
                              isActive ? "text-white" : "text-slate-900"
                            }`}
                          >
                            <span className="font-mono text-xs opacity-75 mr-1.5">{s.n}.</span>
                            {s.title}
                          </h4>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className={`text-[10px] font-mono hidden sm:inline ${isActive ? "text-slate-300" : "text-slate-500"}`}>
                              {s.duration}
                            </span>
                            <ChevronDown
                              className={`h-4 w-4 transition-transform duration-200 ${
                                isActive ? "rotate-180 text-white" : "text-slate-400"
                              }`}
                            />
                          </div>
                        </div>
                        <p className={`mt-1 text-xs line-clamp-1 font-normal ${isActive ? "text-slate-300" : "text-slate-600"}`}>
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
                          <div className="rounded-2xl border border-slate-200/90 bg-slate-50 p-5 shadow-xl text-slate-900 space-y-4">
                            {/* Step Header */}
                            <div className="flex flex-col gap-2 border-b border-slate-200 pb-3">
                              <div className="flex items-center justify-between gap-2">
                                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${s.iconBg}`}>
                                  Phase {s.n} &bull; {s.badge}
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 bg-emerald-50 border border-emerald-200 text-[10px] font-mono font-bold text-emerald-700">
                                  <ShieldCheck className="h-3 w-3 text-emerald-600" />
                                  {s.slaTarget}
                                </span>
                              </div>
                              <h3 className="text-sm font-bold text-slate-900 leading-tight">
                                {s.title}
                              </h3>
                            </div>

                            {/* Description */}
                            <p className="text-xs leading-relaxed text-slate-600 font-normal">
                              {s.copy}
                            </p>

                            {/* Deliverables */}
                            <div>
                              <h5 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1">
                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Key Phase Deliverables
                              </h5>
                              <div className="space-y-1.5">
                                {s.deliverables.map((item, dIdx) => (
                                  <div
                                    key={dIdx}
                                    className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-medium"
                                  >
                                    <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                                    <span>{item}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Tools & Next Button */}
                            <div className="pt-3 border-t border-slate-200 flex items-center justify-between flex-wrap gap-2">
                              <div className="flex flex-wrap gap-1">
                                {s.tools.map((t) => (
                                  <span
                                    key={t}
                                    className="rounded-md bg-white border border-slate-200 px-2 py-0.5 text-[10px] font-mono font-medium text-slate-700"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>

                              <button
                                onClick={() => setActiveStep((idx + 1) % steps.length)}
                                className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-black transition-colors cursor-pointer"
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

          {/* Right Column: Step Detail Card (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-7">
            <AnimatePresence mode="wait">
              {currentStep && (
                <motion.div
                  key={currentStep.n}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-3xl border border-slate-200/90 bg-gradient-to-b from-white via-slate-50/60 to-slate-100/30 p-6 sm:p-8 shadow-sm text-slate-900"
                >
                  {/* Step Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-5">
                    <div className="flex items-center gap-3.5">
                      <div className={`h-12 w-12 rounded-2xl flex items-center justify-center border shadow-xs ${currentStep.iconBg}`}>
                        <currentStep.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${currentStep.iconBg}`}>
                          Phase {currentStep.n} &bull; {currentStep.badge}
                        </span>
                        <h3 className="text-base sm:text-xl font-bold text-slate-900 leading-tight mt-1">
                          {currentStep.title}
                        </h3>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 bg-emerald-50 border border-emerald-200 text-[11px] font-mono font-bold text-emerald-800 self-start sm:self-auto shadow-2xs">
                      <ShieldCheck className="h-4 w-4 text-emerald-600" />
                      {currentStep.slaTarget}
                    </span>
                  </div>

                  {/* Concise Description */}
                  <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
                    {currentStep.copy}
                  </p>

                  {/* Key Deliverables Grid */}
                  <div className="mt-6">
                    <h5 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Key Phase Deliverables
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {currentStep.deliverables.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-slate-200 text-xs text-slate-800 font-medium shadow-2xs hover:border-slate-300 transition-colors"
                        >
                          <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tools & Next Button */}
                  <div className="mt-6 pt-5 border-t border-slate-200 flex items-center justify-between flex-wrap gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {currentStep.tools.map((t) => (
                        <span
                          key={t}
                          className="rounded-lg bg-white border border-slate-200 px-2.5 py-1 text-[11px] font-mono font-medium text-slate-700 shadow-2xs"
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
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-black transition-colors cursor-pointer"
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
