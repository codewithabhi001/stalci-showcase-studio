import {
  Cpu,
  Sparkles,
  Code2,
  Smartphone,
  CloudLightning,
  Database,
  ShieldCheck,
  Globe,
  Workflow,
  Boxes,
  Building2,
  Lock,
  BarChart3,
  Activity,
  Terminal,
  Zap,
} from "lucide-react";
import type {
  ServiceEntry,
  ProductEntry,
  IndustryEntry,
  ProjectEntry,
  BlogPostEntry,
  TestimonialEntry,
  JobEntry,
} from "@/types";

// ==========================================
// 1. SERVICES DATA
// ==========================================
export const SERVICES_DATA: Record<string, ServiceEntry> = {
  "ai-services": {
    slug: "ai-services",
    title: "Sovereign AI & ML Development",
    tagline: "INTELLIGENCE, ENGINEERED FOR PRIVACY & SCALE.",
    tag: "SOVEREIGN AI & ML",
    summary:
      "We engineer custom domain-specific AI models, private LLM agents, and high-performance vector retrieval pipelines within isolated private cloud enclaves with zero data retention.",
    overview:
      "Sovereign AI represents the future of enterprise intelligence. STALCI designs, fine-tunes, and deploys specialized machine learning systems and multi-agent orchestrators inside client-controlled VPC enclaves. From domain-adapted Llama and Qwen models to sub-15ms vector search with hybrid lexical-semantic reranking, our AI architecture eliminates third-party model dependency, ensures strict data sovereignty, and guarantees enterprise privacy compliance.",
    icon: Sparkles,
    outcomes: [
      { label: "Sub-15ms Latency", value: "< 15ms TTFT" },
      { label: "Zero Data Retention", value: "100% Private" },
      { label: "Cost Reduction vs API", value: "-65% OPEX" },
    ],
    capabilities: [
      {
        title: "Domain-Specific Model Fine-Tuning",
        copy: "LoRA and QLoRA fine-tuning of open weights on proprietary corpus with evaluation benchmarks.",
      },
      {
        title: "Private Vector Search & RAG",
        copy: "Hybrid Dense/Sparse retrieval with pgvector and Milvus for real-time semantic query execution.",
      },
      {
        title: "Autonomous Agent Orchestration",
        copy: "Deterministic tool-use agents with fail-safe guardrails and structured JSON output guarantees.",
      },
      {
        title: "Air-Gapped Enclave Deployment",
        copy: "On-premise GPU cluster configuration and confidential computing isolation.",
      },
    ],
    deliverables: [
      "Fine-tuned GGUF/vLLM weights",
      "Private RAG retrieval pipeline & vector index",
      "Confidential AI API gateway with rate-limiting",
      "Enterprise agent audit dashboard",
      "SOC 2 compliance documentation",
    ],
    tools: ["Python", "PyTorch", "vLLM", "LangChain", "pgvector", "Ray"],
    projects: ["Private RAG Vector Engines", "Autonomous Agent Swarms", "Domain Model Fine-Tuning"],
    visualType: "ai",
  },
  "ai-solutions": {
    slug: "ai-solutions",
    title: "Sovereign AI & ML Development",
    tagline: "INTELLIGENCE, ENGINEERED FOR PRIVACY & SCALE.",
    tag: "SOVEREIGN AI & ML",
    summary:
      "We engineer custom domain-specific AI models, private LLM agents, and high-performance vector retrieval pipelines within isolated private cloud enclaves with zero data retention.",
    overview:
      "Sovereign AI represents the future of enterprise intelligence. STALCI designs, fine-tunes, and deploys specialized machine learning systems and multi-agent orchestrators inside client-controlled VPC enclaves.",
    icon: Cpu,
    outcomes: [
      { label: "Sub-15ms Latency", value: "< 15ms TTFT" },
      { label: "Zero Data Retention", value: "100% Private" },
      { label: "Cost Reduction vs API", value: "-65% OPEX" },
    ],
    capabilities: [
      {
        title: "Domain-Specific Model Fine-Tuning",
        copy: "LoRA and QLoRA fine-tuning of open weights on proprietary corpus with evaluation benchmarks.",
      },
      {
        title: "Private Vector Search & RAG",
        copy: "Hybrid Dense/Sparse retrieval with pgvector and Milvus for real-time semantic query execution.",
      },
    ],
    deliverables: [
      "Fine-tuned GGUF/vLLM weights",
      "Private RAG retrieval pipeline & vector index",
    ],
    tools: ["Python", "PyTorch", "vLLM", "LangChain"],
    projects: ["Private RAG Vector Engines", "Autonomous Agent Swarms"],
    visualType: "ai",
  },
  "software-engineering": {
    slug: "software-engineering",
    title: "Enterprise Web & Platform Engineering",
    tagline: "ULTRA-FAST, RESILIENT WEB SYSTEMS.",
    tag: "SOFTWARE ENGINEERING",
    summary:
      "Mission-critical web applications built on React 19, Next.js, and strictly typed TypeScript. High-throughput SaaS dashboards, financial portals, and high-volume B2B systems.",
    overview:
      "We build resilient, distributed web systems engineered to handle millions of requests without degradation. Our team adheres to strict domain-driven design, clean multi-layer modular architecture, and automated end-to-end testing pipelines. From real-time WebSocket trading platforms to enterprise B2B management suites, we write software that powers high-scale digital operations.",
    icon: Code2,
    outcomes: [
      { label: "Lighthouse Performance Score", value: "99/100" },
      { label: "System Availability SLA", value: "99.99%" },
      { label: "Concurrent User Capacity", value: "500k+ Active" },
    ],
    capabilities: [
      {
        title: "Distributed Microservices Architecture",
        copy: "Event-driven architecture with Kafka/NATS and gRPC high-throughput inter-service communication.",
      },
      {
        title: "React 19 & Next.js SSR Engine",
        copy: "Sub-second initial page loads with zero-layout-shift UI layouts and streaming server components.",
      },
      {
        title: "High-Concurrency Database Systems",
        copy: "Partitioned PostgreSQL databases with Redis caching layers and read-replica routing.",
      },
      {
        title: "Strict Type Safety & Contract Testing",
        copy: "End-to-end TypeScript compilation with Zod schema validation and OpenAPI generator.",
      },
    ],
    deliverables: [
      "Production-ready Next.js / React application codebase",
      "gRPC / REST / GraphQL API specs & Postman collections",
      "Automated CI/CD GitHub Actions / GitLab workflows",
      "Comprehensive unit, integration, and e2e test suite",
    ],
    tools: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    projects: ["Multi-Tenant SaaS", "B2B Wholesale Portals", "Real-Time Trading Engines"],
    visualType: "web",
  },
  "custom-software-development": {
    slug: "custom-software-development",
    title: "Enterprise Custom Software Engineering",
    tagline: "TAILORED SYSTEMS FOR COMPLEX WORKFLOWS.",
    tag: "CUSTOM SOFTWARE",
    summary:
      "Custom enterprise software solutions built from the ground up to automate complex operational workflows and legacy modernization.",
    overview:
      "We design custom software tailored precisely to your operational requirements, replacing rigid off-the-shelf platforms with lean, scalable software architectures.",
    icon: Code2,
    outcomes: [
      { label: "Workflow Automation", value: "4.8x Speedup" },
      { label: "Legacy Modernization", value: "Zero Downtime" },
    ],
    capabilities: [
      { title: "Custom API & Integration Engines", copy: "Seamless ERP/CRM data synchronizations." },
      { title: "Legacy System Refactoring", copy: "Incremental strangler-fig migration patterns." },
    ],
    deliverables: ["Custom Software System", "Data Migration Scripts"],
    tools: ["TypeScript", "Go", "Node.js", "PostgreSQL"],
    projects: ["Enterprise ERP Systems", "Custom Workflow Automation"],
    visualType: "web",
  },
  mobility: {
    slug: "mobility",
    title: "High-Performance Mobile Platforms",
    tagline: "NATIVE 120 FPS FLUIDITY, EVERYWHERE.",
    tag: "MOBILE PLATFORMS",
    summary:
      "iOS and Android applications engineered for fluid 120 FPS responsiveness, offline-first SQLite sync, biometric security hardware enclaves, and enterprise BLE integrations.",
    overview:
      "Mobile interfaces require pixel-perfect design combined with unyielding native performance. STALCI crafts native iOS (Swift/SwiftUI) and Android (Kotlin/Jetpack Compose) applications as well as cross-platform React Native / Flutter apps. We integrate device biometric enclaves, background location tracking, SQLite/WatermelonDB offline synchronization, and WebSocket telemetry feeds.",
    icon: Smartphone,
    outcomes: [
      { label: "Frame Rate Consistency", value: "120 FPS" },
      { label: "Crash-Free Users Ratio", value: "99.98%" },
      { label: "Offline Sync Speed", value: "< 200ms" },
    ],
    capabilities: [
      {
        title: "Offline-First Data Architecture",
        copy: "Local SQLite DB caching with optimistic UI updates and background delta synchronization.",
      },
      {
        title: "Hardware Enclave Biometrics",
        copy: "Secure FaceID/TouchID authentication with local encryption key storage in Secure Enclave.",
      },
      {
        title: "Custom GPU Graphics & Animations",
        copy: "Metal and Vulkan rendering routines for real-time data visualization and fluid gesture navigation.",
      },
      {
        title: "BLE & IoT Hardware Pairing",
        copy: "Low-latency Bluetooth LE connection handling and embedded device command protocols.",
      },
    ],
    deliverables: [
      "iOS & Android application source code",
      "App Store & Google Play distribution pipelines",
      "Mobile analytics & crash reporting integration",
      "Offline sync middleware module",
    ],
    tools: ["Swift", "Kotlin", "React Native", "Flutter", "SQLite", "WebSockets"],
    projects: ["Biometric FinTech Apps", "Offline Field Logistics", "On-Demand Mobility"],
    visualType: "mobile",
  },
  "mobile-app-development": {
    slug: "mobile-app-development",
    title: "High-Performance Mobile Platforms",
    tagline: "NATIVE 120 FPS FLUIDITY, EVERYWHERE.",
    tag: "MOBILE PLATFORMS",
    summary:
      "iOS and Android applications engineered for fluid 120 FPS responsiveness, offline-first SQLite sync, biometric security hardware enclaves, and enterprise BLE integrations.",
    overview: "Native iOS and Android application engineering built for high frame-rates and offline sync.",
    icon: Smartphone,
    outcomes: [
      { label: "Frame Rate", value: "120 FPS" },
      { label: "Crash-Free Rate", value: "99.98%" },
    ],
    capabilities: [
      { title: "Native iOS & Android", copy: "SwiftUI and Jetpack Compose." },
    ],
    deliverables: ["iOS App Store Build", "Android APK/AAB Build"],
    tools: ["Swift", "Kotlin", "React Native"],
    projects: ["FinTech App", "Field Logistics"],
    visualType: "mobile",
  },
  "cloud-devops": {
    slug: "cloud-devops",
    title: "Multi-Cloud & Zero-Trust DevOps",
    tagline: "DETERMINISTIC 99.99% AVAILABILITY.",
    tag: "CLOUD & DEVOPS",
    summary:
      "Automated multi-region cloud architecture, declarative Terraform infrastructure-as-code, zero-downtime blue/green deployments, and continuous cloud cost optimization.",
    overview:
      "Infrastructure should be deterministic, self-healing, and fully code-defined. Our cloud engineers build multi-region AWS, GCP, and Azure Kubernetes clusters using Terraform and Helm. We establish zero-trust Istio service meshes, Prometheus/Grafana monitoring stacks, and blue/green deployment pipelines that allow continuous code delivery without user disruption.",
    icon: CloudLightning,
    outcomes: [
      { label: "Deployment Downtime", value: "0 Seconds" },
      { label: "Infrastructure Recovery (MTTR)", value: "< 3 Mins" },
      { label: "Cloud Cost Optimization", value: "-42% Spend" },
    ],
    capabilities: [
      {
        title: "Declarative Infrastructure as Code",
        copy: "Terraform modules for multi-account VPC, EKS/GKE clusters, and automated DNS routing.",
      },
      {
        title: "Zero-Trust Service Mesh & Security",
        copy: "mTLS encryption between microservices via Istio with strict egress control policies.",
      },
      {
        title: "Automated GitOps CI/CD Pipelines",
        copy: "ArgoCD and GitHub Actions pipelines for automated staging-to-production promotions.",
      },
      {
        title: "Real-Time FinOps Cloud Optimization",
        copy: "Automated pod right-sizing and spot-instance node pool scheduling.",
      },
    ],
    deliverables: [
      "Modular Terraform infrastructure codebase",
      "Kubernetes Helm charts & GitOps repository",
      "Prometheus & Grafana observability dashboards",
      "Disaster recovery runbooks & incident automation",
    ],
    tools: ["AWS", "Kubernetes", "Terraform", "Docker", "ArgoCD", "Cloudflare"],
    projects: ["Kubernetes EKS Clusters", "Automated Blue/Green CI/CD", "FinOps Cloud Cost Pruning"],
    visualType: "cloud",
  },
  "data-intelligence": {
    slug: "data-intelligence",
    title: "Enterprise Data Intelligence & Pipelines",
    tagline: "REAL-TIME ANALYTICS AT PETABYTE SCALE.",
    tag: "DATA INTELLIGENCE",
    summary:
      "High-throughput real-time data pipelines, event streaming with Apache Kafka, automated ETL/ELT transformations, and unified data warehouses.",
    overview:
      "Data intelligence transforms raw event streams into actionable enterprise insights. STALCI constructs event-driven data architectures using Kafka, Snowflake, ClickHouse, and dbt. We build real-time aggregation engines capable of ingesting millions of events per second with sub-second query speeds for executive dashboards and ML pipelines.",
    icon: Database,
    outcomes: [
      { label: "Event Ingestion Speed", value: "2M+ events/sec" },
      { label: "Query Execution Time", value: "< 100ms" },
      { label: "Data Freshness SLA", value: "Real-Time (<1s)" },
    ],
    capabilities: [
      {
        title: "Distributed Event Streaming",
        copy: "Kafka & Redpanda clusters for fault-tolerant high-volume log and metric streams.",
      },
      {
        title: "Modern Data Warehousing",
        copy: "ClickHouse and Snowflake analytical data stores structured with dbt models.",
      },
      {
        title: "Real-Time ETL / ELT Pipelines",
        copy: "Spark and Flink batch/stream processors with automated data quality checks.",
      },
    ],
    deliverables: [
      "Event streaming architecture design",
      "ClickHouse / Snowflake data warehouse models",
      "dbt transformation pipelines & data docs",
      "Grafana analytical dashboards",
    ],
    tools: ["Kafka", "ClickHouse", "Snowflake", "dbt", "Python", "Spark"],
    projects: ["Real-Time Telemetry Pipeline", "Financial Audit Data Mart", "User Event Analytics Engine"],
    visualType: "data",
  },
  "web-development": {
    slug: "web-development",
    title: "Modern Web & WebGL Development",
    tagline: "IMMERSIVE, BLAZING-FAST DIGITAL EXPERIENCES.",
    tag: "WEB DEVELOPMENT",
    summary:
      "High-converting web applications, WebGL 3D interactive visuals, modern headless CMS integrations, and ultra-performant landing experiences.",
    overview:
      "We combine high-performance frontend code with fluid micro-interactions and Three.js / WebGL shaders to craft digital web applications that captivate users while achieving perfect SEO performance and accessibility scores.",
    icon: Globe,
    outcomes: [
      { label: "Lighthouse Performance", value: "100/100" },
      { label: "Core Web Vitals", value: "All Green" },
      { label: "Conversion Lift", value: "+34% Avg" },
    ],
    capabilities: [
      { title: "Next.js & SSR Architecture", copy: "Static and server-rendered hybrid rendering for instant feel." },
      { title: "WebGL & 3D Interactivity", copy: "Custom Three.js shaders and smooth GSAP ScrollTrigger animations." },
      { title: "Headless CMS Integration", copy: "Sanity, Strapi, and Payload CMS implementations for modular content." },
    ],
    deliverables: [
      "Modern Web Application Codebase",
      "Headless CMS Content Architecture",
      "Performance & SEO Optimization Audit",
    ],
    tools: ["React", "Next.js", "Three.js", "GSAP", "Tailwind CSS", "TypeScript"],
    projects: ["3D Interactive Showcase", "Global Tech Brand Site", "High-Volume E-Commerce Frontend"],
    visualType: "web",
  },
  cybersecurity: {
    slug: "cybersecurity",
    title: "Zero-Trust Cybersecurity & Compliance",
    tagline: "UNYIELDING DEFENSE FOR DIGITAL ASSETS.",
    tag: "CYBERSECURITY",
    summary:
      "Zero-trust security architecture, automated penetration testing, vulnerability remediation, SOC 2 / ISO 27001 readiness, and identity governance.",
    overview:
      "In an era of relentless cyber threats, STALCI bakes security into every layer of the software stack. From static application security testing (SAST) in CI/CD to micro-segmented VPC networks and automated IAM auditing, we ensure your infrastructure resists compromise.",
    icon: ShieldCheck,
    outcomes: [
      { label: "Vulnerability Remediation", value: "100% Resolved" },
      { label: "Compliance Readiness", value: "SOC 2 Type II" },
      { label: "Security Audit Score", value: "Grade A+" },
    ],
    capabilities: [
      { title: "Application Penetration Testing", copy: "OWASP Top 10 automated and manual security testing." },
      { title: "Zero-Trust Network Architecture", copy: "Strict IAM roles, mTLS authentication, and egress rules." },
      { title: "Compliance Automation", copy: "SOC 2, ISO 27001, and HIPAA compliance mapping and evidence collection." },
    ],
    deliverables: [
      "Comprehensive Security Audit Report",
      "Zero-Trust IAM & Network Topology",
      "SOC 2 Readiness Matrix & Evidence Vault",
    ],
    tools: ["Vault", "SonarQube", "Wazuh", "Datadog", "AWS KMS", "Cloudflare Access"],
    projects: ["FinTech Security Hardening", "HIPAA Health Vault Defense", "Zero-Trust VPC Architecture"],
    visualType: "security",
  },
};

