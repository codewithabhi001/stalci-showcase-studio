import { useState, useEffect } from "react";
import { 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Cpu, 
  Code2, 
  Terminal, 
  Zap, 
  Sparkles, 
  ShieldCheck,
  Search,
  Workflow,
  Rocket,
  Play,
  Pause,
  RotateCcw
} from "lucide-react";
import { SectionHeading } from "./Brand";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";

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
    icon: Search,
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700"
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
    icon: Layers,
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-700"
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
    icon: Code2,
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-700"
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
    icon: Rocket,
    color: "from-orange-500 to-red-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-700"
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
    icon: Sparkles,
    color: "from-pink-500 to-rose-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
    textColor: "text-pink-700"
  },
];

export function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const currentStep = steps[activeStep];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || !isInView) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveStep((prevStep) => (prevStep + 1) % steps.length);
          return 0;
        }
        return prev + 1;
      });
    }, 80); // 8 seconds total per step

    return () => clearInterval(interval);
  }, [isAutoPlaying, activeStep, isInView]);

  const handleStepChange = (stepIndex: number) => {
    setActiveStep(stepIndex);
    setProgress(0);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
    if (isAutoPlaying) {
      setProgress(0);
    }
  };

  const resetProgress = () => {
    setActiveStep(0);
    setProgress(0);
  };

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative bg-[#FAFAFD] py-14 sm:py-20 overflow-hidden text-black border-t border-zinc-200/90"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-green-100/20 to-blue-100/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-purple-50/30 to-pink-50/30 rounded-full blur-3xl animate-spin-slow" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Enhanced Section Heading with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <SectionHeading
            eyebrow="🚀 Delivery Methodology"
            title={
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                How We Architect & Deliver
                <motion.span
                  className="inline-block ml-2"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  ⚡
                </motion.span>
              </span>
            }
            subtitle={
              <span>
                Five disciplined engineering stages with transparent governance, automated quality gates, and production value shipped every sprint.
                <motion.span
                  className="inline-block ml-1 text-emerald-600"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                >
                  ✨
                </motion.span>
              </span>
            }
            tone="light"
          />
        </motion.div>

        {/* Auto-play Controls */}
        <motion.div 
          className="mt-8 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 border border-zinc-200/60 shadow-lg">
            <button
              onClick={toggleAutoPlay}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isAutoPlaying ? 'Pause Tour' : 'Start Tour'}
            </button>
            <button
              onClick={resetProgress}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-all duration-200"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <span className="font-mono text-xs">
                {activeStep + 1} / {steps.length}
              </span>
            </div>
          </div>
        </motion.div>

        {/* ─── Interactive Process Grid ─── */}
        <motion.div 
          className="mt-12 grid items-start gap-8 lg:grid-cols-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          
          {/* Left Column: 5 Step Tabs */}
          <div className="lg:col-span-5 relative">
            {/* Progress Line */}
            <div className="absolute left-6 top-12 bottom-12 w-0.5 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 rounded-full">
              <motion.div
                className="w-full bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 rounded-full"
                initial={{ height: "0%" }}
                animate={{ height: `${(activeStep / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </div>
            
            <div className="space-y-4 relative z-10">
              {steps.map((s, idx) => {
                const isActive = activeStep === idx;
                const isPast = idx < activeStep;
                const IconComponent = s.icon;

                return (
                  <motion.button
                    key={s.n}
                    onClick={() => handleStepChange(idx)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer relative group ${
                      isActive
                        ? `bg-gradient-to-r ${s.color} text-white border-transparent shadow-xl scale-105`
                        : isPast
                        ? "bg-white text-zinc-800 border-zinc-200/90 hover:border-zinc-300 hover:shadow-lg opacity-80"
                        : "bg-white text-zinc-800 border-zinc-200/90 hover:border-zinc-300 hover:shadow-md"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ scale: isActive ? 1.05 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Animated Progress Ring for Active Step */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 to-white/5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.3, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}

                    {/* Icon & Number */}
                    <div className="relative">
                      <div
                        className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? "bg-white/20 backdrop-blur-sm shadow-lg"
                            : isPast
                            ? "bg-green-50 border-2 border-green-200"
                            : `${s.bgColor} ${s.borderColor} border-2`
                        }`}
                      >
                        {isPast ? (
                          <CheckCircle2 className="h-6 w-6 text-green-600" />
                        ) : (
                          <IconComponent 
                            className={`h-6 w-6 ${
                              isActive ? "text-white" : s.textColor
                            }`} 
                          />
                        )}
                      </div>
                      
                      {/* Step Number Badge */}
                      <div
                        className={`absolute -top-1 -right-1 h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold font-mono ${
                          isActive
                            ? "bg-white text-gray-900 shadow-md"
                            : isPast
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 text-gray-600 border border-gray-200"
                        }`}
                      >
                        {s.n}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4
                          className={`font-bold text-sm sm:text-base leading-snug transition-colors ${
                            isActive ? "text-white" : "text-zinc-950"
                          }`}
                        >
                          {s.title}
                        </h4>
                        <span className={`text-[10px] font-mono shrink-0 px-2 py-1 rounded-md ${
                          isActive 
                            ? "text-white/80 bg-white/10" 
                            : "text-zinc-500 bg-zinc-100"
                        }`}>
                          {s.duration}
                        </span>
                      </div>
                      <p className={`mt-1.5 text-xs leading-relaxed font-normal ${
                        isActive ? "text-white/90" : "text-zinc-600"
                      }`}>
                        {s.copy.slice(0, 80)}...
                      </p>
                      
                      {/* Progress bar for active step */}
                      {isActive && isAutoPlaying && (
                        <div className="mt-3 w-full h-1 bg-white/20 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-white/60 rounded-full"
                            style={{ width: `${progress}%` }}
                            transition={{ duration: 0.1 }}
                          />
                        </div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Enhanced Step Detail Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.n}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="rounded-3xl border border-zinc-200/90 bg-white/95 backdrop-blur-sm p-6 sm:p-8 shadow-2xl text-black relative overflow-hidden"
              >
                {/* Animated Background Gradient */}
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${currentStep.color} rounded-t-3xl`} />
                
                {/* Floating Particles Effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full"
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${10 + i * 20}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0.3, 0.8, 0.3],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    />
                  ))}
                </div>

                {/* Step Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-6">
                  <div className="flex items-center gap-4">
                    <div className={`h-14 w-14 rounded-2xl bg-gradient-to-r ${currentStep.color} text-white flex items-center justify-center shadow-xl`}>
                      <currentStep.icon className="h-7 w-7" />
                    </div>
                    <div>
                      <motion.span 
                        className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
                        Phase {currentStep.n} • {currentStep.badge}
                      </motion.span>
                      <motion.h3 
                        className="text-lg sm:text-xl font-bold text-zinc-950 leading-tight mt-1"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {currentStep.title}
                      </motion.h3>
                    </div>
                  </div>

                  <motion.span 
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 shadow-md"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    {currentStep.slaTarget}
                  </motion.span>
                </div>

                {/* Description with Typewriter Effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="mt-6 text-sm sm:text-base leading-relaxed text-zinc-700 font-normal">
                    {currentStep.copy}
                  </p>
                </motion.div>

                {/* Enhanced Key Deliverables Grid */}
                <motion.div 
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-800 mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    </div>
                    Key Phase Deliverables
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentStep.deliverables.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + idx * 0.1 }}
                        className={`flex items-start gap-3 p-4 rounded-2xl ${currentStep.bgColor} ${currentStep.borderColor} border text-sm ${currentStep.textColor} font-medium hover:shadow-md transition-all duration-200 group cursor-pointer`}
                        whileHover={{ scale: 1.02, x: 4 }}
                      >
                        <span className={`h-2 w-2 rounded-full bg-gradient-to-r ${currentStep.color} shrink-0 mt-2 group-hover:scale-110 transition-transform`} />
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Enhanced Tools & Navigation */}
                <motion.div 
                  className="mt-8 pt-6 border-t border-zinc-100 flex items-center justify-between flex-wrap gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="flex flex-wrap gap-2">
                    {currentStep.tools.map((t, idx) => (
                      <motion.span
                        key={t}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 + idx * 0.05 }}
                        className="rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 px-3 py-2 text-xs font-mono font-medium text-gray-700 hover:shadow-md transition-all duration-200 cursor-pointer hover:from-gray-100 hover:to-gray-200"
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>

                  <motion.button
                    onClick={() => handleStepChange((activeStep + 1) % steps.length)}
                    className="inline-flex items-center gap-2 text-sm font-bold text-zinc-950 hover:text-indigo-600 transition-all duration-200 cursor-pointer bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md"
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Next: Phase {steps[(activeStep + 1) % steps.length].n}</span>
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </motion.div>

              </motion.div>
            </AnimatePresence>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
