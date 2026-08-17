import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { 
  ArrowRight, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Send, 
  Sparkles, 
  Clock, 
  Lock,
  Cpu,
  Code2,
  Globe,
  Smartphone,
  Server,
  Shield,
  Calendar,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BadgePill } from "./Brand";
import { useMutation } from "@tanstack/react-query";
import { submitInquiry } from "@/lib/api";

const servicesList = [
  { name: "Sovereign AI & ML", icon: Cpu },
  { name: "Custom Software", icon: Code2 },
  { name: "Web Platform", icon: Globe },
  { name: "Mobile App", icon: Smartphone },
  { name: "Cloud & DevOps", icon: Server },
  { name: "Zero-Trust Security", icon: Shield },
];

const budgetTiers = [
  { label: "< $25k", note: "MVP Sprint" },
  { label: "$25k – $50k", note: "Growth Tier" },
  { label: "$50k – $100k", note: "Scale Squad" },
  { label: "$100k+", note: "Enterprise Pod" },
];

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: "Sovereign AI & ML",
    budget: "$25k – $50k",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const inquiryMutation = useMutation({
    mutationFn: submitInquiry,
    onSuccess: () => {
      setSubmitted(true);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    inquiryMutation.mutate(form);
  };

  return (
    <section id="contact" className="bg-[#FFFFFF] py-16 sm:py-24 text-black border-t border-zinc-200/90 relative isolate overflow-hidden">
      
      {/* ─── Rich Engineering Blueprint SVG Background Texture ─── */}
      <div 
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#F1F3F9_1px,transparent_1px),linear-gradient(to_bottom,#F1F3F9_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none opacity-80" 
        aria-hidden 
      />
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[45rem] h-[20rem] bg-blue-500/[0.03] blur-[130px] pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="rounded-3xl sm:rounded-[36px] border border-zinc-200/90 bg-white p-8 sm:p-12 lg:p-16 shadow-lg shadow-zinc-200/40 relative overflow-hidden">
          
          {/* Subtle Corner Accent Pattern */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-zinc-100/80 via-transparent to-transparent pointer-events-none -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* ─── Left Column: Direct Architecture Consultation & Squad Telemetry ─── */}
            <div className="lg:col-span-5 space-y-7">
              <div>
                <BadgePill tone="light" variant="gradient">
                  <span className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-zinc-900">
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-950 animate-pulse" />
                    <span>Sprint Zero Scoping</span>
                  </span>
                </BadgePill>
              </div>

              <div>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-950 tracking-tight leading-tight">
                  Let's Architect Your <span className="font-extrabold text-black">Next Milestone</span>
                </h2>
                <p className="mt-3 text-xs sm:text-[14px] text-zinc-600 font-normal leading-relaxed">
                  Connect directly with our principal solutions architects. We'll review your technical requirements and deliver a deterministic sprint blueprint within 24 hours.
                </p>
              </div>

              {/* Guarantees Checklist */}
              <div className="space-y-2.5 rounded-2xl bg-[#FAFAFC] border border-zinc-200/80 p-4 shadow-2xs">
                {[
                  "Guaranteed 24-hour architectural review turnaround",
                  "Bilateral Non-Disclosure Agreement (NDA) signed upfront",
                  "100% intellectual property ownership from day one",
                  "No junior recruiters—direct contact with senior leads",
                ].map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-700 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-zinc-950 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              {/* Global Timezones & Lead Squad Availability */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 font-medium border-b border-zinc-100 pb-2">
                  <span>Squad Locations</span>
                  <span className="text-zinc-950 font-bold">SF &bull; London &bull; Singapore</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center font-mono text-[11px]">
                  <div className="rounded-xl bg-[#FAFAFC] border border-zinc-200/80 p-2.5">
                    <span className="block text-zinc-400 text-[10px]">US West</span>
                    <span className="font-bold text-zinc-900">PST (UTC-8)</span>
                  </div>
                  <div className="rounded-xl bg-[#FAFAFC] border border-zinc-200/80 p-2.5">
                    <span className="block text-zinc-400 text-[10px]">UK / Europe</span>
                    <span className="font-bold text-zinc-900">GMT (UTC+0)</span>
                  </div>
                  <div className="rounded-xl bg-[#FAFAFC] border border-zinc-200/80 p-2.5">
                    <span className="block text-zinc-400 text-[10px]">Asia / Pacific</span>
                    <span className="font-bold text-zinc-900">SGT (UTC+8)</span>
                  </div>
                </div>
              </div>

              {/* Direct Communication Strip */}
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-zinc-600 border-t border-zinc-200/80">
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-zinc-950" />
                  <a href="mailto:contact@stalci.com" className="font-semibold text-zinc-950 hover:underline">
                    contact@stalci.com
                  </a>
                </div>
                <div className="flex items-center gap-1.5 text-zinc-500 font-mono text-[11px]">
                  <Clock className="h-3.5 w-3.5 text-zinc-700" />
                  <span>Response: &lt; 2 hours</span>
                </div>
              </div>

            </div>

            {/* ─── Right Column: Interactive Consultation Intake Form ─── */}
            <div className="lg:col-span-7 rounded-3xl border border-zinc-200 bg-[#FAFAFC] p-7 sm:p-9 shadow-xs">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="mx-auto h-14 w-14 rounded-2xl bg-zinc-950 text-white flex items-center justify-center shadow-md">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-950">Inquiry Received Successfully</h3>
                  <p className="text-xs sm:text-sm text-zinc-600 max-w-md mx-auto">
                    A principal architect has been assigned to your brief and will review your technical scope within 24 hours.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="rounded-full bg-zinc-950 px-6 py-2.5 text-xs font-bold text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Alex Morgan"
                        className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-xs text-zinc-950 focus:border-zinc-950 focus:outline-none transition-colors shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-xs text-zinc-950 focus:border-zinc-950 focus:outline-none transition-colors shadow-2xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="Acme Technologies"
                      className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-xs text-zinc-950 focus:border-zinc-950 focus:outline-none transition-colors shadow-2xs"
                    />
                  </div>

                  {/* Primary Service Selection with Subtle Icons */}
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-700 mb-2">
                      Primary Focus Area
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {servicesList.map((svc) => {
                        const Icon = svc.icon;
                        const isSelected = form.service === svc.name;
                        return (
                          <button
                            key={svc.name}
                            type="button"
                            onClick={() => setForm({ ...form, service: svc.name })}
                            className={`rounded-xl p-2.5 text-left text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 border ${
                              isSelected
                                ? "bg-zinc-950 text-white border-zinc-950 shadow-2xs"
                                : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300"
                            }`}
                          >
                            <Icon className={`h-3.5 w-3.5 shrink-0 ${isSelected ? "text-white" : "text-zinc-500"}`} />
                            <span className="line-clamp-1">{svc.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Target Budget Tiers with Notes */}
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-700 mb-2">
                      Target Budget Range
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {budgetTiers.map((b) => (
                        <button
                          key={b.label}
                          type="button"
                          onClick={() => setForm({ ...form, budget: b.label })}
                          className={`rounded-xl p-2.5 text-center transition-all cursor-pointer border flex flex-col justify-center ${
                            form.budget === b.label
                              ? "bg-zinc-950 text-white border-zinc-950 shadow-2xs"
                              : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300"
                          }`}
                        >
                          <span className="text-xs font-bold leading-tight">{b.label}</span>
                          <span className={`text-[9.5px] font-mono mt-0.5 ${form.budget === b.label ? "text-zinc-400" : "text-zinc-400"}`}>
                            {b.note}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                      Project Goals &amp; Architecture Brief *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Briefly describe what you're building, target timeline, or current technical bottlenecks..."
                      className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-xs text-zinc-950 focus:border-zinc-950 focus:outline-none transition-colors shadow-2xs"
                    />
                  </div>

                  <div className="pt-2 space-y-3">
                    <button
                      type="submit"
                      disabled={inquiryMutation.isPending}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-950 py-3.5 px-6 text-xs sm:text-sm font-bold text-white hover:bg-zinc-800 transition-all cursor-pointer shadow-md disabled:opacity-50"
                    >
                      {inquiryMutation.isPending ? (
                        <span>Submitting Brief...</span>
                      ) : (
                        <>
                          <span>Submit Technical Brief</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-2 text-[10.5px] font-mono text-zinc-400">
                      <Lock className="h-3 w-3 text-zinc-500" />
                      <span>256-Bit Encrypted &bull; Bilateral NDA Protected</span>
                    </div>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
