import React, { ReactNode } from "react";
import { useLineReveal } from "@/lib/animations";

export function StalciLogoIcon({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="stalciBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
      </defs>
      
      {/* Sovereign STALCI Geometric Hex-Prism Diamond S */}
      <g>
        {/* Top angled wing */}
        <path d="M 60 22 L 88 38 L 74 46 L 46 30 Z" fill="url(#stalciBlueGrad)" />
        {/* Middle cross spine */}
        <path d="M 32 46 L 74 46 L 88 54 L 46 70 L 32 62 Z" fill="url(#stalciBlueGrad)" opacity="0.95" />
        {/* Bottom angled wing */}
        <path d="M 46 70 L 74 86 L 60 98 L 32 82 Z" fill="url(#stalciBlueGrad)" />
        {/* Core central spark diamond */}
        <polygon points="60,48 70,60 60,72 50,60" fill="#FFFFFF" opacity="0.9" />
      </g>
    </svg>
  );
}

export function Wordmark({ className = "", markSize = 38, tone = "light" }: { className?: string; markSize?: number; tone?: "light" | "dark" }) {
  const isDark = tone === "dark";

  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <StalciLogoIcon size={markSize} />
      <div className="flex flex-col leading-none">
        <span className={`font-display text-xl sm:text-[22px] font-bold tracking-tight ${isDark ? "text-white" : "text-zinc-950"}`}>
          stalci
        </span>
        <span className="text-[11px] font-sans font-semibold tracking-wider text-blue-600">
          technologies
        </span>
      </div>
    </span>
  );
}

export function BadgePill({
  children,
  tone = "light",
  variant = "default",
  className = "",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  variant?: "default" | "gradient";
  className?: string;
}) {
  const isDark = tone === "dark";

  if (variant === "gradient") {
    return (
      <span className={`inline-flex p-[1px] rounded-full bg-gradient-to-r from-red-500 via-purple-500 to-indigo-500 shadow-2xs ${className}`}>
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-0.5 text-[10.5px] font-mono tracking-wider font-semibold ${
          isDark ? "bg-black text-white" : "bg-white text-zinc-950"
        }`}>
          {children}
        </span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-0.5 text-[10.5px] font-mono uppercase tracking-wider font-bold transition-all ${
        isDark
          ? "border border-white/15 bg-white/[0.04] text-neutral-200 backdrop-blur-md"
          : "border border-zinc-200/90 bg-zinc-100/80 text-zinc-800"
      } ${className}`}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "light",
  pillVariant = "default",
}: {
  eyebrow: string;
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
  pillVariant?: "default" | "gradient";
}) {
  const lineRef = useLineReveal();
  const isDark = tone === "dark";

  return (
    <div
      className={
        (align === "center" ? "mx-auto max-w-2xl text-center " : "max-w-2xl ") +
        (isDark ? "text-white" : "text-black")
      }
    >
      <div className="mb-2.5">
        <BadgePill tone={tone} variant={pillVariant}>
          {eyebrow}
        </BadgePill>
      </div>

      <h2
        className={`font-display text-2xl sm:text-[32px] font-bold leading-[1.2] tracking-tight ${
          isDark ? "text-white" : "text-zinc-950"
        }`}
      >
        {title}
      </h2>

      {subtitle ? (
        <p
          className={`mt-2 text-xs sm:text-[13px] leading-relaxed ${
            isDark ? "text-neutral-400" : "text-zinc-600 font-normal"
          }`}
        >
          {subtitle}
        </p>
      ) : null}

      <div
        ref={lineRef}
        className={
          "mt-3.5 h-[1.5px] w-10 bg-zinc-300 rounded-full " +
          (align === "center" ? "mx-auto" : "")
        }
      />
    </div>
  );
}
