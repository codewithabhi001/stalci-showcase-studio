"use client";
import React from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "copper-outline";
type Size = "sm" | "md" | "lg";

const base =
  "relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-xl font-semibold whitespace-nowrap transition-all duration-200 disabled:opacity-55 disabled:pointer-events-none active:scale-[0.98] cursor-pointer";

const variants: Record<Variant, string> = {
  primary:
    "text-white bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#818CF8] hover:brightness-105 shadow-[0_4px_20px_rgba(99,102,241,0.3)] font-bold border border-copper/40",
  secondary:
    "text-ink bg-surface border border-line-strong hover:bg-surface-2 hover:border-copper/40 hover:text-copper shadow-2xs",
  ghost:
    "text-muted hover:bg-surface-2 hover:text-ink transition-colors",
  danger:
    "text-red-600 bg-red-500/10 border border-red-500/20 hover:bg-red-600 hover:text-white transition-colors",
  "copper-outline":
    "text-copper-deep bg-copper/10 border border-copper/40 hover:bg-copper/20 hover:border-copper transition-all shadow-2xs",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-[12.5px]",
  md: "h-9.5 px-4 text-xs sm:text-[13px]",
  lg: "h-11 px-5 text-sm",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  loading = false,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size; loading?: boolean }) {
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} disabled={loading || props.disabled} {...props}>
      {loading && <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />}
      {children}
    </button>
  );
}

export function IconButton({
  label,
  tone = "neutral",
  className = "",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { label: string; tone?: "neutral" | "danger" }) {
  const toneCls =
    tone === "danger"
      ? "text-faint hover:bg-red-500/15 hover:text-red-400 border border-transparent hover:border-red-500/30"
      : "text-faint hover:bg-surface-2 hover:text-copper border border-transparent hover:border-copper/30";
  return (
    <button
      aria-label={label}
      title={label}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-150 cursor-pointer ${toneCls} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

