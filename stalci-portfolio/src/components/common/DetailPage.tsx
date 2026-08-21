import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import type { DetailEntry } from "@/types";

export function DetailPage({
  entry,
  backLabel = "Back",
  backTo = "/",
  related = [],
  relatedBase = "/services",
  relatedLabel = "Related Practice Areas",
}: {
  entry: DetailEntry;
  backLabel?: string;
  backTo?: string;
  related?: DetailEntry[];
  relatedBase?: string;
  relatedLabel?: string;
}) {
  const Icon = entry.icon || Sparkles;

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-zinc-800 selection:text-white">
      <Nav solid />
      <main>
        {/* Header Hero Section */}
        <section className="relative overflow-hidden bg-[#000000] pb-14 pt-24 sm:pb-18 sm:pt-28 border-b border-white/10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50rem] h-[16rem] bg-white/[0.03] blur-[120px] pointer-events-none" />
          
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Link
              to={backTo as any}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{backLabel}</span>
            </Link>

            <div className="mt-6 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 border border-white/15">
                <Icon className="h-5 w-5 text-white" strokeWidth={1.75} />
              </span>
              <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                {entry.tag || "Enterprise Practice"}
              </p>
            </div>

            <h1 className="mt-4 max-w-3xl text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-white">
              {entry.title}
            </h1>
            
            <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-zinc-400">
              {entry.summary}
            </p>

            {/* Key Metric Highlights */}
            {entry.outcomes && entry.outcomes.length > 0 && (
              <dl className="mt-8 grid max-w-2xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3 shadow-xl">
                {entry.outcomes.map((o: any, idx: number) => {
                  const label = typeof o === "string" ? o : o?.label || `Outcome ${idx + 1}`;
                  const value = typeof o === "string" ? "100%" : o?.value || "Passed";
                  return (
                    <div key={idx} className="bg-[#09090B] px-5 py-4">
                      <dt className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight">{value}</dt>
                      <dd className="mt-1 text-xs leading-snug text-zinc-400">{label}</dd>
                    </div>
                  );
                })}
              </dl>
            )}
          </div>
        </section>

        {/* Overview & Core Capabilities */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
          <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
            <div className="space-y-10">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">System Overview</h2>
                <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-zinc-300">
                  {entry.overview}
                </p>
              </div>

              {entry.capabilities && entry.capabilities.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Capabilities &amp; Operational Standards</h2>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {entry.capabilities.map((c: any, idx: number) => {
                      const title = typeof c === "string" ? c : c?.title || `Capability ${idx + 1}`;
                      const copy = typeof c === "string" ? "Enterprise architectural capability & compliance standard." : c?.copy || c?.description || "";
                      return (
                        <div
                          key={idx}
                          className="rounded-2xl border border-white/10 bg-[#0C0C0E] p-5 hover:border-white/20 transition-all duration-200"
                        >
                          <h3 className="text-sm font-semibold text-white">{title}</h3>
                          {copy && <p className="mt-2 text-xs leading-relaxed text-zinc-400">{copy}</p>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar metadata & CTA */}
            <aside className="space-y-6">
              {entry.deliverables && entry.deliverables.length > 0 && (
                <div className="rounded-2xl border border-white/10 bg-[#0C0C0E] p-6">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">Key Deliverables</h3>
                  <ul className="mt-4 space-y-3">
                    {entry.deliverables.map((d: any, idx: number) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" strokeWidth={2.5} />
                        <span>{typeof d === "string" ? d : d?.title || String(d)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(entry.tools || entry.stack) && (
                <div className="rounded-2xl border border-white/10 bg-[#0C0C0E] p-6">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">Tech &amp; Toolchain</h3>
                  <div className="mt-3.5 flex flex-wrap gap-2">
                    {(entry.tools || entry.stack || []).map((t: any, idx: number) => (
                      <span
                        key={idx}
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-zinc-300"
                      >
                        {typeof t === "string" ? t : t?.name || String(t)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <Link
                to="/contact"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-xs sm:text-sm font-semibold text-black bg-white hover:bg-zinc-200 transition-all shadow-md"
              >
                <span>Consult an Architect</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </aside>
          </div>
        </section>

        {/* Related Entries */}
        {related && related.length > 0 && (
          <section className="border-t border-white/10 bg-[#050507] py-14">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-lg font-bold text-white tracking-tight">{relatedLabel}</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {related.map((r) => {
                  const RIcon = r.icon || Sparkles;
                  return (
                    <Link
                      key={r.slug}
                      to={`${relatedBase}/${r.slug}` as any}
                      className="group rounded-2xl border border-white/10 bg-[#0C0C0E] p-5 transition-all duration-200 hover:border-white/25 hover:bg-[#121215]"
                    >
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                        <RIcon className="h-4 w-4 text-white" strokeWidth={1.5} />
                      </span>
                      <h3 className="mt-3 text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                        {r.title}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-zinc-400">
                        {r.summary}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
