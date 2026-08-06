import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStaggerReveal, useScrollReveal } from "@/lib/animations";

const details = [
  { icon: Mail, label: "Email", value: "hello@stalci.com" },
  { icon: Phone, label: "Phone", value: "+1 (415) 555-0134" },
  { icon: MapPin, label: "Offices", value: "Bengaluru · Dubai · London" },
];

export function Contact() {
  const [sent, setSent] = useState(false);
  const staggerRef = useStaggerReveal();
  const formRevealRef = useScrollReveal();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="surface-ink relative isolate overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 grid-lines opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full blur-3xl animate-pulse-glow"
        style={{ background: "radial-gradient(circle, oklch(0.73 0.101 62 / 0.15), transparent 70%)" }}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:px-8">
        <div ref={staggerRef}>
          <p className="eyebrow text-copper">Engage STALCI</p>
          <h2 className="mt-3 text-3xl font-semibold text-on-ink sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
            Architect Your Digital Transformation.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-on-ink-muted">
            Detail your enterprise initiative, platform architecture, or cloud migration. A Principal Solutions Architect will connect with you within one business day to discuss strategic alignment.
          </p>

          <ul className="mt-10 space-y-5">
            {details.map((d) => (
              <li key={d.label} className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 relative">
                  <d.icon className="h-5 w-5 text-copper animate-pulse-glow relative z-10" strokeWidth={1.5} />
                </span>
                <div className="min-w-0">
                  <p className="text-[0.65rem] uppercase tracking-[0.22em] text-on-ink-muted">{d.label}</p>
                  <p className="mt-0.5 truncate text-base font-medium text-on-ink">{d.value}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div 
          ref={formRevealRef}
          className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-7 sm:p-9"
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
                <CheckCircle2 className="h-12 w-12 text-copper animate-pulse-glow" strokeWidth={1.4} />
                <h3 className="text-xl font-semibold text-on-ink">Inquiry Received</h3>
                <p className="max-w-sm text-sm text-on-ink-muted">
                  A STALCI Principal Architect will contact you within one business day.
                </p>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={onSubmit} 
                className="space-y-0"
              >
                <div className="grid gap-x-5 gap-y-0 sm:grid-cols-2">
                  <Field label="Full name" name="name" placeholder="Jane Doe" />
                  <Field label="Work email" name="email" type="email" placeholder="jane@company.com" />
                </div>
                <div className="grid gap-x-5 gap-y-0 sm:grid-cols-2">
                  <Field label="Company" name="company" placeholder="Company Ltd." />
                  <div className="relative min-w-0 pt-7">
                    <label className="absolute left-0 top-[12px] text-xs font-semibold uppercase tracking-[0.18em] text-on-ink-muted">
                      Service
                    </label>
                    <motion.div
                      className="relative rounded-xl border border-white/12 bg-white/5 transition-colors overflow-hidden"
                      whileFocus={{
                        borderColor: "var(--copper)",
                        boxShadow: "0 0 15px -3px rgba(216, 155, 91, 0.4)"
                      }}
                    >
                      <select
                        name="service"
                        className="w-full bg-transparent px-4 py-3 text-sm text-on-ink outline-none appearance-none"
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
                          <option key={o} value={o} className="bg-ink text-on-ink">
                            {o}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                        <svg className="h-4 w-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </motion.div>
                  </div>
                </div>
                <TextareaField label="Project details" name="message" placeholder="Describe your enterprise initiative..." />
                
                <div className="pt-7">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, boxShadow: "0 0 20px -5px var(--copper)" }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-ink transition-colors"
                    style={{ background: "var(--gradient-copper)" }}
                  >
                    Initiate Consultation
                    <Send className="h-4 w-4" />
                  </motion.button>
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
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState("");

  return (
    <div className="relative min-w-0 pt-7">
      <motion.label
        initial={false}
        animate={{
          y: focused || val ? -28 : 0,
          x: focused || val ? -16 : 0,
        }}
        className={`pointer-events-none absolute left-4 top-10 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
          focused ? "text-copper" : "text-on-ink-muted"
        }`}
      >
        {label}
      </motion.label>

      <motion.div
        className="relative rounded-xl border border-white/12 bg-white/5 transition-colors overflow-hidden"
        animate={{
          borderColor: focused ? "var(--copper)" : "rgba(255, 255, 255, 0.12)",
          boxShadow: focused ? "0 0 15px -3px rgba(216, 155, 91, 0.4)" : "none",
        }}
      >
        <input
          name={name}
          type={type}
          required
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setVal(e.target.value)}
          placeholder={focused ? placeholder : ""}
          className="w-full bg-transparent px-4 py-3 text-sm text-on-ink outline-none placeholder:text-white/30"
        />
      </motion.div>
    </div>
  );
}

function TextareaField({ label, name, placeholder }: { label: string; name: string; placeholder?: string }) {
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState("");

  return (
    <div className="relative min-w-0 pt-7">
      <motion.label
        initial={false}
        animate={{
          y: focused || val ? -28 : 0,
          x: focused || val ? -16 : 0,
        }}
        className={`pointer-events-none absolute left-4 top-10 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
          focused ? "text-copper" : "text-on-ink-muted"
        }`}
      >
        {label}
      </motion.label>

      <motion.div
        className="relative rounded-xl border border-white/12 bg-white/5 transition-colors overflow-hidden"
        animate={{
          borderColor: focused ? "var(--copper)" : "rgba(255, 255, 255, 0.12)",
          boxShadow: focused ? "0 0 15px -3px rgba(216, 155, 91, 0.4)" : "none",
        }}
      >
        <textarea
          name={name}
          rows={5}
          required
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setVal(e.target.value)}
          placeholder={focused ? placeholder : ""}
          className="w-full resize-none bg-transparent px-4 py-3 text-sm text-on-ink outline-none placeholder:text-white/30"
        />
      </motion.div>
    </div>
  );
}
