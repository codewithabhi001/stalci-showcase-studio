"use client";
import React from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "copper-outline";
type Size = "sm" | "md" | "lg";

const base =
  "relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-xl font-semibold whitespace-nowrap transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] cursor-pointer";

const variants: Record<Variant, string> = {
  primary:
    "text-white bg-[#0052FF] hover:bg-[#0045D8] font-semibold border border-[#0052FF] shadow-xs transition-all",
  secondary:
    "text-zinc-900 bg-white border border-zinc-200/90 hover:bg-zinc-100 hover:border-zinc-300 shadow-2xs font-semibold transition-all",
  ghost:
    "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 font-medium transition-colors",
  danger:
    "text-red-700 bg-red-50 border border-red-200 hover:bg-red-600 hover:text-white font-semibold transition-colors",
  "copper-outline":
    "text-[#0052FF] bg-[#0052FF]/10 border border-[#0052FF]/20 hover:bg-[#0052FF]/15 font-semibold transition-all shadow-2xs",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-[12px]",
  md: "h-9 px-4 text-xs sm:text-[13px]",
  lg: "h-10.5 px-5 text-sm",
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
      ? "text-zinc-400 hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-200"
      : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950 border border-transparent hover:border-zinc-200";
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
