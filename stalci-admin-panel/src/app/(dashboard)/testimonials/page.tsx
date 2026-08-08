"use client";
import { useQuery } from "@tanstack/react-query";
import CrudTable from "@/components/CrudTable";
import { fetchTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from "@/lib/api";

export default function TestimonialsAdmin() {
  const { data = [], isLoading } = useQuery({ queryKey: ["testimonials"], queryFn: fetchTestimonials });

  return (
    <CrudTable
      title="Testimonials Management"
      queryKey="testimonials"
      data={data}
      isLoading={isLoading}
      columns={[
        { key: "clientName", label: "Client" },
        { key: "company", label: "Company" },
        { key: "rating", label: "Rating", render: (v: number) => "⭐".repeat(v) },
        { key: "quote", label: "Quote", render: (v: string) => <span className="truncate block max-w-xs">{v}</span> },
      ]}
      formFields={[
        { key: "clientName", label: "Client Name" },
        { key: "company", label: "Company" },
        { key: "quote", label: "Quote", type: "textarea" },
        { key: "rating", label: "Rating (1-5)", type: "number" },
      ]}
      onCreate={createTestimonial}
      onUpdate={updateTestimonial}
      onDelete={deleteTestimonial}
    />
  );
}
