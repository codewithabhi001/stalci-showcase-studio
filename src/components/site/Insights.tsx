import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "./Brand";
import { useScrollReveal } from "@/lib/animations";
import { posts } from "@/lib/blog-data";

export function Insights() {
  const headingRef = useScrollReveal();
  const latest = posts.slice(0, 3);

  return (
    <section id="blog" className="relative bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div ref={headingRef}>
          <SectionHeading
            eyebrow="Blog & News"
            title="Insights from our engineers"
            subtitle="What we are learning building AI, cloud and security platforms for enterprise clients."
          />
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {latest.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-copper/50"
            >
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-copper">
                {p.category}
              </span>
              <h3 className="mt-3 text-base font-semibold leading-snug text-ink">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {p.excerpt}
              </p>
              <span className="mt-4 text-xs text-muted-foreground">{p.readingTime}</span>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-copper/60 hover:text-copper"
          >
            All articles <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-ink"
            style={{ background: "var(--gradient-copper)" }}
          >
            We are hiring <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
