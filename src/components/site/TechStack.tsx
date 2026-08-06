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
      { name: "OpenAI", slug: "openai" },
      { name: "Hugging Face", slug: "huggingface" },
    ],
  },
  {
    label: "Cloud & DevOps",
    items: [
      { name: "AWS", slug: "amazonwebservices" },
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
  return (
    <section id="stack" className="bg-secondary/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Technology"
          title="The full STALCI engineering stack"
          subtitle="Battle-tested tools across frontend, mobile, backend, data, AI, cloud and security — chosen per project, never by default."
        />

        <div className="mt-14 space-y-10">
          {groups.map((g) => (
            <div key={g.label} className="rounded-3xl border border-border bg-card p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-copper-deep">{g.label}</h3>
                <span className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground">{g.items.length} tools</span>
              </div>

              <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {g.items.map((t) => (
                  <li
                    key={g.label + t.name}
                    className="card-lift flex items-center gap-3 rounded-xl border border-border bg-background px-3.5 py-3"
                  >
                    <img
                      src={`https://cdn.simpleicons.org/${t.slug}`}
                      alt={`${t.name} logo`}
                      width={22}
                      height={22}
                      loading="lazy"
                      className="h-[22px] w-[22px] shrink-0 object-contain"
                    />
                    <span className="min-w-0 truncate text-sm font-medium">{t.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
