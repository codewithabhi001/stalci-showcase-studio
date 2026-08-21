import { BLOGS_DATA } from "@/data/site-data";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
  date: string;
  author: string;
  content: string;
}

export const posts: BlogPost[] = Object.values(BLOGS_DATA).map((b) => ({
  slug: b.slug,
  title: b.title,
  excerpt: b.summary,
  category: b.category,
  readingTime: b.readTime,
  date: b.publishedAt,
  author: b.author.name,
  content: b.content,
}));

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
