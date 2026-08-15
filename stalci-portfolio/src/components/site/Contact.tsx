import { useState, type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { Mail, Phone, MapPin, Send, CheckCircle2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStaggerReveal, useScrollReveal } from "@/lib/animations";
import { submitInquiry, fetchSiteConfigMap } from "@/lib/api";
import { BadgePill } from "./Brand";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const staggerRef = useStaggerReveal();
  const formRevealRef = useScrollReveal();

  const { data: config = {} } = useQuery({
    queryKey: ["config"],
    queryFn: fetchSiteConfigMap,
  });

  const details = [
    { icon: Mail, label: "Email", value: config.contactEmail || "contact@stalci.com" },
    { icon: Phone, label: "Phone", value: config.phone || "+1 (415) 890-3200" },
    { icon: MapPin, label: "Offices", value: config.location || config.companyAddress || "San Francisco, CA & London, UK" },
  ];

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const fd = new FormData(e.currentTarget);
    const name = fd.get("name") as string;
    const email = fd.get("email") as string;
    const company = fd.get("company") as string;
    const service = fd.get("service") as string;
    const message = fd.get("message") as string;

    try {
      await submitInquiry({
        name,
        email,
        company,
        service,
        message,
      });
      setSent(true);
    } catch (err: any) {
      setError(err.message || "Failed to submit inquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-[#FFFFFF] relative isolate overflow-hidden py-20 sm:py-28 text-black border-t border-zinc-200/90">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        
        {/* ─── High-Impact Editorial Highlight Banner (Replo Style) ─── */}
        <div className="rounded-3xl bg-[#09090B] text-white p-8 sm:p-12 text-center mb-16 shadow-lg relative overflow-hidden">
          <span className="text-[10.5px] font-mono font-bold uppercase tracking-widest text-zinc-400 block mb-3">
            Ready for Scaled Execution?
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight max-w-2xl mx-auto">
            Launch your next mission-critical platform with STALCI
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto font-normal">
            Dedicated high-velocity engineering pods, sovereign AI architectures, and 99.99% verified SLA reliability.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#inquiry-form"
              className="px-6 py-2.5 rounded-full bg-white text-zinc-950 text-xs font-bold hover:bg-zinc-200 transition-all shadow-sm"
            >
              Initiate Project Inquiry →
            </a>
            <a
              href="mailto:contact@stalci.com"
              className="px-6 py-2.5 rounded-full bg-white/10 text-white text-xs font-semibold hover:bg-white/20 border border-white/15 transition-all"
            >
              Direct Email Dispatch
            </a>
          </div>
        </div>

        {/* ─── Contact Form & Information Grid ─── */}
        <div id="inquiry-form" className="grid gap-10 lg:grid-cols-2 items-start">
          <div ref={staggerRef}>
            <BadgePill tone="light">Engage STALCI</BadgePill>
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 leading-tight font-display">
              Architect Your Digital Transformation.
            </h2>
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-zinc-600 font-normal">
              Detail your enterprise initiative, platform architecture, or cloud migration. A Principal Solutions Architect will connect with you within one business day.
            </p>

            <ul className="mt-8 space-y-3.5">
              {details.map((d) => (
                <li key={d.label} className="flex items-start gap-3.5 p-3 rounded-2xl bg-[#FAFAFC] border border-zinc-200/90 shadow-2xs">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow-2xs">
                    <d.icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0 my-auto">
                    <p className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 font-bold">{d.label}</p>
                    <p className="mt-0.5 truncate text-xs sm:text-sm font-bold text-zinc-950">{d.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div 
            ref={formRevealRef}
            className="relative rounded-2xl border border-zinc-200/90 bg-white p-6 sm:p-8 shadow-sm"
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex h-full flex-col items-center justify-center gap-3 py-10 text-center"
                >
                  <CheckCircle2 className="h-10 w-10 text-emerald-600" strokeWidth={1.5} />
                  <h3 className="text-base font-bold text-zinc-950">Inquiry Received</h3>
                  <p className="max-w-xs text-xs text-zinc-600">
                    A STALCI Principal Architect will contact you within one business day.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-zinc-950 font-display">
                      Project Specification Form
                    </h3>
                    <p className="text-xs text-zinc-500">All submissions are protected under NDA.</p>
                  </div>

                  {error && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                      {error}
                    </div>
                  )}

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-zinc-950">Full Name *</label>
                      <input
                        name="name"
                        type="text"
                        required
                        placeholder="Satya Nadella"
                        className="w-full rounded-xl border border-zinc-200 bg-[#FAFAFC] px-3.5 py-2 text-xs text-zinc-950 outline-none focus:border-black focus:bg-white transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-zinc-950">Corporate Email *</label>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="satya@microsoft.com"
                        className="w-full rounded-xl border border-zinc-200 bg-[#FAFAFC] px-3.5 py-2 text-xs text-zinc-950 outline-none focus:border-black focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-zinc-950">Company / Organization</label>
                      <input
                        name="company"
                        type="text"
                        placeholder="Microsoft Corporation"
                        className="w-full rounded-xl border border-zinc-200 bg-[#FAFAFC] px-3.5 py-2 text-xs text-zinc-950 outline-none focus:border-black focus:bg-white transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-zinc-950">Primary Practice</label>
                      <select
                        name="service"
                        className="w-full rounded-xl border border-zinc-200 bg-[#FAFAFC] px-3 py-2 text-xs text-zinc-950 outline-none focus:border-black focus:bg-white transition-all"
                      >
                        <option value="Sovereign AI & LLM Systems">Sovereign AI & LLM Systems</option>
                        <option value="Multi-Cloud & SRE Infrastructure">Multi-Cloud & SRE Infrastructure</option>
                        <option value="Custom Software & Web Engineering">Custom Software & Web Engineering</option>
                        <option value="Native Mobile Applications">Native Mobile Applications</option>
                        <option value="Zero-Trust Cybersecurity">Zero-Trust Cybersecurity</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-950">Project Scope & Objectives *</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder="Outline target architecture, timelines, estimated concurrency, or existing cloud stack..."
                      className="w-full rounded-xl border border-zinc-200 bg-[#FAFAFC] p-3 text-xs text-zinc-950 outline-none focus:border-black focus:bg-white transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-full bg-black py-3 text-xs font-bold text-white hover:bg-zinc-800 transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? "Transmitting Specification..." : "Transmit Project Specification"}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
