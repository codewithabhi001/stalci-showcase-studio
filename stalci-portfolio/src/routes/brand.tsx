import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Wordmark, StalciLogoIcon } from "@/components/site/Brand";
import { Download, Copy, Check, Palette } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/brand")({
  head: () => ({
    meta: [
      { title: "Brand Identity & Media Kit — STALCI" },
      {
        name: "description",
        content:
          "Official brand guidelines, logo assets, color tokens, and press kit for STALCI Global Technologies.",
      },
    ],
  }),
  component: BrandPage,
});

function BrandPage() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const colors = [
    { name: "Obsidian Black", hex: "#000000", usage: "Primary Background" },
    { name: "Pure White", hex: "#FFFFFF", usage: "Primary Foreground & Headers" },
    { name: "Sovereign Emerald", hex: "#10B981", usage: "AI & Live System Badges" },
    { name: "Stalci Blue", hex: "#2563EB", usage: "Interactive Links & Buttons" },
    { name: "Copper Metallic", hex: "#D97706", usage: "Brand Accents & Framing" },
    { name: "Zinc Charcoal", hex: "#0C0C0E", usage: "Container & Card Surfaces" },
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-zinc-800 selection:text-white font-sans">
      <Nav solid />
      <main>
        <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-20 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-medium text-zinc-300">
              <Palette className="h-3.5 w-3.5 text-copper" />
              Brand Identity System
            </span>
            <h1 className="mt-4 font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
              STALCI Brand Assets &amp; Guidelines
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-zinc-400">
              Official logos, typography scales, color palettes, and usage rules for partners and media publications.
            </p>
          </div>
        </section>

        {/* Logo Assets */}
        <section className="py-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8">Official Logotypes &amp; Mark</h2>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-[#0C0C0E] p-8 flex flex-col justify-between items-center text-center">
              <div className="py-8">
                <Wordmark tone="dark" markSize={48} />
              </div>
              <div className="w-full pt-4 border-t border-white/10 flex justify-between items-center text-xs text-zinc-400">
                <span>Dark Theme Vector (SVG)</span>
                <a
                  href="/favicon.svg"
                  download="STALCI_Wordmark_Dark.svg"
                  className="inline-flex items-center gap-1.5 font-mono text-white hover:text-emerald-400"
                >
                  <Download className="h-3.5 w-3.5" /> Download
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-white p-8 flex flex-col justify-between items-center text-center text-black">
              <div className="py-8">
                <Wordmark tone="light" markSize={48} />
              </div>
              <div className="w-full pt-4 border-t border-zinc-200 flex justify-between items-center text-xs text-zinc-600">
                <span>Light Theme Vector (SVG)</span>
                <a
                  href="/favicon.svg"
                  download="STALCI_Wordmark_Light.svg"
                  className="inline-flex items-center gap-1.5 font-mono text-black hover:text-blue-600"
                >
                  <Download className="h-3.5 w-3.5" /> Download
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Color Tokens */}
        <section className="py-16 border-t border-white/10 bg-[#060608]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-8">Color Palette &amp; Tokens</h2>

            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
              {colors.map((c) => (
                <div
                  key={c.hex}
                  onClick={() => copyToClipboard(c.hex)}
                  className="rounded-2xl border border-white/10 bg-[#0C0C0E] p-4 cursor-pointer hover:border-white/30 transition-all group"
                >
                  <div
                    className="h-16 rounded-xl border border-white/10 shadow-inner mb-3"
                    style={{ backgroundColor: c.hex }}
                  />
                  <div className="text-xs font-bold text-white">{c.name}</div>
                  <div className="text-[10.5px] font-mono text-zinc-400 flex items-center justify-between mt-1">
                    <span>{c.hex}</span>
                    {copiedColor === c.hex ? (
                      <Check className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <Copy className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                  <div className="text-[10px] text-zinc-500 mt-1 line-clamp-1">{c.usage}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
