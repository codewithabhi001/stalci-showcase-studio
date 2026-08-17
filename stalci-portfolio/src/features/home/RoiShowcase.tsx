import { TrendingUp, ShieldCheck, Zap, Server, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { BadgePill } from "@/components/brand/Brand";

const roiMetrics = [
  {
    icon: Zap,
    metric: "3.8× Faster",
    label: "Product Time-to-Market",
    desc: "Accelerate release cadence with pre-built modular microservices and automated CI/CD canary deployments.",
    color: "text-amber-500",
    bgColor: "bg-amber-50 border-amber-200",
  },
  {
    icon: TrendingUp,
    metric: "62% Reduction",
    label: "Cloud Compute Costs",
    desc: "FinOps governance, auto-scaling Kubernetes node pools, and sub-millisecond serverless execution optimization.",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 border-emerald-200",
  },
  {
    icon: Server,
    metric: "99.999% SLA",
    label: "Multi-Region Uptime",
    desc: "Zero-downtime database replication, sub-frame failover, and active-active multi-cloud orchestration.",
    color: "text-blue-600",
    bgColor: "bg-blue-50 border-blue-200",
  },
  {
    icon: ShieldCheck,
    metric: "Zero Leaks",
    label: "SOC 2 Type II Security",
    desc: "Air-gapped sovereign AI RAG nodes, hardware vault encryption, and automated vulnerability scanning.",
    color: "text-purple-600",
    bgColor: "bg-purple-50 border-purple-200",
  },
];

export function RoiShowcase() {
  return (
    <section className="bg-white py-14 sm:py-20 text-slate-900 border-t border-slate-200/90 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="flex justify-center">
            <BadgePill tone="light" variant="gradient">
              <span className="font-semibold text-slate-900">📈 Quantifiable Engineering Outcomes</span>
            </BadgePill>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-[1.2]">
            Engineering Designed to <span className="font-extrabold text-slate-900">Maximize ROI</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed max-w-xl mx-auto">
            We don't just write code — we engineer business outcomes. Here is how our architecture delivers measurable return on capital for founders and enterprise teams.
          </p>
        </div>

        {/* ROI Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {roiMetrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group rounded-3xl border border-slate-200/90 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/30 p-6 shadow-2xs hover:border-slate-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`p-3 rounded-2xl border ${item.bgColor} inline-flex mb-4`}>
                    <Icon className={`h-6 w-6 ${item.color}`} />
                  </div>

                  <span className="block font-mono text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {item.metric}
                  </span>

                  <h3 className="mt-1 text-sm font-bold text-slate-900">
                    {item.label}
                  </h3>

                  <p className="mt-2 text-xs text-slate-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 font-semibold">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Contractual SLA SLA-backed</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
