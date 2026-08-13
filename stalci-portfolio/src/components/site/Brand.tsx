import { useLineReveal } from "@/lib/animations";
const mark = "/stalci-mark.png";

export function Wordmark({ className = "", markSize = 28 }: { className?: string; markSize?: number }) {
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
      <span className="font-display text-lg font-bold tracking-[0.32em] text-white">STALCI</span>
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
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
}) {
  const lineRef = useLineReveal();

  const isDark = tone === "dark";

  return (
    <div
      className={
        (align === "center" ? "mx-auto max-w-3xl text-center " : "max-w-3xl ") +
        (isDark ? "text-white" : "text-slate-900")
      }
    >
      <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#D89B5B] mb-2.5">
        {eyebrow}
      </p>
      <h2 className={`font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl ${isDark ? "text-white" : "text-slate-900"}`}>
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-4 text-sm sm:text-base leading-relaxed ${
            isDark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {subtitle}
        </p>
      ) : null}
      <div
        ref={lineRef}
        className={
          "mt-6 h-0.5 w-16 bg-gradient-to-r from-[#D89B5B] to-[#F0BC86] rounded-full " + (align === "center" ? "mx-auto" : "")
        }
      />
    </div>
  );
}
