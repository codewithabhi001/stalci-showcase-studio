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
      className="relative bg-[#FAFAFD] py-20 sm:py-28 overflow-hidden text-slate-900 border-t border-slate-200/80"
    >
      <div className="mx-auto max-w-5xl px-5 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="Delivery Methodology"
          title="How We Architect & Deliver"
          subtitle="Five disciplined stages, transparent governance, and production value shipped in every single sprint."
          tone="light"
        />

        {/* Interactive Vertical Timeline Grid */}
        <div className="mt-12 grid items-start gap-8 lg:grid-cols-12">
          
          {/* Left Column: Vertical Timeline Node Selector */}
          <div className="lg:col-span-5 relative">
            <div className="space-y-3">
              {steps.map((s, idx) => {
                const isActive = activeStep === idx;

                return (
                  <button
                    key={s.n}
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-200 flex items-start gap-3.5 cursor-pointer relative group ${
                      isActive
                        ? "bg-slate-900 text-white border-slate-900 shadow-md"
                        : "bg-white text-slate-800 border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    {/* Timeline Node Icon Circle */}
                    <div
                      className={`h-9 w-9 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-colors ${
                        isActive
                          ? "bg-white text-slate-950 font-bold"
                          : "bg-slate-100 text-slate-700 border border-slate-200"
                      }`}
                    >
                      {s.n}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4
                          className={`font-semibold text-xs sm:text-sm leading-snug transition-colors ${
                            isActive ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {s.title}
                        </h4>
                        <span className={`text-[10px] font-mono shrink-0 ${isActive ? "text-slate-400" : "text-slate-500"}`}>
                          {s.duration}
                        </span>
                      </div>
                      <p className={`mt-0.5 text-xs line-clamp-1 font-normal ${isActive ? "text-slate-300" : "text-slate-500"}`}>
                        {s.copy}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Step Console */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.n}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 shadow-xs text-slate-900"
              >
                {/* Step Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="h-8 w-8 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 flex items-center justify-center font-bold text-xs">
                      {currentStep.n}
                    </span>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                        Phase {currentStep.n} &bull; {currentStep.badge}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        {currentStep.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
                  {currentStep.copy}
                </p>

                {/* Deliverables Checklist */}
                <div className="mt-5">
                  <h5 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-800 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-slate-700" /> Key Phase Deliverables
                  </h5>
                  <div className="space-y-1.5">
                    {currentStep.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#F8FAFC] border border-slate-200 text-xs text-slate-700"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-900 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tools & Next Button */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <div className="flex flex-wrap gap-1.5">
                      {currentStep.tools.map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-[11px] font-mono font-medium text-slate-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-slate-600 transition-colors cursor-pointer"
                  >
                    <span>Next ({steps[(activeStep + 1) % steps.length].n})</span>
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
