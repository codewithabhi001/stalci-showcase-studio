"use client";
import { useQuery } from "@tanstack/react-query";
import CrudTable from "@/components/CrudTable";
import { fetchFeedbacks, deleteFeedback } from "@/lib/api";

export default function FeedbackAdmin() {
  const { data = [], isLoading } = useQuery({ queryKey: ["feedbacks"], queryFn: fetchFeedbacks });

  return (
    <CrudTable
      title="Feedback"
      queryKey="feedbacks"
      data={data}
      isLoading={isLoading}
      columns={[
        { key: "rating", label: "Rating", render: (v: number) => "⭐".repeat(v) },
        { key: "comments", label: "Comments" },
        { key: "createdAt", label: "Date", render: (v: string) => new Date(v).toLocaleDateString() },
      ]}
      onDelete={deleteFeedback}
    />
  );
}
