"use client";
import { useQuery } from "@tanstack/react-query";
import CrudTable from "@/components/CrudTable";
import { Badge } from "@/components/ui/badge";
import { fetchJobs, createJob, updateJob, deleteJob } from "@/lib/api";

export default function JobsAdmin() {
  const { data = [], isLoading } = useQuery({ queryKey: ["jobs"], queryFn: fetchJobs });

  return (
    <CrudTable
      title="Jobs & Applicants"
      description="Publish open roles and monitor applicant volume."
      queryKey="jobs"
      data={data}
      isLoading={isLoading}
      columns={[
        { key: "title", label: "Position" },
        { key: "location", label: "Location" },
        { key: "type", label: "Type", render: (v: string) => <Badge tone="accent">{v}</Badge> },
        { key: "isActive", label: "Status", render: (v: boolean) => <Badge tone={v ? "success" : "danger"}>{v ? "Active" : "Closed"}</Badge> },
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
