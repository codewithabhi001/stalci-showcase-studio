import React, { ReactNode } from "react";
import { useLineReveal } from "@/lib/animations";

const mark = "/stalci-mark.png";

export function Wordmark({ className = "", markSize = 24, tone = "light" }: { className?: string; markSize?: number; tone?: "light" | "dark" }) {
  const isDark = tone === "dark";

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
      <span className={`font-display text-base sm:text-lg font-extrabold tracking-[0.22em] ${isDark ? "text-white" : "text-zinc-950"}`}>
        STALCI
      </span>
    </span>
  );
}

export function BadgePill({
  children,
  tone = "light",
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
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-[11px] font-mono uppercase tracking-wider font-bold transition-all ${
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
        (align === "center" ? "mx-auto max-w-3xl text-center " : "max-w-3xl ") +
        (isDark ? "text-white" : "text-black")
      }
    >
      <div className="mb-3.5">
        <BadgePill tone={tone}>
          {eyebrow}
        </BadgePill>
      </div>

      <h2
        className={`font-display text-2xl sm:text-3xl md:text-[38px] font-bold leading-[1.18] tracking-tight ${
          isDark ? "text-white" : "text-zinc-950"
        }`}
      >
        {title}
      </h2>

      {subtitle ? (
        <p
          className={`mt-3 text-xs sm:text-sm leading-relaxed ${
            isDark ? "text-neutral-400" : "text-zinc-600 font-normal"
          }`}
        >
          {subtitle}
        </p>
      ) : null}

      <div
        ref={lineRef}
        className={
          "mt-4 h-[1.5px] w-12 bg-zinc-300 rounded-full " +
          (align === "center" ? "mx-auto" : "")
        }
      />
    </div>
  );
}