// ==========================================
// 2. PRODUCTS DATA
// ==========================================
export const PRODUCTS_DATA: Record<string, ProductEntry> = {
  "stalci-ai-studio": {
    slug: "stalci-ai-studio",
    name: "Stalci AI Studio • Private LLM Orchestrator",
    tag: "SOVEREIGN AI ENGINE",
    summary:
      "Production-ready sovereign AI orchestrator allowing enterprises to fine-tune, evaluate, and deploy private LLMs with zero third-party data leakage.",
    overview:
      "Stalci AI Studio is our proprietary framework built to compress AI integration timelines from months to days. Featuring hybrid lexical-semantic RAG, vLLM multi-GPU inference routing, and deterministic JSON schema enforcers, Stalci AI Studio allows organizations to deploy enterprise-grade AI agents safely within their existing cloud perimeter.",
    pricing: "< 15ms TTFT",
    icon: "/images/products/ai_studio.jpg",
    outcomes: [
      { label: "Time to First Token", value: "< 15ms TTFT" },
      { label: "Data Leakage Risk", value: "0% Absolute" },
      { label: "Cost vs OpenAI APIs", value: "-68% Savings" },
    ],
    features: [
      "Private vector embeddings & hybrid lexical-semantic reranking",
      "Automated multi-agent routing with deterministic guardrails",
      "Built-in compliance redaction & prompt leak prevention",
      "Native vLLM integration with automatic GPU memory paging",
    ],
    capabilities: [
      { title: "Multi-Agent Routing", copy: "Intelligent query classification and tool selection logic." },
      { title: "Confidential Guardrails", copy: "Regex, PII redaction, and policy enforcement wrappers." },
    ],
    deliverables: [
      "Docker container image & Helm deployment chart",
      "Python / Node.js SDK libraries",
      "Admin configuration GUI dashboard",
    ],
    stack: ["Python", "PyTorch", "vLLM", "pgvector", "FastAPI", "React"],
  },
  "ai-automation-engine": {
    slug: "ai-automation-engine",
    name: "Stalci AI Studio • Private LLM Orchestrator",
    tag: "SOVEREIGN AI ENGINE",
    summary:
      "Production-ready sovereign AI orchestrator allowing enterprises to fine-tune, evaluate, and deploy private LLMs.",
    overview: "Deploy private sovereign LLM agents with guaranteed privacy.",
    pricing: "< 15ms TTFT",
    icon: "/images/products/ai_studio.jpg",
    outcomes: [
      { label: "TTFT Speed", value: "< 15ms" },
      { label: "Data Security", value: "100% Private" },
    ],
    features: [
      "Private vector embeddings & hybrid lexical-semantic reranking",
      "Automated multi-agent routing with deterministic guardrails",
    ],
    capabilities: [{ title: "Multi-Agent Engine", copy: "Autonomous agent execution." }],
    deliverables: ["Helm Chart & Container Image"],
    stack: ["Python", "vLLM", "pgvector"],
  },
  stalciops: {
    slug: "stalciops",
    name: "StalciOps • Autonomous Cloud Fabric",
    tag: "CLOUD INFRASTRUCTURE",
    summary:
      "Multi-cloud cost governance, automated Kubernetes container right-sizing, zero-trust IAM policy automation, and real-time FinOps optimization.",
    overview:
      "StalciOps simplifies Kubernetes cluster management across AWS, GCP, and Azure. It analyzes CPU/Memory usage metrics in real time, automatically shrinking over-provisioned workloads and leveraging spot node instances without sacrificing application availability SLAs.",
    pricing: "-38% Cloud Spend",
    icon: "/images/products/stalci_ops.jpg",
    outcomes: [
      { label: "Average Cloud Savings", value: "-38% Monthly" },
      { label: "Pod Auto-Scaling", value: "< 3 Seconds" },
      { label: "Security Violations Blocked", value: "100% Automated" },
    ],
    features: [
      "Dynamic Kubernetes horizontal & vertical pod autoscaling",
      "Automated zero-trust mutual TLS encryption mesh",
      "Real-time FinOps idle cloud resource reclamation (-38%)",
      "Declarative Terraform state drift detection & remediation",
    ],
    capabilities: [
      { title: "Automated Spot Scheduling", copy: "Fault-tolerant spot instance pool fallback strategies." },
      { title: "IAM Least-Privilege Enforcer", copy: "Scans active IAM roles and prunes unused permission grants." },
    ],
    deliverables: [
      "StalciOps CLI & Kubernetes Operator",
      "Prometheus metric exporters",
      "Cost optimization dashboard",
    ],
    stack: ["Go", "Kubernetes", "Terraform", "Prometheus", "eBPF"],
  },
  "cloud-management-platform": {
    slug: "cloud-management-platform",
    name: "StalciOps • Autonomous Cloud Fabric",
    tag: "CLOUD INFRASTRUCTURE",
    summary: "Multi-cloud cost governance and Kubernetes autoscaling.",
    overview: "Automated cloud cost reduction and Kubernetes scaling operator.",
    pricing: "-38% Spend",
    icon: "/images/products/stalci_ops.jpg",
    outcomes: [{ label: "Cloud Cost", value: "-38%" }],
    features: ["Dynamic Kubernetes pod autoscaling", "Real-time FinOps resource reclamation"],
    capabilities: [{ title: "Autoscaling Engine", copy: "Intelligent node right-sizing." }],
    deliverables: ["Kubernetes Operator"],
    stack: ["Go", "Kubernetes", "Terraform"],
  },
  "enterprise-design-studio": {
    slug: "enterprise-design-studio",
    name: "Stalci Design System Studio",
    tag: "UI/UX ARCHITECTURE",
    summary:
      "Enterprise design token engine and accessible component library generator that synchronizes Figma tokens directly with Tailwind CSS and React components.",
    overview:
      "Bridge the gap between product design and frontend engineering. Stalci Design System Studio transforms design variables directly into type-safe CSS variables and accessible Radix/Tailwind components.",
    pricing: "10x UI Velocity",
    icon: "/images/products/ai_studio.jpg",
    outcomes: [
      { label: "Design-to-Code Speed", value: "10x Faster" },
      { label: "Accessibility Score", value: "WCAG AAA" },
    ],
    features: [
      "Bi-directional Figma to React token syncing",
      "WCAG 2.1 AAA contrast and keyboard navigation verification",
      "Comprehensive UI component documentation generator",
    ],
    capabilities: [{ title: "Token Synchronizer", copy: "Automated GitHub PR creation on Figma token export." }],
    deliverables: ["NPM Component Package", "Storybook Documentation"],
    stack: ["TypeScript", "React", "Tailwind CSS", "Figma API"],
  },
  "security-compliance-suite": {
    slug: "security-compliance-suite",
    name: "Stalci Shield • Security & Compliance Suite",
    tag: "CYBERSECURITY ACCELERATOR",
    summary:
      "Continuous compliance monitoring engine that collects evidence for SOC 2 Type II, ISO 27001, and HIPAA certification.",
    overview:
      "Automate security compliance auditing. Stalci Shield connects to cloud infrastructure, GitHub repos, and identity providers to continuously verify security policies.",
    pricing: "100% Continuous Audit",
    icon: "/images/products/stalci_ops.jpg",
    outcomes: [
      { label: "Audit Evidence Prep", value: "Automated" },
      { label: "Policy Compliance Rate", value: "100%" },
    ],
    features: [
      "Automated infrastructure security compliance mapping",
      "Real-time vulnerability alert triage and PR creation",
      "One-click auditor export reports",
    ],
    capabilities: [{ title: "Evidence Collector", copy: "Continuous cloud API configuration snapshotting." }],
    deliverables: ["Security Dashboard App", "Automated Compliance Reports"],
    stack: ["Python", "AWS SDK", "PostgreSQL", "React"],
  },
};

