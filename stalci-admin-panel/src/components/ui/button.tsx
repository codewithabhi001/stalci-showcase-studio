"use client";
import React from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[10px] font-semibold whitespace-nowrap transition-all duration-150 disabled:opacity-55 disabled:pointer-events-none active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary: "text-black bg-copper hover:bg-copper-soft shadow-xs font-bold transition-all",
  secondary: "text-ink bg-surface border border-line-strong hover:bg-surface-2 hover:border-copper/40 hover:text-white transition-all",
  ghost: "text-muted hover:bg-surface-2 hover:text-ink transition-colors",
  danger: "text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-600 hover:text-white transition-colors",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-[13px]",
  md: "h-10 px-4 text-sm",
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
    tone === "danger" ? "text-faint hover:bg-danger-wash hover:text-danger" : "text-faint hover:bg-canvas hover:text-copper";
  return (
    <button
      aria-label={label}
      title={label}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${toneCls} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
