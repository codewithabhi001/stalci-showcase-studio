"use client";
import React from "react";

type Tone = "neutral" | "success" | "warning" | "danger" | "info" | "copper";

const tones: Record<Tone, string> = {
  neutral: "bg-canvas text-muted border-line",
  success: "bg-success-wash text-success border-success/15",
  warning: "bg-warn-wash text-warn border-warn/15",
  danger: "bg-danger-wash text-danger border-danger/15",
  info: "bg-info-wash text-info border-info/15",
  copper: "bg-copper-wash text-copper-deep border-copper/20",
};

export function Badge({ tone = "neutral", children, className = "" }: { tone?: Tone; children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