// ==========================================
// 3. INDUSTRIES DATA
// ==========================================
export const INDUSTRIES_DATA: Record<string, IndustryEntry> = {
  fintech: {
    slug: "fintech",
    title: "FinTech & Banking Infrastructure",
    tagline: "HIGH-THROUGHPUT, SECURE FINANCIAL SYSTEMS.",
    tag: "FINTECH & BANKING",
    summary:
      "Low-latency ledger engines, ISO 20022 payment gateways, fraud detection models, and PCI-DSS compliant cloud enclaves.",
    overview:
      "Financial institutions demand strict transaction determinism, immutable audit trails, and microsecond data processing. STALCI builds core banking ledgers, automated reconciliation pipelines, algorithmic risk management models, and biometric mobile banking applications tailored for global financial standards.",
    icon: Building2,
    outcomes: [
      { label: "Transaction Processing SLA", value: "99.999%" },
      { label: "Ledger Latency", value: "< 5ms" },
      { label: "PCI-DSS Level 1 Compliance", value: "Certified" },
    ],
    challenges: [
      "Legacy mainframe architectures with high latency and vendor lock-in.",
      "Strict regulatory requirements around data residence and PCI-DSS compliance.",
      "Real-time fraud prevention without false-positive checkout friction.",
    ],
    solutions: [
      "Event-driven microservices architecture built with Go and Kafka.",
      "Air-gapped private cloud enclaves with hardware security module (HSM) key management.",
      "On-edge ML models that detect anomalous transaction patterns in under 10ms.",
    ],
    capabilities: [
      { title: "Immutable Ledger Engines", copy: "Double-entry accounting systems with cryptographic hash chains." },
      { title: "ISO 20022 Messaging", copy: "Native SWIFT and FedNow payment message parsing and routing." },
    ],
    deliverables: [
      "Core Banking Ledger Engine",
      "PCI-DSS Level 1 Infrastructure Topology",
      "Real-Time Fraud Prevention Service",
    ],
    compliance: ["PCI-DSS Level 1", "SOC 2 Type II", "ISO 20022", "GDPR / CCPA"],
  },
  healthcare: {
    slug: "healthcare",
    title: "HealthTech & Life Sciences",
    tagline: "HIPAA-COMPLIANT DIGITAL HEALTHCARE PLATFORMS.",
    tag: "HEALTHTECH & LIFE SCIENCES",
    summary:
      "FHIR/HL7 interoperability engines, HIPAA-compliant patient telemetry platforms, and privacy-preserving medical AI diagnostics.",
    overview:
      "Modern healthcare software must bridge clinical compliance with modern UX. We engineer secure FHIR data pipelines, remote patient monitoring dashboards, telehealth video infrastructure, and federated machine learning models trained on medical imaging without exposing raw PHI.",
    icon: Activity,
    outcomes: [
      { label: "HIPAA Compliance Status", value: "100% Compliant" },
      { label: "FHIR Data Sync Speed", value: "Real-Time" },
      { label: "Diagnostic AI Accuracy", value: "98.4%" },
    ],
    challenges: [
      "Siloed electronic health record (EHR) data formats across legacy hospital systems.",
      "Rigorous HIPAA and HITECH privacy rules restricting cloud analytics.",
      "High streaming latency for remote ICU and telemetry monitoring devices.",
    ],
    solutions: [
      "Unified FHIR API gateway converting legacy HL7 v2 messages into JSON streams.",
      "Zero-knowledge encryption for PHI data in transit and at rest.",
      "Edge-processed computer vision models for rapid medical image segmentation.",
    ],
    capabilities: [
      { title: "FHIR R4 Server Architecture", copy: "Interoperable health data access layer adhering to CMS guidelines." },
      { title: "Federated Learning Enclaves", copy: "Train diagnostic models across hospital nodes without copying PHI." },
    ],
    deliverables: [
      "FHIR Interoperable Data Engine",
      "HIPAA Compliance Security Audit Vault",
      "Telehealth & Remote Monitoring Portal",
    ],
    compliance: ["HIPAA / HITECH", "FDA Software as Medical Device (SaMD)", "SOC 2 Type II"],
  },
  ecommerce: {
    slug: "ecommerce",
    title: "E-Commerce & Digital Commerce",
    tagline: "HEADLESS COMMERCE BUILT FOR GLOBAL SCALE.",
    tag: "E-COMMERCE & RETAIL",
    summary:
      "Headless storefronts, dynamic pricing engines, high-concurrency inventory sync, and hyper-personalized search platforms.",
    overview:
      "Digital commerce demands instant page loads and zero-downtime flash sale readiness. STALCI constructs composable headless commerce engines on Next.js, Shopify Plus, Commercetools, and Redis, guaranteeing sub-second checkout speeds during extreme traffic spikes.",
    icon: Zap,
    outcomes: [
      { label: "Page Load Speed", value: "0.4 Seconds" },
      { label: "Black Friday Uptime", value: "100.00%" },
      { label: "Checkout Conversion Lift", value: "+28.5%" },
    ],
    challenges: [
      "Monolithic commerce platforms failing under heavy peak traffic.",
      "Slow page speeds causing cart abandonment and low ad conversion.",
      "Inventory sync mismatches between online stores and brick-and-mortar warehouses.",
    ],
    solutions: [
      "Edge-rendered React/Next.js storefronts cached on global CDN points of presence.",
      "Event-driven inventory synchronization powered by Redis Pub/Sub.",
      "AI-driven product recommendations and personalized search rankings.",
    ],
    capabilities: [
      { title: "Headless Composable Architecture", copy: "Decoupled frontend connected via GraphQL to commerce engines." },
      { title: "Sub-Second Global Search", copy: "Algolia & Typesense integration with real-time inventory filtering." },
    ],
    deliverables: [
      "Next.js Headless Storefront Codebase",
      "Multi-Warehouse Inventory Sync Pipeline",
      "AI Product Recommendation Microservice",
    ],
    compliance: ["PCI-DSS Level 1", "GDPR", "CCPA"],
  },
  logistics: {
    slug: "logistics",
    title: "Logistics & Fleet Management",
    tagline: "REAL-TIME SUPPLY CHAIN TELEMETRY & ROUTING.",
    tag: "LOGISTICS & FLEET",
    summary:
      "IoT telemetry ingestion engines, automated vehicle route optimization algorithms, and real-time freight tracking portals.",
    overview:
      "Global logistics relies on real-time visibility and route efficiency. We engineer telemetry processing engines that ingest GPS and sensor feeds from tens of thousands of active vehicles, optimizing multi-stop dispatch schedules with custom TSP algorithms.",
    icon: Boxes,
    outcomes: [
      { label: "Fuel Cost Savings", value: "-22% Avg" },
      { label: "On-Time Delivery Rate", value: "98.7%" },
      { label: "Telemetry Latency", value: "< 500ms" },
    ],
    challenges: [
      "Inability to handle millions of real-time GPS telemetry pings.",
      "Sub-optimal delivery routing leading to excess fuel expenditure.",
      "Lack of unified visibility for shippers, dispatchers, and drivers.",
    ],
    solutions: [
      "Apache Flink stream processing pipeline consuming MQTT payload streams.",
      "Custom graph-theory route optimization engine calculating traffic factors in real-time.",
      "Responsive driver mobile apps with offline GPS map caching.",
    ],
    capabilities: [
      { title: "MQTT Telemetry Ingestion", copy: "Scalable broker cluster handling 50k+ vehicle pings/sec." },
      { title: "Dynamic Routing Engine", copy: "Automated dispatch optimization matching cargo size to fleet capacity." },
    ],
    deliverables: [
      "Real-Time Telemetry Pipeline",
      "Fleet Dispatch Operations Portal",
      "Driver Mobile App (iOS/Android)",
    ],
    compliance: ["ELD Compliance", "ISO 27001"],
  },
  "energy-sustainability": {
    slug: "energy-sustainability",
    title: "Energy & CleanTech Systems",
    tagline: "SMART GRID ANALYTICS & CARBON TRACKING.",
    tag: "ENERGY & CLEANTECH",
    summary:
      "Grid telemetry monitoring platforms, renewable energy forecasting models, and ESG carbon accounting ledger engines.",
    overview:
      "Clean energy transitions depend on precise sensor data and predictive modeling. STALCI crafts smart grid IoT platforms that ingest solar/wind generation data, forecasting battery storage requirements and automating carbon credit verification pipelines.",
    icon: CloudLightning,
    outcomes: [
      { label: "Grid Forecasting Accuracy", value: "96.8%" },
      { label: "Data Sampling Rate", value: "100ms IoT" },
      { label: "Carbon Accounting Audit", value: "Verified" },
    ],
    challenges: [
      "Intermittent renewable generation creating grid frequency fluctuations.",
      "Manual ESG carbon accounting susceptible to greenwashing claims.",
    ],
    solutions: [
      "Time-series ML forecasting models predicting battery discharge cycles.",
      "Cryptographic ledger recording verifiable carbon footprint data.",
    ],
    capabilities: [
      { title: "Time-Series Analytics", copy: "InfluxDB / TimescaleDB pipelines processing smart meter feeds." },
    ],
    deliverables: [
      "Smart Grid Analytics Platform",
      "ESG Carbon Tracking Ledger",
    ],
    compliance: ["ISO 14064", "GHG Protocol", "SOC 2"],
  },
};

