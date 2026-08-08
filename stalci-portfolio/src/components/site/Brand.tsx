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
      <span className="font-display text-lg font-semibold tracking-[0.32em]">STALCI</span>
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

  return (
    <div
      className={
        (align === "center" ? "mx-auto max-w-2xl text-center " : "max-w-2xl ") +
        (tone === "dark" ? "text-on-ink" : "text-foreground")
      }
    >
      <p className="eyebrow text-copper">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl md:text-[2.25rem]">{title}</h2>
      {subtitle ? (
        <p
          className={
            "mt-4 text-sm leading-relaxed sm:text-base " +
            (tone === "dark" ? "text-on-ink-muted" : "text-muted-foreground")
          }
        >
          {subtitle}
        </p>
      ) : null}
      <div
        ref={lineRef}
        className={
          "mt-6 h-px w-16 bg-copper " + (align === "center" ? "mx-auto" : "")
        }
      />
    </div>
  );
}
