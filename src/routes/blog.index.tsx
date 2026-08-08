import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SectionHeading } from "@/components/site/Brand";
import { posts } from "@/lib/blog-data";
import { ArrowRight } from "lucide-react";

const title = "Blog & News — STALCI Engineering Insights";
const description =
  "Deep dives on AI systems, cloud platform engineering, cyber security and modernising enterprise software, written by the STALCI team.";

export const Route = createFileRoute("/blog/")({
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
  component: BlogIndex,
});

function BlogIndex() {
  const featured = posts[0]!;
  const rest = posts.slice(1);


  return (
    <div className="min-h-screen bg-background">
      <Nav solid />
      <main className="pb-24 pt-28">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Blog & News"
            title="Engineering notes from the field"
            subtitle="Practical writing on AI systems, cloud platforms, security and enterprise delivery."
            align="left"
          />

          <Link
            to="/blog/$slug"
            params={{ slug: featured.slug }}
            className="mt-12 block rounded-3xl border border-border bg-card p-7 transition-colors hover:border-copper/50 sm:p-10"
          >
            <span className="eyebrow text-copper">{featured.category} · Featured</span>
            <h2 className="mt-3 text-xl font-semibold text-ink sm:text-2xl">{featured.title}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {featured.excerpt}
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-copper">
              Read article <ArrowRight className="h-4 w-4" />
            </span>
          </Link>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
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
                <span className="mt-4 text-xs text-muted-foreground">
                  {new Date(p.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  · {p.readingTime}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