// ==========================================
// 4. PROJECTS / CASE STUDIES DATA
// ==========================================
export const PROJECTS_DATA: Record<string, ProjectEntry> = {
  "apex-banking-ai": {
    slug: "apex-banking-ai",
    title: "Apex Global Banking • Sovereign AI Agent Enclave",
    client: "Apex Tier-1 Investment Bank",
    industry: "FinTech & Banking",
    summary:
      "Engineered an air-gapped sovereign AI assistant inside a Tier-1 bank's isolated VPC, reducing financial compliance document audit times by 84%.",
    overview:
      "Apex Banking required a secure AI solution to analyze thousands of complex regulatory compliance filings, credit risk agreements, and cross-border tax docs without exposing customer data to public LLM APIs.",
    challenge:
      "Third-party AI APIs breached the bank's strict zero-data-retention compliance policies, while existing search tools required financial analysts 6+ hours per loan file review.",
    solution:
      "STALCI deployed a private cluster of fine-tuned Llama-3 70B models combined with a pgvector hybrid semantic retrieval index within the client's AWS Outposts enclave.",
    architecture:
      "Private AWS Outposts VPC enclave -> vLLM inference engine -> Hybrid BM25/pgvector RAG -> FastAPI zero-trust gateway -> React 19 Analyst Suite.",
    image: "/images/hero_architecture.jpg",
    category: "AI & FinTech",
    impactMetrics: [
      { label: "Audit Time per File", value: "12 Mins (down from 6 hrs)" },
      { label: "Data Leakage Incidents", value: "0 Incidents" },
      { label: "Cost Reduction vs API", value: "-72% Annual" },
    ],
    outcomes: [
      { label: "Document Processing Speed", value: "84% Faster" },
      { label: "Analyst Adoption Rate", value: "1,400+ Active" },
    ],
    capabilities: [
      { title: "Air-Gapped LLM Inference", copy: "vLLM running on NVIDIA H100 GPU nodes with zero internet egress." },
      { title: "Financial Document Parser", copy: "Structured extraction of PDF tables, financial notes, and covenants." },
    ],
    deliverables: [
      "Sovereign AI Model Weights & Enclave Config",
      "Analyst Web Portal (React 19 / TypeScript)",
      "SOC 2 Audit Compliance Verification Document",
    ],
    stack: ["Python", "vLLM", "pgvector", "FastAPI", "React", "AWS Outposts"],
    featured: true,
  },
  "nova-cloud-fabric": {
    slug: "nova-cloud-fabric",
    title: "Nova Global • Multi-Region Kubernetes Transformation",
    client: "Nova Logistics Platform",
    industry: "Logistics & Enterprise SaaS",
    summary:
      "Migrated a monolithic SaaS infrastructure into zero-downtime multi-region EKS clusters, cutting annual cloud spend by $1.4M.",
    overview:
      "Nova Logistics experienced frequent server outages during peak holiday shipping windows due to monolithic database locking and manual deployment scripts.",
    challenge:
      "Legacy EC2 instances could not scale rapidly enough, resulting in 4% lost transaction revenue during Black Friday sales.",
    solution:
      "STALCI refactored the codebase into Go-based microservices, implemented declarative Terraform infrastructure, and deployed an ArgoCD GitOps pipeline across AWS US-East and EU-West regions.",
    architecture:
      "AWS Multi-Region EKS -> Istio Service Mesh -> Kafka Telemetry Engine -> PostgreSQL Aurora Global Database -> Cloudflare Enterprise Routing.",
    image: "/images/hero_architecture.jpg",
    category: "Cloud & DevOps",
    impactMetrics: [
      { label: "Annual Cloud Cost Savings", value: "$1.4M / Year" },
      { label: "Black Friday Uptime", value: "100.00%" },
      { label: "Deployment Velocity", value: "45 Releases / Day" },
    ],
    outcomes: [
      { label: "Cloud Waste Reduction", value: "-41% OPEX" },
      { label: "System Uptime SLA", value: "99.999%" },
    ],
    capabilities: [
      { title: "Multi-Region EKS Mesh", copy: "Active-active failover with automatic latency-based DNS routing." },
      { title: "ArgoCD GitOps Pipeline", copy: "Declarative continuous delivery with automated blue-green rollbacks." },
    ],
    deliverables: [
      "Multi-Region Terraform & Helm Repository",
      "ArgoCD Continuous Deployment Pipeline",
      "Grafana Observability Dashboard",
    ],
    stack: ["AWS EKS", "Terraform", "Go", "Kubernetes", "Istio", "ArgoCD"],
    featured: true,
  },
  "pulse-health-engine": {
    slug: "pulse-health-engine",
    title: "Pulse Health • Real-Time Patient Telemetry Portal",
    client: "Pulse Health Sciences",
    industry: "HealthTech & Life Sciences",
    summary:
      "Built a HIPAA-compliant real-time ICU telemetry ingestion system processing 50,000 vital sign pings per second with sub-second alert triggers.",
    overview:
      "Pulse Health needed to consolidate data from hospital patient bedside monitors into a unified clinical dashboard for central monitoring teams.",
    challenge:
      "Legacy hospital protocols lacked standardized telemetry formats, creating 5-10 minute alert delays for critical patient vitals.",
    solution:
      "STALCI engineered an MQTT / Apache Flink streaming pipeline that converts raw device streams into standardized FHIR messages, surfacing critical alerts in real-time.",
    architecture:
      "Bedside Monitors -> MQTT Edge Broker -> Apache Flink Stream Processor -> FHIR Server -> WebSockets -> Next.js Clinical Portal.",
    image: "/images/hero_architecture.jpg",
    category: "HealthTech & Data",
    impactMetrics: [
      { label: "Alert Notification Delay", value: "< 250ms" },
      { label: "Bedside Monitor Concurrency", value: "50,000 Active" },
      { label: "HIPAA Security Score", value: "100% Passed" },
    ],
    outcomes: [
      { label: "Clinical Response Time", value: "70% Faster" },
      { label: "Data Loss Rate", value: "0.000%" },
    ],
    capabilities: [
      { title: "Sub-Second MQTT Telemetry", copy: "High-throughput streaming engine with low-latency WebSocket push." },
      { title: "FHIR Data Standardizer", copy: "Automated normalization of medical vital streams into FHIR resources." },
    ],
    deliverables: [
      "HIPAA Telemetry Processing Microservice",
      "Next.js Real-Time Clinical Dashboard",
      "HIPAA Compliance Evidence Documentation",
    ],
    stack: ["Java", "Apache Flink", "MQTT", "Next.js", "FHIR", "PostgreSQL"],
    featured: true,
  },
  "nexus-supply-chain": {
    slug: "nexus-supply-chain",
    title: "Nexus Cargo • Autonomous Fleet Route Optimizer",
    client: "Nexus Global Logistics",
    industry: "Logistics & Fleet",
    summary:
      "Developed a mobile fleet dispatch app and dynamic graph routing engine that reduced fleet fuel consumption by 22%.",
    overview:
      "Nexus Cargo managed over 4,000 delivery vehicles across North America with legacy manual dispatching scripts.",
    challenge:
      "Traffic delays and unoptimized route sequencing resulted in excess fuel consumption and high late-delivery penalties.",
    solution:
      "STALCI built a dynamic graph route optimizer coupled with a Swift/Kotlin mobile application providing offline-first navigation.",
    architecture:
      "Rust Route Optimization Microservice -> ClickHouse Analytics -> React Native Mobile App -> AWS IoT Core.",
    image: "/images/hero_architecture.jpg",
    category: "Mobile & Logistics",
    impactMetrics: [
      { label: "Fuel Spend Reduction", value: "-22% Savings" },
      { label: "On-Time Deliveries", value: "98.8%" },
      { label: "Active Fleet Vehicles", value: "4,200 Trucks" },
    ],
    outcomes: [
      { label: "Route Calculation Speed", value: "< 3 Seconds" },
      { label: "Driver Mobile Rating", value: "4.9 / 5.0" },
    ],
    capabilities: [
      { title: "Rust Graph Route Engine", copy: "Ultra-fast Traveling Salesperson Problem solver with traffic parameters." },
      { title: "Offline Mobile Sync", copy: "WatermelonDB offline caching for remote mountain delivery routes." },
    ],
    deliverables: [
      "Rust Route Optimization Service",
      "React Native Driver App (iOS/Android)",
      "Fleet Dispatch Control Room Web App",
    ],
    stack: ["Rust", "React Native", "ClickHouse", "TypeScript", "AWS IoT"],
    featured: false,
  },
};

