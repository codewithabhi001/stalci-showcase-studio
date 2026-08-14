import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
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
    <section id="blog" className="relative bg-white py-24 sm:py-32 text-slate-900 border-t border-slate-200 overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 lg:px-8 relative z-10">
        <div ref={headingRef}>
          <SectionHeading
            eyebrow="Blog & Technical Insights"
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
              className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-[#F8FAFC] p-7 shadow-2xs transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D89B5B]/80 hover:shadow-xl hover:bg-white group"
            >
              <div>
                <span className="inline-flex items-center gap-1.5 text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#9E6229]">
                  <BookOpen className="h-3 w-3" />
                  {p.category}
                </span>
                <h3 className="mt-3.5 text-lg font-bold leading-snug text-slate-950 group-hover:text-[#9E6229] transition-colors">
                  {p.title}
                </h3>
                <p className="mt-2.5 flex-1 text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-3">
                  {p.excerpt}
                </p>
              </div>

              <div className="mt-7 pt-4 border-t border-slate-200/70 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 font-mono font-medium">
                  <Clock className="h-3 w-3 text-[#9E6229]" />
                  {p.readingTime}
                </span>
                <span className="text-xs font-black text-[#9E6229] group-hover:text-slate-950 inline-flex items-center gap-1">
                  Read Article <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3 text-xs font-bold text-slate-800 shadow-2xs hover:bg-[#F8FAFC] hover:border-[#D89B5B]/80 hover:text-[#9E6229] transition-all"
          >
            <span>Explore All Engineering Publications</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
