import { ProjectCategory, CaseStudyItem } from "@/types/project";
import { useUIStore } from "@/store/useUIStore";

const categories: ProjectCategory[] = ["All", "Mobile Apps", "Web Platforms", "Enterprise IT", "AI Systems"];

interface ProjectFiltersProps {
  projects: CaseStudyItem[];
}

export function ProjectFilters({ projects }: ProjectFiltersProps) {
  const selectedCategory = useUIStore((state) => state.selectedProjectCategory);
  const setSelectedCategory = useUIStore((state) => state.setSelectedProjectCategory);

  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
      {categories.map((cat) => {
        const count =
          cat === "All"
            ? projects.length
            : projects.filter((p) => p.category === cat).length;
        const isSelected = selectedCategory === cat;

        return (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
              isSelected
                ? "bg-slate-950 text-white shadow-md"
                : "bg-white text-slate-700 border border-slate-200 shadow-2xs hover:border-slate-400 hover:text-slate-950"
            }`}
          >
            <span>{cat}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-mono font-bold ${
                isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600 border border-slate-200"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