// ==========================================
// 5. BLOG POSTS DATA
// ==========================================
export const BLOGS_DATA: Record<string, BlogPostEntry> = {
  "sovereign-ai-architecture": {
    slug: "sovereign-ai-architecture",
    title: "Architecting Sovereign AI: Deploying Private LLMs in Isolated VPC Enclaves",
    summary:
      "A deep technical breakdown of fine-tuning open-weights models (Llama 3, Qwen 2.5), setting up vLLM GPU paging, and securing zero-leakage RAG retrieval pipelines.",
    content: `
# Architecting Sovereign AI: Deploying Private LLMs in Isolated VPC Enclaves

As enterprise AI adoption transitions from exploratory prototypes to core production workloads, the reliance on third-party commercial LLM APIs presents significant architectural risks. Concerns regarding data privacy, regulatory compliance (SOC 2, HIPAA, GDPR), API rate-limiting, and unpredictable token pricing have driven leading enterprise organizations toward **Sovereign AI**—deploying client-owned, domain-adapted machine learning models inside isolated cloud or on-premise enclaves.

In this paper, we outline the exact architecture STALCI uses to deploy private sovereign LLM enclaves with sub-15ms Time-to-First-Token (TTFT) performance and absolute zero data retention guarantees.

---

## The 4 Pillars of Sovereign AI Architecture

### 1. Model Selection & Fine-Tuning
Rather than relying on generalist 175B+ parameter models, sovereign architectures leverage compact, domain-specialized weights (e.g., Llama-3 8B/70B, Qwen-2.5 32B, DeepSeek R1 Distill). We apply **QLoRA (Quantized Low-Rank Adaptation)** fine-tuning on proprietary enterprise corpora:

\`\`\`python
# Example QLoRA configuration snippet using PEFT & BitsAndBytes
from peft import LoraConfig, get_peft_model
import torch

peft_config = LoraConfig(
    r=16,
    lora_alpha=32,
    target_modules=["q_proj", "v_proj", "k_proj", "o_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM"
)
\`\`\`

### 2. High-Throughput Inference with vLLM PagedAttention
Serving self-hosted models efficiently requires optimizing GPU VRAM memory management. By deploying **vLLM** with PagedAttention, we eliminate memory fragmentation and achieve up to 4x throughput improvements over naive PyTorch serving pipelines:

- **KV Cache Paging**: Allocates virtual memory blocks dynamically.
- **Continuous Batching**: Groups arriving requests on-the-fly without waiting for batch completion.
- **Tensor Parallelism**: Distributes model layers across multiple NVIDIA H100/A100 GPUs.

### 3. Hybrid Lexical-Semantic RAG Retrieval
Pure vector embeddings often struggle with exact keyword lookups (e.g., invoice numbers, SKU codes). Our retrieval engine combines **pgvector** dense embeddings with **BM25 sparse lexical search**, re-ranked by a Cross-Encoder model.

### 4. Zero-Trust Security & Confidential Computing
- **Air-Gapped Network Topology**: Model nodes run inside VPC subnets with zero internet egress routes.
- **Deterministic Guardrails**: Output JSON schemas are strictly validated using Pydantic / Zod models before returning to application callers.
- **Audit Logging**: Every prompt and generation is logged to an immutable hash chain for compliance monitoring.

---

## Conclusion

Sovereign AI is not just a security choice—it is a competitive capability. Owning your weights, vectors, and inference pipelines ensures long-term operational autonomy and cost efficiency.
    `,
    category: "AI & Machine Learning",
    author: {
      name: "Dr. Elena Rostova",
      role: "Principal AI Architect, STALCI",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    },
    publishedAt: "August 15, 2026",
    readTime: "8 min read",
    tags: ["Sovereign AI", "LLM", "vLLM", "RAG", "PyTorch", "AWS"],
    image: "/images/hero_architecture.jpg",
  },
  "zero-trust-kubernetes": {
    slug: "zero-trust-kubernetes",
    title: "Zero-Trust Kubernetes: Implementing Istio mTLS and Egress Control at Scale",
    summary:
      "Learn how to lock down multi-cluster Kubernetes environments using Istio ambient mesh, automated SPIFFE/SPIRE certificates, and strict egress network policies.",
    content: `
# Zero-Trust Kubernetes: Implementing Istio mTLS and Egress Control at Scale

In a traditional perimeter-based security model, once a malicious actor breaches the external ingress load balancer, they enjoy unrestricted lateral movement across internal microservices. In enterprise Kubernetes clusters running hundreds of services, this vulnerability is unacceptable.

Implementing a **Zero-Trust Security Architecture** ensures that every internal request—regardless of origin—must be explicitly authenticated, authorized, and encrypted.

---

## Step 1: Automated Mutual TLS (mTLS) with Istio

Istio automatically injects sidecar proxies (or ambient mesh ztunnels) into application pods. We enforce \`STRICT\` mTLS across all namespaces:

\`\`\`yaml
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: production
spec:
  mtls:
    mode: STRICT
\`\`\`

## Step 2: Microsegmentation via AuthorizationPolicies

Rather than allowing blanket pod-to-pod network traffic, we define explicit least-privilege AuthorizationPolicies:

\`\`\`yaml
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: billing-service-policy
  namespace: production
spec:
  selector:
    matchLabels:
      app: billing-service
  rules:
  - from:
    - source:
        principals: ["cluster.local/ns/production/sa/checkout-service-account"]
    to:
    - operation:
        methods: ["POST"]
        paths: ["/v1/charge"]
\`\`\`

## Step 3: Controlling Egress Traffic

Prevent compromised containers from establishing outbound C2 (Command & Control) connections by locking down outbound routing through dedicated Egress Gateways with Domain Whitelisting.

---

## Summary

Zero-Trust is not a single product—it is an engineering discipline. By enforcing mTLS, identity-based ACLs, and strict egress controls, your Kubernetes infrastructure remains resilient against advanced threats.
    `,
    category: "Cloud & Security",
    author: {
      name: "Marcus Vance",
      role: "VP of Cloud & Security Engineering",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    },
    publishedAt: "August 02, 2026",
    readTime: "6 min read",
    tags: ["Kubernetes", "Istio", "Zero-Trust", "DevOps", "Security"],
    image: "/images/hero_architecture.jpg",
  },
  "react-19-nextjs-performance": {
    slug: "react-19-nextjs-performance",
    title: "Maximizing Frontend Throughput: React 19 Server Actions & Streaming SSR",
    summary:
      "How to achieve 100/100 Lighthouse performance scores and sub-200ms First Contentful Paint using React 19, Next.js Server Components, and optimized layout math.",
    content: `
# Maximizing Frontend Throughput: React 19 Server Actions & Streaming SSR

User experience is directly tied to performance. Studies consistently demonstrate that every 100ms delay in page load time reduces conversion rates by up to 7%.

With **React 19** and modern Server Components (RSC), developers have access to powerful paradigm shifts that minimize client-side JavaScript bundles while accelerating initial paint times.

---

## Key Strategies for Sub-200ms Paint Times

1. **Zero-Bundle React Server Components**: Shift heavy dependencies (markdown parsers, date formatters, data fetchers) entirely to the server execution phase.
2. **Streaming SSR with Suspense Boundaries**: Send static HTML shells immediately while streaming slow async data components as script chunks.
3. **Optimized Dynamic Layout Math**: Eliminate cumulative layout shift (CLS) by pre-computing exact element aspect ratios and bounding boxes rather than relying on un-sized image placeholders.

---

## Conclusion

High performance frontend architecture requires intentional design token choices and lean component boundaries.
    `,
    category: "Frontend Engineering",
    author: {
      name: "Aria Thorne",
      role: "Lead Design Systems Architect",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    },
    publishedAt: "July 24, 2026",
    readTime: "5 min read",
    tags: ["React 19", "Next.js", "TypeScript", "Frontend", "Performance"],
    image: "/images/hero_architecture.jpg",
  },
};

