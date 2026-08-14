import React, { ReactNode } from "react";
import { useLineReveal } from "@/lib/animations";

const mark = "/stalci-mark.png";

export function Wordmark({ className = "", markSize = 24 }: { className?: string; markSize?: number }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <img
        src={mark}
        alt="STALCI logo"
        width={markSize}
        height={markSize}
        style={{ width: markSize, height: markSize }}
        className="object-contain"
      />
      <span className="font-display text-base sm:text-lg font-bold tracking-[0.28em] text-white">
        STALCI
      </span>
    </span>
  );
}

export function BadgePill({
  children,
  tone = "dark",
  className = "",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  variant?: string;
  className?: string;
}) {
  const isDark = tone === "dark";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-[11px] sm:text-xs font-medium tracking-wide transition-all ${
        isDark
          ? "border border-white/15 bg-white/[0.04] text-slate-200 backdrop-blur-md"
          : "border border-slate-300/80 bg-slate-100/90 text-slate-800"
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
}: {
  eyebrow: string;
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
  pillVariant?: string;
}) {
  const lineRef = useLineReveal();
  const isDark = tone === "dark";

  return (
    <div
      className={
        (align === "center" ? "mx-auto max-w-2xl text-center " : "max-w-2xl ") +
        (isDark ? "text-white" : "text-slate-900")
      }
    >
      <div className="mb-3">
        <BadgePill tone={tone}>
          {eyebrow}
        </BadgePill>
      </div>

      <h2
        className={`font-display text-2xl sm:text-3xl md:text-4xl font-extrabold leading-snug tracking-tight ${
          isDark ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>

      {subtitle ? (
        <p
          className={`mt-3 text-xs sm:text-sm leading-relaxed ${
            isDark ? "text-slate-400" : "text-slate-600"
          }`}
        >
          {subtitle}
        </p>
      ) : null}

      <div
        ref={lineRef}
        className={
          "mt-5 h-[1.5px] w-12 bg-slate-400/40 rounded-full " +
          (align === "center" ? "mx-auto" : "")
        }
      />
    </div>
  );
}
