import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { getPost, posts as staticPosts } from "@/lib/blog-data";
import { ArrowLeft, Clock, User, Calendar, Share2, ArrowRight } from "lucide-react";
import { fetchBlogBySlug, fetchBlogs } from "@/lib/api";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    try {
      const post = await fetchBlogBySlug(params.slug);
      return {
        post: {
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt || "",
          category: post.category || "Engineering",
          date: post.publishedAt || post.createdAt || new Date().toISOString(),
          readingTime: post.readTime || `${Math.max(3, Math.ceil((post.content || "").split(/\s+/).length / 200))} min read`,
          author: post.author || "STALCI Engineering",
          body: (post.content || "").split("\n\n").filter(Boolean),
        },
      };
    } catch {
      const post = getPost(params.slug);
      if (!post) throw notFound();
      return { post };
    }
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Article not found — STALCI" }, { name: "robots", content: "noindex" }],
      };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} — STALCI Blog` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: PostNotFound,
  component: BlogPost,
});

function PostNotFound() {
  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <Nav solid />
      <main className="mx-auto max-w-3xl px-5 pb-24 pt-40 text-center">
        <h1 className="text-2xl font-bold text-white">Article not found</h1>
        <p className="mt-2 text-sm text-neutral-400">The requested engineering paper does not exist or has been archived.</p>
        <Link to="/blog" className="mt-6 inline-block rounded-xl bg-copper px-5 py-2.5 text-sm font-bold text-black shadow-md hover:bg-copper-soft transition-colors">
          Back to all articles
        </Link>
      </main>
      <Footer />
    </div>
  );
}

function BlogPost() {
  const { post } = Route.useLoaderData();
  const related = staticPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <Nav solid />

      {/* Header Banner */}
      <div className="bg-[#000000] text-white pt-32 pb-20 border-b border-white/10">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-copper hover:text-copper-soft transition-colors mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to all articles
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-copper bg-copper/10 border border-copper/30 px-3 py-0.5 rounded-full">
              {post.category}
            </span>
            <span className="text-xs text-neutral-400 font-mono flex items-center gap-1">
              <Clock className="h-3 w-3" /> {post.readingTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-neutral-400 border-t border-white/10 pt-4">
            <span className="font-semibold text-neutral-200 flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-copper" /> {post.author}
            </span>
            <span>•</span>
            <span className="font-mono">
              Published {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <main className="py-16 sm:py-24">
        <article className="mx-auto max-w-4xl px-5 lg:px-8">
          <div className="rounded-3xl bg-[#0A0A0A] border border-white/10 shadow-xl p-8 sm:p-12 space-y-6">
            {post.body.map((para: string, i: number) => {
              if (para.startsWith("### ")) {
                return (
                  <h3 key={i} className="text-xl sm:text-2xl font-bold text-white pt-4 pb-1 border-b border-white/10">
                    {para.replace("### ", "")}
                  </h3>
                );
              }
              return (
                <p key={i} className="text-base leading-relaxed text-neutral-300">
                  {para}
                </p>
              );
            })}

            {/* CTA Box */}
            <div className="mt-12 rounded-2xl bg-gradient-to-br from-[#121212] to-[#0A0A0A] border border-white/15 text-white p-7 sm:p-9 shadow-lg">
              <h3 className="text-lg font-bold text-white">Engineering a Mission-Critical Architecture?</h3>
              <p className="mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                STALCI's principal engineers and SRE architects can review your current technical topology and outline an actionable delivery plan.
              </p>
              <a
                href="/#contact"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-copper hover:bg-copper-soft px-5 py-2.5 text-xs font-bold text-black transition-all shadow-md"
              >
                Schedule Technical Review <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-16">
            <h2 className="text-lg font-bold text-white mb-6">Related Technical Papers</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="rounded-2xl border border-white/10 bg-[#0D0D0D] p-5 shadow-sm transition-all hover:border-copper/40 hover:bg-[#121212]"
                >
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-copper">
                    {p.category}
                  </span>
                  <h4 className="mt-2 text-sm font-bold leading-snug text-white line-clamp-2">
                    {p.title}
                  </h4>
                  <span className="mt-3 text-xs text-neutral-400 font-mono block">{p.readingTime}</span>
                </Link>
              ))}
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