// ==========================================
// 6. TESTIMONIALS DATA
// ==========================================
export const TESTIMONIALS_DATA: TestimonialEntry[] = [
  {
    id: "test-1",
    quote:
      "STALCI engineered our sovereign AI infrastructure in record time. What used to take our compliance team 6 hours per file is now processed in under 12 minutes. Their technical rigor is unmatched.",
    author: "Jonathan Sterling",
    role: "Chief Technology Officer",
    company: "Apex Global Banking",
    rating: 5,
    metric: "84%",
    metricLabel: "Audit Time Speedup",
    verified: true,
  },
  {
    id: "test-2",
    quote:
      "Migrating our monolithic backend to STALCI's multi-region Kubernetes setup was seamless. We handled Black Friday traffic with 100.00% uptime while reducing our cloud bill by $1.4M annually.",
    author: "Sarah Lin",
    role: "VP of Infrastructure",
    company: "Nova Logistics",
    rating: 5,
    metric: "$1.4M",
    metricLabel: "Annual Cloud Savings",
    verified: true,
  },
  {
    id: "test-3",
    quote:
      "The mobile app STALCI built for our fleet drivers achieved a 120 FPS fluid UI and flawless offline sync. Our drivers love it, and our fuel expenditure dropped by 22% in the first quarter.",
    author: "David Kravitz",
    role: "Head of Digital Operations",
    company: "Nexus Logistics",
    rating: 5,
    metric: "-22%",
    metricLabel: "Fuel Spend Reduction",
    verified: true,
  },
];

