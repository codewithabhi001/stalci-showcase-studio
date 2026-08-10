"use client";
import { useQuery } from "@tanstack/react-query";
import CrudTable from "@/components/CrudTable";
import { fetchFeedbacks, deleteFeedback } from "@/lib/api";

export default function FeedbackAdmin() {
  const { data = [], isLoading } = useQuery({ queryKey: ["feedbacks"], queryFn: fetchFeedbacks });

  return (
    <CrudTable
      title="Client Reviews & Feedback"
      queryKey="feedbacks"
      data={data}
      isLoading={isLoading}
      columns={[
        { key: "name", label: "Client / Partner", render: (v: string) => v || "Anonymous Partner" },
        { key: "rating", label: "Rating", render: (v: number) => "⭐".repeat(v || 5) },
        { key: "comments", label: "Review / Comments" },
        { key: "createdAt", label: "Received Date", render: (v: string) => new Date(v).toLocaleDateString() },
      ]}
      onDelete={deleteFeedback}
    />
  );
}
