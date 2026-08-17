import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { CoreService } from "@/types/service";
import { Service3DVisual } from "./Service3DVisual";

interface ServiceCardProps {
  service: CoreService;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group rounded-3xl border border-slate-200/90 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/30 p-6 sm:p-9 shadow-2xs hover:border-slate-300 hover:shadow-md transition-all duration-300 relative overflow-hidden hover:-translate-y-0.5"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
        <div className="lg:col-span-5 h-full">
          <Service3DVisual type={service.visualType} />
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {service.title}
            </h3>
            <p className="text-xs sm:text-[13px] font-semibold mt-1 flex items-center gap-1.5 text-slate-700">
              <Sparkles className={`h-3.5 w-3.5 ${service.iconColor}`} />
              {service.tagline}
            </p>
            <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
              {service.description}
            </p>
          </div>

          <div>
            <span className="block text-[10.5px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-2">
              Key Deliverables
            </span>
            <div className="flex flex-wrap gap-2">
              {service.projects.map((proj) => (
                <span
                  key={proj}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50/80 px-3 py-1 text-[11px] font-mono font-semibold text-slate-800 shadow-2xs hover:border-slate-300 transition-colors"
                >
                  <CheckCircle2 className={`h-3 w-3 ${service.iconColor}`} />
                  {proj}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] text-slate-500 mb-2 font-normal">
              {service.toolsText}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {service.tools.map((tool) => (
                <div
                  key={tool.name}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-800 shadow-2xs hover:border-slate-300 transition-colors"
                >
                  <img
                    src={`/icons/${tool.iconSlug}.svg`}
                    alt={tool.name}
                    className="h-3.5 w-3.5 object-contain opacity-90"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                  <span>{tool.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/services/$slug"
              params={{ slug: service.slug }}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2.5 text-xs font-bold text-white hover:bg-black transition-colors shadow-md group/btn"
            >
              <span>Explore Practice</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
