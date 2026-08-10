"use client";
import { useQuery } from "@tanstack/react-query";
import CrudTable from "@/components/CrudTable";
import { fetchBlogs, createBlog, updateBlog, deleteBlog } from "@/lib/api";
import { ExternalLink, BookOpen } from "lucide-react";

export default function BlogsAdmin() {
  const { data = [], isLoading } = useQuery({ queryKey: ["blogs"], queryFn: fetchBlogs });

  return (
    <CrudTable
      title="Engineering Publications & Blogs"
      description="Publish, curate, and edit deep-dive technical articles."
      queryKey="blogs"
      data={data}
      isLoading={isLoading}
      columns={[
        { key: "title", label: "Title" },
        {
          key: "slug",
          label: "Slug",
          render: (v: string) => (
            <code className="rounded-md bg-surface-2 px-2 py-1 font-mono text-[12px] text-muted">
              {v}
            </code>
          ),
        },
        { key: "author", label: "Author" },
        {
          key: "liveView",
          label: "Live Article",
          render: (_: any, row: any) => (
            <a
              href={`http://localhost:8080/blog/${row.slug}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-line bg-canvas text-xs font-semibold text-copper hover:bg-copper/10 transition-colors"
            >
              <ExternalLink className="h-3 w-3" /> View Live
            </a>
          ),
        },
        {
          key: "publishedAt",
          label: "Published",
          render: (v: string) => (v ? new Date(v).toLocaleDateString() : "Draft"),
        },
      ]}
      formFields={[
        { key: "title", label: "Article Title" },
        { key: "slug", label: "URL Slug" },
        { key: "category", label: "Category (e.g. Artificial Intelligence, Cloud Engineering)" },
        { key: "excerpt", label: "Summary Excerpt", type: "textarea" },
        { key: "content", label: "Full Article Content (Markdown format)", type: "textarea" },
        { key: "author", label: "Author Byline" },
        { key: "readTime", label: "Read Time (e.g. 6 min read)" },
        { key: "imageUrl", label: "Featured Image URL" },
        { key: "publishedAt", label: "Publish Date", type: "date" },
      ]}
      onCreate={createBlog}
      onUpdate={updateBlog}
      onDelete={deleteBlog}
    />
  );
}
