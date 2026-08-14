import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SectionHeading } from "@/components/site/Brand";
import { benefits } from "@/lib/careers-data";
import { MapPin, Clock, Briefcase, ChevronDown, CheckCircle2, Sparkles, Send, X, ArrowRight } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchJobs, submitJobApplication } from "@/lib/api";

const title = "Careers at STALCI — Enterprise Engineering, AI, Cloud & Security";
const description =
  "Join STALCI. Open roles across distributed systems engineering, sovereign AI models, multi-cloud platforms, and cyber resilience.";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Careers,
});

const fallbackJobs = [
  {
    id: 1,
    title: "Staff Distributed Systems Engineer",
    location: "San Francisco, CA / Hybrid",
    type: "Full-time",
    description: "Architect and build ultra-high throughput distributed consensus engines and memory-safe streaming microservices in Go and Rust.",
    requirements: JSON.stringify([
      "7+ years experience in distributed systems, network protocols, and Linux kernel fundamentals",
      "Proficiency with Go, Rust, eBPF, and Apache Kafka",
      "Experience building low-latency financial or cloud telemetry infrastructure",
    ]),
    isActive: true,
  },
  {
    id: 2,
    title: "Principal AI / ML Infrastructure Architect",
    location: "Remote (US / EU)",
    type: "Full-time",
    description: "Lead the architecture of enterprise sovereign AI platforms, agentic LLM pipelines, and fine-tuning clusters on Kubernetes.",
    requirements: JSON.stringify([
      "Deep expertise with PyTorch, vLLM, LangChain, Ray, and Triton Inference Server",
      "Track record of deploying production-grade RAG and agentic workflows at scale",
      "Strong understanding of model safety, quantization, and evaluation benchmarks",
    ]),
    isActive: true,
  },
  {
    id: 3,
    title: "Senior Cloud Platform & SRE Engineer",
    location: "London, UK / Remote",
    type: "Full-time",
    description: "Design multi-cloud Kubernetes clusters, automated GitOps CI/CD pipelines, and zero-trust mesh architectures across AWS, GCP, and Cloudflare.",
    requirements: JSON.stringify([
      "5+ years mastering Kubernetes, Terraform / OpenTofu, and Helm",
      "Experience with Cilium eBPF, Istio, Prometheus, and Grafana Tempo",
      "Strong scripting skills in Go or Python for custom operator development",
    ]),
    isActive: true,
  },
  {
    id: 4,
    title: "Lead Full-Stack Product Engineer",
    location: "San Francisco, CA / Remote",
    type: "Full-time",
    description: "Craft high-performance, accessible enterprise web applications and developer consoles utilizing React 19, TypeScript, and Tailwind CSS.",
    requirements: JSON.stringify([
      "5+ years in modern frontend architectures, design systems, and state management",
      "Strong mastery of Next.js, TanStack Router/Query, WebGL, and Framer Motion",
      "Obsession with 60fps micro-interactions, accessibility, and sub-100ms response times",
    ]),
    isActive: true,
  },
];

