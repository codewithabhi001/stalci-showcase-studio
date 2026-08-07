import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./Brand";
import { useStaggerReveal } from "@/lib/animations";
import { products } from "@/lib/site-data";

export function Products() {
  const gridRef = useStaggerReveal({ stagger: 0.08, y: 30 });

  return (
    <section id="products" className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Our products"
          title="Platforms we build and run ourselves"
          subtitle="Four products born out of client engagements — now available as licensed platforms."
        />

        <div ref={gridRef} className="mt-12 grid gap-5 sm:grid-cols-2">
          {products.map((p) => (
            <Link
              key={p.slug}
              to="/products/$slug"
              params={{ slug: p.slug }}
              className="group flex flex-col rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-copper/50"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-ink">
                  <p.icon className="h-5 w-5 text-copper" strokeWidth={1.5} />
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-copper" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
              <p className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-copper-deep">
                {p.tag}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
              <ul className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
                {p.capabilities.slice(0, 3).map((c) => (
                  <li
                    key={c.title}
                    className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {c.title}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
