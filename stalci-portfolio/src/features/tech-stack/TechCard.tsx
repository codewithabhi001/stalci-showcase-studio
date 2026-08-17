import { TechItem } from "@/data/mock-tech";

interface TechCardProps {
  tech: TechItem;
  isSelected: boolean;
  onSelect: (tech: TechItem) => void;
}

export function TechCard({ tech, isSelected, onSelect }: TechCardProps) {
  return (
    <button
      onClick={() => onSelect(tech)}
      className={`group relative w-full h-32 sm:h-34 rounded-2xl flex flex-col items-center justify-center p-4 cursor-pointer transition-all duration-200 ${
        isSelected
          ? "bg-white border-2 border-black shadow-md scale-[1.02] ring-2 ring-black/5"
          : "bg-[#FAFAFC] border border-zinc-200/90 shadow-2xs hover:border-zinc-400 hover:bg-white hover:shadow-xs"
      }`}
    >
      <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-white border border-zinc-200/80 p-2 flex items-center justify-center mb-2 shadow-2xs group-hover:border-zinc-300">
        <img
          src={`/icons/${tech.iconSlug}.svg`}
          alt={`${tech.name} logo`}
          width={32}
          height={32}
          className="h-full w-full object-contain"
          onError={(e) => {
            (e.target as HTMLElement).style.display = "none";
          }}
        />
      </div>

      <span className="text-xs sm:text-[13px] font-bold text-zinc-950 tracking-tight text-center leading-tight">
        {tech.label}
      </span>

      <span className="mt-1 text-[10px] font-mono text-zinc-500 tracking-tight text-center truncate max-w-full">
        {tech.badge}
      </span>
    </button>
  );
}
