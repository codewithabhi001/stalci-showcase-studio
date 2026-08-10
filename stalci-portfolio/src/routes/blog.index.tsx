import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SectionHeading } from "@/components/site/Brand";
import { posts as fallbackPosts } from "@/lib/blog-data";
import { ArrowRight, BookOpen, Clock, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "@/lib/api";

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
  const { data: apiBlogs, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  const blogs =
    apiBlogs && apiBlogs.length > 0
      ? apiBlogs.map((b: any) => ({
          slug: b.slug,
          title: b.title,
          excerpt: b.excerpt || "",
          category: b.category || "Engineering",
          readingTime: b.readTime || `${Math.max(3, Math.ceil((b.content || "").split(/\s+/).length / 200))} min read`,
          date: b.publishedAt || b.createdAt || new Date().toISOString(),
          author: b.author || "STALCI Engineering",
          imageUrl: b.imageUrl,
        }))
      : fallbackPosts;

  const featured = blogs[0];
  const rest = blogs.slice(1);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <Nav solid />

      {/* Header Banner */}
      <div className="bg-[#080A0F] text-white pt-32 pb-20 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <BookOpen className="h-3.5 w-3.5" />
            STALCI Engineering Publications
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Engineering Insights & Deep Dives
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Practical writing on deterministic AI agents, multi-cloud kernel telemetry, zero-trust identity meshes, and enterprise systems engineering.
          </p>
        </div>
      </div>

      <main className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          {/* Featured Article */}
          {featured && (
            <Link
              to="/blog/$slug"
              params={{ slug: featured.slug }}
              className="group block rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-10 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-amber-500/70"
            >
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                  {featured.category} · Featured
                </span>
                <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {featured.readingTime}
                </span>
              </div>
              <h2 className="mt-4 text-xl sm:text-3xl font-extrabold text-slate-950 group-hover:text-amber-700 transition-colors leading-tight">
                {featured.title}
              </h2>
              <p className="mt-3 max-w-3xl text-sm sm:text-base leading-relaxed text-slate-600">
                {featured.excerpt}
              </p>
              <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-amber-600" /> {featured.author}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-700 group-hover:translate-x-1 transition-transform">
                  Read full paper <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          )}

          {/* Grid of Other Articles */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p: any) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-amber-500/70"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                      {p.category}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">{p.readingTime}</span>
                  </div>
                  <h3 className="mt-4 text-base font-bold leading-snug text-slate-950 group-hover:text-amber-700 transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-3">
                    {p.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="truncate max-w-[150px] font-medium">{p.author}</span>
                  <span className="font-mono">
                    {new Date(p.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
