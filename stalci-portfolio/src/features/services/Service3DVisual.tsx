import { Cpu, Code2, Smartphone, Cloud } from "lucide-react";
import { ServiceVisualType } from "@/types/service";

interface Service3DVisualProps {
  type: ServiceVisualType;
}

export function Service3DVisual({ type }: Service3DVisualProps) {
  if (type === "ai") {
    return (
      <div className="relative w-full h-full min-h-[220px] rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-purple-950 border border-purple-900/50 flex items-center justify-center p-6 overflow-hidden shadow-md group">
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative h-24 w-28 rounded-2xl bg-purple-950 border-2 border-purple-500/80 flex items-center justify-center shadow-lg transform -rotate-6 group-hover:rotate-0 transition-transform duration-300">
            <Cpu className="h-10 w-10 text-purple-300" />
          </div>
          <span className="mt-3 text-[11px] font-mono font-bold text-purple-300 uppercase tracking-widest">
            Autonomous AI Engines
          </span>
        </div>
      </div>
    );
  }

  if (type === "web") {
    return (
      <div className="relative w-full h-full min-h-[220px] rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 border border-indigo-900/50 flex items-center justify-center p-6 overflow-hidden shadow-md group">
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative h-24 w-32 rounded-2xl bg-indigo-950 border-2 border-indigo-500/80 flex items-center justify-center shadow-lg transform rotate-3 group-hover:rotate-0 transition-transform duration-300">
            <Code2 className="h-10 w-10 text-indigo-300" />
          </div>
          <span className="mt-3 text-[11px] font-mono font-bold text-indigo-300 uppercase tracking-widest">
            High-Scale Web Systems
          </span>
        </div>
      </div>
    );
  }

  if (type === "mobile") {
    return (
      <div className="relative w-full h-full min-h-[220px] rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 border border-emerald-900/50 flex items-center justify-center p-6 overflow-hidden shadow-md group">
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative h-24 w-16 rounded-2xl bg-emerald-950 border-2 border-emerald-500/80 flex items-center justify-center shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
            <Smartphone className="h-8 w-8 text-emerald-300" />
          </div>
          <span className="mt-3 text-[11px] font-mono font-bold text-emerald-300 uppercase tracking-widest">
            Native Mobile Ecosystems
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[220px] rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-sky-950 border border-sky-900/50 flex items-center justify-center p-6 overflow-hidden shadow-md group">
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative h-24 w-28 rounded-2xl bg-sky-950 border-2 border-sky-500/80 flex items-center justify-center shadow-lg transform rotate-6 group-hover:rotate-0 transition-transform duration-300">
          <Cloud className="h-10 w-10 text-sky-300" />
        </div>
        <span className="mt-3 text-[11px] font-mono font-bold text-sky-300 uppercase tracking-widest">
          Sovereign Cloud &amp; SRE
        </span>
      </div>
    </div>
  );
}
