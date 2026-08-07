import { motion } from "framer-motion";
import { useScrollReveal } from "@/lib/animations";
import { SectionHeading } from "./Brand";

type Tech = { name: string; slug: string };

const groups: { label: string; items: Tech[] }[] = [
  {
    label: "Frontend",
    items: [
      { name: "React", slug: "react" },
      { name: "Next.js", slug: "nextdotjs" },
      { name: "TypeScript", slug: "typescript" },
      { name: "Vue.js", slug: "vuedotjs" },
      { name: "Angular", slug: "angular" },
      { name: "Tailwind CSS", slug: "tailwindcss" },
      { name: "Svelte", slug: "svelte" },
      { name: "Vite", slug: "vite" },
    ],
  },
  {
    label: "Mobile",
    items: [
      { name: "React Native", slug: "react" },
      { name: "Flutter", slug: "flutter" },
      { name: "Swift", slug: "swift" },
      { name: "Kotlin", slug: "kotlin" },
      { name: "Expo", slug: "expo" },
      { name: "Android", slug: "android" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js", slug: "nodedotjs" },
      { name: "NestJS", slug: "nestjs" },
      { name: "Python", slug: "python" },
      { name: "Django", slug: "django" },
      { name: "Go", slug: "go" },
      { name: "Rust", slug: "rust" },
      { name: "Spring", slug: "spring" },
      { name: "Laravel", slug: "laravel" },
      { name: "GraphQL", slug: "graphql" },
    ],
  },
  {
    label: "Data & AI",
    items: [
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "MongoDB", slug: "mongodb" },
      { name: "Redis", slug: "redis" },
      { name: "Snowflake", slug: "snowflake" },
      { name: "Apache Kafka", slug: "apachekafka" },
      { name: "Apache Spark", slug: "apachespark" },
      { name: "TensorFlow", slug: "tensorflow" },
      { name: "PyTorch", slug: "pytorch" },
      { name: "LangChain", slug: "langchain" },
      { name: "Ollama", slug: "ollama" },
      { name: "Elasticsearch", slug: "elasticsearch" },
      { name: "Hugging Face", slug: "huggingface" },
    ],
  },
  {
    label: "Cloud & DevOps",
    items: [
      { name: "Cloudflare Workers", slug: "cloudflareworkers" },
      { name: "Vercel", slug: "vercel" },
      { name: "Google Cloud", slug: "googlecloud" },
      { name: "Cloudflare", slug: "cloudflare" },
      { name: "Docker", slug: "docker" },
      { name: "Kubernetes", slug: "kubernetes" },
      { name: "Terraform", slug: "terraform" },
      { name: "GitHub Actions", slug: "githubactions" },
      { name: "Grafana", slug: "grafana" },
      { name: "Prometheus", slug: "prometheus" },
    ],
  },
  {
    label: "Security & Tools",
    items: [
      { name: "Auth0", slug: "auth0" },
      { name: "Vault", slug: "vault" },
      { name: "Cloudflare Zero Trust", slug: "cloudflare" },
      { name: "Sentry", slug: "sentry" },
      { name: "Jira", slug: "jira" },
      { name: "Figma", slug: "figma" },
      { name: "Git", slug: "git" },
      { name: "Stripe", slug: "stripe" },
    ],
  },
];

export function TechStack() {
  const headerRef = useScrollReveal();

  return (
    <section id="stack" className="surface-ink relative overflow-hidden py-20 sm:py-24">
      <div className="grid-lines absolute inset-0 opacity-20 pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div ref={headerRef} className="mb-14">
          <SectionHeading
            eyebrow="Technology"
            title="The full STALCI engineering stack"
            subtitle="Battle-tested tools across frontend, mobile, backend, data, AI, cloud and security — chosen per project, never by default."
            tone="dark"
          />
        </div>

        <div className="space-y-12">
          {groups.map((g, idx) => {
            // First row (idx=0, odd) scrolls left, second row (idx=1, even) scrolls right
            const isOddRow = idx % 2 === 0;
            const marqueeClass = isOddRow ? "animate-marquee-left" : "animate-marquee-right";

            return (
              <div key={g.label} className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-copper-deep px-5 lg:px-0">
                  {g.label}
                </h3>

                <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
                  <div
                    className={`flex gap-4 marquee-track group-hover:[animation-play-state:paused] ${marqueeClass}`}
                    style={{ width: "max-content" }}
                  >
                    {/* Render items twice for seamless loop */}
                    {g.items.map((t, i) => (
                      <motion.div
                        key={`orig-${g.label}-${t.name}-${i}`}
                        whileHover={{ scale: 1.08, y: -4 }}
                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-ink-soft px-5 py-3.5 cursor-pointer"
                      >
                        <img
                          src={`https://cdn.simpleicons.org/${t.slug}`}
                          alt={`${t.name} logo`}
                          width={24}
                          height={24}
                          loading="lazy"
                          className="h-[24px] w-[24px] shrink-0 object-contain"
                        />
                        <span className="min-w-0 truncate text-sm font-medium text-white">{t.name}</span>
                      </motion.div>
                    ))}
                    {g.items.map((t, i) => (
                      <motion.div
                        key={`dup-${g.label}-${t.name}-${i}`}
                        whileHover={{ scale: 1.08, y: -4 }}
                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-ink-soft px-5 py-3.5 cursor-pointer"
                      >
                        <img
                          src={`https://cdn.simpleicons.org/${t.slug}`}
                          alt={`${t.name} logo`}
                          width={24}
                          height={24}
                          loading="lazy"
                          className="h-[24px] w-[24px] shrink-0 object-contain"
                        />
                        <span className="min-w-0 truncate text-sm font-medium text-white">{t.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
