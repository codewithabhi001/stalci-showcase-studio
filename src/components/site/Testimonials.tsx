import { Quote, Star } from "lucide-react";
import { SectionHeading } from "./Brand";
import { useScrollReveal, useStaggerReveal } from "@/lib/animations";
import { motion } from "framer-motion";

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
  const headerRef = useScrollReveal();
  const staggerRef = useStaggerReveal();

  return (
    <section className="relative overflow-hidden bg-secondary/60 py-24 sm:py-32">
      <div className="absolute inset-0 mesh-gradient-dark opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div ref={headerRef}>
          <SectionHeading
            eyebrow="Client stories"
            title="Trusted on business-critical systems"
            subtitle="Long engagements, measurable outcomes and teams that stay through scale."
          />
        </div>

        <div ref={staggerRef} className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="perspective-hover glass gradient-border flex flex-col rounded-3xl p-8"
            >
              <motion.div
                whileHover={{ scale: 1.15, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                className="animate-pulse-glow w-fit rounded-full"
              >
                <Quote className="h-8 w-8 text-[var(--copper)]" strokeWidth={1.4} />
              </motion.div>
              
              <blockquote className="mt-6 flex-1 text-base leading-relaxed text-foreground">
                "{t.quote}"
              </blockquote>
              
              <div className="mt-6 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      delay: i * 0.1, 
                      duration: 0.4, 
                      type: "spring", 
                      bounce: 0.5 
                    }}
                  >
                    <Star className="h-4 w-4 fill-[var(--copper)] text-[var(--copper)]" />
                  </motion.div>
                ))}
              </div>
              
              <figcaption className="mt-6 flex items-center gap-4 border-t border-[var(--copper-soft)] pt-5">
                <div 
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[var(--copper-soft)] font-semibold text-white shadow-lg"
                  style={{ backgroundImage: "var(--gradient-copper)" }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
