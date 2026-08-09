"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchSiteConfig, updateSiteConfig } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { EmptyState, Skeleton } from "@/components/ui/states";
import { useToast } from "@/components/ui/toast";
import { Settings2 } from "lucide-react";

export default function SettingsPage() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const { data: configs = [], isLoading } = useQuery({ queryKey: ["config"], queryFn: fetchSiteConfig });
  const [editKey, setEditKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const updateMut = useMutation({
    mutationFn: ({ key, value }: { key: string; value: string }) => updateSiteConfig(key, value),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["config"] });
      setEditKey(null);
      toast({ title: "Setting saved", description: "Changes are live on the portfolio.", variant: "success" });
    },
    onError: (e: any) => toast({ title: "Save failed", description: e?.message ?? "Please try again.", variant: "error" }),
  });

  return (
    <div className="animate-fade-up space-y-6">
      <div>
        <p className="eyebrow">System</p>
        <h1 className="mt-1.5 text-[26px] font-semibold leading-tight text-ink">Site configuration</h1>
        <p className="mt-1.5 max-w-xl text-[13px] leading-relaxed text-muted">
          Global variables loaded by the public portfolio — contact details, office locations and social profiles.
        </p>
      </div>

      <div className="card overflow-hidden">
        {isLoading ? (
          <div className="divide-y divide-line">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between gap-6 px-5 py-5">
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-2.5 w-28" />
                  <Skeleton className="h-3.5 w-56" />
                </div>
                <Skeleton className="h-8 w-16" />
              </div>
            ))}
          </div>
        ) : configs.length === 0 ? (
          <EmptyState icon={Settings2} title="No settings defined" message="Configuration keys created in the backend will appear here." />
        ) : (
          <div className="divide-y divide-line">
            {configs.map((c: any) => (
              <div key={c.key} className="flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 flex-1">
                  <p className="eyebrow">{c.key}</p>
                  {editKey === c.key ? (
                    <input
                      autoFocus
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      aria-label={`Value for ${c.key}`}
                      className="field mt-2 sm:max-w-md"
                    />
                  ) : (
                    <p className="mt-1.5 truncate text-[13.5px] text-ink-2">{c.value || "—"}</p>
                  )}
                </div>
                {editKey === c.key ? (
                  <div className="flex shrink-0 gap-2">
                    <Button size="sm" loading={updateMut.isPending} onClick={() => updateMut.mutate({ key: c.key, value: editValue })}>
                      Save
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => setEditKey(null)}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="shrink-0"
                    onClick={() => {
                      setEditKey(c.key);
                      setEditValue(c.value ?? "");
                    }}
                  >
                    Edit
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
