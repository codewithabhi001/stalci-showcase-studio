import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "./Brand";
import { useScrollReveal } from "@/lib/animations";
import { posts as staticPosts, type Post } from "@/lib/blog-data";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "@/lib/api";

export function Insights() {
  const headingRef = useScrollReveal();

  const { data: apiBlogs } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  const blogs: Post[] =
    apiBlogs && apiBlogs.length > 0
      ? apiBlogs.map((b: any) => ({
          slug: b.slug,
          title: b.title,
          excerpt: b.excerpt || "",
          category: "Engineering" as const,
          readingTime: `${Math.max(3, Math.ceil((b.content || "").split(/\s+/).length / 200))} min read`,
          date: b.publishedAt || b.createdAt || "",
          author: b.author || "STALCI Engineering",
          body: (b.content || "").split("\n\n").filter(Boolean),
        }))
      : staticPosts;

  const latest = blogs.slice(0, 3);

  return (
    <section id="blog" className="relative bg-[#F8FAFC] py-24 sm:py-32 text-slate-900 border-t border-slate-200">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div ref={headingRef}>
          <SectionHeading
            eyebrow="Blog & Technical Insights"
            title="Insights From Our Core Architects"
            subtitle="Deep dives into zero-trust meshes, distributed LLM orchestration, and resilient cloud architectures."
            tone="light"
          />
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {latest.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="flex flex-col rounded-2xl border border-slate-200/90 bg-white p-6 transition-all duration-300 hover:border-amber-500/70 hover:shadow-lg group"
            >
              <span className="text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-amber-700">
                {p.category}
              </span>
              <h3 className="mt-3 text-base font-bold leading-snug text-slate-900 group-hover:text-amber-700 transition-colors">
                {p.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{p.excerpt}</p>
              <span className="mt-4 text-xs text-slate-400 font-mono font-semibold">{p.readingTime}</span>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-800 transition-colors"
          >
            Explore all articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
