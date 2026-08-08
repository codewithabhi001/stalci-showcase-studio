"use client";
import { useQuery } from "@tanstack/react-query";
import CrudTable from "@/components/CrudTable";
import { fetchJobs, createJob, updateJob, deleteJob } from "@/lib/api";

export default function JobsAdmin() {
  const { data = [], isLoading } = useQuery({ queryKey: ["jobs"], queryFn: fetchJobs });

  return (
    <CrudTable
      title="Jobs Management"
      queryKey="jobs"
      data={data}
      isLoading={isLoading}
      columns={[
        { key: "title", label: "Position" },
        { key: "location", label: "Location" },
        { key: "type", label: "Type", render: (v: string) => <span className="px-2 py-1 text-xs rounded-full" style={{ background: "rgba(216,155,91,0.1)", color: "var(--copper-soft)" }}>{v}</span> },
        { key: "isActive", label: "Status", render: (v: boolean) => <span className="px-2 py-1 text-xs rounded-full" style={{ background: v ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)", color: v ? "#22c55e" : "#ef4444" }}>{v ? "Active" : "Closed"}</span> },
        { key: "applications", label: "Applicants", render: (_: any, row: any) => <span>{row.applications?.length || 0}</span> },
      ]}
      formFields={[
        { key: "title", label: "Job Title" },
        { key: "location", label: "Location" },
        { key: "type", label: "Type", type: "select", options: ["Full-time", "Part-time", "Contract", "Internship"] },
        { key: "description", label: "Description", type: "textarea" },
        { key: "requirements", label: "Requirements", type: "textarea" },
        { key: "isActive", label: "Active", type: "checkbox" },
      ]}
      onCreate={createJob}
      onUpdate={updateJob}
      onDelete={deleteJob}
    />
  );
}
