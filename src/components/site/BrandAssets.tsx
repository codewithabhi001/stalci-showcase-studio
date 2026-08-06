import { SectionHeading } from "./Brand";
import mark from "@/assets/stalci-mark.png";

const palette = [
  { hex: "#0B0D10", name: "Obsidian" },
  { hex: "#1A1D22", name: "Graphite" },
  { hex: "#4B5563", name: "Steel" },
  { hex: "#D89B5B", name: "Copper" },
  { hex: "#FFFFFF", name: "Pure White" },
];

const typography = [
  { label: "Display", family: "Sora", sample: "Aa" },
  { label: "Body", family: "Manrope", sample: "Aa" },
];

export function BrandAssets() {
  return (
    <section id="brand" className="bg-secondary/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Brand system"
          title="One identity, applied everywhere"
          subtitle="The STALCI mark, palette and type scale carry across product UI, documentation, office signage and every touchpoint."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <div className="surface-ink relative overflow-hidden rounded-3xl p-8">
            <div className="absolute inset-0 grid-lines opacity-60" aria-hidden />
            <div className="relative flex h-full flex-col items-center justify-center gap-6 py-8">
              <img
                src={mark}
                alt="STALCI monogram on dark background"
                width={96}
                height={96}
                loading="lazy"
                className="h-24 w-24 object-contain"
              />
              <p className="font-display text-2xl font-semibold tracking-[0.34em] text-on-ink">STALCI</p>
              <p className="text-[0.65rem] tracking-[0.3em] text-on-ink-muted">PRIMARY LOCKUP</p>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-copper-deep">Colour palette</h3>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-5">
              {palette.map((c) => (
                <div key={c.hex}>
                  <div
                    className="h-20 w-full rounded-xl border border-border shadow-sm"
                    style={{ backgroundColor: c.hex }}
                  />
                  <p className="mt-2 text-xs font-semibold">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.hex}</p>
                </div>
              ))}
            </div>

            <h3 className="mt-10 text-sm font-semibold uppercase tracking-[0.2em] text-copper-deep">Typography</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {typography.map((t) => (
                <div key={t.label} className="flex items-center gap-5 rounded-2xl border border-border bg-background p-5">
                  <span
                    className="text-4xl font-semibold text-copper-deep"
                    style={{ fontFamily: `"${t.family}", sans-serif` }}
                  >
                    {t.sample}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{t.family}</p>
                    <p className="text-xs text-muted-foreground">{t.label} typeface · 300–700</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="mt-10 text-sm font-semibold uppercase tracking-[0.2em] text-copper-deep">Applications</h3>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {["App icon", "Office signage", "Business card", "Documentation"].map((a) => (
                <div
                  key={a}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-ink px-4 py-6 text-center"
                >
                  <img
                    src={mark}
                    alt={`STALCI mark on ${a.toLowerCase()}`}
                    width={32}
                    height={32}
                    loading="lazy"
                    className="h-8 w-8 object-contain"
                  />
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-on-ink-muted">
                    {a}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
