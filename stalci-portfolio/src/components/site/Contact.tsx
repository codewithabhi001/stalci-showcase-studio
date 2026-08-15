import { useState, type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
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
    <section id="contact" className="bg-[#FAFAFC] relative isolate overflow-hidden py-20 sm:py-28 text-black border-t border-zinc-200/90">
      <div className="relative mx-auto grid max-w-5xl gap-10 px-5 lg:grid-cols-2 lg:px-8">
        <div ref={staggerRef}>
          <BadgePill tone="light">Engage STALCI</BadgePill>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 leading-tight">
            Architect Your Digital Transformation.
          </h2>
          <p className="mt-3 text-xs sm:text-sm leading-relaxed text-zinc-600">
            Detail your enterprise initiative, platform architecture, or cloud migration. A Principal Solutions Architect will connect with you within one business day.
          </p>

          <ul className="mt-8 space-y-4">
            {details.map((d) => (
              <li key={d.label} className="flex items-start gap-3.5">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white text-copper shadow-2xs">
                  <d.icon className="h-4.5 w-4.5" strokeWidth={1.8} />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 font-bold">{d.label}</p>
                  <p className="mt-0.5 truncate text-xs sm:text-sm font-semibold text-zinc-900">{d.value}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div 
          ref={formRevealRef}
          className="relative rounded-2xl border border-zinc-200/90 bg-white p-6 sm:p-7 shadow-md"
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
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={onSubmit} 
                className="space-y-3.5"
              >
                {error && (
                  <div className="p-3 rounded-lg text-xs bg-red-50 text-red-600 border border-red-200">
                    {error}
                  </div>
                )}
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Full name" name="name" placeholder="Jane Doe" />
                  <Field label="Work email" name="email" type="email" placeholder="jane@company.com" />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Company" name="company" placeholder="Company Ltd." />
                  <div>
                    <label className="text-[11px] font-semibold text-zinc-700 block mb-1">
                      Service Practice
                    </label>
                    <select
                      name="service"
                      className="w-full rounded-lg border border-zinc-200 bg-[#F8FAFC] px-3 py-2 text-xs text-zinc-900 outline-none focus:border-zinc-400 focus:bg-white"
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
                        <option key={o} value={o} className="bg-white text-zinc-900">
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-zinc-700 block mb-1">Project Details</label>
                  <textarea
                    rows={3}
                    name="message"
                    placeholder="Describe your enterprise scope, timeline, and goals..."
                    className="w-full rounded-lg border border-zinc-200 bg-[#F8FAFC] px-3 py-2 text-xs text-zinc-900 outline-none focus:border-zinc-400 focus:bg-white placeholder:text-zinc-400"
                    required
                  />
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-xs font-bold text-white bg-black hover:bg-zinc-800 transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
                  >
                    {submitting ? "Initiating..." : "Initiate Consultation"}
                    <Send className="h-3.5 w-3.5" />
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

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-[11px] font-semibold text-zinc-700 block mb-1">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required
        className="w-full rounded-lg border border-zinc-200 bg-[#F8FAFC] px-3 py-2 text-xs text-zinc-900 outline-none focus:border-zinc-400 focus:bg-white placeholder:text-zinc-400"
      />
    </div>
  );
}
