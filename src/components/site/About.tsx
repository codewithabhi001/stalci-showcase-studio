import { Lightbulb, Award, ShieldCheck, Users, Globe2 } from "lucide-react";
import { SectionHeading } from "./Brand";

const values = [
  { icon: Lightbulb, title: "Innovation", copy: "We prototype fast and ship ideas that move the needle." },
  { icon: Award, title: "Excellence", copy: "Engineering quality held to an uncompromising standard." },
  { icon: ShieldCheck, title: "Integrity", copy: "Transparent delivery, honest timelines, zero surprises." },
  { icon: Users, title: "Collaboration", copy: "We embed with your team as one accountable unit." },
  { icon: Globe2, title: "Impact", copy: "Technology measured by the outcomes it creates." },
];

const stats = [
  { value: "120+", label: "Projects delivered" },
  { value: "18", label: "Countries served" },
  { value: "60+", label: "Engineers & designers" },
  { value: "99.9%", label: "Platform uptime" },
];

export function About() {
  return (
    <section id="about" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="About STALCI"
              title="We build the technology backbone modern businesses run on."
              subtitle="We combine creativity, engineering and strategy to build software that makes an impact — from the first architecture diagram to global rollout and long-term support."
            />
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Our teams work across custom software, cloud platforms, artificial intelligence,
              cybersecurity and data engineering. Every engagement is delivered by senior specialists
              with a clear roadmap, measurable milestones and production-grade quality gates.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-card px-5 py-6">
                  <dt className="text-2xl font-semibold text-copper-deep">{s.value}</dt>
                  <dd className="mt-1 text-xs leading-snug text-muted-foreground">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((v, i) => (
              <div
                key={v.title}
                className={
                  "card-lift rounded-2xl border border-border bg-card p-6 " + (i === 4 ? "sm:col-span-2" : "")
                }
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent">
                  <v.icon className="h-5 w-5 text-copper-deep" strokeWidth={1.6} />
                </span>
                <h3 className="mt-4 text-base font-semibold">{v.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{v.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
