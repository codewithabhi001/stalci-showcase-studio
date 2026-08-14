import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import type { DetailEntry } from "@/lib/site-data";

export function DetailPage({
  entry,
  backLabel,
  backTo,
  related,
  relatedBase,
  relatedLabel,
}: {
  entry: DetailEntry;
  backLabel: string;
  backTo: string;
  related: DetailEntry[];
  relatedBase: string;
  relatedLabel: string;
}) {
  const Icon = entry.icon;

  return (
    <div className="min-h-screen bg-[#080A12] text-white">
      <Nav solid />
      <main>
        {/* Header */}
        <section className="relative overflow-hidden bg-[#080B12] pb-14 pt-24 sm:pb-16 sm:pt-28 border-b border-white/10">
          <div className="relative mx-auto max-w-5xl px-5 lg:px-8">
            <a
              href={backTo}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {backLabel}
            </a>

            <div className="mt-6 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10">
                <Icon className="h-5 w-5 text-white" strokeWidth={1.5} />
              </span>
              <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                {entry.tag}
              </p>
            </div>

            <h1 className="mt-4 max-w-2xl text-2xl sm:text-4xl font-extrabold leading-tight tracking-tight text-white">
              {entry.title}
            </h1>
            <p className="mt-3 max-w-xl text-xs sm:text-sm leading-relaxed text-slate-400">
              {entry.summary}
            </p>

            <dl className="mt-8 grid max-w-xl grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-3">
              {entry.outcomes.map((o) => (
                <div key={o.label} className="bg-[#0E1320] px-4 py-4">
                  <dt className="text-lg font-bold text-white">{o.value}</dt>
                  <dd className="mt-0.5 text-[11px] leading-snug text-slate-400">{o.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Overview + capabilities */}
        <section className="mx-auto max-w-5xl px-5 py-14 sm:py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_18rem]">
            <div>
              <h2 className="text-lg font-bold text-white">Overview</h2>
              <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-300">
                {entry.overview}
              </p>

              <h2 className="mt-10 text-lg font-bold text-white">Capabilities & Standards</h2>
              <div className="mt-4 grid gap-3.5 sm:grid-cols-2">
                {entry.capabilities.map((c) => (
                  <div
                    key={c.title}
                    className="rounded-xl border border-white/10 bg-[#0E1320] p-4 hover:border-white/20 transition-colors"
                  >
                    <h3 className="text-xs sm:text-sm font-semibold text-white">{c.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">{c.copy}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-[#0E1320] p-5">
                <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300">Key Deliverables</h3>
                <ul className="mt-3.5 space-y-2.5">
                  {entry.deliverables.map((d) => (
                    <li key={d} className="flex gap-2 text-xs text-slate-400">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white" strokeWidth={2} />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0E1320] p-5">
                <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300">Technology Stack</h3>
                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {entry.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-mono text-slate-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href="/#contact"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold text-slate-950 bg-white hover:bg-slate-200 transition-colors shadow-sm"
              >
                Discuss this with us
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </aside>
          </div>
        </section>

        {/* Related */}
        <section className="border-t border-white/10 bg-[#05070B] py-14">
          <div className="mx-auto max-w-5xl px-5 lg:px-8">
            <h2 className="text-base font-bold text-white">{relatedLabel}</h2>
            <div className="mt-5 grid gap-3.5 sm:grid-cols-3">
              {related.map((r) => {
                const RIcon = r.icon;
                return (
                  <Link
                    key={r.slug}
                    to={`${relatedBase}/${r.slug}` as string}
                    className="group rounded-xl border border-white/10 bg-[#0E1320] p-4 transition-colors hover:border-white/20"
                  >
                    <RIcon className="h-4.5 w-4.5 text-white" strokeWidth={1.5} />
                    <h3 className="mt-2.5 text-xs sm:text-sm font-semibold text-white">{r.title}</h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-400">
                      {r.summary}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
