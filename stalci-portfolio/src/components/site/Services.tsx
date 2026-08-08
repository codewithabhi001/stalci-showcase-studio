import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./Brand";
import { useStaggerReveal } from "@/lib/animations";
import { services } from "@/lib/site-data";

export function Services() {
  const staggerRef = useStaggerReveal({ stagger: 0.06, y: 30 });

  return (
    <section id="services" className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="What we do"
          title="IT services, end to end"
          subtitle="Eight practices under one delivery standard. Engage a single team or an entire programme."
        />

        <div ref={staggerRef} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-copper/50 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)]"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <s.icon className="h-5 w-5 text-copper-deep" strokeWidth={1.6} />
              </span>
              <h3 className="mt-5 text-base font-semibold leading-snug">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.summary}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-copper-deep">
                Learn more
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
