import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { TechItem } from "@/data/mock-tech";

interface TechSpotlightDrawerProps {
  selectedTech: TechItem | null;
}

export function TechSpotlightDrawer({ selectedTech }: TechSpotlightDrawerProps) {
  if (!selectedTech) return null;

  return (
    <motion.div
      key={selectedTech.name}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="mt-8 w-full max-w-3xl rounded-3xl border border-zinc-200/90 bg-[#FAFAFC] p-6 sm:p-7 shadow-xs relative text-black"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-white border border-zinc-200 p-2.5 flex items-center justify-center shrink-0 shadow-2xs">
            <img
              src={`/icons/${selectedTech.iconSlug}.svg`}
              alt={selectedTech.name}
              width={36}
              height={36}
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-display text-lg font-bold text-zinc-950 leading-tight">
                {selectedTech.name}
              </h4>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200">
                {selectedTech.badge}
              </span>
            </div>
            <p className="text-xs font-mono text-zinc-500 mt-0.5">
              Category: {selectedTech.category}
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 bg-white border border-zinc-200 text-xs font-mono font-bold text-zinc-950 self-start sm:self-auto shadow-2xs">
          <Sparkles className="h-3.5 w-3.5 text-amber-600" />
          <span>{selectedTech.proficiency}% Production Grade</span>
        </span>
      </div>

      <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-zinc-600">
        {selectedTech.description}
      </p>

      <div className="mt-4 p-3 rounded-xl bg-white border border-zinc-200/80 text-xs flex items-center gap-2">
        <span className="font-bold text-zinc-950 font-mono">Use Case:</span>
        <span className="text-zinc-600">{selectedTech.useCase}</span>
      </div>
    </motion.div>
  );
}
