import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { FAQ_ITEMS } from "@/data/site-data";
import { HelpCircle, ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions — STALCI" },
      {
        name: "description",
        content:
          "Answers to common questions about STALCI's sovereign AI engineering, sprint lifecycles, cloud security, and consulting models.",
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-zinc-800 selection:text-white font-sans">
      <Nav solid />
      <main>
        <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-20 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-medium text-zinc-300">
              <HelpCircle className="h-3.5 w-3.5 text-blue-400" />
              Transparency &amp; Clarity
            </span>
            <h1 className="mt-4 font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-zinc-400">
              Everything you need to know about our engineering methodology, security compliance enclaves, and 14-day sprint contracts.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-24 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-[#0C0C0E] overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-sm sm:text-base text-white hover:text-emerald-400 transition-colors"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-zinc-400 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-emerald-400" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-white/5 pt-4">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center rounded-3xl border border-white/10 bg-[#0C0C0E] p-8">
            <h3 className="text-xl font-bold text-white">Have a Specific Architectural Question?</h3>
            <p className="mt-2 text-xs sm:text-sm text-zinc-400">
              Our principal systems architects are available for direct 30-minute discovery calls.
            </p>
            <div className="mt-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-semibold text-black hover:bg-zinc-200 transition-colors"
              >
                <span>Book a Strategic Consultation</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
