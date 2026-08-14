import { useState, type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { Mail, Phone, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStaggerReveal, useScrollReveal } from "@/lib/animations";
import { submitInquiry, fetchSiteConfigMap } from "@/lib/api";

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
    { icon: Phone, label: "Direct Phone", value: config.phone || "+1 (415) 890-3200" },
    { icon: MapPin, label: "Global Hubs", value: config.location || config.companyAddress || "San Francisco, CA & London, UK" },
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
    <section id="contact" className="relative isolate overflow-hidden bg-white py-24 sm:py-32 text-slate-900 border-t border-slate-200">
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:px-8 z-10">
        
        {/* Left Column: Context & Metadata */}
        <div ref={staggerRef}>
          <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1 rounded-full bg-[#FDF6ED] border border-[#EED7BF] text-[#9E6229]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D89B5B] shadow-[0_0_8px_#D89B5B]" />
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em]">
              Engage STALCI
            </p>
          </div>

          <h2 className="text-3xl font-extrabold text-slate-950 sm:text-4xl md:text-5xl leading-[1.12] tracking-tight">
            Architect Your Digital Transformation.
          </h2>
          
          <p className="mt-5 max-w-md text-sm sm:text-base leading-relaxed text-slate-600">
            Detail your enterprise initiative, platform architecture, or multi-cloud migration. A Principal Solutions Architect will connect with you within one business day.
          </p>

          <ul className="mt-10 space-y-4">
            {details.map((d) => (
              <li key={d.label} className="flex items-center gap-4 p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 shadow-2xs">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#EED7BF] bg-[#FDF6ED] text-[#9E6229] shadow-2xs">
                  <d.icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <div className="min-w-0">
                  <p className="text-[10.5px] font-mono uppercase tracking-wider text-slate-500 font-bold">{d.label}</p>
                  <p className="mt-0.5 truncate text-sm sm:text-base font-bold text-slate-900">{d.value}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Contact Form */}
        <div 
          ref={formRevealRef}
          className="relative rounded-3xl border border-slate-200/90 bg-[#F8FAFC] p-7 sm:p-9 shadow-xl"
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex h-full flex-col items-center justify-center gap-4 py-12 text-center"
              >
                <CheckCircle2 className="h-14 w-14 text-emerald-600" strokeWidth={1.5} />
                <h3 className="text-2xl font-bold text-slate-950">Consultation Initiated</h3>
                <p className="max-w-sm text-sm text-slate-600 leading-relaxed">
                  Your project requirements have been securely logged. A STALCI Principal Architect will contact you within one business day.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-4 rounded-xl bg-slate-900 text-white px-5 py-2.5 text-xs font-bold hover:bg-[#9E6229] cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={onSubmit} 
                className="space-y-4"
              >
                {error && (
                  <div className="p-3 rounded-xl text-xs bg-rose-50 text-rose-700 border border-rose-200">
                    {error}
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
                      Full Name *
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      className="w-full rounded-xl border border-slate-300 bg-white p-3 text-xs sm:text-sm text-slate-900 outline-none focus:border-[#D89B5B] placeholder:text-slate-400 shadow-2xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
                      Work Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="jane@company.com"
                      className="w-full rounded-xl border border-slate-300 bg-white p-3 text-xs sm:text-sm text-slate-900 outline-none focus:border-[#D89B5B] placeholder:text-slate-400 shadow-2xs"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
                      Company / Organization
                    </label>
                    <input
                      name="company"
                      type="text"
                      placeholder="Acme Corp"
                      className="w-full rounded-xl border border-slate-300 bg-white p-3 text-xs sm:text-sm text-slate-900 outline-none focus:border-[#D89B5B] placeholder:text-slate-400 shadow-2xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
                      Primary Service Area
                    </label>
                    <select
                      name="service"
                      className="w-full rounded-xl border border-slate-300 bg-white p-3 text-xs sm:text-sm text-slate-900 outline-none focus:border-[#D89B5B] cursor-pointer shadow-2xs"
                      defaultValue="Custom Software"
                    >
                      {[
                        "Custom Software",
                        "Mobile Apps",
                        "Cloud & DevOps",
                        "AI & Machine Learning",
                        "Cyber Security",
                        "Data & Analytics",
                        "Automation",
                        "Managed IT",
                      ].map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
                    Project Scope & Objectives *
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder="Describe your architecture requirements, timeline, or key technical challenges..."
                    className="w-full resize-none rounded-xl border border-slate-300 bg-white p-3 text-xs sm:text-sm text-slate-900 outline-none focus:border-[#D89B5B] placeholder:text-slate-400 shadow-2xs"
                  />
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-xs sm:text-sm font-extrabold text-white bg-slate-900 hover:bg-[#9E6229] transition-all shadow-md cursor-pointer disabled:opacity-50"
                  >
                    <span>{submitting ? "Initiating Protocol..." : "Schedule Architectural Consultation"}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
