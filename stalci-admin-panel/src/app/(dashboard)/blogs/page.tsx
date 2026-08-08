"use client";
import { useQuery } from "@tanstack/react-query";
import CrudTable from "@/components/CrudTable";
import { fetchBlogs, createBlog, updateBlog, deleteBlog } from "@/lib/api";

export default function BlogsAdmin() {
  const { data = [], isLoading } = useQuery({ queryKey: ["blogs"], queryFn: fetchBlogs });

  return (
    <CrudTable
      title="Blogs Management"
      queryKey="blogs"
      data={data}
      isLoading={isLoading}
      columns={[
        { key: "title", label: "Title" },
        { key: "slug", label: "Slug", render: (v: string) => <code className="text-xs px-2 py-1 rounded" style={{ background: "rgba(255,255,255,0.05)" }}>{v}</code> },
        { key: "author", label: "Author" },
        { key: "publishedAt", label: "Published", render: (v: string) => v ? new Date(v).toLocaleDateString() : "Draft" },
      ]}
      formFields={[
        { key: "title", label: "Title" },
        { key: "slug", label: "Slug" },
        { key: "excerpt", label: "Excerpt" },
        { key: "content", label: "Content", type: "textarea" },
        { key: "author", label: "Author" },
        { key: "imageUrl", label: "Image URL" },
        { key: "publishedAt", label: "Publish Date", type: "date" },
      ]}
      onCreate={createBlog}
      onUpdate={updateBlog}
      onDelete={deleteBlog}
    />
  );
}
