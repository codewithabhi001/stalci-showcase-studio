import { CheckCircle2, Rocket, Globe2, Timer, Handshake, Layers } from "lucide-react";
import { SectionHeading } from "./Brand";

const reasons = [
  { icon: Rocket, title: "Senior-only teams", copy: "No juniors billed as experts — every pod is led by 8+ year engineers." },
  { icon: Timer, title: "Fast time to value", copy: "First working increment inside 3 weeks, every single engagement." },
  { icon: Globe2, title: "Global delivery", copy: "Overlapping timezone coverage across EMEA, APAC and the Americas." },
  { icon: Layers, title: "Full-stack ownership", copy: "Design, build, secure and operate — one accountable partner." },
  { icon: Handshake, title: "Transparent pricing", copy: "Fixed-scope or T&M with weekly burn reporting. No hidden lines." },
  { icon: CheckCircle2, title: "Production quality", copy: "Automated testing, security review and observability as standard." },
];

export function WhyStalci() {
  return (
    <section className="surface-ink relative isolate overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 grid-lines opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          tone="dark"
          eyebrow="Why STALCI"
          title="A technology partner, not a vendor"
          subtitle="Short, unique and memorable — and built to stay with you long after launch."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => (
            <div key={r.title} className="bg-ink-soft/90 p-7 transition-colors hover:bg-ink-soft">
              <r.icon className="h-6 w-6 text-copper" strokeWidth={1.5} />
              <h3 className="mt-4 text-base font-semibold text-on-ink">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-on-ink-muted">{r.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
