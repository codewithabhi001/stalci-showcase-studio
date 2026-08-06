import { Quote, Star } from "lucide-react";
import { SectionHeading } from "./Brand";

const testimonials = [
  {
    quote:
      "STALCI rebuilt our core lending platform in six months. Throughput tripled and our audit findings dropped to zero.",
    name: "Amara Osei",
    role: "CTO, Meridian Finance",
  },
  {
    quote:
      "The AI team shipped a production RAG assistant on our clinical data with the governance our board required.",
    name: "Daniel Reyes",
    role: "VP Engineering, CareLoop Health",
  },
  {
    quote:
      "Their cloud pod cut our AWS bill by 38% while improving deploy frequency from monthly to daily.",
    name: "Priya Nair",
    role: "Head of Platform, Loomex Retail",
  },
];

export function Testimonials() {
  return (
    <section className="bg-secondary/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Client stories"
          title="Trusted on business-critical systems"
          subtitle="Long engagements, measurable outcomes and teams that stay through scale."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="card-lift flex flex-col rounded-3xl border border-border bg-card p-8">
              <Quote className="h-8 w-8 text-copper" strokeWidth={1.4} />
              <blockquote className="mt-5 flex-1 text-base leading-relaxed text-foreground">"{t.quote}"</blockquote>
              <div className="mt-6 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-copper text-copper" />
                ))}
              </div>
              <figcaption className="mt-4 border-t border-border pt-4">
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
