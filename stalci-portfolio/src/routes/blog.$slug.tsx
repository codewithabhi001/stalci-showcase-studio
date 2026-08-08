import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { getPost, posts as staticPosts } from "@/lib/blog-data";
import { ArrowLeft } from "lucide-react";
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
          category: "Engineering",
          date: post.publishedAt || post.createdAt,
          readingTime: `${Math.max(3, Math.ceil((post.content || "").split(/\s+/).length / 200))} min read`,
          author: post.author || "STALCI Engineering",
          body: (post.content || "").split("\n\n").filter(Boolean),
        }
      };
    } catch {
      // Fallback to static post if backend fails or is offline
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
    <div className="min-h-screen bg-background">
      <Nav solid />
      <main className="mx-auto max-w-3xl px-5 pb-24 pt-40 text-center">
        <h1 className="text-2xl font-semibold text-ink">Article not found</h1>
        <Link to="/blog" className="mt-6 inline-block text-sm font-semibold text-copper">
          Back to all articles
        </Link>
      </main>
      <Footer />
    </div>
  );
}

function BlogPost() {
  const { post } = Route.useLoaderData();
  
  // Try to load posts from static list for sidebar, or map dynamically
  const related = staticPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Nav solid />
      <main className="pb-24 pt-28">
        <article className="mx-auto max-w-3xl px-5 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-copper"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All articles
          </Link>

          <h1 className="mt-6 text-2xl font-semibold leading-tight text-ink sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            {post.author} ·{" "}
            {new Date(post.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            · {post.readingTime} · {post.category}
          </p>

          <div className="mt-8 h-px w-full bg-border" />

          <div className="mt-8 space-y-5">
            {post.body.map((para: string, i: number) => (
              <p key={i} className="text-[0.95rem] leading-relaxed text-ink-soft">
                {para}
              </p>
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-border bg-card p-7">
            <h2 className="text-base font-semibold text-ink">Working on something similar?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Our architects can review your current setup and outline a delivery plan.
            </p>
            <a
              href="/#contact"
              className="mt-4 inline-flex rounded-full px-5 py-2.5 text-sm font-semibold text-ink"
              style={{ background: "var(--gradient-copper)" }}
            >
              Talk to STALCI
            </a>
          </div>

          <h2 className="mt-16 text-sm font-semibold uppercase tracking-[0.18em] text-copper">
            More reading
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-copper/50"
              >
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-copper">
                  {p.category}
                </span>
                <h3 className="mt-2 text-sm font-semibold leading-snug text-ink">{p.title}</h3>
              </Link>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
