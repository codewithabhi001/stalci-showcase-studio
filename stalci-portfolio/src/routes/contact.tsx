import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { BackToTop } from "@/components/site/BackToTop";
import { 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Calendar, 
  Lock,
  Plus,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { submitInquiry } from "@/lib/api";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Enterprise Discovery | STALCI Technologies" },
      {
        name: "description",
        content:
          "Connect directly with STALCI's principal solutions architects. Initiate project scoping, review technical roadmaps, or explore sovereign AI consulting.",
      },
    ],
  }),
  component: ContactPage,
});

const serviceOptions = [
  "Sovereign AI & ML",
  "Custom Software",
  "Web Platforms",
  "Mobile Apps",
  "Cloud & DevOps",
  "Cybersecurity",
];

const timelineOptions = [
  "Immediate (< 2 Weeks)",
  "1 – 3 Months",
  "3 – 6 Months",
  "Dedicated Pod",
];

const budgetTiers = [
  "Under $25k",
  "$25k – $50k",
  "$50k – $100k",
  "$100k+",
];

const globalHubs = [
  {
    city: "San Francisco",
    region: "Americas HQ",
    address: "548 Market St, Suite 34000, San Francisco, CA 94104",
    email: "us@stalci.com",
  },
  {
    city: "London",
    region: "EMEA Studio",
    address: "100 Bishopsgate, London EC2N 4AG, United Kingdom",
    email: "uk@stalci.com",
  },
  {
    city: "Singapore",
    region: "APAC Hub",
    address: "1 Marina Boulevard, #28-00, Singapore 018989",
    email: "apac@stalci.com",
  },
  {
    city: "Mumbai",
    region: "Engineering Center",
    address: "Bandra Kurla Complex, Mumbai, MH 400051, India",
    email: "india@stalci.com",
  },
];

const contactFaqs = [
  {
    q: "How quickly can an engineering squad ramp up?",
    a: "Our typical deployment velocity allows a fully staffed, senior engineering pod to begin architectural discovery within 5 to 7 business days following contract execution.",
  },
  {
    q: "How is intellectual property and source code ownership governed?",
    a: "100% of all code, neural weights, architecture artifacts, and documentation created during our engagement belong exclusively to your organization under a work-for-hire model with zero vendor lock-in.",
  },
  {
    q: "Do you sign enterprise Non-Disclosure Agreements (NDAs)?",
    a: "Yes. We execute mutual enterprise NDAs prior to reviewing proprietary technical roadmaps, schemas, or sensitive data repositories.",
  },
  {
    q: "What commercial engagement models do you support?",
    a: "We support Dedicated Agile Pods (monthly dedicated squads), Milestone-Driven Fixed Scopes, and Retained Solutions Architecture models tailored to your roadmap.",
  },
];

