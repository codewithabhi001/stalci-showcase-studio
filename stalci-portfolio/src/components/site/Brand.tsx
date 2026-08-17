import React, { ReactNode } from "react";
import { useLineReveal } from "@/lib/animations";

export function StalciLogoIcon({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="stalciRibbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#93C5FD" />
          <stop offset="70%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#0052FF" />
        </linearGradient>
        <filter id="sLogoGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Bold, Stylish Sovereign 'S' Monogram Ribbon */}
      <path
        d="M 74 24 L 38 24 C 28 24 22 30 22 40 C 22 50 28 54 38 54 L 62 54 C 72 54 78 58 78 68 C 78 78 72 84 62 84 L 26 84"
        stroke="url(#stalciRibbonGrad)"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner Metallic Diamond Sparkle */}
      <circle cx="50" cy="54" r="3" fill="#FFFFFF" />
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
      <span className={`inline-flex p-[1px] rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-2xs ${className}`}>
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-0.5 text-[11px] font-mono tracking-wider font-semibold ${
          isDark ? "bg-black text-white" : "bg-white text-zinc-950"
        }`}>
          {children}
        </span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-mono uppercase tracking-wider font-bold transition-all ${
        isDark
          ? "border border-white/15 bg-white/[0.06] text-neutral-200 backdrop-blur-md shadow-[0_0_15px_rgba(0,82,255,0.12)]"
          : "border border-zinc-200 bg-zinc-50 text-zinc-800 shadow-2xs"
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
      <div className="mb-3">
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
          className={`mt-2 text-xs sm:text-[13.5px] leading-relaxed ${
            isDark ? "text-neutral-400" : "text-zinc-600 font-normal"
          }`}
        >
          {subtitle}
        </p>
      ) : null}

      <div
        ref={lineRef}
        className={
          `mt-3.5 h-[1.5px] w-12 rounded-full ${isDark ? "bg-blue-500/60" : "bg-blue-600"} ` +
          (align === "center" ? "mx-auto" : "")
        }
      />
    </div>
  );
}
