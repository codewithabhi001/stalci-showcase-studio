import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Nav, Footer } from "@/components/layout";
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
    <div className="min-h-screen bg-[#000000] text-white">
      <Nav />
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          to={backTo}
          className="inline-flex items-center gap-2 text-sm text-[#3B82F6] hover:text-[#60A5FA]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {backLabel}
        </Link>
        <header className="mt-8">
          <span className="text-xs uppercase tracking-wider text-[#3B82F6] font-mono">
            {backLabel}
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#FAFAFA] sm:text-4xl">
            {entry.title}
          </h1>
          <p className="mt-4 text-lg text-[#A1A1AA]">{entry.tagline}</p>
        </header>

        <section className="mt-12 rounded-xl border border-[#27272A] bg-[#18181B] p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#27272A] text-[#3B82F6]">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#FAFAFA]">Overview</h2>
              <p className="text-sm text-[#A1A1AA]">What we deliver in this practice</p>
            </div>
          </div>
          <p className="mt-6 text-[#D4D4D8] leading-relaxed">{entry.summary}</p>
          <div className="mt-8 border-t border-[#27272A] pt-6">
            <h3 className="text-sm font-semibold text-[#FAFAFA] uppercase tracking-wider font-mono">
              Key Capabilities
            </h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {entry.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#D4D4D8]">
                  <Check className="h-4 w-4 text-[#3B82F6] shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-bold text-[#FAFAFA]">Other {relatedLabel}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`${relatedBase}/${r.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-[#27272A] bg-[#18181B] p-4 transition-colors hover:border-[#3B82F6]"
                >
                  <div>
                    <h3 className="font-semibold text-[#FAFAFA] group-hover:text-[#3B82F6]">
                      {r.title}
                    </h3>
                    <p className="mt-1 text-xs text-[#A1A1AA] line-clamp-1">{r.summary}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#A1A1AA] group-hover:text-[#3B82F6] shrink-0 ml-2" />
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-16 rounded-xl bg-gradient-to-r from-[#18181B] to-[#27272A] p-8 text-center border border-[#27272A]">
          <h2 className="text-2xl font-bold text-[#FAFAFA]">Ready to build with us?</h2>
          <p className="mt-2 text-sm text-[#A1A1AA]">
            Get a tailored architecture proposal for your team.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#3B82F6] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2563EB]"
          >
            Start Your Project Blueprint
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