function Careers() {
  const [filter, setFilter] = useState<string>("All");
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null);
  const [applyingJob, setApplyingJob] = useState<any | null>(null);
  const [formState, setFormState] = useState({ name: "", email: "", resumeUrl: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  const { data: apiJobs } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  const jobsList = apiJobs && apiJobs.length > 0 ? apiJobs : fallbackJobs;

  const appMutation = useMutation({
    mutationFn: (data: any) => submitJobApplication(data),
    onSuccess: () => {
      setSubmitted(true);
    },
  });

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingJob) return;
    appMutation.mutate({
      jobId: applyingJob.id,
      applicantName: formState.name,
      applicantEmail: formState.email,
      resumeUrl: formState.resumeUrl || formState.notes,
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <Nav solid />

      {/* Header Banner */}
      <div className="relative bg-white pt-32 pb-20 sm:pt-36 sm:pb-24 border-b border-slate-200 overflow-hidden">
        <div className="grid-lines-light absolute inset-0 opacity-60 pointer-events-none" />

        <div className="mx-auto max-w-6xl px-5 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            STALCI Engineering Network
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
            Build Technology That Global Enterprises Depend On
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            We assemble senior, high-autonomy engineering squads across distributed systems, sovereign AI, zero-trust security, and cloud platform infrastructure.
          </p>
        </div>
      </div>

      <main className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          
          {/* Engineering Culture / Benefits */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-16">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs transition-all hover:border-amber-500/60 hover:shadow-md hover:-translate-y-1">
                <h3 className="text-base font-bold text-slate-950">{b.title}</h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">{b.body}</p>
              </div>
            ))}
          </div>

          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">Open Engineering Positions</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">Live active roles managed by STALCI Talent Operations.</p>
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {jobsList.map((j: any) => {
              const isExpanded = expandedJobId === j.id;
              let requirementsArr: string[] = [];
              try {
                requirementsArr = typeof j.requirements === "string" ? JSON.parse(j.requirements) : j.requirements || [];
              } catch {
                requirementsArr = [j.requirements];
              }

              return (
                <div
                  key={j.id}
                  className="rounded-2xl border border-slate-200/90 bg-white shadow-2xs overflow-hidden transition-all hover:border-amber-500/60 hover:shadow-md"
                >
                  <div
                    onClick={() => setExpandedJobId(isExpanded ? null : j.id)}
                    className="p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-slate-950 group-hover:text-amber-700 transition-colors">{j.title}</h3>
                      <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-2xl">{j.description}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0 text-xs font-semibold text-slate-700">
                      <span className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-slate-200 px-3 py-1.5 rounded-xl font-mono shadow-2xs">
                        <MapPin className="h-3.5 w-3.5 text-amber-600" /> {j.location}
                      </span>
                      <span className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-slate-200 px-3 py-1.5 rounded-xl font-mono shadow-2xs">
                        <Clock className="h-3.5 w-3.5 text-amber-600" /> {j.type}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-slate-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-6 pb-6 pt-2 border-t border-slate-100 bg-[#F8FAFC]">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 mt-3 mb-2.5">
                        Key Qualifications & Requirements
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-700 mb-6">
                        {requirementsArr.map((r, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="text-amber-600 font-bold">•</span>
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>

                      <button
                        onClick={() => {
                          setApplyingJob(j);
                          setSubmitted(false);
                        }}
                        className="rounded-xl bg-slate-900 hover:bg-amber-600 text-white text-xs sm:text-sm font-bold px-6 py-2.5 transition-all shadow-sm cursor-pointer"
                      >
                        Apply for {j.title}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Open Inquiries Card */}
          <div className="mt-14 rounded-3xl bg-slate-900 text-white p-8 sm:p-10 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Don't See an Exact Match?</h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                We are constantly expanding our sovereign engineering squads. Submit an open talent application with your GitHub, LinkedIn, or portfolio.
              </p>
            </div>
            <a
              href="mailto:careers@stalci.com?subject=Open Engineering Application — STALCI"
              className="shrink-0 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3 text-xs sm:text-sm transition-all shadow-md"
            >
              Send Open Application
            </a>
          </div>
        </div>
      </main>

      {/* Interactive Application Modal */}
      {applyingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div
            data-lenis-prevent
            className="relative w-full max-w-lg bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 animate-pop max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setApplyingJob(null)}
              className="absolute top-4 right-4 p-1.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-950 bg-slate-100 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-950">Application Received!</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Thank you for applying to the <span className="font-semibold text-slate-900">{applyingJob.title}</span> role. Our engineering leadership pod will review your profile within 48 business hours.
                </p>
                <button
                  onClick={() => setApplyingJob(null)}
                  className="mt-6 rounded-xl bg-slate-900 text-white text-xs font-bold px-6 py-2.5 shadow-sm cursor-pointer hover:bg-amber-600 transition-colors"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700">Application</span>
                  <h3 className="text-lg font-bold text-slate-950 mt-0.5">{applyingJob.title}</h3>
                </div>

                <div>
                  <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-white p-3 text-xs text-slate-900 outline-none focus:border-amber-600 shadow-2xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@domain.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-white p-3 text-xs text-slate-900 outline-none focus:border-amber-600 shadow-2xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 block mb-1">Portfolio, Resume Link, or GitHub *</label>
                  <input
                    type="url"
                    required
                    placeholder="https://github.com/... or LinkedIn"
                    value={formState.resumeUrl}
                    onChange={(e) => setFormState({ ...formState, resumeUrl: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-white p-3 text-xs text-slate-900 outline-none focus:border-amber-600 shadow-2xs"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={appMutation.isPending}
                    className="w-full rounded-xl bg-slate-900 hover:bg-amber-600 text-white font-bold py-3 text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="h-3.5 w-3.5" />
                    {appMutation.isPending ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
