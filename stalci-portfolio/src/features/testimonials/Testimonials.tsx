import { Star, Quote, Award } from "lucide-react";
import { SectionHeading } from "@/components/brand/Brand";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "STALCI delivered a private sovereign AI pipeline that processes our confidential financial datasets with sub-20ms latency and 100% compliance.",
    author: "Elena Rostova",
    role: "Chief Technology Officer",
    company: "Apex Global Capital",
    category: "Sovereign AI",
    rating: 5,
  },
  {
    quote: "Their senior engineering pod rebuilt our multi-tenant SaaS architecture on Next.js and Kubernetes in under 8 weeks. Customer churn dropped by 40%.",
    author: "Marcus Vance",
    role: "VP of Engineering",
    company: "StreamBase AV Networks",
    category: "Cloud Systems",
    rating: 5,
  },
  {
    quote: "STALCI crafted an empowering, lightning-fast mobile experience for visually impaired users that set the gold standard in accessibility software.",
    author: "Dr. Sarah Chen",
    role: "Head of Product",
    company: "La Savista Foundation",
    category: "Mobile Apps",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#FFFFFF] py-14 sm:py-20 text-black border-t border-zinc-200/90 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tone="light"
          eyebrow="Verified Client Proof"
          title="Endorsed By Engineering Leaders"
          subtitle="Discover how founders, CTOs, and product leaders accelerate their roadmap with STALCI's senior engineering squads."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="rounded-3xl bg-[#FAFAFC] border border-zinc-200/90 p-6 sm:p-7 shadow-2xs hover:border-zinc-400 hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200">
                    {t.category}
                  </span>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed text-zinc-700 italic font-normal">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-200/80 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-zinc-950">{t.author}</h4>
                  <p className="text-[11px] text-zinc-500 font-mono">{t.role}, {t.company}</p>
                </div>
                <Award className="h-4 w-4 text-emerald-600" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
