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
    <div className="min-h-screen bg-background">
      <Nav solid />
      <main>
        {/* Header */}
        <section className="relative overflow-hidden bg-ink pb-16 pt-28 sm:pb-20 sm:pt-32">
          <div className="grid-lines absolute inset-0 opacity-25" aria-hidden />
          <div className="relative mx-auto max-w-5xl px-5 lg:px-8">
            <a
              href={backTo}
              className="inline-flex items-center gap-2 text-xs font-medium text-on-ink-muted transition-colors hover:text-copper"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {backLabel}
            </a>

            <div className="mt-7 flex items-center gap-4">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 ring-1 ring-copper/25">
                <Icon className="h-6 w-6 text-copper" strokeWidth={1.5} />
              </span>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-copper">
                {entry.tag}
              </p>
            </div>

            <h1 className="mt-5 max-w-3xl text-balance text-3xl font-semibold leading-tight tracking-tight text-on-ink sm:text-4xl">
              {entry.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-on-ink-muted sm:text-base">
              {entry.summary}
            </p>

            <dl className="mt-10 grid max-w-2xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
              {entry.outcomes.map((o) => (
                <div key={o.label} className="bg-ink px-5 py-5">
                  <dt className="text-xl font-semibold text-copper">{o.value}</dt>
                  <dd className="mt-1 text-xs leading-snug text-on-ink-muted">{o.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Overview + capabilities */}
        <section className="mx-auto max-w-5xl px-5 py-16 sm:py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
            <div>
              <h2 className="text-xl font-semibold sm:text-2xl">Overview</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {entry.overview}
              </p>

              <h2 className="mt-12 text-xl font-semibold sm:text-2xl">What we cover</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {entry.capabilities.map((c) => (
                  <div
                    key={c.title}
                    className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-copper/40"
                  >
                    <h3 className="text-sm font-semibold">{c.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.copy}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="space-y-8">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="eyebrow text-copper-deep">What you get</h3>
                <ul className="mt-4 space-y-3">
                  {entry.deliverables.map((d) => (
                    <li key={d} className="flex gap-2.5 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-copper" strokeWidth={2} />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="eyebrow text-copper-deep">Typical stack</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {entry.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href="/#contact"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-ink"
                style={{ background: "var(--gradient-copper)" }}
              >
                Discuss this with us
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </aside>
          </div>
        </section>

        {/* Related */}
        <section className="border-t border-border bg-muted/40 py-16">
          <div className="mx-auto max-w-5xl px-5 lg:px-8">
            <h2 className="text-lg font-semibold">{relatedLabel}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {related.map((r) => {
                const RIcon = r.icon;
                return (
                  <Link
                    key={r.slug}
                    to={`${relatedBase}/${r.slug}` as string}
                    className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-copper/50"
                  >
                    <RIcon className="h-5 w-5 text-copper" strokeWidth={1.5} />
                    <h3 className="mt-3 text-sm font-semibold">{r.title}</h3>
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
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
