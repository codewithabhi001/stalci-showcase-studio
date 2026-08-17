import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen } from "lucide-react";
import { SectionHeading } from "@/components/brand/Brand";
import { posts as blogPosts } from "@/lib/blog-data";

export function Insights() {
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <section id="insights" className="bg-[#FFFFFF] py-14 sm:py-20 text-black border-t border-zinc-200/90 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tone="light"
          eyebrow="Architectural Thought Leadership"
          title="Engineering Insights &amp; Publications"
          subtitle="Deep technical essays, system design teardowns, and sovereign AI research from our principal engineers."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPosts.map((post) => (
            <div
              key={post.slug}
              className="group rounded-3xl bg-[#FAFAFC] border border-zinc-200/90 p-5 sm:p-6 shadow-2xs hover:border-zinc-400 hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700 font-semibold border border-zinc-200">
                    {post.category}
                  </span>
                  <span>{post.readingTime}</span>
                </div>

                <h3 className="font-display text-base font-bold text-zinc-950 group-hover:text-black transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="mt-2 text-xs text-zinc-600 leading-relaxed font-normal line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-200/80 flex items-center justify-between">
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="text-xs font-bold text-zinc-900 group-hover:text-black flex items-center gap-1.5 transition-colors"
                >
                  <span>Read Publication</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <BookOpen className="h-3.5 w-3.5 text-zinc-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
