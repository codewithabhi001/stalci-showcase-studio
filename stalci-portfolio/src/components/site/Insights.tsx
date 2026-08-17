import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "@/lib/api";
import { posts as staticPosts, type Post } from "@/lib/blog-data";

export function Insights() {
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
          date: b.publishedAt || b.createdAt || "Recent",
          author: b.author || "STALCI Engineering",
          body: (b.content || "").split("\n\n").filter(Boolean),
        }))
      : staticPosts;

  const cards = [
    {
      slug: blogs[0]?.slug || "generative-ai-development-cost",
      title: "Generative AI Development Cost: Model Choice and Hosting",
      coverTitle: "Generative AI Development Cost",
      category: "AI ENGINEERING",
      readTime: "6 min read",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&auto=format&fit=crop&q=80",
    },
    {
      slug: blogs[1]?.slug || "what-is-generative-ai-for-business",
      title: "What Is Generative AI and How It Works for Business",
      coverTitle: "Generative AI & Enterprise Value",
      category: "FOUNDATIONAL AI",
      readTime: "5 min read",
      imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section id="blog" className="relative bg-[#FFFFFF] py-16 sm:py-24 text-black border-t border-zinc-200/90">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ─── Header Section (Screenshot 4 Match) ─── */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <h2 className="font-display text-2xl sm:text-3xl md:text-[34px] font-bold text-zinc-950 tracking-tight leading-[1.2]">
            Dispatches from the <span className="font-extrabold text-black">Digital Frontier</span>
          </h2>

          <p className="text-xs sm:text-[14px] text-zinc-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Engineering deep dives, AI guides, and the kind of build notes we wish we had when we started. Mostly written for technical leaders making the next call.
          </p>
        </div>

        {/* ─── 2 Large Side-by-Side Cards (Screenshot 4 Match) ─── */}
        <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
          {cards.map((card) => (
            <Link
              key={card.slug}
              to="/blog/$slug"
              params={{ slug: card.slug }}
              className="group block rounded-3xl border border-zinc-200 bg-white p-4 sm:p-5 shadow-xs hover:border-zinc-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Dark Branded Graphic Top Banner */}
              <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-[#070A12] border border-zinc-800 p-6 flex flex-col justify-between">
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-luminosity group-hover:scale-105 group-hover:opacity-50 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-[#070A12]/60 to-transparent" />

                {/* Top: STALCI Wordmark & Logo */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-md bg-white text-black font-black text-[11px] flex items-center justify-center font-mono">
                      S
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                      STALCI
                    </span>
                  </div>
                  <span className="text-[10px] font-mono uppercase font-bold text-zinc-400 bg-zinc-900/80 border border-zinc-700/60 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                    {card.readTime}
                  </span>
                </div>

                {/* Graphic Title */}
                <div className="relative z-10">
                  <h4 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                    {card.coverTitle}
                  </h4>
                  <div className="mt-3 h-1 w-10 bg-blue-500 rounded-full" />
                </div>
              </div>

              {/* Bottom Clean Headline */}
              <div className="p-4 pt-5">
                <h3 className="text-base sm:text-lg font-bold text-zinc-950 tracking-tight leading-snug group-hover:text-blue-600 transition-colors">
                  {card.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-6 py-2.5 text-xs font-bold text-zinc-950 hover:bg-zinc-100 transition-all shadow-2xs"
          >
            <span>Explore All Engineering Notes</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
