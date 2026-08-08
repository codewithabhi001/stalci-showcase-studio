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
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-3xl font-semibold text-ink-black" style={{ fontFamily: "var(--font-display)" }}>Site Configuration</h1>
        <p className="mt-2 text-warm-stone">Manage global settings and variables dynamically loaded in your Stalci portfolio.</p>
      </div>

      <div className="bg-paper-white rounded-[20px] p-6 border border-mist-gray" style={{ boxShadow: "var(--shadow-card)" }}>
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "var(--color-copper)" }} />
          </div>
        ) : (
          <div className="space-y-1 divide-y divide-mist-gray/40">
            {configs.map((c: any) => (
              <div key={c.key} className="flex items-center justify-between py-5 first:pt-0 last:pb-0">
                <div className="space-y-1">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-driftwood">{c.key}</p>
                  {editKey === c.key ? (
                    <input
                      autoFocus
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="px-4 py-2 rounded-2xl text-sm border border-bone outline-none focus:border-copper bg-white text-ink-black min-w-[280px]"
                    />
                  ) : (
                    <p className="text-sm text-ironwood font-medium">{c.value}</p>
                  )}
                </div>
                {editKey === c.key ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateMut.mutate({ key: c.key, value: editValue })}
                      disabled={updateMut.isPending}
                      className="px-4 py-2 rounded-2xl text-xs font-semibold text-white hover:brightness-110 active:scale-[0.98] transition-all"
                      style={{ background: "var(--color-copper)" }}
                    >
                      {updateMut.isPending ? "..." : "Save"}
                    </button>
                    <button
                      onClick={() => setEditKey(null)}
                      className="px-4 py-2 rounded-2xl text-xs font-semibold text-warm-stone border border-mist-gray hover:bg-cream-canvas transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { setEditKey(c.key); setEditValue(c.value); }}
                    className="text-xs font-semibold text-warm-stone hover:text-copper transition-colors"
                  >
                    Edit
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