// ==========================================
// 7. CAREERS DATA
// ==========================================
export const JOBS_DATA: JobEntry[] = [
  {
    id: "job-1",
    title: "Principal Sovereign AI / ML Engineer",
    department: "AI & Intelligence",
    location: "San Francisco, CA / Remote",
    type: "Full-Time",
    experience: "7+ Years",
    summary:
      "Lead the design, fine-tuning, and deployment of client-hosted sovereign LLM models, RAG vector pipelines, and autonomous multi-agent systems.",
    responsibilities: [
      "Architect and fine-tune open-weights models (Llama 3, Qwen, DeepSeek) using QLoRA and PEFT.",
      "Optimize vLLM inference engine deployments on multi-GPU NVIDIA clusters.",
      "Design hybrid lexical-semantic RAG pipelines using pgvector and Milvus.",
      "Collaborate with enterprise clients to enforce zero-data-retention security policies.",
    ],
    requirements: [
      "Deep expertise in PyTorch, Python, CUDA, and vLLM.",
      "Proven track record deploying LLMs in production environments.",
      "Strong understanding of vector databases, embeddings, and reranking models.",
      "BS/MS in Computer Science or equivalent practical experience.",
    ],
    perks: ["Competitive Equity", "Unlimited PTO", "Latest M3 Max / GPU Workstations", "Health/Dental/Vision"],
  },
  {
    id: "job-2",
    title: "Senior Multi-Cloud & Kubernetes Architect",
    department: "Cloud & DevOps",
    location: "London, UK / Remote",
    type: "Full-Time",
    experience: "6+ Years",
    summary:
      "Design declarative Terraform infrastructure, Istio zero-trust service meshes, and GitOps CI/CD pipelines across AWS, GCP, and Azure.",
    responsibilities: [
      "Author modular Terraform infrastructure-as-code for multi-region EKS/GKE clusters.",
      "Implement zero-trust mTLS network policies using Istio ambient mesh.",
      "Establish ArgoCD GitOps pipelines for automated deployment promotions.",
      "Conduct continuous FinOps cost optimization audits for client workloads.",
    ],
    requirements: [
      "CKA / CKS certification preferred.",
      "Strong proficiency in Terraform, Go, Docker, and Kubernetes internals.",
      "Hands-on experience with Prometheus, Grafana, and Datadog observability.",
    ],
    perks: ["Competitive Equity", "Home Office Stipend", "Learning Budget ($3,000/yr)"],
  },
  {
    id: "job-3",
    title: "Staff Full-Stack Web Engineer (React 19 / TypeScript)",
    department: "Software Engineering",
    location: "Singapore / Remote",
    type: "Full-Time",
    experience: "5+ Years",
    summary:
      "Build high-throughput Next.js and React 19 web applications, real-time analytics dashboards, and modular design systems.",
    responsibilities: [
      "Engineer zero-layout-shift UI interfaces using React 19, TypeScript, and Tailwind CSS.",
      "Develop resilient REST, gRPC, and GraphQL API services in Node.js / Go.",
      "Maintain high code quality standards with automated unit, integration, and e2e tests.",
    ],
    requirements: [
      "Mastery of TypeScript, React 19, Next.js, and CSS layout algorithms.",
      "Experience with WebSockets, state management, and web performance tuning.",
    ],
    perks: ["Flexible Hours", "Global Team Offsites", "Full Health Coverage"],
  },
];

