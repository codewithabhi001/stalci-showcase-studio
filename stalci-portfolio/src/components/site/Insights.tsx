import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Clock, User, Sparkles } from "lucide-react";
import { SectionHeading, BadgePill } from "./Brand";
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
    <section id="blog" className="relative bg-white py-16 sm:py-24 text-slate-900 border-t border-slate-200/90 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={headingRef}>
          <SectionHeading
            eyebrow="Blog &amp; Technical Insights"
            title="Insights From Our Core Architects"
            subtitle="Deep dives into zero-trust meshes, distributed LLM orchestration, and resilient cloud architectures."
            tone="light"
          />
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {latest.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/30 p-6 sm:p-7 transition-all duration-300 hover:border-slate-400 hover:shadow-lg shadow-2xs hover:-translate-y-1 overflow-hidden"
            >
              {/* Top Dark Hover Line */}
              <div className="absolute top-0 left-6 right-6 h-[2px] bg-slate-900 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Category Pill + Icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-300 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-900 shadow-2xs">
                    <BookOpen className="h-3 w-3 text-slate-900" />
                    {p.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                    <Clock className="h-3 w-3 text-slate-400" />
                    {p.readingTime}
                  </span>
                </div>

                {/* Article Title */}
                <h3 className="text-base sm:text-lg font-bold leading-snug text-slate-900 group-hover:text-slate-950 transition-colors">
                  {p.title}
                </h3>
                <p className="mt-2.5 flex-1 text-xs sm:text-[13px] leading-relaxed text-slate-600 font-normal line-clamp-3">
                  {p.excerpt}
                </p>
              </div>

              {/* Author & Footer Action */}
              <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white font-bold text-[10px]">
                    <User className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-[11.5px] font-semibold text-slate-800">{p.author}</span>
                </div>
                
                <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-7 py-3 text-xs font-bold text-white hover:bg-slate-800 transition-all shadow-md hover:scale-[1.02] cursor-pointer group"
          >
            <span>Explore All Technical Articles</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
