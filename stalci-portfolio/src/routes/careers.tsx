import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SectionHeading } from "@/components/site/Brand";
import { benefits } from "@/lib/careers-data";
import { MapPin, Clock, ChevronDown, CheckCircle2, Send, X } from "lucide-react";
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
      "Experience designing multi-tenant enterprise RAG retrieval architectures",
      "Strong background in model quantization, GPU optimization, and observability",
    ]),
    isActive: true,
  },
  {
    id: 3,
    title: "Senior Full-Stack Product Engineer",
    location: "Remote (Global)",
    type: "Full-time",
    description: "Build mission-critical web and mobile applications on React 19, Next.js 16, TypeScript, React Native, and PostgreSQL.",
    requirements: JSON.stringify([
      "5+ years building production full-stack platforms with strict type-safety",
      "Experience with TanStack Router, Tailwind CSS, NestJS, and relational DB indexing",
      "Obsession with micro-interactions, Core Web Vitals, and responsive performance",
    ]),
    isActive: true,
  },
];

function Careers() {
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
    <div className="min-h-screen bg-[#F8FAFC] text-black">
      <Nav solid />

      {/* Header Banner */}
      <div className="bg-[#000000] text-white pt-28 pb-16 border-b border-white/10">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400 mb-3">
            STALCI Talent Network
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white max-w-2xl">
            Build Technology That Global Enterprises Depend On
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-neutral-400 max-w-xl leading-relaxed">
            We assemble senior, high-autonomy engineering squads across distributed systems, sovereign AI, zero-trust security, and cloud platform infrastructure.
          </p>
        </div>
      </div>

      <main className="py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          {/* Engineering Culture / Benefits */}
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4 mb-12">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-xl border border-zinc-200 bg-white p-5 shadow-2xs">
                <h3 className="text-sm font-bold text-zinc-950">{b.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-600">{b.body}</p>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-bold text-zinc-950">Open Positions</h2>
            <p className="text-xs text-zinc-500 mt-0.5">Live active roles managed by STALCI Talent Operations.</p>
          </div>

          {/* Job Listings */}
          <div className="space-y-3">
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
                  className="rounded-xl border border-zinc-200 bg-white shadow-2xs overflow-hidden transition-all hover:border-zinc-400"
                >
                  <div
                    onClick={() => setExpandedJobId(isExpanded ? null : j.id)}
                    className="p-5 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none"
                  >
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-zinc-950">{j.title}</h3>
                      <p className="mt-1 text-xs text-zinc-600 max-w-xl">{j.description}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0 text-[11px] font-medium text-zinc-600">
                      <span className="inline-flex items-center gap-1 bg-zinc-50 border border-zinc-200 px-2.5 py-1 rounded-md">
                        <MapPin className="h-3 w-3 text-zinc-500" /> {j.location}
                      </span>
                      <span className="inline-flex items-center gap-1 bg-zinc-50 border border-zinc-200 px-2.5 py-1 rounded-md">
                        <Clock className="h-3 w-3 text-zinc-500" /> {j.type}
                      </span>
                      <ChevronDown
                        className={`h-3.5 w-3.5 text-zinc-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-2 border-t border-zinc-100 bg-[#F8FAFC]">
                      <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-600 mt-2 mb-2">
                        Key Qualifications
                      </h4>
                      <ul className="space-y-1 text-xs text-zinc-700 mb-5">
                        {requirementsArr.map((r, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-zinc-400 font-bold">•</span>
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>

                      <button
                        onClick={() => {
                          setApplyingJob(j);
                          setSubmitted(false);
                        }}
                        className="rounded-full bg-black hover:bg-zinc-800 text-white text-xs font-semibold px-4 py-2 transition-colors cursor-pointer"
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
          <div className="mt-12 rounded-2xl bg-[#000000] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border border-white/10">
            <div>
              <h2 className="text-base font-bold text-white">Don't See an Exact Match?</h2>
              <p className="mt-1 text-xs text-neutral-400 max-w-lg">
                We are constantly expanding our engineering squads. Submit an open talent application with your GitHub or portfolio.
              </p>
            </div>
            <a
              href="mailto:careers@stalci.com?subject=Open Engineering Application — STALCI"
              className="shrink-0 rounded-full bg-white hover:bg-neutral-200 text-zinc-950 font-semibold px-5 py-2 text-xs transition-colors"
            >
              Send Open Application
            </a>
          </div>
        </div>
      </main>

      {/* Application Modal */}
      {applyingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div
            data-lenis-prevent
            className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-zinc-200 p-6 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setApplyingJob(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg border border-zinc-200 text-zinc-400 hover:text-black cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {submitted ? (
              <div className="text-center py-6">
                <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-zinc-950">Application Received!</h3>
                <p className="mt-1.5 text-xs text-zinc-600">
                  Thank you for applying to <span className="font-semibold">{applyingJob.title}</span>. Our team will review your profile.
                </p>
                <button
                  onClick={() => setApplyingJob(null)}
                  className="mt-5 rounded-full bg-black text-white text-xs font-semibold px-5 py-2 cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} className="space-y-3.5">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">Application</span>
                  <h3 className="text-base font-bold text-zinc-950 mt-0.5">{applyingJob.title}</h3>
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-950 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full rounded-lg border border-zinc-200 bg-zinc-50 p-2 text-xs text-zinc-900 outline-none focus:outline-black"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-950 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@domain.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full rounded-lg border border-zinc-200 bg-zinc-50 p-2 text-xs text-zinc-900 outline-none focus:outline-black"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-950 block mb-1">Resume / LinkedIn / GitHub URL *</label>
                  <input
                    type="url"
                    required
                    placeholder="https://github.com/... or LinkedIn"
                    value={formState.resumeUrl}
                    onChange={(e) => setFormState({ ...formState, resumeUrl: e.target.value })}
                    className="w-full rounded-lg border border-zinc-200 bg-zinc-50 p-2 text-xs text-zinc-900 outline-none focus:outline-black"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={appMutation.isPending}
                    className="w-full rounded-full bg-black hover:bg-zinc-800 text-white font-semibold py-2.5 text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="h-3 w-3" />
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