// ==========================================
// 8. FAQ DATA
// ==========================================
export const FAQ_ITEMS = [
  {
    question: "What is Sovereign AI and why does my company need it?",
    answer:
      "Sovereign AI refers to deploying custom-trained machine learning models and LLMs inside your own private cloud or on-premise infrastructure. Unlike public AI APIs (where your proprietary prompts and data pass through third-party servers), Sovereign AI guarantees 100% data privacy, zero third-party retention, and fixed operational costs.",
  },
  {
    question: "How quickly can STALCI kick off a sprint engagement?",
    answer:
      "We operate on a 14-day Sprint Zero lifecycle. Following an initial 30-minute discovery call, our principal architects deliver a deterministic sprint blueprint within 48 hours. Active engineering commences immediately in Sprint 1.",
  },
  {
    question: "Do you offer post-deployment maintenance and SLA guarantees?",
    answer:
      "Yes. Every client engagement includes dedicated 24/7/365 site reliability engineering (SRE) support options with guaranteed 99.99% uptime SLAs, automated security patching, and proactive performance optimization.",
  },
  {
    question: "Can STALCI work alongside our existing engineering team?",
    answer:
      "Absolutely. We operate both as an autonomous end-to-end delivery team and as an embedded architecture unit that pairs directly with your internal staff to upskill your engineers on AI, cloud, and modern frontend patterns.",
  },
];
