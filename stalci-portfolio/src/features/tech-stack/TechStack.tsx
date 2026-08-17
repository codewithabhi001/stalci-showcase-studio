import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/brand/Brand";
import { techItems, TechItem } from "@/data/mock-tech";
import { TechCard } from "./TechCard";
import { TechSpotlightDrawer } from "./TechSpotlightDrawer";

const categories = [
  "Languages",
  "Frameworks and SDKs",
  "Cloud and Backend",
  "Dev Tools",
] as const;

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState<string>("Languages");
  const [selectedTech, setSelectedTech] = useState<TechItem>(techItems[0]);

  const filteredItems = techItems.filter((item) => item.category === activeCategory);

  return (
    <section id="tech-stack" className="relative bg-white py-14 sm:py-20 overflow-hidden text-black border-t border-zinc-200/90">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          tone="light"
          eyebrow="Advanced Tech Portfolio"
          title="Using The Right Tools For Powerful Results"
          subtitle="We pick the right stack for your specific project requirements and ensure maximum performance."
        />

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  const firstOfCat = techItems.find((t) => t.category === cat);
                  if (firstOfCat) setSelectedTech(firstOfCat);
                }}
                className={`relative rounded-full px-5 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-black text-white font-bold shadow-sm"
                    : "bg-[#FAFAFC] text-zinc-700 border border-zinc-200/90 hover:border-zinc-400 hover:text-black shadow-2xs"
                }`}
              >
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-center">
          <div className="w-full max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 justify-items-center"
              >
                {filteredItems.map((tech) => (
                  <TechCard
                    key={tech.name}
                    tech={tech}
                    isSelected={selectedTech?.name === tech.name}
                    onSelect={setSelectedTech}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <TechSpotlightDrawer selectedTech={selectedTech} />
        </div>
      </div>
    </section>
  );
}
