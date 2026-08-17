import { ExternalLink, X, Award, Layers, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/store/useUIStore";

export function CaseStudyModal() {
  const activeCaseStudy = useUIStore((state) => state.activeCaseStudy);
  const setActiveCaseStudy = useUIStore((state) => state.setActiveCaseStudy);

  return (
    <AnimatePresence>
      {activeCaseStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-3xl rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-2xl my-6 max-h-[90vh] overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  {activeCaseStudy.category}
                </span>
                <span className="text-xs font-mono text-slate-600">
                  Client: {activeCaseStudy.client}
                </span>
              </div>

              <button
                onClick={() => setActiveCaseStudy(null)}
                className="p-1.5 rounded-full bg-slate-200 text-slate-700 hover:text-slate-950 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-5">
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                  {activeCaseStudy.title}
                </h2>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {activeCaseStudy.summary}
                </p>
              </div>

              <div className="h-52 sm:h-64 w-full rounded-xl overflow-hidden border border-slate-200 relative">
                <img
                  src={activeCaseStudy.imageUrl}
                  alt={activeCaseStudy.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {activeCaseStudy.metrics && activeCaseStudy.metrics.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-800 mb-2.5 flex items-center gap-1.5">
                    <Award className="h-3.5 w-3.5 text-zinc-700" /> Key Performance Indicators (KPIs)
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {activeCaseStudy.metrics.map((m, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-center">
                        <span className="block font-mono text-lg font-bold text-zinc-950">
                          {m.value}
                        </span>
                        <span className="block text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5 font-medium">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-800 mb-2 flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-zinc-700" /> Architecture &amp; Scope
                </h4>
                <p className="text-xs sm:text-sm leading-relaxed text-zinc-600">
                  {activeCaseStudy.fullDescription}
                </p>
              </div>

              {activeCaseStudy.clientFeedback && (
                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 italic text-xs sm:text-sm text-zinc-700 flex items-start gap-2.5">
                  <span className="text-xl text-zinc-400 font-serif leading-none">“</span>
                  <p>{activeCaseStudy.clientFeedback}</p>
                </div>
              )}

              {activeCaseStudy.technologies && activeCaseStudy.technologies.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-800 mb-2 flex items-center gap-1.5">
                    <Cpu className="h-3.5 w-3.5 text-zinc-700" /> Technology Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeCaseStudy.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-zinc-100 text-zinc-700 border border-zinc-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="px-5 py-3 border-t border-zinc-100 bg-zinc-50 flex items-center justify-between">
              {activeCaseStudy.liveUrl ? (
                <a
                  href={activeCaseStudy.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-semibold text-white bg-black hover:bg-zinc-800 transition-colors"
                >
                  <span>Visit Live Website</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                <span className="text-xs text-zinc-500 font-mono">Enterprise Platform</span>
              )}

              <button
                onClick={() => setActiveCaseStudy(null)}
                className="text-xs font-medium text-zinc-500 hover:text-black cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