function ContactPage() {
  const [selectedService, setSelectedService] = useState(serviceOptions[0]);
  const [selectedTimeline, setSelectedTimeline] = useState(timelineOptions[1]);
  const [selectedBudget, setSelectedBudget] = useState(budgetTiers[1]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setError("Please provide your full name and work email.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await submitInquiry({
        name,
        email,
        company,
        service: `${selectedService} | Timeline: ${selectedTimeline} | Budget: ${selectedBudget}`,
        message: message || "Direct project blueprint discovery inquiry from /contact page.",
      });
      setSent(true);
    } catch (err: any) {
      setError(err.message || "Failed to submit inquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-950 selection:bg-zinc-900 selection:text-white">
      <Nav />
      
      <main>
        {/* ─── Clean Monochrome Hero Header (No Clutter) ─── */}
        <section className="relative isolate bg-[#090B0E] text-white pt-20 pb-20 overflow-hidden border-b border-zinc-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
            
            {/* Clean Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-4 flex justify-center"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 px-3.5 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-zinc-300">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0052FF] animate-pulse" />
                Enterprise Architecture Discovery
              </span>
            </motion.div>

            {/* Clean Solid White Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15] max-w-3xl mx-auto"
            >
              Let's Build Something Exceptional Together
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="mt-4 text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto font-normal leading-relaxed"
            >
              Whether you need a dedicated sovereign AI squad, an enterprise cloud migration, or a mission-critical platform audit, our principal architects are ready to assist.
            </motion.p>

            {/* Clean Service Guarantee Badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-zinc-400">
              <span className="inline-flex items-center gap-1.5 bg-zinc-900/90 border border-zinc-800 px-3.5 py-1.5 rounded-full">
                <Clock className="h-3.5 w-3.5 text-zinc-300" /> &lt; 4-Hour Response SLA
              </span>
              <span className="inline-flex items-center gap-1.5 bg-zinc-900/90 border border-zinc-800 px-3.5 py-1.5 rounded-full">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Mutual NDA Guaranteed
              </span>
              <span className="inline-flex items-center gap-1.5 bg-zinc-900/90 border border-zinc-800 px-3.5 py-1.5 rounded-full">
                <Lock className="h-3.5 w-3.5 text-zinc-300" /> End-to-End Encryption
              </span>
            </div>
          </div>
        </section>

        {/* ─── Clean Main Discovery Form & Side Enclave ─── */}
        <section className="py-14 sm:py-20 bg-[#FAFAFC]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-12 items-start">
              
              {/* Left Column: Clean Interactive Scope Estimator & Form */}
              <div className="lg:col-span-7 bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight">
                  Initiate Your Project Blueprint
                </h3>
                <p className="mt-1 text-xs sm:text-[13px] text-zinc-600 font-normal leading-relaxed">
                  Select your project parameters below to help us assign the optimal Principal Solutions Architect to your inquiry.
                </p>

                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-8 rounded-2xl bg-zinc-50 border border-zinc-200 p-8 text-center"
                    >
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-950 text-white">
                        <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                      </div>
                      <h4 className="mt-3 text-lg font-bold text-zinc-950">
                        Inquiry Successfully Dispatched!
                      </h4>
                      <p className="mt-2 text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-md mx-auto">
                        Thank you, <span className="font-bold text-zinc-950">{name}</span>. A Principal Solutions Architect will review your scope and contact you at <span className="font-bold text-zinc-950">{email}</span> within 4 business hours.
                      </p>
                      <button
                        onClick={() => {
                          setSent(false);
                          setName("");
                          setEmail("");
                          setCompany("");
                          setMessage("");
                        }}
                        className="mt-6 inline-flex items-center gap-2 rounded-full bg-zinc-950 px-6 py-2 text-xs font-bold text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                      >
                        Submit Another Inquiry
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                      
                      {/* Parameter 1: Core Practice */}
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 mb-2">
                          1. Core Technical Practice
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {serviceOptions.map((srv) => {
                            const isSelected = selectedService === srv;
                            return (
                              <button
                                key={srv}
                                type="button"
                                onClick={() => setSelectedService(srv)}
                                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-zinc-950 text-white shadow-xs"
                                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200/80 border border-zinc-200/80"
                                }`}
                              >
                                {srv}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Parameter 2: Timeline */}
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 mb-2">
                          2. Target Deployment Timeline
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {timelineOptions.map((time) => {
                            const isSelected = selectedTimeline === time;
                            return (
                              <button
                                key={time}
                                type="button"
                                onClick={() => setSelectedTimeline(time)}
                                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-zinc-950 text-white shadow-xs"
                                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200/80 border border-zinc-200/80"
                                }`}
                              >
                                {time}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Parameter 3: Budget Tier */}
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 mb-2">
                          3. Estimated Capital Allocation
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {budgetTiers.map((tier) => {
                            const isSelected = selectedBudget === tier;
                            return (
                              <button
                                key={tier}
                                type="button"
                                onClick={() => setSelectedBudget(tier)}
                                className={`p-2.5 rounded-xl text-center text-xs font-bold transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-zinc-950 text-white shadow-xs"
                                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200/80 border border-zinc-200/80"
                                }`}
                              >
                                {tier}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Clean Input Fields */}
                      <div className="grid gap-4 sm:grid-cols-2 pt-2">
                        <div>
                          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Alex Mercer"
                            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-xs text-zinc-950 placeholder:text-zinc-400 focus:border-zinc-950 focus:bg-white focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
                            Work Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="alex@enterprise.com"
                            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-xs text-zinc-950 placeholder:text-zinc-400 focus:border-zinc-950 focus:bg-white focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
                          Organization / Company
                        </label>
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Apex Global Inc."
                          className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-xs text-zinc-950 placeholder:text-zinc-400 focus:border-zinc-950 focus:bg-white focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
                          Project Architecture Details
                        </label>
                        <textarea
                          rows={4}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Describe the platform requirements, tech constraints, or problem statement..."
                          className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-3.5 text-xs text-zinc-950 placeholder:text-zinc-400 focus:border-zinc-950 focus:bg-white focus:outline-none transition-colors resize-none"
                        />
                      </div>

                      {error && (
                        <p className="text-xs text-red-600 font-medium">
                          {error}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full rounded-full bg-zinc-950 py-3 text-xs font-bold text-white hover:bg-zinc-800 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {submitting ? (
                          <span>Dispatching Telemetry...</span>
                        ) : (
                          <>
                            <span>Dispatch Project Blueprint Inquiry</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </AnimatePresence>
              </div>

              {/* Right Column: Clean Session Booking, Contacts & Global Hubs */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Clean Direct Schedule Card */}
                <div className="rounded-3xl bg-[#090B0E] text-white p-6 sm:p-8 border border-zinc-800 shadow-sm relative overflow-hidden">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-zinc-300" />
                    <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                      Immediate Discovery
                    </span>
                  </div>

                  <h4 className="mt-3 text-lg font-bold text-white">
                    Book a 30-Minute Architecture Session
                  </h4>
                  <p className="mt-2 text-xs text-zinc-400 leading-relaxed font-normal">
                    Connect directly with a Principal Cloud &amp; AI Architect to discuss technical feasibility, budget estimates, and deployment velocity.
                  </p>

                  <a
                    href="mailto:contact@stalci.com?subject=Strategic Architecture Discovery Session"
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-zinc-950 hover:bg-zinc-200 transition-all shadow-sm"
                  >
                    <span>Schedule Architecture Call</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>

                {/* Clean Direct Contact Points */}
                <div className="rounded-3xl bg-white border border-zinc-200/90 p-6 sm:p-7 shadow-2xs space-y-4">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">
                    Direct Studio Contacts
                  </h4>
                  
                  <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-zinc-50 border border-zinc-200/80">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-zinc-200 text-zinc-950 shrink-0">
                      <Mail className="h-4 w-4 text-zinc-900" />
                    </div>
                    <div className="min-w-0 my-auto">
                      <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">
                        Enterprise Inquiries
                      </span>
                      <a href="mailto:contact@stalci.com" className="text-xs font-bold text-zinc-950 hover:text-zinc-600 transition-colors truncate block">
                        contact@stalci.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-zinc-50 border border-zinc-200/80">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-zinc-200 text-zinc-950 shrink-0">
                      <Lock className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div className="min-w-0 my-auto">
                      <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">
                        Encrypted Security Hotline
                      </span>
                      <span className="text-xs font-bold text-zinc-950 block">
                        security@stalci.com (PGP Verified)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Global Locations */}
                <div className="rounded-3xl bg-white border border-zinc-200/90 p-6 sm:p-7 shadow-2xs">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 mb-3.5">
                    Global Studio Presence
                  </h4>
                  <div className="space-y-2.5">
                    {globalHubs.map((hub) => (
                      <div 
                        key={hub.city}
                        className="p-3 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:bg-zinc-100/70 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-zinc-950">{hub.city}</span>
                          <span className="text-[10px] font-mono text-zinc-500 font-semibold">{hub.region}</span>
                        </div>
                        <p className="mt-1 text-[11px] text-zinc-500 leading-snug font-normal">
                          {hub.address}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ─── Clean Minimal FAQ Accordion ─── */}
        <section className="py-14 sm:py-20 bg-white border-t border-zinc-200/90">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-2 mb-10">
              <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-zinc-500">
                Engagement FAQ
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">
                Frequently Asked Discovery Questions
              </h3>
            </div>

            <div className="divide-y divide-zinc-200/80">
              {contactFaqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="py-4">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between text-left gap-4 py-1 cursor-pointer group"
                    >
                      <span className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-zinc-950 transition-colors">
                        {faq.q}
                      </span>
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center text-zinc-500">
                        {isOpen ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden pt-1 pb-2"
                        >
                          <p className="text-xs sm:text-[13px] leading-relaxed text-zinc-600 font-normal">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
