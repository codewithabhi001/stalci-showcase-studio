"use client";
import React from "react";

type Tone = "neutral" | "success" | "warning" | "warn" | "danger" | "info" | "copper" | "purple" | "cyan";

const tones: Record<Tone, string> = {
  neutral: "bg-zinc-100 text-zinc-800 border-zinc-200/80 shadow-2xs",
  success: "bg-emerald-50 text-emerald-700 border-emerald-200/90 shadow-2xs",
  warning: "bg-amber-50 text-amber-800 border-amber-200/90 shadow-2xs",
  warn: "bg-amber-50 text-amber-800 border-amber-200/90 shadow-2xs",
  danger: "bg-rose-50 text-rose-700 border-rose-200/90 shadow-2xs",
  info: "bg-sky-50 text-sky-700 border-sky-200/90 shadow-2xs",
  copper: "bg-purple-50 text-purple-700 border-purple-200/90 shadow-2xs",
  purple: "bg-purple-50 text-purple-700 border-purple-200/90 shadow-2xs",
  cyan: "bg-cyan-50 text-cyan-700 border-cyan-200/90 shadow-2xs",
};

const dots: Record<Tone, string> = {
  neutral: "bg-zinc-400",
  success: "bg-emerald-500 animate-pulse",
  warning: "bg-amber-500",
  warn: "bg-amber-500",
  danger: "bg-rose-500 animate-pulse",
  info: "bg-sky-500",
  copper: "bg-purple-500 animate-pulse",
  purple: "bg-purple-500 animate-pulse",
  cyan: "bg-cyan-500 animate-pulse",
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
