import { SectionHeading } from "./Brand";

const steps = [
  { n: "01", title: "Discover", copy: "Workshops, technical audit and success metrics defined before a line of code." },
  { n: "02", title: "Architect", copy: "System design, stack selection, security model and a costed delivery roadmap." },
  { n: "03", title: "Build", copy: "Two-week sprints, demo every iteration, automated tests and code review gates." },
  { n: "04", title: "Launch", copy: "Hardening, load testing, staged rollout and full observability from day one." },
  { n: "05", title: "Scale", copy: "SLA support, continuous delivery and a quarterly optimisation roadmap." },
];

export function Process() {
  return (
    <section id="process" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="How we work"
          title="A delivery process built for certainty"
          subtitle="Five stages, fixed rituals and visible progress — so you always know what is shipping next."
        />

        <ol className="relative mt-14 grid gap-6 lg:grid-cols-5">
          <span className="absolute left-0 right-0 top-12 hidden h-px bg-border lg:block" aria-hidden />
          {steps.map((s) => (
            <li key={s.n} className="card-lift relative rounded-2xl border border-border bg-card p-6">
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-ink"
                style={{ background: "var(--gradient-copper)" }}
              >
                {s.n}
              </span>
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
