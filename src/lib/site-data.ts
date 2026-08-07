import {
  Code2,
  Smartphone,
  Cloud,
  BrainCircuit,
  ShieldCheck,
  Database,
  Workflow,
  LifeBuoy,
  Banknote,
  HeartPulse,
  ShoppingBag,
  GraduationCap,
  Factory,
  Truck,
  Building2,
  Plane,
  Radio,
  Gamepad2,
  Zap,
  Landmark,
  Boxes,
  Bot,
  LineChart,
  Lock,
  type LucideIcon,
} from "lucide-react";

export type DetailEntry = {
  slug: string;
  icon: LucideIcon;
  title: string;
  tag: string;
  summary: string;
  overview: string;
  capabilities: { title: string; copy: string }[];
  deliverables: string[];
  stack: string[];
  outcomes: { value: string; label: string }[];
};

export const services: DetailEntry[] = [
  {
    slug: "software-engineering",
    icon: Code2,
    title: "Enterprise Software Engineering",
    tag: "Build",
    summary: "Bespoke platforms and internal systems engineered for mission-critical workflows.",
    overview:
      "We design, build and run custom software for organisations where reliability is non-negotiable. From domain modelling and architecture to release engineering, our teams own the full lifecycle and hand over systems your own engineers can maintain.",
    capabilities: [
      { title: "Enterprise architecture", copy: "Domain-driven design, modular monoliths or microservices — chosen to fit your team, not a trend." },
      { title: "Full-stack delivery", copy: "React, TypeScript, Node, .NET, Java and Python squads shipping in two-week increments." },
      { title: "API & integration", copy: "REST, GraphQL and event-driven contracts with versioning, docs and SLA-backed gateways." },
      { title: "Modernisation", copy: "Strangler-fig migrations off legacy stacks with zero-downtime cutover plans." },
    ],
    deliverables: ["Architecture blueprint & ADRs", "Production-ready application", "CI/CD pipelines & IaC", "Test suites and QA automation", "Runbooks and handover training"],
    stack: ["TypeScript", "React", "Node.js", "Java", ".NET", "PostgreSQL", "Docker", "Kubernetes"],
    outcomes: [
      { value: "40%", label: "Faster release cadence" },
      { value: "99.9%", label: "Delivered uptime" },
      { value: "2 wks", label: "Time to first increment" },
    ],
  },
  {
    slug: "mobility",
    icon: Smartphone,
    title: "Enterprise Mobility Solutions",
    tag: "Mobile",
    summary: "Native and cross-platform apps with enterprise-grade performance and UX.",
    overview:
      "Field workforces, customer apps and internal tools that work offline, sync reliably and pass enterprise security review. We ship to the stores and to your MDM fleet.",
    capabilities: [
      { title: "Native iOS & Android", copy: "Swift and Kotlin for performance-critical, hardware-integrated experiences." },
      { title: "Cross-platform", copy: "React Native and Flutter for one codebase across both platforms." },
      { title: "Offline-first sync", copy: "Conflict-resolving local stores for low-connectivity field operations." },
      { title: "Secure distribution", copy: "MDM enrolment, certificate pinning and store release management." },
    ],
    deliverables: ["Design system & prototypes", "Store-ready builds", "Crash and usage analytics", "MDM distribution setup", "Release automation"],
    stack: ["Swift", "Kotlin", "React Native", "Flutter", "Firebase", "Fastlane"],
    outcomes: [
      { value: "4.7★", label: "Average store rating" },
      { value: "<1%", label: "Crash-free sessions lost" },
      { value: "50%", label: "Lower build cost vs native-only" },
    ],
  },
  {
    slug: "cloud-devops",
    icon: Cloud,
    title: "Cloud Infrastructure & DevOps",
    tag: "Cloud",
    summary: "Migrations, infrastructure-as-code and resilient CI/CD for continuous delivery.",
    overview:
      "We move workloads to the cloud without drama, then make deployments boring: reproducible environments, automated pipelines and observability from day one.",
    capabilities: [
      { title: "Cloud migration", copy: "Assessment, landing zones and phased migration across AWS, Azure and GCP." },
      { title: "Infrastructure as code", copy: "Terraform and Pulumi modules with policy checks in the pipeline." },
      { title: "Kubernetes platforms", copy: "Golden-path internal platforms with GitOps deployments." },
      { title: "SRE & cost control", copy: "SLOs, error budgets and continuous FinOps optimisation." },
    ],
    deliverables: ["Cloud landing zone", "Terraform modules", "CI/CD pipelines", "Observability stack", "Cost optimisation report"],
    stack: ["AWS", "Azure", "GCP", "Terraform", "Kubernetes", "ArgoCD", "Prometheus", "Grafana"],
    outcomes: [
      { value: "35%", label: "Average cloud cost saved" },
      { value: "10x", label: "Deployment frequency" },
      { value: "<15m", label: "Mean time to recovery" },
    ],
  },
  {
    slug: "ai-services",
    icon: BrainCircuit,
    title: "AI & Cognitive Services",
    tag: "AI",
    summary: "Generative AI, RAG architectures and predictive models deployed safely to production.",
    overview:
      "AI that survives contact with production: grounded on your data, evaluated continuously, governed for compliance and measured against a business metric — not a demo.",
    capabilities: [
      { title: "RAG & assistants", copy: "Retrieval pipelines over your documents with citations and access control." },
      { title: "Predictive models", copy: "Forecasting, churn, pricing and risk models with monitored drift." },
      { title: "MLOps", copy: "Feature stores, experiment tracking, evaluation harnesses and rollout gates." },
      { title: "Vision & NLP", copy: "Document extraction, classification and inspection pipelines." },
    ],
    deliverables: ["Use-case assessment", "Evaluation harness", "Production inference service", "Guardrails & audit logging", "Model monitoring dashboards"],
    stack: ["Python", "PyTorch", "LangChain", "Vector DBs", "MLflow", "Kubernetes"],
    outcomes: [
      { value: "60%", label: "Manual effort removed" },
      { value: "3 mo", label: "Idea to production" },
      { value: "100%", label: "Auditable responses" },
    ],
  },
  {
    slug: "cyber-security",
    icon: ShieldCheck,
    title: "Cybersecurity & Compliance",
    tag: "Security",
    summary: "Zero-trust architecture, threat mitigation and audit-ready compliance programmes.",
    overview:
      "We harden what you already run and build security into what comes next — identity first, least privilege everywhere, evidence collected automatically for auditors.",
    capabilities: [
      { title: "Offensive testing", copy: "Red teaming, penetration testing and secure code review." },
      { title: "Zero-trust identity", copy: "SSO, MFA, privileged access and workload identity design." },
      { title: "Compliance", copy: "ISO 27001, SOC 2, GDPR and HIPAA readiness with automated evidence." },
      { title: "Detection & response", copy: "SIEM tuning, playbooks and 24/7 monitored response." },
    ],
    deliverables: ["Threat model", "Penetration test report", "Remediation roadmap", "Policy pack", "Audit evidence automation"],
    stack: ["Okta", "Vault", "Wazuh", "Snyk", "Cloudflare", "OpenTelemetry"],
    outcomes: [
      { value: "0", label: "Critical findings at audit" },
      { value: "24/7", label: "Monitoring coverage" },
      { value: "90 d", label: "Typical path to SOC 2" },
    ],
  },
  {
    slug: "data-intelligence",
    icon: Database,
    title: "Data Architecture & Intelligence",
    tag: "Data",
    summary: "Modern data platforms, pipelines and BI that make decisions measurable.",
    overview:
      "One trusted layer for reporting, analytics and AI. We consolidate sources, model the semantics, and give every team self-serve access with governance intact.",
    capabilities: [
      { title: "Lakehouse platforms", copy: "Bronze/silver/gold modelling on warehouse-native architecture." },
      { title: "Pipelines", copy: "Batch and streaming ELT with contracts, tests and lineage." },
      { title: "Semantic layer", copy: "Shared metric definitions so every dashboard agrees." },
      { title: "BI & activation", copy: "Executive dashboards plus reverse-ETL into operational tools." },
    ],
    deliverables: ["Data platform architecture", "Ingestion pipelines", "dbt models & tests", "Governed BI workspace", "Data quality monitoring"],
    stack: ["Snowflake", "BigQuery", "dbt", "Airflow", "Kafka", "Power BI"],
    outcomes: [
      { value: "1", label: "Single source of truth" },
      { value: "80%", label: "Fewer report requests" },
      { value: "Real-time", label: "Operational telemetry" },
    ],
  },
  {
    slug: "automation",
    icon: Workflow,
    title: "Intelligent Automation",
    tag: "Automation",
    summary: "Workflow automation, RPA and system integration that removes manual work.",
    overview:
      "We map the process, remove the steps that shouldn't exist, then automate the rest across your existing systems — with humans kept in the loop where judgement matters.",
    capabilities: [
      { title: "Process discovery", copy: "Time-and-motion mapping to find the automations worth building." },
      { title: "RPA", copy: "Bots for legacy systems that have no API worth using." },
      { title: "Integration", copy: "Event-driven middleware connecting ERP, CRM and bespoke systems." },
      { title: "Orchestration", copy: "Durable workflows with retries, approvals and full audit trails." },
    ],
    deliverables: ["Process maps & ROI model", "Automation build", "Exception handling design", "Monitoring dashboards", "Team enablement"],
    stack: ["Temporal", "n8n", "UiPath", "Kafka", "Azure Logic Apps"],
    outcomes: [
      { value: "70%", label: "Cycle time reduction" },
      { value: "6 mo", label: "Typical payback period" },
      { value: "0", label: "Silent failures" },
    ],
  },
  {
    slug: "managed-services",
    icon: LifeBuoy,
    title: "Managed IT Services",
    tag: "Run",
    summary: "Proactive service management, monitoring and dedicated engineering pods.",
    overview:
      "A dedicated pod that knows your systems, on an SLA you can hold us to. We keep the lights on and keep shipping improvements in the same sprint cadence.",
    capabilities: [
      { title: "24/7 NOC & SOC", copy: "Follow-the-sun monitoring with defined escalation paths." },
      { title: "Dedicated pods", copy: "Named engineers, stable teams, predictable monthly cost." },
      { title: "Service management", copy: "ITIL-aligned incident, problem and change processes." },
      { title: "Continuous improvement", copy: "A share of every sprint reserved for reducing toil." },
    ],
    deliverables: ["Service catalogue & SLAs", "Monitoring and alerting", "Monthly service reports", "Improvement backlog", "Quarterly business reviews"],
    stack: ["Datadog", "PagerDuty", "Jira Service Management", "Grafana", "Ansible"],
    outcomes: [
      { value: "15 min", label: "P1 response time" },
      { value: "99.9%", label: "Service availability" },
      { value: "-45%", label: "Recurring incidents" },
    ],
  },
];

