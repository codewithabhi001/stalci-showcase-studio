import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api";
import { BadgePill } from "./Brand";
import { motion } from "framer-motion";

interface ProductItem {
  slug: string;
  name: string;
  tag: string;
  description: string;
  pricing: string;
  icon: string;
  features: string[];
}

const fallbackProducts: ProductItem[] = [
  {
    slug: "stalci-ai-studio",
    name: "Stalci AI Studio • Private LLM Pipeline",
    tag: "Sovereign AI Engine",
    description: "Fine-tune, evaluate, and orchestrate private domain agents within isolated VPC enclaves with zero data retention and sub-15ms semantic retrieval.",
    pricing: "< 15ms TTFT",
    icon: "/images/products/ai_studio.jpg",
    features: [
      "Private embeddings & hybrid lexical-semantic reranking",
      "Automated multi-agent routing with deterministic guardrails",
      "Built-in compliance redaction & prompt leak prevention",
    ],
  },
  {
    slug: "stalciops",
    name: "StalciOps • Autonomous Cloud Fabric",
    tag: "Cloud Infrastructure",
    description: "Multi-cloud cost governance, automated Kubernetes container right-sizing, and zero-trust IAM policy automation.",
    pricing: "-38% Cloud Waste",
    icon: "/images/products/stalci_ops.jpg",
    features: [
      "Dynamic Kubernetes horizontal & vertical pod autoscaling",
      "Automated zero-trust mutual TLS encryption mesh",
      "Real-time FinOps idle cloud resource reclamation (-38%)",
    ],
  },
];

export function Products() {
  const { data: remoteProducts } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const productsList: ProductItem[] = remoteProducts && remoteProducts.length > 0
    ? remoteProducts.map((p: any) => ({
        slug: p.slug,
        name: p.name,
        tag: p.tag || "Enterprise Engine",
        description: p.description,
        pricing: p.pricing || "Enterprise Ready",
        icon: p.icon || "/images/products/ai_studio.jpg",
        features: typeof p.features === "string" ? JSON.parse(p.features) : (p.features || []),
      }))
    : fallbackProducts;

  return (
    <section id="products" className="border-t border-zinc-200/90 bg-[#FFFFFF] py-14 sm:py-20 text-black relative isolate overflow-hidden font-sans">
      
      {/* Subtle Background Texture */}
      <div 
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#F4F6FB_1px,transparent_1px),linear-gradient(to_bottom,#F4F6FB_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-80" 
        aria-hidden 
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5 mb-12 sm:mb-14">
          <div className="flex justify-center">
            <BadgePill tone="light" variant="gradient">
              <span className="font-semibold text-zinc-950">Internal Accelerators</span>
            </BadgePill>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl md:text-[32px] font-bold text-zinc-950 tracking-tight leading-[1.2]">
            Proprietary Frameworks <span className="font-extrabold text-black">Born in Production</span>
          </h2>

          <p className="text-xs sm:text-[13.5px] text-zinc-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Battle-tested software engines and infrastructure accelerators we engineered internally to compress sprint timelines and eliminate boilerplate.
          </p>
        </div>

        {/* Flagship Accelerators Dynamic Grid */}
        <div className="grid gap-6 lg:grid-cols-2 max-w-5xl mx-auto items-stretch">
          {productsList.map((product, index) => (
            <motion.div
              key={product.slug || index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="rounded-3xl border border-zinc-200/90 bg-[#FAFAFC] p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:border-zinc-400 hover:bg-white hover:shadow-md transition-all duration-300 group"
            >
              <div className="space-y-4">
                {/* Visual Render Header */}
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-zinc-200/90 shadow-2xs bg-zinc-100">
                  <img
                    src={product.icon}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80";
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-white text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20">
                    {product.tag}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-950 tracking-tight leading-snug">
                    {product.name}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-zinc-600 font-normal">
                    {product.description}
                  </p>
                </div>

                {/* Core Features */}
                {product.features && product.features.length > 0 && (
                  <div className="space-y-2 pt-1">
                    {product.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-zinc-800 font-medium">
                        <Check className="h-3.5 w-3.5 text-zinc-950 shrink-0" strokeWidth={2.5} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-200/80 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-zinc-950">
                  Benchmark: <strong className="text-black">{product.pricing}</strong>
                </span>

                <Link
                  to="/products/$slug"
                  params={{ slug: product.slug }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-950 group-hover:text-blue-600 transition-colors"
                >
                  <span>View Architecture Specs</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
