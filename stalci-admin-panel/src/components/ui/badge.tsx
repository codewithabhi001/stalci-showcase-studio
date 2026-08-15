"use client";
import React from "react";

type Tone = "neutral" | "success" | "warning" | "warn" | "danger" | "info" | "copper";

const tones: Record<Tone, string> = {
  neutral: "bg-surface-2 text-muted border-line shadow-2xs",
  success: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30 shadow-2xs",
  warning: "bg-amber-500/10 text-amber-700 border-amber-500/30 shadow-2xs",
  warn: "bg-amber-500/10 text-amber-700 border-amber-500/30 shadow-2xs",
  danger: "bg-red-500/10 text-red-700 border-red-500/30 shadow-2xs",
  info: "bg-blue-500/10 text-blue-700 border-blue-500/30 shadow-2xs",
  copper: "bg-copper/15 text-copper-deep border-copper/35 shadow-2xs",
};

const dots: Record<Tone, string> = {
  neutral: "bg-muted",
  success: "bg-emerald-600 animate-pulse",
  warning: "bg-amber-600",
  warn: "bg-amber-600",
  danger: "bg-red-600 animate-pulse",
  info: "bg-blue-600",
  copper: "bg-copper animate-pulse",
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

