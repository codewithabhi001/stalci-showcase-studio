"use client";
import React from "react";

type Tone = "neutral" | "success" | "warning" | "warn" | "danger" | "info" | "copper" | "purple" | "cyan";

const tones: Record<Tone, string> = {
  neutral: "bg-zinc-900 text-zinc-200 border-zinc-700/80 shadow-2xs",
  success: "bg-emerald-950/80 text-emerald-300 border-emerald-800/80 shadow-2xs",
  warning: "bg-amber-950/80 text-amber-300 border-amber-800/80 shadow-2xs",
  warn: "bg-amber-950/80 text-amber-300 border-amber-800/80 shadow-2xs",
  danger: "bg-rose-950/80 text-rose-300 border-rose-800/80 shadow-2xs",
  info: "bg-blue-950/80 text-blue-300 border-blue-800/80 shadow-2xs",
  copper: "bg-zinc-900 text-zinc-200 border-zinc-700/80 shadow-2xs",
  purple: "bg-indigo-950/80 text-indigo-300 border-indigo-800/80 shadow-2xs",
  cyan: "bg-cyan-950/80 text-cyan-300 border-cyan-800/80 shadow-2xs",
};

const dots: Record<Tone, string> = {
  neutral: "bg-zinc-400",
  success: "bg-emerald-400 animate-pulse",
  warning: "bg-amber-400",
  warn: "bg-amber-400",
  danger: "bg-rose-400 animate-pulse",
  info: "bg-blue-400 animate-pulse",
  copper: "bg-zinc-400 animate-pulse",
  purple: "bg-indigo-400 animate-pulse",
  cyan: "bg-cyan-400 animate-pulse",
};

export function Badge({
  tone = "neutral",
  dot = false,
  children,
  className = "",
}: {
  tone?: Tone;
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide font-mono transition-all ${tones[tone]} ${className}`}
    >
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${dots[tone]}`} />}
      {children}
    </span>
  );
}
