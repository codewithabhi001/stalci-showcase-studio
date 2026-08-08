import { Quote, Star } from "lucide-react";
import { SectionHeading } from "./Brand";
import { useScrollReveal, useStaggerReveal } from "@/lib/animations";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchTestimonials } from "@/lib/api";

const staticTestimonials = [
  {
    quote:
      "STALCI engineered a scalable, mission-critical lending architecture in six months. System throughput accelerated by 300% with absolutely zero audit discrepancies, ensuring uncompromised compliance.",
    name: "Amara Osei",
    role: "Chief Technology Officer, Meridian Finance",
    rating: 5,
  },
  {
    quote:
      "The STALCI AI division deployed a production-grade RAG engine atop our clinical data lakes, achieving exceptional performance while satisfying our stringent board-level data governance mandates.",
    name: "Daniel Reyes",
    role: "VP of Engineering, CareLoop Health",
    rating: 5,
  },
  {
    quote:
      "Their elite cloud transformation pod optimized our AWS infrastructure, reducing total cost of ownership by 38% and accelerating deployment frequency from monthly cycles to continuous daily delivery.",
    name: "Priya Nair",
    role: "Head of Platform Architecture, Loomex Retail",
    rating: 5,
  },
];

export function Testimonials() {
  const headerRef = useScrollReveal();
  const staggerRef = useStaggerReveal();

  const { data: apiTestimonials } = useQuery({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
  });

  const testimonials: { quote: string; name: string; role: string; rating: number }[] = apiTestimonials && apiTestimonials.length > 0
    ? apiTestimonials.map((t: any) => ({
        quote: t.quote,
        name: t.clientName,
        role: t.company || "Client",
        rating: t.rating || 5,
      }))
    : staticTestimonials;

  return (
    <section className="relative overflow-hidden bg-secondary/60 py-20 sm:py-24">
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div ref={headerRef}>
          <SectionHeading
            eyebrow="Client Success"
            title="Trusted For Mission-Critical Systems"
            subtitle="Strategic partnerships, highly measurable outcomes, and elite engineering teams driving your digital transformation."
          />
        </div>

        <div ref={staggerRef} className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="perspective-hover flex flex-col rounded-3xl border border-border bg-card p-8"
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
                {Array.from({ length: t.rating }).map((_, i) => (
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
