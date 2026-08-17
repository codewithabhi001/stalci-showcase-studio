import { useState } from "react";
import { ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { useInquiryMutation } from "@/hooks/queries/useInquiryMutation";

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

export function ContactForm() {
  const [selectedService, setSelectedService] = useState(serviceOptions[0]);
  const [selectedTimeline, setSelectedTimeline] = useState(timelineOptions[1]);
  const [selectedBudget, setSelectedBudget] = useState(budgetTiers[1]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const [sent, setSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const inquiryMutation = useInquiryMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setErrorMessage("Please provide your full name and work email.");
      return;
    }

    setErrorMessage(null);

    inquiryMutation.mutate(
      {
        name,
        email,
        company,
        service: `${selectedService} | Timeline: ${selectedTimeline} | Budget: ${selectedBudget}`,
        message: message || "Direct project blueprint discovery inquiry from /contact page.",
      },
      {
        onSuccess: () => {
          setSent(true);
        },
        onError: (err: any) => {
          setErrorMessage(err.message || "Failed to submit inquiry. Please try again.");
        },
      }
    );
  };

  if (sent) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-8 sm:p-10 text-center space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 shadow-xs">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="font-display text-2xl font-bold text-slate-900">
          Inquiry Received — Sprint Blueprint Initiated
        </h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Thank you for reaching out. A Principal Solutions Architect has been assigned to your request and will follow up within 4 business hours with an enterprise discovery outline.
        </p>
        <div className="pt-2">
          <button
            onClick={() => setSent(false)}
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2.5 text-xs font-bold text-white hover:bg-black transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
          {errorMessage}
        </div>
      )}

      <div>
        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-2.5">
          1. Practice Area or System Focus
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {serviceOptions.map((svc) => (
            <button
              type="button"
              key={svc}
              onClick={() => setSelectedService(svc)}
              className={`px-3 py-2.5 rounded-xl text-xs font-medium border text-left transition-all cursor-pointer ${
                selectedService === svc
                  ? "bg-slate-900 text-white border-slate-900 font-bold shadow-xs"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-white"
              }`}
            >
              {svc}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Alex Rivera"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            Work Email *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="alex@company.com"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-1.5">
          Company / Organization
        </label>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Acme Corp Inc."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-none transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-2">
          2. Desired Deployment Timeline
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {timelineOptions.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setSelectedTimeline(t)}
              className={`px-3 py-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                selectedTimeline === t
                  ? "bg-slate-900 text-white border-slate-900 font-bold shadow-xs"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-2">
          3. Estimated Target Budget
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {budgetTiers.map((b) => (
            <button
              type="button"
              key={b}
              onClick={() => setSelectedBudget(b)}
              className={`px-3 py-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                selectedBudget === b
                  ? "bg-slate-900 text-white border-slate-900 font-bold shadow-xs"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-white"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-1.5">
          Project Blueprint Overview / Requirements
        </label>
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Briefly describe your objectives, target architecture, or key technical challenges..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-none transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={inquiryMutation.isPending}
        className="w-full inline-flex items-center justify-center gap-2.5 rounded-full bg-slate-900 py-3.5 px-6 text-xs sm:text-sm font-bold text-white hover:bg-black transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
      >
        {inquiryMutation.isPending ? (
          <span>Submitting Architectural Blueprint...</span>
        ) : (
          <>
            <span>Submit Discovery Blueprint Request</span>
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-slate-500 pt-1">
        <Lock className="h-3 w-3 text-slate-400" />
        <span>Enterprise Mutual NDA Guaranteed • Zero Vendor Lock-in</span>
      </div>
    </form>
  );
}
