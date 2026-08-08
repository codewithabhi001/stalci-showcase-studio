"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchSiteConfig, updateSiteConfig } from "@/lib/api";
import { useState } from "react";

export default function SettingsPage() {
  const qc = useQueryClient();
  const { data: configs = [], isLoading } = useQuery({ queryKey: ["config"], queryFn: fetchSiteConfig });
  const [editKey, setEditKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const updateMut = useMutation({
    mutationFn: ({ key, value }: { key: string; value: string }) => updateSiteConfig(key, value),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["config"] }); setEditKey(null); },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Site Configuration</h1>
      <p style={{ color: "rgba(255,255,255,0.4)" }}>Manage global settings for your Stalci portfolio.</p>

      <div className="rounded-2xl p-6" style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.08)" }}>
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "var(--copper)", borderTopColor: "transparent" }} />
          </div>
        ) : (
          <div className="space-y-4">
            {configs.map((c: any) => (
              <div key={c.key} className="flex items-center justify-between py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>{c.key}</p>
                  {editKey === c.key ? (
                    <input autoFocus value={editValue} onChange={(e) => setEditValue(e.target.value)} className="px-3 py-2 rounded-lg text-sm" style={{ background: "rgba(255,255,255,0.05)", color: "white", border: "1px solid rgba(255,255,255,0.15)" }} />
                  ) : (
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>{c.value}</p>
                  )}
                </div>
                {editKey === c.key ? (
                  <div className="flex gap-2">
                    <button onClick={() => updateMut.mutate({ key: c.key, value: editValue })} className="px-4 py-2 rounded-lg text-xs font-semibold" style={{ background: "var(--gradient-copper)", color: "var(--ink)" }}>
                      {updateMut.isPending ? "..." : "Save"}
                    </button>
                    <button onClick={() => setEditKey(null)} className="px-4 py-2 rounded-lg text-xs" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)" }}>Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => { setEditKey(c.key); setEditValue(c.value); }} className="text-xs transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}>Edit</button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
