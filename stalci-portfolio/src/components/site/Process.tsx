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
  Code2,
  Terminal,
  Cpu,
} from "lucide-react";

const steps = [
  {
    n: "01",
    title: "Strategic Discovery & Threat Modeling",
    icon: Compass,
    copy: "Deep-dive technical audits, security perimeter analysis, and stakeholder roadmap formulation before writing a single line of code.",
    deliverables: [
      "Architecture Threat Matrix & Risk Assessment",
      "Executive Technical Roadmap & Sprint Milestones",
      "Regulatory Compliance & Data Privacy Plan",
    ],
    tools: ["ISO 27001", "OWASP Top 10", "Zero-Trust Blueprint"],
    duration: "Week 1 - 2",
    badge: "Foundation Phase",
  },
  {
    n: "02",
    title: "Systems Architecture & Schema Specification",
    icon: Layers,
    copy: "Blueprint high-concurrency microservices, GraphQL/REST API gateways, database schemas, and multi-region failover protocols.",
    deliverables: [
      "Microservices Interaction Topology Graph",
      "PostgreSQL/pgvector Database ERD & Indexes",
      "Strict OpenAPI/gRPC Contract Definitions",
    ],
    tools: ["NestJS & Go", "PostgreSQL", "Kafka & Redis"],
    duration: "Week 2 - 3",
    badge: "Architecture Phase",
  },
  {
    n: "03",
    title: "High-Velocity Agile Sprints & CI/CD",
    icon: Zap,
    copy: "Bi-weekly sprint increments with strict 100% type-safety, automated unit/integration testing, and automated GitHub Actions pipelines.",
    deliverables: [
      "Production-Ready Code Increments Every 14 Days",
      "Automated CI/CD Test Coverage (>90%)",
      "Peer Code Reviews & Security Audits",
    ],
    tools: ["GitHub Actions", "Vitest & Jest", "Docker Containers"],
    duration: "Sprint Iterations",
    badge: "Engineering Phase",
  },
  {
    n: "04",
    title: "Hardened Production Rollout & Telemetry",
    icon: ShieldAlert,
    copy: "Chaos testing, automated pentesting, canary zero-downtime deployments, and real-time observability telemetry setup.",
    deliverables: [
      "Zero-Downtime Blue/Green Canary Deployment",
      "Kernel eBPF & APM Observability Dashboards",
      "Penetration Test Sign-off & Audit Log",
    ],
    tools: ["Kubernetes", "Cloudflare WAF", "Datadog Telemetry"],
    duration: "Deployment Sprint",
    badge: "Hardening Phase",
  },
  {
    n: "05",
    title: "Scale, SRE & 24/7 SLA Support",
    icon: Activity,
    copy: "24/7 proactive NOC monitoring, FinOps cloud cost optimization, automated horizontal scaling, and enterprise SLA guarantees.",
    deliverables: [
      "99.99% Production Uptime SLA Guarantee",
      "FinOps Infrastructure Cost Optimization",
      "Dedicated SRE Incident Response Pod",
    ],
    tools: ["Prometheus", "Grafana", "K8s Auto-Scaler"],
    duration: "Continuous 24/7",
    badge: "Enterprise SLA",
  },
];

export function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const currentStep = steps[activeStep];

  return (
    <section
      id="process"
      className="relative bg-[#F8FAFC] py-24 sm:py-32 overflow-hidden text-slate-900 border-t border-slate-200"
    >
      {/* Light Mode Soft Glow Orbs */}
      <div 
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-amber-200/30 blur-[180px] pointer-events-none -z-10" 
        aria-hidden 
      />

      <div className="mx-auto max-w-7xl px-5 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="Delivery Methodology"
          title="How We Architect & Deliver"
          subtitle="Five disciplined stages, transparent governance, and production value shipped in every single sprint."
          tone="light"
        />

        {/* Interactive Vertical Timeline Grid */}
        <div className="mt-16 grid items-start gap-10 lg:grid-cols-12">
          
          {/* Left Column: Vertical Timeline Node Selector */}
          <div className="lg:col-span-5 relative">
            
            {/* Connecting Vertical Timeline Line */}
            <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-slate-200 -z-10" aria-hidden />

            <div className="space-y-4">
              {steps.map((s, idx) => {
                const isActive = activeStep === idx;

                return (
                  <button
                    key={s.n}
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer relative group ${
                      isActive
                        ? "bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/20 translate-x-1"
                        : "bg-white text-slate-800 border-slate-200/90 hover:border-amber-500/70 hover:shadow-md"
                    }`}
                  >
                    {/* Timeline Node Icon Circle */}
                    <div
                      className={`h-11 w-11 rounded-xl flex items-center justify-center font-mono font-extrabold text-sm shrink-0 transition-all duration-300 ${
                        isActive
                          ? "bg-amber-500 text-slate-950 shadow-md scale-105"
                          : "bg-slate-100 text-slate-700 border border-slate-200 group-hover:border-amber-500"
                      }`}
                    >
                      {s.n}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4
                          className={`font-bold text-sm sm:text-base leading-snug transition-colors ${
                            isActive ? "text-amber-400" : "text-slate-900 group-hover:text-amber-700"
                          }`}
                        >
                          {s.title}
                        </h4>
                        <span className={`text-[10px] font-mono shrink-0 ${isActive ? "text-slate-400" : "text-slate-500"}`}>
                          {s.duration}
                        </span>
                      </div>
                      <p className={`mt-1 text-xs line-clamp-1 font-normal ${isActive ? "text-slate-300" : "text-slate-600"}`}>
                        {s.copy}
                      </p>
                    </div>

                    {/* Active Step Accent Indicator Bar */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTimelineBarLight"
                        className="absolute -left-1 top-3 bottom-3 w-1.5 rounded-full bg-amber-500"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detailed Interactive Step Console */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.n}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xl shadow-slate-200/50 relative overflow-hidden text-slate-900"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none text-amber-700">
                  <currentStep.icon className="h-44 w-44" strokeWidth={1} />
                </div>

                {/* Step Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="h-10 w-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center font-extrabold text-sm shadow-2xs">
                      {currentStep.n}
                    </span>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700">
                        Phase {currentStep.n} &bull; {currentStep.badge}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                        {currentStep.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed text-slate-600 font-normal">
                  {currentStep.copy}
                </p>

                {/* Deliverables Checklist */}
                <div className="mt-7">
                  <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-amber-700" /> Key Phase Deliverables
                  </h5>
                  <div className="space-y-2.5">
                    {currentStep.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-200/80 text-xs sm:text-sm text-slate-800 font-medium"
                      >
                        <span className="h-2 w-2 rounded-full bg-amber-500 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tools & Standards Pills */}
                <div className="mt-7 pt-5 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <span className="block text-[10px] font-mono text-slate-500 uppercase font-semibold mb-2">
                      Tools & Security Standards
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {currentStep.tools.map((t) => (
                        <span
                          key={t}
                          className="rounded-lg bg-amber-50 border border-amber-200/80 px-3 py-1 text-xs font-mono font-bold text-amber-800"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Next Step Button */}
                  <button
                    onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                    className="inline-flex items-center gap-2 text-xs font-extrabold text-amber-800 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <span>Next Phase ({steps[(activeStep + 1) % steps.length].n})</span>
                    <ArrowRight className="h-4 w-4" />
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
