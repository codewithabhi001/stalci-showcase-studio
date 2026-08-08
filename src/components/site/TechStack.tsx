import { motion } from "framer-motion";
import { useScrollReveal } from "@/lib/animations";
import { SectionHeading } from "./Brand";
import { TechIcon } from "./TechIcon";
import mark from "@/assets/stalci-mark.png";

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
      { name: "Sentry", slug: "sentry" },
      { name: "Jira", slug: "jira" },
      { name: "Figma", slug: "figma" },
      { name: "Git", slug: "git" },
      { name: "Stripe", slug: "stripe" },
    ],
  },
];

// Circular cluster rings — inner to outer
const rings: { radius: number; duration: number; reverse?: boolean; items: Tech[] }[] = [
  {
    radius: 30,
    duration: 44,
    items: [
      { name: "React", slug: "react" },
      { name: "TypeScript", slug: "typescript" },
      { name: "Node.js", slug: "nodedotjs" },
      { name: "Python", slug: "python" },
      { name: "Go", slug: "go" },
      { name: "PostgreSQL", slug: "postgresql" },
    ],
  },
  {
    radius: 42,
    duration: 62,
    reverse: true,
    items: [
      { name: "Next.js", slug: "nextdotjs" },
      { name: "Flutter", slug: "flutter" },
      { name: "Kubernetes", slug: "kubernetes" },
      { name: "Docker", slug: "docker" },
      { name: "TensorFlow", slug: "tensorflow" },
      { name: "PyTorch", slug: "pytorch" },
      { name: "Kafka", slug: "apachekafka" },
      { name: "Redis", slug: "redis" },
      { name: "Rust", slug: "rust" },
    ],
  },
  {
    radius: 50,
    duration: 80,
    items: [
      { name: "Cloudflare", slug: "cloudflare" },
      { name: "Google Cloud", slug: "googlecloud" },
      { name: "Terraform", slug: "terraform" },
      { name: "LangChain", slug: "langchain" },
      { name: "Hugging Face", slug: "huggingface" },
      { name: "Snowflake", slug: "snowflake" },
      { name: "Vault", slug: "vault" },
      { name: "Auth0", slug: "auth0" },
      { name: "Sentry", slug: "sentry" },
      { name: "Grafana", slug: "grafana" },
      { name: "Figma", slug: "figma" },
      { name: "Stripe", slug: "stripe" },
    ],
  },
];

function Cluster() {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[22rem] sm:max-w-[30rem]"
      aria-hidden
    >
      {/* concentric guides */}
      {[60, 84, 100].map((p) => (
        <div
          key={p}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
          style={{ width: `${p}%`, height: `${p}%` }}
        />
      ))}

      {/* copper core glow */}
      <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper/20 blur-3xl" />

      <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-copper/30 bg-ink-soft sm:h-24 sm:w-24">
        <img src={mark} alt="" width={40} height={40} className="h-9 w-9 object-contain sm:h-11 sm:w-11" />
      </div>

      {rings.map((ring, ri) => (
        <div
          key={ri}
          className="absolute inset-0"
          style={{
            animation: `spin-slow ${ring.duration}s linear infinite${ring.reverse ? " reverse" : ""}`,
          }}
        >
          {ring.items.map((t, i) => {
            const angle = (i / ring.items.length) * Math.PI * 2;
            const x = 50 + ring.radius * Math.cos(angle);
            const y = 50 + ring.radius * Math.sin(angle);
            return (
              <div
                key={`${ri}-${t.name}`}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
                title={t.name}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-ink-soft/90 shadow-lg backdrop-blur sm:h-11 sm:w-11"
                  style={{
                    animation: `spin-slow ${ring.duration}s linear infinite${ring.reverse ? "" : " reverse"}`,
                  }}
                >
                  <TechIcon name={t.name} slug={t.slug} size={20} />
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export function TechStack() {
  const headerRef = useScrollReveal();

  return (
    <section id="stack" className="surface-ink relative overflow-hidden py-20 sm:py-24">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div ref={headerRef} className="mb-12">
          <SectionHeading
            eyebrow="Technology"
            title="The full STALCI engineering stack"
            subtitle="Battle-tested tools across frontend, mobile, backend, data, AI, cloud and security — chosen per project, never by default."
            tone="dark"
          />
        </div>

        <Cluster />

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => (
            <div
              key={g.label}
              className="rounded-2xl border border-white/10 bg-ink-soft/60 p-5"
            >
              <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-copper">
                {g.label}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.items.map((t) => (
                  <motion.span
                    key={`${g.label}-${t.name}`}
                    whileHover={{ y: -2 }}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-ink px-3 py-2 text-xs font-medium text-on-ink"
                  >
                    <TechIcon name={t.name} slug={t.slug} size={16} />
                    {t.name}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
