import { Maximize2, ChevronRight, Award } from "lucide-react";
import { motion } from "framer-motion";
import { CaseStudyItem } from "@/types/project";
import { useUIStore } from "@/store/useUIStore";

interface ProjectCardProps {
  project: CaseStudyItem;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const setActiveCaseStudy = useUIStore((state) => state.setActiveCaseStudy);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={() => setActiveCaseStudy(project)}
      className="group relative rounded-3xl bg-gradient-to-b from-white via-slate-50/50 to-slate-100/30 border border-slate-200/90 p-5 sm:p-6 shadow-2xs hover:border-slate-400 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden hover:-translate-y-1"
    >
      <div className="absolute top-0 left-6 right-6 h-[2px] bg-slate-900 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-inner">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&auto=format&fit=crop&q=80";
            }}
          />
          <div className="absolute top-3 left-3">
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md shadow-md border ${
                project.category === "AI Systems"
                  ? "bg-purple-500/90 text-white border-purple-300"
                  : project.category === "Mobile Apps"
                  ? "bg-emerald-500/90 text-white border-emerald-300"
                  : project.category === "Enterprise IT"
                  ? "bg-sky-500/90 text-white border-sky-300"
                  : "bg-slate-900/90 text-white border-slate-700"
              }`}
            >
              {project.category}
            </span>
          </div>
          <div className="absolute top-3 right-3 p-2 rounded-xl bg-slate-900/80 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
            <Maximize2 className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-5">
          <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-slate-950 transition-colors">
            {project.title}
          </h3>
          <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-slate-600 font-normal line-clamp-3">
            {project.summary}
          </p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-900 group-hover:text-slate-950 flex items-center gap-1.5 transition-colors">
          <span>View Case Study</span>
          <ChevronRight className="h-3.5 w-3.5 text-slate-900 group-hover:translate-x-1 transition-transform" />
        </span>

        {project.metrics && project.metrics.length > 0 && (
          <div className="flex items-center gap-1.5 text-[11px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-md font-semibold">
            <Award className="h-3.5 w-3.5 text-emerald-600" />
            <span>{project.metrics[0].value}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
