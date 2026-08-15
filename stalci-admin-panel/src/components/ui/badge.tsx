"use client";
import React from "react";

type Tone = "neutral" | "success" | "warning" | "warn" | "danger" | "info" | "copper";

const tones: Record<Tone, string> = {
  neutral: "bg-surface-2/80 text-muted border-line shadow-2xs",
  success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]",
  warning: "bg-amber-500/10 text-amber-300 border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.15)]",
  warn: "bg-amber-500/10 text-amber-300 border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.15)]",
  danger: "bg-red-500/10 text-red-400 border-red-500/30 shadow-[0_0_12px_rgba(239,68,68,0.15)]",
  info: "bg-blue-500/10 text-blue-400 border-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.15)]",
  copper: "bg-copper/15 text-copper-soft border-copper/35 shadow-[0_0_15px_rgba(216,155,91,0.2)]",
};

const dots: Record<Tone, string> = {
  neutral: "bg-muted",
  success: "bg-emerald-400 animate-pulse",
  warning: "bg-amber-400",
  warn: "bg-amber-400",
  danger: "bg-red-400 animate-pulse",
  info: "bg-blue-400",
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

