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
    <section id="blog" className="relative bg-[#F8FAFC] py-20 sm:py-28 text-slate-900 border-t border-slate-200/80">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div ref={headingRef}>
          <SectionHeading
            eyebrow="Blog & Technical Insights"
            title="Insights From Our Core Architects"
            subtitle="Deep dives into zero-trust meshes, distributed LLM orchestration, and resilient cloud architectures."
            tone="light"
          />
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {latest.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:border-slate-400 hover:shadow-xs group"
            >
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                {p.category}
              </span>
              <h3 className="mt-2 text-sm font-bold leading-snug text-slate-900 group-hover:text-slate-700 transition-colors">
                {p.title}
              </h3>
              <p className="mt-1.5 flex-1 text-xs leading-relaxed text-slate-600 line-clamp-3">{p.excerpt}</p>
              <span className="mt-3 text-[11px] text-slate-400 font-mono">{p.readingTime}</span>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-slate-600 transition-colors"
          >
            Explore all technical articles <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
