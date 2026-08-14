import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <Nav solid />
      <main>
        {/* Header Hero Section */}
        <section className="relative overflow-hidden bg-white pb-16 pt-28 sm:pb-24 sm:pt-36 border-b border-slate-200">
          <div className="grid-lines-light absolute inset-0 opacity-60 pointer-events-none" aria-hidden />

          <div className="relative mx-auto max-w-5xl px-5 lg:px-8 z-10">
            <a
              href={backTo}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-500 transition-colors hover:text-amber-700"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {backLabel}
            </a>

            <div className="mt-8 flex items-center gap-4">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 shadow-2xs">
                <Icon className="h-6 w-6" strokeWidth={1.8} />
              </span>
              <p className="text-xs font-mono font-bold uppercase tracking-[0.24em] text-amber-700">
                {entry.tag}
              </p>
            </div>

            <h1 className="mt-5 max-w-3xl text-balance text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
              {entry.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-600">
              {entry.summary}
            </p>

            <dl className="mt-10 grid max-w-2xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-3 shadow-2xs">
              {entry.outcomes.map((o) => (
                <div key={o.label} className="bg-white px-5 py-5 text-center sm:text-left">
                  <dt className="font-display text-2xl font-extrabold text-amber-700">{o.value}</dt>
                  <dd className="mt-1 text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">{o.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Overview + capabilities */}
        <section className="mx-auto max-w-5xl px-5 py-16 sm:py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
            <div>
              <h2 className="text-xl font-bold sm:text-2xl text-slate-950">Overview</h2>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
                {entry.overview}
              </p>

              <h2 className="mt-12 text-xl font-bold sm:text-2xl text-slate-950">Practice Capabilities</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {entry.capabilities.map((c) => (
                  <div
                    key={c.title}
                    className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs transition-all hover:border-amber-500/60 hover:shadow-md"
                  >
                    <h3 className="text-sm font-bold text-slate-950">{c.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">{c.copy}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700">Key Deliverables</h3>
                <ul className="mt-4 space-y-3">
                  {entry.deliverables.map((d) => (
                    <li key={d} className="flex gap-2.5 text-xs sm:text-sm text-slate-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" strokeWidth={2} />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700">Core Tech Stack</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {entry.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-lg border border-slate-200 bg-[#F8FAFC] px-3 py-1 font-mono text-xs font-semibold text-slate-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href="/#contact"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-white bg-slate-900 hover:bg-amber-600 shadow-md transition-all cursor-pointer"
              >
                <span>Initiate Engagement</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </aside>
          </div>
        </section>

        {/* Related Practices */}
        <section className="border-t border-slate-200 bg-white py-16">
          <div className="mx-auto max-w-5xl px-5 lg:px-8">
            <h2 className="text-lg font-bold text-slate-950">{relatedLabel}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {related.map((r) => {
                const RIcon = r.icon;
                return (
                  <Link
                    key={r.slug}
                    to={`${relatedBase}/${r.slug}` as string}
                    className="group rounded-2xl border border-slate-200/90 bg-[#F8FAFC] p-5 shadow-2xs transition-all hover:border-amber-500/60 hover:shadow-md hover:-translate-y-1"
                  >
                    <RIcon className="h-5 w-5 text-amber-700" strokeWidth={1.8} />
                    <h3 className="mt-3 text-sm font-bold text-slate-950 group-hover:text-amber-700 transition-colors">{r.title}</h3>
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-600">
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