export const industries: DetailEntry[] = [
  {
    slug: "fintech-banking",
    icon: Banknote,
    title: "Fintech & Banking",
    tag: "Regulated",
    summary: "Payment gateways, lending cores, KYC automation and AI risk engines.",
    overview:
      "High-throughput, high-scrutiny systems. We build financial platforms that clear audit, settle correctly and scale through peak volume.",
    capabilities: [
      { title: "Payments", copy: "Card, UPI and account-to-account rails with idempotent settlement." },
      { title: "Lending", copy: "Origination, servicing and collections workflows." },
      { title: "KYC & AML", copy: "Automated onboarding with sanctions screening and case management." },
      { title: "Risk & fraud", copy: "Real-time scoring models with explainable decisions." },
    ],
    deliverables: ["Regulatory-ready architecture", "Core platform build", "Audit logging & reporting", "Load and resilience testing", "Compliance documentation"],
    stack: ["Java", "Kafka", "PostgreSQL", "Kubernetes", "Vault"],
    outcomes: [
      { value: "5k TPS", label: "Sustained throughput" },
      { value: "PCI-DSS", label: "Aligned architecture" },
      { value: "-60%", label: "Manual KYC review" },
    ],
  },
  {
    slug: "healthcare",
    icon: HeartPulse,
    title: "Healthcare & Life Sciences",
    tag: "Compliance",
    summary: "HIPAA-compliant data platforms, telehealth infrastructure and clinical systems.",
    overview:
      "Patient data handled properly: encrypted, access-controlled and interoperable with the standards your ecosystem already speaks.",
    capabilities: [
      { title: "Interoperability", copy: "HL7 and FHIR integration across EMR and lab systems." },
      { title: "Telehealth", copy: "Low-latency consultation platforms with recording and consent." },
      { title: "Clinical analytics", copy: "Cohort analysis and outcome dashboards on governed data." },
      { title: "Privacy engineering", copy: "De-identification, consent management and full audit trails." },
    ],
    deliverables: ["HIPAA gap assessment", "Interoperability layer", "Patient-facing application", "Access control model", "Audit and reporting suite"],
    stack: ["FHIR", "Azure Health", "Python", "React", "PostgreSQL"],
    outcomes: [
      { value: "HIPAA", label: "Compliant delivery" },
      { value: "-30%", label: "Admin workload" },
      { value: "24/7", label: "Clinical availability" },
    ],
  },
  {
    slug: "retail",
    icon: ShoppingBag,
    title: "Retail & Consumer Goods",
    tag: "Commerce",
    summary: "Headless commerce, order management and real-time personalisation.",
    overview:
      "Storefronts that stay fast during peak and a back office that always knows where the stock is.",
    capabilities: [
      { title: "Headless commerce", copy: "Composable storefronts with edge rendering and caching." },
      { title: "Order management", copy: "Unified inventory, fulfilment and returns across channels." },
      { title: "Personalisation", copy: "Real-time recommendations and segmentation." },
      { title: "Retail analytics", copy: "Margin, basket and cohort intelligence." },
    ],
    deliverables: ["Commerce architecture", "Storefront build", "OMS integration", "Personalisation engine", "Peak-load readiness plan"],
    stack: ["Next.js", "Shopify", "Algolia", "Redis", "Snowflake"],
    outcomes: [
      { value: "+22%", label: "Conversion uplift" },
      { value: "<1s", label: "Page load at peak" },
      { value: "99.99%", label: "Peak-season uptime" },
    ],
  },
  {
    slug: "education",
    icon: GraduationCap,
    title: "EdTech & Education",
    tag: "Learning",
    summary: "LMS architecture, adaptive assessment and student success platforms.",
    overview:
      "Learning platforms that hold up on results day — with content delivery, proctoring and analytics built for scale.",
    capabilities: [
      { title: "Learning platforms", copy: "Course delivery, cohorts and credentialing at scale." },
      { title: "Assessment", copy: "Adaptive testing with anti-cheat and secure proctoring." },
      { title: "Student analytics", copy: "Early-warning models for retention and intervention." },
      { title: "Content pipelines", copy: "Video transcoding, captioning and global CDN delivery." },
    ],
    deliverables: ["Platform architecture", "LMS build or integration", "Assessment engine", "Analytics dashboards", "Scale testing"],
    stack: ["React", "Node.js", "AWS Media", "PostgreSQL", "Redis"],
    outcomes: [
      { value: "100k+", label: "Concurrent learners" },
      { value: "+18%", label: "Course completion" },
      { value: "-40%", label: "Content ops effort" },
    ],
  },
  {
    slug: "manufacturing",
    icon: Factory,
    title: "Manufacturing & Industry 4.0",
    tag: "Industrial",
    summary: "IIoT telemetry, MES integration and predictive maintenance.",
    overview:
      "Connect the shop floor to the decision layer: sensor data collected reliably, surfaced live and turned into maintenance you schedule instead of firefight.",
    capabilities: [
      { title: "IIoT ingestion", copy: "Edge collection over OPC-UA and MQTT with store-and-forward." },
      { title: "MES & ERP integration", copy: "Bridging legacy plant systems to modern platforms." },
      { title: "Predictive maintenance", copy: "Anomaly detection on vibration, thermal and cycle data." },
      { title: "OEE dashboards", copy: "Line-level performance visibility in real time." },
    ],
    deliverables: ["Edge architecture", "Telemetry pipeline", "OEE dashboards", "Predictive models", "Plant rollout playbook"],
    stack: ["MQTT", "OPC-UA", "TimescaleDB", "Python", "Grafana"],
    outcomes: [
      { value: "-25%", label: "Unplanned downtime" },
      { value: "+12%", label: "OEE improvement" },
      { value: "Live", label: "Plant-wide visibility" },
    ],
  },
  {
    slug: "logistics",
    icon: Truck,
    title: "Logistics & Supply Chain",
    tag: "Operations",
    summary: "Fleet telematics, routing optimisation and warehouse automation.",
    overview:
      "Every parcel, vehicle and pallet accounted for — with optimisation that reflects real constraints, not textbook ones.",
    capabilities: [
      { title: "Telematics", copy: "Live fleet tracking, geofencing and driver safety analytics." },
      { title: "Route optimisation", copy: "Constraint-aware planning across time windows and capacity." },
      { title: "Warehouse systems", copy: "WMS integration, scanning apps and robotics interfaces." },
      { title: "Control tower", copy: "End-to-end shipment visibility with exception alerting." },
    ],
    deliverables: ["Visibility platform", "Optimisation engine", "Driver & warehouse apps", "Carrier integrations", "KPI reporting"],
    stack: ["Go", "PostGIS", "Kafka", "React Native", "Mapbox"],
    outcomes: [
      { value: "-18%", label: "Cost per delivery" },
      { value: "+9%", label: "On-time delivery" },
      { value: "Live", label: "Shipment tracking" },
    ],
  },
  {
    slug: "proptech",
    icon: Building2,
    title: "Real Estate & PropTech",
    tag: "Property",
    summary: "Listing syndication, CRM integration and predictive property analytics.",
    overview:
      "Portals and portfolio tools that keep listings accurate everywhere and give investment teams a defensible valuation view.",
    capabilities: [
      { title: "Listing platforms", copy: "Search, media pipelines and multi-portal syndication." },
      { title: "CRM integration", copy: "Lead routing and lifecycle automation for agents." },
      { title: "Valuation models", copy: "Comparable-driven pricing and yield forecasting." },
      { title: "Building operations", copy: "Tenant portals, ticketing and IoT building data." },
    ],
    deliverables: ["Portal build", "Syndication connectors", "Agent CRM workflows", "Analytics models", "Tenant experience app"],
    stack: ["Next.js", "Elasticsearch", "PostGIS", "Python", "AWS"],
    outcomes: [
      { value: "+35%", label: "Qualified lead volume" },
      { value: "1 h", label: "Listing sync latency" },
      { value: "-50%", label: "Manual data entry" },
    ],
  },
  {
    slug: "travel",
    icon: Plane,
    title: "Travel & Hospitality",
    tag: "Booking",
    summary: "High-concurrency booking engines, PMS integration and loyalty platforms.",
    overview:
      "Availability that is always correct and checkout that never buckles, integrated with the property and distribution systems you already run.",
    capabilities: [
      { title: "Booking engines", copy: "Inventory, pricing and reservation flows under high concurrency." },
      { title: "Distribution", copy: "GDS, channel manager and PMS integrations." },
      { title: "Loyalty", copy: "Tiers, points ledgers and partner redemption." },
      { title: "Guest experience", copy: "Mobile check-in, messaging and upsell journeys." },
    ],
    deliverables: ["Booking platform", "PMS/GDS connectors", "Loyalty ledger", "Guest mobile app", "Peak-load testing"],
    stack: ["Node.js", "Redis", "PostgreSQL", "React", "Kubernetes"],
    outcomes: [
      { value: "+27%", label: "Direct bookings" },
      { value: "0", label: "Overbooking incidents" },
      { value: "<500ms", label: "Availability response" },
    ],
  },
  {
    slug: "media-telecom",
    icon: Radio,
    title: "Media & Telecommunications",
    tag: "Streaming",
    summary: "Low-latency streaming, modern OSS/BSS and resilient subscriber portals.",
    overview:
      "Content and connectivity at national scale: delivery pipelines, billing correctness and self-service that reduces call volume.",
    capabilities: [
      { title: "Streaming delivery", copy: "Transcoding, DRM and multi-CDN low-latency playback." },
      { title: "OSS/BSS modernisation", copy: "Provisioning, rating and billing platform renewal." },
      { title: "Subscriber portals", copy: "Self-service accounts, plan changes and support." },
      { title: "Network analytics", copy: "Quality-of-experience monitoring and churn prediction." },
    ],
    deliverables: ["Streaming architecture", "Billing integration", "Subscriber portal", "QoE dashboards", "Migration plan"],
    stack: ["FFmpeg", "AWS Media", "Kafka", "Go", "React"],
    outcomes: [
      { value: "<3s", label: "Stream start time" },
      { value: "-30%", label: "Support call volume" },
      { value: "99.95%", label: "Playback availability" },
    ],
  },
  {
    slug: "gaming",
    icon: Gamepad2,
    title: "Gaming & Interactive",
    tag: "Realtime",
    summary: "Realtime backends, matchmaking and live-ops infrastructure.",
    overview:
      "Backends that hold up on launch day, with live-ops tooling that lets your team run events without an engineering ticket.",
    capabilities: [
      { title: "Realtime services", copy: "Authoritative game servers and state synchronisation." },
      { title: "Matchmaking", copy: "Skill-based, low-latency player matching at scale." },
      { title: "Live ops", copy: "Events, economy tuning and remote configuration." },
      { title: "Anti-cheat & telemetry", copy: "Behavioural detection and player analytics." },
    ],
    deliverables: ["Backend architecture", "Matchmaking service", "Live-ops console", "Telemetry pipeline", "Launch scale plan"],
    stack: ["Go", "Redis", "gRPC", "Kubernetes", "ClickHouse"],
    outcomes: [
      { value: "<60ms", label: "Regional latency" },
      { value: "1M+", label: "Peak concurrent players" },
      { value: "Zero", label: "Launch-day downtime" },
    ],
  },
  {
    slug: "energy",
    icon: Zap,
    title: "Energy & Utilities",
    tag: "Grid",
    summary: "Smart grid telemetry, metering infrastructure and sustainability reporting.",
    overview:
      "Grid and metering data collected at scale, reconciled for billing accuracy and reported against regulatory frameworks.",
    capabilities: [
      { title: "Smart metering", copy: "AMI ingestion, validation and estimation pipelines." },
      { title: "Grid telemetry", copy: "SCADA integration and load forecasting." },
      { title: "Billing accuracy", copy: "Reconciliation, settlement and exception workflows." },
      { title: "ESG reporting", copy: "Emissions accounting with auditable data lineage." },
    ],
    deliverables: ["Telemetry platform", "Metering data pipeline", "Forecasting models", "Regulatory reports", "Operations dashboards"],
    stack: ["Kafka", "TimescaleDB", "Python", "Azure", "Power BI"],
    outcomes: [
      { value: "-20%", label: "Billing exceptions" },
      { value: "15 min", label: "Interval data granularity" },
      { value: "Audit", label: "Ready ESG reporting" },
    ],
  },
  {
    slug: "public-sector",
    icon: Landmark,
    title: "Government & Public Sector",
    tag: "Citizen",
    summary: "Secure citizen portals, e-governance systems and compliant data enclaves.",
    overview:
      "Accessible, resilient digital services for citizens — built to procurement standards and designed for the whole population, not the average user.",
    capabilities: [
      { title: "Citizen services", copy: "Applications, payments and case tracking end to end." },
      { title: "Accessibility", copy: "WCAG 2.2 AA compliance verified with assistive technology." },
      { title: "Secure enclaves", copy: "Data residency, classification and controlled access." },
      { title: "Legacy modernisation", copy: "Phased migration from mainframe and on-premise systems." },
    ],
    deliverables: ["Service blueprint", "Accessible portal", "Case management system", "Security accreditation pack", "Support transition"],
    stack: ["React", ".NET", "PostgreSQL", "Keycloak", "Kubernetes"],
    outcomes: [
      { value: "WCAG AA", label: "Verified accessibility" },
      { value: "-55%", label: "Counter footfall" },
      { value: "24/7", label: "Service availability" },
    ],
  },
];

