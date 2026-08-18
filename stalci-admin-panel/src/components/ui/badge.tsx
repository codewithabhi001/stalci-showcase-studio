"use client";
import React from "react";

type Tone = "neutral" | "success" | "warning" | "warn" | "danger" | "info" | "copper" | "purple" | "cyan";

const tones: Record<Tone, string> = {
  neutral: "bg-zinc-100 text-zinc-800 border-zinc-200/90 shadow-2xs",
  success: "bg-emerald-50 text-emerald-800 border-emerald-200/90 shadow-2xs",
  warning: "bg-amber-50 text-amber-900 border-amber-200/90 shadow-2xs",
  warn: "bg-amber-50 text-amber-900 border-amber-200/90 shadow-2xs",
  danger: "bg-rose-50 text-rose-800 border-rose-200/90 shadow-2xs",
  info: "bg-blue-50 text-[#0052FF] border-blue-200/90 shadow-2xs",
  copper: "bg-zinc-100 text-zinc-800 border-zinc-200/90 shadow-2xs",
  purple: "bg-blue-50 text-[#0052FF] border-blue-200/90 shadow-2xs",
  cyan: "bg-cyan-50 text-cyan-800 border-cyan-200/90 shadow-2xs",
};

const dots: Record<Tone, string> = {
  neutral: "bg-zinc-400",
  success: "bg-emerald-600 animate-pulse",
  warning: "bg-amber-600",
  warn: "bg-amber-600",
  danger: "bg-rose-600 animate-pulse",
  info: "bg-[#0052FF]",
  copper: "bg-zinc-500 animate-pulse",
  purple: "bg-[#0052FF] animate-pulse",
  cyan: "bg-cyan-600 animate-pulse",
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
