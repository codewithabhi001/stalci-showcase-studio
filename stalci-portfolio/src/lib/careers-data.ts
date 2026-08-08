export type Job = {
  slug: string;
  title: string;
  department:
    | "Engineering"
    | "AI & Data"
    | "Cloud & DevOps"
    | "Security"
    | "Design"
    | "Marketing & SEO"
    | "Business Development"
    | "Delivery"
    | "People & Ops";
  location: string;
  type: "Full-time" | "Contract" | "Internship";
  experience: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
};

export const jobs: Job[] = [
  {
    slug: "senior-full-stack-engineer",
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Remote / Hybrid",
    type: "Full-time",
    experience: "5+ years",
    summary:
      "Build production-grade web platforms for enterprise clients using React, TypeScript and Node.",
    responsibilities: [
      "Own features end to end, from architecture to production monitoring",
      "Design typed APIs and resilient data flows",
      "Mentor mid-level engineers through review and pairing",
    ],
    requirements: [
      "Deep React + TypeScript experience",
      "Strong backend skills in Node, Go or Python",
      "Experience with cloud deployment and CI/CD",
    ],
  },
  {
    slug: "ai-ml-engineer",
    title: "AI / Machine Learning Engineer",
    department: "AI & Data",
    location: "Remote",
    type: "Full-time",
    experience: "3+ years",
    summary:
      "Ship retrieval-augmented and agentic AI systems with real guardrails, evaluation and observability.",
    responsibilities: [
      "Build RAG pipelines, tool-calling agents and evaluation harnesses",
      "Optimise latency, cost and quality across model providers",
      "Partner with clients on AI roadmaps and feasibility",
    ],
    requirements: [
      "Python, PyTorch or TensorFlow, vector databases",
      "Practical LLM application experience in production",
      "Solid grounding in evaluation and prompt engineering",
    ],
  },
  {
    slug: "data-engineer",
    title: "Data Engineer",
    department: "AI & Data",
    location: "Hybrid",
    type: "Full-time",
    experience: "3+ years",
    summary: "Design lakehouse pipelines, streaming ingestion and semantic layers for analytics and AI.",
    responsibilities: [
      "Build batch and streaming pipelines with Spark and Kafka",
      "Implement data quality gates and lineage",
      "Model warehouse schemas for BI and ML consumers",
    ],
    requirements: ["SQL and Python mastery", "Spark / Kafka / dbt experience", "Cloud warehouse experience"],
  },
  {
    slug: "cloud-devops-engineer",
    title: "Cloud & DevOps Engineer",
    department: "Cloud & DevOps",
    location: "Remote",
    type: "Full-time",
    experience: "4+ years",
    summary: "Automate infrastructure, build golden paths and keep client platforms fast and observable.",
    responsibilities: [
      "Own Terraform modules and Kubernetes platforms",
      "Design CI/CD pipelines and release automation",
      "Run cost, reliability and observability reviews",
    ],
    requirements: ["Kubernetes, Terraform, Docker", "Cloud provider depth", "Strong scripting skills"],
  },
  {
    slug: "cyber-security-analyst",
    title: "Cyber Security Analyst",
    department: "Security",
    location: "Hybrid",
    type: "Full-time",
    experience: "3+ years",
    summary: "Run threat detection, security reviews and compliance readiness for enterprise clients.",
    responsibilities: [
      "Perform application and infrastructure security reviews",
      "Support SOC 2 / ISO 27001 readiness programmes",
      "Lead incident response drills",
    ],
    requirements: ["DevSecOps tooling", "Threat modelling experience", "Compliance framework knowledge"],
  },
  {
    slug: "mobile-engineer",
    title: "Mobile Engineer (React Native / Flutter)",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    experience: "3+ years",
    summary: "Deliver polished cross-platform mobile products with offline-first architecture.",
    responsibilities: [
      "Ship iOS and Android releases from one codebase",
      "Own performance, accessibility and app-store compliance",
    ],
    requirements: ["React Native or Flutter depth", "Native module experience", "Testing discipline"],
  },
  {
    slug: "product-designer",
    title: "Product Designer (UI/UX)",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    experience: "3+ years",
    summary: "Turn complex enterprise workflows into clean, usable interfaces and design systems.",
    responsibilities: [
      "Run discovery, wireframing and high-fidelity design",
      "Maintain and extend the design system",
    ],
    requirements: ["Figma expertise", "Design-system experience", "Strong portfolio of shipped products"],
  },
  {
    slug: "seo-specialist",
    title: "SEO Specialist",
    department: "Marketing & SEO",
    location: "Remote",
    type: "Full-time",
    experience: "2+ years",
    summary:
      "Own technical SEO, content strategy and organic growth across STALCI and client digital properties.",
    responsibilities: [
      "Run technical audits, Core Web Vitals and schema improvements",
      "Build keyword clusters and content briefs",
      "Report on rankings, traffic and pipeline contribution",
    ],
    requirements: [
      "Hands-on GSC, GA4 and Semrush/Ahrefs experience",
      "Technical understanding of modern JS sites and SSR",
      "Proven organic growth results",
    ],
  },
  {
    slug: "digital-marketing-manager",
    title: "Digital Marketing Manager",
    department: "Marketing & SEO",
    location: "Hybrid",
    type: "Full-time",
    experience: "4+ years",
    summary: "Own demand generation across paid, email, social and content for a B2B technology brand.",
    responsibilities: [
      "Plan and run multi-channel campaigns",
      "Manage marketing budget and attribution reporting",
      "Work with sales on pipeline targets",
    ],
    requirements: ["B2B demand-gen track record", "Marketing automation tooling", "Analytical mindset"],
  },
  {
    slug: "content-writer-technical",
    title: "Technical Content Writer",
    department: "Marketing & SEO",
    location: "Remote",
    type: "Contract",
    experience: "2+ years",
    summary: "Write engineering-grade blogs, whitepapers and case studies that rank and convert.",
    responsibilities: ["Produce long-form technical content", "Interview engineers and clients"],
    requirements: ["Excellent English writing", "Comfort with technical subject matter", "SEO fundamentals"],
  },
  {
    slug: "business-development-manager",
    title: "Business Development Manager",
    department: "Business Development",
    location: "Hybrid",
    type: "Full-time",
    experience: "4+ years",
    summary:
      "Open and close enterprise IT services opportunities across new markets and industry verticals.",
    responsibilities: [
      "Build a qualified pipeline of enterprise accounts",
      "Lead proposals, pricing and commercial negotiation",
      "Partner with delivery leads on solution scoping",
    ],
    requirements: [
      "IT services or SaaS enterprise sales experience",
      "Strong consultative selling skills",
      "CRM discipline",
    ],
  },
  {
    slug: "inside-sales-executive",
    title: "Inside Sales Executive",
    department: "Business Development",
    location: "Remote",
    type: "Full-time",
    experience: "1+ years",
    summary: "Qualify inbound demand and run outbound sequences that generate discovery calls.",
    responsibilities: ["Own outbound prospecting", "Qualify inbound leads against ICP"],
    requirements: ["Clear written and verbal communication", "Outbound tooling experience"],
  },
  {
    slug: "project-delivery-manager",
    title: "Project / Delivery Manager",
    department: "Delivery",
    location: "Hybrid",
    type: "Full-time",
    experience: "5+ years",
    summary: "Run multi-team enterprise engagements on scope, budget and quality.",
    responsibilities: ["Own delivery plans, risks and client reporting", "Facilitate agile ceremonies"],
    requirements: ["Agile delivery experience", "Stakeholder management", "Commercial awareness"],
  },
  {
    slug: "qa-automation-engineer",
    title: "QA Automation Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    experience: "3+ years",
    summary: "Build automated test suites that let teams ship daily with confidence.",
    responsibilities: ["Own E2E and API test coverage", "Integrate testing into CI"],
    requirements: ["Playwright or Cypress", "API testing", "CI/CD familiarity"],
  },
  {
    slug: "hr-talent-partner",
    title: "HR & Talent Partner",
    department: "People & Ops",
    location: "Hybrid",
    type: "Full-time",
    experience: "3+ years",
    summary: "Scale technical hiring and build the culture that keeps engineers here.",
    responsibilities: ["Own end-to-end recruitment", "Drive onboarding and engagement programmes"],
    requirements: ["Tech recruitment experience", "Excellent people skills"],
  },
  {
    slug: "engineering-intern",
    title: "Engineering Intern",
    department: "Engineering",
    location: "Remote",
    type: "Internship",
    experience: "0-1 years",
    summary: "Six-month paid internship working alongside senior engineers on real client products.",
    responsibilities: ["Contribute to production codebases", "Learn modern delivery practices"],
    requirements: ["Strong fundamentals in JS/TS or Python", "Curiosity and ownership"],
  },
];

export const departments = Array.from(new Set(jobs.map((j) => j.department)));

export const benefits = [
  { title: "Remote-first", body: "Work from anywhere with quarterly team gatherings." },
  { title: "Learning budget", body: "Annual budget for courses, certifications and conferences." },
  { title: "Real ownership", body: "Small pods, senior mentorship and visible client impact." },
  { title: "Health & wellbeing", body: "Medical cover, mental-health support and flexible leave." },
];