export const products: DetailEntry[] = [
  {
    slug: "stalciops",
    icon: Boxes,
    title: "StalciOps",
    tag: "Cloud Orchestration",
    summary: "Infrastructure control plane for multi-cloud governance and cost analytics.",
    overview:
      "One console for every environment you run. StalciOps provisions infrastructure from approved templates, enforces policy before apply, and shows the cost of every change before it lands.",
    capabilities: [
      { title: "Golden templates", copy: "Approved Terraform modules teams can self-serve safely." },
      { title: "Policy gates", copy: "Security and cost policy evaluated before every apply." },
      { title: "Cost intelligence", copy: "Per-team, per-service spend with forecast and anomaly alerts." },
      { title: "Ephemeral environments", copy: "Zero-touch preview environments per pull request." },
    ],
    deliverables: ["Hosted or self-managed deployment", "Cloud account onboarding", "Policy library setup", "Team training", "Ongoing support"],
    stack: ["Terraform", "Kubernetes", "AWS", "Azure", "GCP", "OPA"],
    outcomes: [
      { value: "35%", label: "Cloud spend reduction" },
      { value: "Minutes", label: "To a new environment" },
      { value: "100%", label: "Policy-checked changes" },
    ],
  },
  {
    slug: "stalci-ai-studio",
    icon: Bot,
    title: "Stalci AI Studio",
    tag: "Cognitive Intelligence",
    summary: "Build, govern and deploy LLM applications on your own data.",
    overview:
      "A workbench for teams shipping AI features: connect data sources, build retrieval pipelines, evaluate against test sets, and deploy behind guardrails with full audit history.",
    capabilities: [
      { title: "Retrieval pipelines", copy: "Connectors, chunking and hybrid search with access control." },
      { title: "Evaluation", copy: "Golden datasets, regression scoring and side-by-side comparison." },
      { title: "Guardrails", copy: "PII redaction, topic limits and human-in-the-loop review." },
      { title: "Observability", copy: "Trace every response back to prompt, context and cost." },
    ],
    deliverables: ["Workspace provisioning", "Data source connectors", "Evaluation suite", "Deployment pipeline", "Governance policies"],
    stack: ["Python", "LangChain", "Vector DBs", "OpenTelemetry", "Kubernetes"],
    outcomes: [
      { value: "3x", label: "Faster AI iteration" },
      { value: "100%", label: "Traceable responses" },
      { value: "-40%", label: "Inference cost" },
    ],
  },
  {
    slug: "stalci-insight",
    icon: LineChart,
    title: "Stalci Insight",
    tag: "Data Fabric",
    summary: "Warehouse-native analytics with a shared semantic layer and embedded BI.",
    overview:
      "Metrics defined once and used everywhere — dashboards, alerts and embedded customer-facing analytics all read the same governed definitions.",
    capabilities: [
      { title: "Semantic layer", copy: "Version-controlled metric definitions with lineage." },
      { title: "Realtime alerting", copy: "Threshold and anomaly alerts routed to the right team." },
      { title: "Embedded analytics", copy: "White-label dashboards inside your own product." },
      { title: "Self-serve exploration", copy: "Governed ad-hoc analysis without SQL." },
    ],
    deliverables: ["Warehouse connection", "Semantic model build", "Dashboard pack", "Embedding SDK", "Enablement workshops"],
    stack: ["Snowflake", "BigQuery", "dbt", "React", "DuckDB"],
    outcomes: [
      { value: "1", label: "Definition per metric" },
      { value: "-80%", label: "Ad-hoc report requests" },
      { value: "Seconds", label: "Query response" },
    ],
  },
  {
    slug: "stalci-shield",
    icon: Lock,
    title: "Stalci Shield",
    tag: "Cyber Resilience",
    summary: "Continuous posture management, threat intelligence and compliance validation.",
    overview:
      "Continuous assurance instead of an annual scramble: Shield scans your estate, maps findings to frameworks, and keeps auditor evidence collected automatically.",
    capabilities: [
      { title: "Continuous scanning", copy: "Cloud, code and dependency posture checked on every change." },
      { title: "Policy as code", copy: "Controls expressed as code and enforced in pipelines." },
      { title: "Compliance mapping", copy: "Findings mapped to ISO 27001, SOC 2 and GDPR controls." },
      { title: "Evidence automation", copy: "Audit artefacts collected and time-stamped continuously." },
    ],
    deliverables: ["Estate onboarding", "Control library configuration", "Remediation workflows", "Auditor evidence portal", "Quarterly reviews"],
    stack: ["OPA", "Trivy", "Snyk", "AWS", "Azure", "Elastic"],
    outcomes: [
      { value: "Daily", label: "Posture assessment" },
      { value: "-70%", label: "Audit preparation time" },
      { value: "0", label: "Surprise findings" },
    ],
  },
];

export function findEntry(list: DetailEntry[], slug: string) {
  return list.find((e) => e.slug === slug);
}
