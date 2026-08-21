import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { TESTIMONIALS_DATA } from "@/data/site-data";
import { Star, MessageSquareQuote, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Verified Client Reviews & Testimonials — STALCI" },
      {
        name: "description",
        content:
          "Read verified reviews and feedback from enterprise executives and tech leaders who rely on STALCI software architecture.",
      },
    ],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-zinc-800 selection:text-white font-sans">
      <Nav solid />
      <main>
        <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-20 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-medium text-zinc-300">
              <MessageSquareQuote className="h-3.5 w-3.5 text-amber-400" />
              Empirical Client Proof
            </span>
            <h1 className="mt-4 font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Verified Client Feedback &amp; Reviews
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-zinc-400">
              Hear directly from CTOs, VPs of Infrastructure, and Product Directors who engineered production platforms with STALCI.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
            {TESTIMONIALS_DATA.map((t, idx) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="rounded-3xl border border-white/10 bg-[#0C0C0E] p-7 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400 gap-0.5">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400" />
                      ))}
                    </div>
                    {t.verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        <CheckCircle2 className="h-3 w-3" /> Verified Client
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-zinc-300 leading-relaxed italic">
                    "{t.quote}"
                  </p>

                  {t.metric && (
                    <div className="rounded-xl bg-white/5 border border-white/10 p-3 mt-4">
                      <div className="text-xl font-mono font-bold text-white">{t.metric}</div>
                      <div className="text-xs text-zinc-400">{t.metricLabel}</div>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="text-sm font-bold text-white">{t.author}</div>
                  <div className="text-xs text-zinc-400">{t.role}</div>
                  <div className="text-xs font-mono text-emerald-400 mt-0.5">{t.company}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-xs sm:text-sm font-semibold text-black hover:bg-zinc-200 transition-colors shadow-lg"
            >
              <span>Schedule Your Sprint Zero Intake</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
