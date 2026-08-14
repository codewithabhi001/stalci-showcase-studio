import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { getPost, posts as staticPosts } from "@/lib/blog-data";
import { ArrowLeft, Clock, User, Calendar, Share2, ArrowRight, Sparkles } from "lucide-react";
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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <Nav solid />
      <main className="mx-auto max-w-3xl px-5 pb-24 pt-40 text-center">
        <h1 className="text-3xl font-extrabold text-slate-950">Article not found</h1>
        <p className="mt-3 text-sm text-slate-600">The requested engineering paper does not exist or has been archived.</p>
        <Link to="/blog" className="mt-6 inline-block rounded-xl bg-slate-900 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-amber-600 transition-colors">
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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <Nav solid />

      {/* Header Banner */}
      <div className="relative bg-white pt-32 pb-20 sm:pt-36 sm:pb-24 border-b border-slate-200 overflow-hidden">
        <div className="grid-lines-light absolute inset-0 opacity-60 pointer-events-none" />

        <div className="mx-auto max-w-4xl px-5 lg:px-8 relative z-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.2em] text-amber-700 hover:text-slate-950 transition-colors mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to all articles
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-amber-800 bg-amber-50 border border-amber-200 px-3 py-0.5 rounded-full">
              {post.category}
            </span>
            <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
              <Clock className="h-3 w-3 text-amber-600" /> {post.readingTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-500 border-t border-slate-100 pt-4 font-mono">
            <span className="font-semibold text-slate-800 flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-amber-600" /> {post.author}
            </span>
            <span>•</span>
            <span>
              Published {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <main className="py-16 sm:py-24">
        <article className="mx-auto max-w-4xl px-5 lg:px-8">
          <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm p-8 sm:p-12 space-y-6">
            {post.body.map((para: string, i: number) => {
              if (para.startsWith("### ")) {
                return (
                  <h3 key={i} className="text-xl sm:text-2xl font-bold text-slate-950 pt-6 pb-2 border-b border-slate-100">
                    {para.replace("### ", "")}
                  </h3>
                );
              }
              return (
                <p key={i} className="text-base leading-relaxed text-slate-700 font-normal">
                  {para}
                </p>
              );
            })}

            {/* CTA Box */}
            <div className="mt-12 rounded-2xl bg-slate-900 text-white p-7 sm:p-9 shadow-lg">
              <h3 className="text-lg sm:text-xl font-bold text-white">Engineering a Mission-Critical Architecture?</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                STALCI's principal engineers and SRE architects can review your current technical topology and outline an actionable delivery plan.
              </p>
              <a
                href="/#contact"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 px-6 py-2.5 text-xs font-bold text-slate-950 transition-all shadow-md cursor-pointer"
              >
                <span>Schedule Technical Review</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-16">
            <h2 className="text-lg font-bold text-slate-950 mb-6">Related Technical Papers</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs transition-all hover:border-amber-500/60 hover:shadow-md hover:-translate-y-1"
                >
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-amber-700">
                    {p.category}
                  </span>
                  <h4 className="mt-2 text-sm font-bold leading-snug text-slate-950 line-clamp-2">
                    {p.title}
                  </h4>
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
