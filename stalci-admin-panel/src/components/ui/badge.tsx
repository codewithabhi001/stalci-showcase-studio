"use client";
import React from "react";

type Tone = "neutral" | "success" | "warning" | "warn" | "danger" | "info" | "copper" | "purple" | "cyan";

const tones: Record<Tone, string> = {
  neutral: "bg-zinc-900 text-zinc-100 border-zinc-700/80 shadow-2xs",
  success: "bg-zinc-900 text-emerald-400 border-zinc-700/80 shadow-2xs",
  warning: "bg-zinc-900 text-amber-400 border-zinc-700/80 shadow-2xs",
  warn: "bg-zinc-900 text-amber-400 border-zinc-700/80 shadow-2xs",
  danger: "bg-zinc-900 text-rose-400 border-zinc-700/80 shadow-2xs",
  info: "bg-zinc-900 text-[#3B82F6] border-zinc-700/80 shadow-2xs",
  copper: "bg-zinc-900 text-zinc-100 border-zinc-700/80 shadow-2xs",
  purple: "bg-zinc-900 text-[#3B82F6] border-zinc-700/80 shadow-2xs",
  cyan: "bg-zinc-900 text-cyan-400 border-zinc-700/80 shadow-2xs",
};

const dots: Record<Tone, string> = {
  neutral: "bg-zinc-400",
  success: "bg-emerald-400 animate-pulse",
  warning: "bg-amber-400",
  warn: "bg-amber-400",
  danger: "bg-rose-400 animate-pulse",
  info: "bg-[#0052FF]",
  copper: "bg-[#0052FF] animate-pulse",
  purple: "bg-[#0052FF] animate-pulse",
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
