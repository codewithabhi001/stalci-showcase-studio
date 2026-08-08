export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: "AI" | "Cloud" | "Security" | "Engineering" | "Company";
  date: string;
  readingTime: string;
  author: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "ai-agents-in-the-enterprise",
    title: "Putting AI agents to work inside the enterprise",
    excerpt:
      "Agentic systems only pay off when they are wired into real workflows, real data and real guardrails. Here is the architecture we ship.",
    category: "AI",
    date: "2026-07-22",
    readingTime: "7 min read",
    author: "STALCI AI Practice",
    body: [
      "Most enterprise AI pilots stall for the same reason: the model is impressive, but it is not connected to the systems where work actually happens. An agent that cannot read a ticket, query a warehouse or write back to an ERP is a demo, not a product.",
      "Our reference architecture separates four layers — retrieval, reasoning, tools and governance. Retrieval handles grounded context from vector and relational stores. Reasoning selects a model per task rather than defaulting to the largest one. Tools are typed, permissioned functions that map to existing APIs. Governance captures every prompt, tool call and output for audit.",
      "The governance layer is what makes agents shippable in regulated environments. Every action is attributable, replayable and reversible, and human approval gates sit on any step that mutates production data.",
      "Teams that adopt this shape typically see a 30-50% reduction in manual handling time on the first workflow, and, more importantly, a repeatable pattern for the next ten.",
    ],
  },
  {
    slug: "platform-engineering-that-scales",
    title: "Platform engineering that survives the second year",
    excerpt:
      "Golden paths, paved roads and internal developer platforms — what actually holds up once fifty engineers depend on it.",
    category: "Cloud",
    date: "2026-06-30",
    readingTime: "6 min read",
    author: "STALCI Cloud Practice",
    body: [
      "A platform is a product with internal customers. If it is not measured, versioned and supported like one, engineers route around it within a year.",
      "We start every platform engagement with three artefacts: a service catalogue, a golden path template and a set of SLOs for the platform itself. Provisioning, observability, secrets and CI move behind one interface so a new service reaches production in hours, not weeks.",
      "Cost control is designed in from day one — per-team budgets, tagged infrastructure and automated rightsizing reports keep cloud spend predictable as the estate grows.",
    ],
  },
  {
    slug: "zero-trust-in-practice",
    title: "Zero trust in practice, not on a slide",
    excerpt:
      "Identity-first security, continuous verification and least privilege applied to real, messy hybrid estates.",
    category: "Security",
    date: "2026-06-05",
    readingTime: "8 min read",
    author: "STALCI Security Practice",
    body: [
      "Zero trust is not a product you buy. It is a sequence of decisions about identity, segmentation and verification that you apply to systems you already run.",
      "We sequence it: strong identity and MFA everywhere, then device posture, then application-level segmentation, then data classification and access brokering. Each phase produces measurable risk reduction before the next begins.",
      "The hardest part is legacy. We front legacy systems with authenticating proxies so they gain modern identity controls without a rewrite, then retire them on a funded schedule.",
    ],
  },
  {
    slug: "modernising-legacy-without-a-rewrite",
    title: "Modernising legacy systems without a big-bang rewrite",
    excerpt:
      "Strangler-fig migration, contract testing and incremental delivery — how we move critical systems with zero downtime.",
    category: "Engineering",
    date: "2026-05-18",
    readingTime: "9 min read",
    author: "STALCI Engineering",
    body: [
      "Big-bang rewrites fail because they ask a business to pause while engineering catches up. Incremental migration keeps revenue flowing while the architecture changes underneath it.",
      "We wrap the legacy system in an API facade, move one bounded context at a time, and use contract tests to guarantee behaviour parity. Traffic shifts gradually behind feature flags, with instant rollback.",
      "Every migration ships with a decommission plan. Code that is not deleted is cost that never goes away.",
    ],
  },
  {
    slug: "data-platforms-for-ai-readiness",
    title: "Data platforms that make AI actually possible",
    excerpt:
      "Lineage, quality gates and a semantic layer are the unglamorous prerequisites for every credible AI roadmap.",
    category: "AI",
    date: "2026-04-27",
    readingTime: "6 min read",
    author: "STALCI Data Practice",
    body: [
      "Before a single model is trained, ask a simpler question: can you explain where each number came from? Lineage and quality gates are the foundation of AI readiness.",
      "We build lakehouse architectures with contract-tested ingestion, automated data quality checks and a semantic layer that gives both dashboards and models one definition of truth.",
      "With that in place, AI features stop being experiments and start being releases.",
    ],
  },
  {
    slug: "stalci-2026-engineering-report",
    title: "STALCI 2026: what we learned shipping 40 platforms",
    excerpt:
      "Delivery metrics, architecture patterns and the operating model behind a year of enterprise engagements.",
    category: "Company",
    date: "2026-03-11",
    readingTime: "5 min read",
    author: "STALCI Leadership",
    body: [
      "Across forty engagements this year, the strongest predictor of delivery speed was not team size or budget. It was the number of environments an engineer had to touch to release a change.",
      "Teams with one paved path shipped roughly three times more frequently than teams with bespoke pipelines per service.",
      "We are publishing our internal delivery scorecard so clients can benchmark their own programmes against it.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
