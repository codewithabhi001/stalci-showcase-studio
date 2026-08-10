import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:password123@localhost:5433/stalci_db?schema=public';
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding Database with enterprise-grade realistic data...');

  // 1. SiteConfig
  await prisma.siteConfig.createMany({
    data: [
      { key: 'siteName', value: 'STALCI' },
      { key: 'siteTagline', value: 'Global IT Services, Cloud, AI & Cyber Security' },
      { key: 'heroTitle', value: 'We build AI-native software engineered to scale.' },
      { key: 'heroSubtitle', value: 'STALCI is a global technology company delivering custom software, cloud architecture, AI agentic systems, data pipelines and cyber security for enterprises that cannot afford downtime.' },
      { key: 'contactEmail', value: 'contact@stalci.com' },
      { key: 'supportEmail', value: 'support@stalci.com' },
      { key: 'phone', value: '+1 (415) 890-3200' },
      { key: 'location', value: 'San Francisco, CA & London, UK' },
      { key: 'companyAddress', value: '550 Howard Street, Suite 400, San Francisco, CA 94105' },
      { key: 'taxId', value: 'US-EIN-94-3829104' },
      { key: 'companySignatoryName', value: 'Abhishek Kumar' },
      { key: 'companySignatoryTitle', value: 'Founder & Managing Director' },
      { key: 'companyLogoUrl', value: '/stalci-mark.png' },
      { key: 'companySealText', value: 'STALCI GLOBAL CORPORATE SEAL' },
      { key: 'social_twitter', value: 'https://twitter.com/stalciglobal' },
      { key: 'social_linkedin', value: 'https://linkedin.com/company/stalci' },
      { key: 'social_github', value: 'https://github.com/stalci' },
      { key: 'stat_shipped', value: '140+' },
      { key: 'stat_uptime', value: '99.99%' },
      { key: 'stat_industries', value: '14' },
      { key: 'stat_support', value: '24/7/365' },
    ],
    skipDuplicates: true,
  });

  // 2. Clients
  const client1 = await prisma.client.upsert({
    where: { email: 's.jenkins@techcorp.io' },
    update: {},
    create: {
      name: 'Sarah Jenkins',
      email: 's.jenkins@techcorp.io',
      phone: '+1 (415) 555-0192',
      company: 'TechCorp Global',
      address: '100 Montgomery St, San Francisco, CA 94104',
      website: 'https://techcorp.io',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      status: 'ACTIVE',
      notes: 'Enterprise account. Signed 3-year cloud modernization & AI roadmap contract.',
    },
  });

  const client2 = await prisma.client.upsert({
    where: { email: 'm.vance@nexushealth.org' },
    update: {},
    create: {
      name: 'Marcus Vance',
      email: 'm.vance@nexushealth.org',
      phone: '+1 (212) 555-0143',
      company: 'Nexus Health Systems',
      address: '750 3rd Avenue, New York, NY 10017',
      website: 'https://nexushealth.org',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      status: 'ACTIVE',
      notes: 'HIPAA-compliant telehealth and patient triage AI assistant.',
    },
  });

  const client3 = await prisma.client.upsert({
    where: { email: 'elena@apexlogistics.de' },
    update: {},
    create: {
      name: 'Elena Rostova',
      email: 'elena@apexlogistics.de',
      phone: '+49 30 901820',
      company: 'Apex Global Logistics',
      address: 'Friedrichstraße 68, 10117 Berlin, Germany',
      website: 'https://apexlogistics.de',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      status: 'ACTIVE',
      notes: 'Real-time telemetry and automated route optimization engine.',
    },
  });

  const client4 = await prisma.client.upsert({
    where: { email: 'alex@fintechlabs.co.uk' },
    update: {},
    create: {
      name: 'Alexander Sterling',
      email: 'alex@fintechlabs.co.uk',
      phone: '+44 20 7946 0912',
      company: 'Nova FinTech Labs',
      address: '1 Canada Square, Canary Wharf, London E14 5AA',
      website: 'https://fintechlabs.co.uk',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      status: 'ACTIVE',
      notes: 'High-frequency algorithmic trading analytics & KYC pipeline.',
    },
  });

  // 3. Projects
  const project1 = await prisma.project.create({
    data: {
      title: 'StalciOps Cloud Intelligence Platform',
      slug: 'stalciops-cloud-intelligence',
      description: 'Multi-cloud autonomous cost optimization and kubernetes telemetry engine.',
      fullDescription: 'Architected and implemented a next-generation cloud infrastructure control plane that analyzes Kubernetes clusters, serverless workloads, and database egress across AWS, GCP, and Azure. Utilizes predictive ML models to dynamically scale compute pods and negotiate spot instances, slashing cloud expenditure by 38% while guaranteeing 99.999% SLA.',
      category: 'Cloud & Platform',
      clientId: client1.id,
      services: JSON.stringify(['Cloud Engineering', 'AI & Agentic Systems', 'DevOps & SRE']),
      technologies: JSON.stringify(['Go', 'Rust', 'Kubernetes', 'AWS EKS', 'OpenTelemetry', 'React', 'Tailwind CSS']),
      startDate: new Date('2025-11-01'),
      endDate: new Date('2026-06-30'),
      deadline: new Date('2026-06-30'),
      budget: 185000,
      status: 'COMPLETED',
      priority: 'URGENT',
      progress: 100,
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80',
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80'
      ]),
      liveUrl: 'https://stalciops.demo.stalci.com',
      githubUrl: 'https://github.com/stalci/stalciops-core',
      metrics: JSON.stringify([
        { label: 'Cloud Cost Reduction', value: '-38%' },
        { label: 'Query Latency', value: '4.2ms' },
        { label: 'Cluster Uptime', value: '99.999%' },
        { label: 'Nodes Managed', value: '12,500+' }
      ]),
      clientFeedback: 'Stalci transformed our entire infrastructure. The cost savings alone paid for the project in 4 months.',
    },
  });

  const project2 = await prisma.project.create({
    data: {
      title: 'Aegis Medical Triage AI & Telehealth Portal',
      slug: 'aegis-medical-triage-ai',
      description: 'HIPAA-compliant clinical LLM agent for patient symptom analysis and smart scheduling.',
      fullDescription: 'Developed an end-to-end patient engagement platform equipped with a fine-tuned medical reasoning agent. The system securely collects patient symptoms, correlates against medical history, provides preliminary urgency assessments, and connects patients with on-call specialists in under 60 seconds.',
      category: 'AI & Machine Learning',
      clientId: client2.id,
      services: JSON.stringify(['AI & Agentic Systems', 'Cyber Security & Compliance', 'Custom Software']),
      technologies: JSON.stringify(['Python', 'PyTorch', 'FastAPI', 'Next.js', 'PostgreSQL', 'Docker', 'WebRTC']),
      startDate: new Date('2026-01-10'),
      endDate: new Date('2026-09-15'),
      deadline: new Date('2026-09-15'),
      budget: 220000,
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      progress: 75,
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80',
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80'
      ]),
      liveUrl: 'https://aegis-health.demo.stalci.com',
      githubUrl: 'https://github.com/stalci/aegis-triage-agent',
      metrics: JSON.stringify([
        { label: 'Wait Time Reduction', value: '-65%' },
        { label: 'Diagnostic Concordance', value: '98.4%' },
        { label: 'Patients Assisted', value: '250k+' },
        { label: 'Compliance Score', value: '100% HIPAA' }
      ]),
      clientFeedback: 'The engineering rigor around data privacy and medical accuracy was truly unmatched.',
    },
  });

  const project3 = await prisma.project.create({
    data: {
      title: 'Nova Quantum Trading Engine & Analytics',
      slug: 'nova-quantum-trading-engine',
      description: 'Sub-millisecond order execution and real-time market risk forecasting engine.',
      fullDescription: 'Engineered a low-latency distributed trading system with custom event-sourcing architecture, capable of processing 1.2M market events per second with sub-50-microsecond tick-to-trade latency. Features a WebAssembly financial charting suite and institutional risk dashboards.',
      category: 'Enterprise SaaS',
      clientId: client4.id,
      services: JSON.stringify(['Custom Software', 'Data Engineering', 'Cloud Engineering']),
      technologies: JSON.stringify(['Rust', 'C++', 'Apache Kafka', 'ClickHouse', 'TypeScript', 'WebAssembly']),
      startDate: new Date('2025-08-15'),
      endDate: new Date('2026-03-20'),
      deadline: new Date('2026-03-20'),
      budget: 310000,
      status: 'COMPLETED',
      priority: 'URGENT',
      progress: 100,
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80',
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80'
      ]),
      liveUrl: 'https://novatrade.demo.stalci.com',
      githubUrl: 'https://github.com/stalci/nova-engine',
      metrics: JSON.stringify([
        { label: 'Execution Speed', value: '<42μs' },
        { label: 'Events/sec', value: '1.2M+' },
        { label: 'Daily Volume', value: '$840M' },
        { label: 'System Uptime', value: '100.0%' }
      ]),
      clientFeedback: 'Stalci built an engine that outperforms our tier-1 investment bank competitors.',
    },
  });

  const project4 = await prisma.project.create({
    data: {
      title: 'Vanguard Cyber Resilience & Zero Trust Hub',
      slug: 'vanguard-cyber-resilience-hub',
      description: 'Automated continuous vulnerability management and biometric zero-trust identity mesh.',
      fullDescription: 'Comprehensive cyber security posture orchestrator. Includes automated red-team simulations, continuous container image SBOM scanning, and zero-trust policy enforcement across distributed multi-region infrastructure.',
      category: 'Cyber Security',
      clientId: client1.id,
      services: JSON.stringify(['Cyber Security & Compliance', 'Cloud Engineering', '24/7 Managed SRE']),
      technologies: JSON.stringify(['Golang', 'eBPF', 'OIDC/OAuth2', 'HashiCorp Vault', 'Terraform', 'React']),
      startDate: new Date('2026-02-01'),
      endDate: new Date('2026-10-31'),
      deadline: new Date('2026-10-31'),
      budget: 160000,
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      progress: 60,
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80',
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80'
      ]),
      liveUrl: 'https://vanguard-sec.demo.stalci.com',
      githubUrl: 'https://github.com/stalci/vanguard-mesh',
      metrics: JSON.stringify([
        { label: 'Threat Detection', value: 'Instant (<1s)' },
        { label: 'Vulnerabilities Mitigated', value: '4,100+' },
        { label: 'SOC2 / ISO27001', value: 'Certified' }
      ]),
    },
  });

  // 4. Invoice Templates
  const templateModern = await prisma.invoiceTemplate.create({
    data: {
      name: 'Modern Clean (Copper Glow)',
      slug: 'modern-clean',
      description: 'Contemporary design with dark copper accents, clean typography, and sleek tabular hierarchy.',
      layoutType: 'MODERN',
      primaryColor: '#D89B5B',
      headerText: 'INVOICE / BILLING STATEMENT',
      footerNotes: 'Thank you for partnering with STALCI. Payment is due within 30 days of issue.',
      isDefault: true,
      isActive: true,
    },
  });

  const templateMinimal = await prisma.invoiceTemplate.create({
    data: {
      name: 'Minimalist Slate',
      slug: 'minimalist-slate',
      description: 'Ultra-clean monochromatic layout optimized for executive reporting and swift processing.',
      layoutType: 'MINIMAL',
      primaryColor: '#0F172A',
      headerText: 'TAX INVOICE',
      footerNotes: 'Electronic payment preferred. Inquiries: billing@stalci.com',
      isDefault: false,
      isActive: true,
    },
  });

  const templateCorporate = await prisma.invoiceTemplate.create({
    data: {
      name: 'Corporate Navy',
      slug: 'corporate-navy',
      description: 'Traditional enterprise format with formal remittance details, PO tracking, and bank vouchers.',
      layoutType: 'CORPORATE',
      primaryColor: '#1E3A8A',
      headerText: 'OFFICIAL INVOICE',
      footerNotes: 'Wire transfer instructions on reverse. Net 30 terms apply.',
      isDefault: false,
      isActive: true,
    },
  });

  const templatePremium = await prisma.invoiceTemplate.create({
    data: {
      name: 'Luxury Obsidian & Gold',
      slug: 'luxury-obsidian-gold',
      description: 'High-end executive billing theme with warm gold foil aesthetics and bespoke layout.',
      layoutType: 'PREMIUM',
      primaryColor: '#B45309',
      headerText: 'EXCLUSIVE CLIENT STATEMENT',
      footerNotes: 'STALCI Global Technologies • Confidential Billing Document',
      isDefault: false,
      isActive: true,
    },
  });

  // 5. Invoices with Line Items
  const invoice1 = await prisma.invoice.create({
    data: {
      invoiceNumber: 'INV-2026-001',
      clientId: client1.id,
      projectId: project1.id,
      templateId: templateModern.id,
      issueDate: new Date('2026-06-15'),
      dueDate: new Date('2026-07-15'),
      status: 'PAID',
      currency: 'USD',
      subtotal: 92500,
      discount: 2500,
      taxRate: 8.5,
      taxAmount: 7650,
      total: 97650,
      notes: 'Final milestone release for StalciOps Cloud Platform Phase 2.',
      terms: 'Payment received in full via Wire Transfer. Thank you for your business!',
      paymentDetails: 'Wire Transfer Reference: TXN-89301824 • Silicon Valley Bank',
      items: {
        create: [
          { description: 'Cloud Cost Optimization ML Pipeline Implementation', quantity: 1, unitPrice: 45000, amount: 45000 },
          { description: 'Kubernetes Multi-Cluster Control Plane Integration', quantity: 1, unitPrice: 32500, amount: 32500 },
          { description: 'OpenTelemetry Observability & Dashboard Suite', quantity: 1, unitPrice: 15000, amount: 15000 },
        ],
      },
    },
  });

  const invoice2 = await prisma.invoice.create({
    data: {
      invoiceNumber: 'INV-2026-002',
      clientId: client2.id,
      projectId: project2.id,
      templateId: templateModern.id,
      issueDate: new Date('2026-07-20'),
      dueDate: new Date('2026-08-20'),
      status: 'PENDING',
      currency: 'USD',
      subtotal: 110000,
      discount: 5000,
      taxRate: 0,
      taxAmount: 0,
      total: 105000,
      notes: 'Milestone 3: Clinical Triage NLP Agent Fine-Tuning & WebRTC Telehealth portal.',
      terms: 'Net 30 Days. Late fees of 1.5% apply past due date.',
      paymentDetails: 'Bank: JPMorgan Chase • Account: ****9281 • Routing: 12100024',
      items: {
        create: [
          { description: 'Fine-tuned Medical LLM Agent & Verification Test Suite', quantity: 1, unitPrice: 65000, amount: 65000 },
          { description: 'End-to-End HIPAA Encrypted WebRTC Video Portal', quantity: 1, unitPrice: 45000, amount: 45000 },
        ],
      },
    },
  });

  const invoice3 = await prisma.invoice.create({
    data: {
      invoiceNumber: 'INV-2026-003',
      clientId: client3.id,
      templateId: templateMinimal.id,
      issueDate: new Date('2026-08-01'),
      dueDate: new Date('2026-08-31'),
      status: 'SENT',
      currency: 'EUR',
      subtotal: 48000,
      discount: 0,
      taxRate: 19.0,
      taxAmount: 9120,
      total: 57120,
      notes: 'Monthly Dedicated SRE & Cloud Engineering Pod retainer (August 2026).',
      terms: 'Payment due on receipt. SEPA Bank Transfer accepted.',
      paymentDetails: 'IBAN: DE89 3704 0044 0532 0130 00 • BIC: COBADEFFXXX',
      items: {
        create: [
          { description: 'Dedicated SRE / DevOps Lead (160 Hours)', quantity: 160, unitPrice: 175, amount: 28000 },
          { description: 'Senior AI / Data Infrastructure Engineer (100 Hours)', quantity: 100, unitPrice: 200, amount: 20000 },
        ],
      },
    },
  });

  const invoice4 = await prisma.invoice.create({
    data: {
      invoiceNumber: 'INV-2026-004',
      clientId: client4.id,
      projectId: project3.id,
      templateId: templatePremium.id,
      issueDate: new Date('2026-03-25'),
      dueDate: new Date('2026-04-25'),
      status: 'PAID',
      currency: 'USD',
      subtotal: 155000,
      discount: 5000,
      taxRate: 0,
      taxAmount: 0,
      total: 150000,
      notes: 'Phase 1 Delivery: Sub-millisecond Execution Engine for Nova FinTech Labs.',
      terms: 'Fully Settled via SWIFT wire transfer.',
      paymentDetails: 'Barclays Corporate Banking London • Ref: NV-TRD-01',
      items: {
        create: [
          { description: 'Rust/C++ Low-Latency Matching Engine Core', quantity: 1, unitPrice: 95000, amount: 95000 },
          { description: 'ClickHouse + Kafka High-Throughput Analytics Cluster', quantity: 1, unitPrice: 40000, amount: 40000 },
          { description: 'WebAssembly Real-Time Institutional Dashboard', quantity: 1, unitPrice: 20000, amount: 20000 },
        ],
      },
    },
  });

  // 6. Technologies & Skills
  await prisma.technology.createMany({
    data: [
      { name: 'React 19 & Next.js 16', category: 'Frontend', icon: 'Code', proficiency: 98, isFeatured: true, order: 1 },
      { name: 'TypeScript & JavaScript', category: 'Frontend', icon: 'FileCode', proficiency: 99, isFeatured: true, order: 2 },
      { name: 'Tailwind CSS & Radix UI', category: 'Frontend', icon: 'Palette', proficiency: 96, isFeatured: true, order: 3 },
      { name: 'Node.js & NestJS', category: 'Backend', icon: 'Server', proficiency: 97, isFeatured: true, order: 4 },
      { name: 'Go (Golang)', category: 'Backend', icon: 'Cpu', proficiency: 92, isFeatured: true, order: 5 },
      { name: 'Rust', category: 'Backend', icon: 'Zap', proficiency: 90, isFeatured: true, order: 6 },
      { name: 'Python & PyTorch', category: 'AI & Data', icon: 'Brain', proficiency: 95, isFeatured: true, order: 7 },
      { name: 'LangChain & Agentic LLMs', category: 'AI & Data', icon: 'Sparkles', proficiency: 94, isFeatured: true, order: 8 },
      { name: 'PostgreSQL & pgvector', category: 'Security & Database', icon: 'Database', proficiency: 96, isFeatured: true, order: 9 },
      { name: 'Redis & Kafka', category: 'Security & Database', icon: 'Layers', proficiency: 93, isFeatured: true, order: 10 },
      { name: 'Kubernetes & Docker', category: 'Cloud & DevOps', icon: 'Container', proficiency: 98, isFeatured: true, order: 11 },
      { name: 'AWS & Cloudflare', category: 'Cloud & DevOps', icon: 'Cloud', proficiency: 97, isFeatured: true, order: 12 },
      { name: 'Terraform & OpenTofu', category: 'Cloud & DevOps', icon: 'Terminal', proficiency: 91, isFeatured: true, order: 13 },
      { name: 'Zero-Trust & eBPF Security', category: 'Security & Database', icon: 'ShieldCheck', proficiency: 94, isFeatured: true, order: 14 },
    ],
    skipDuplicates: true,
  });

  // 7. Services
  await prisma.service.createMany({
    data: [
      {
        slug: 'ai-agentic-systems',
        name: 'AI & Agentic Systems',
        shortDescription: 'Autonomous enterprise AI workflows, LLM agents, and cognitive automation.',
        description: 'Design and deployment of custom generative AI models, multi-agent frameworks, semantic search pipelines (RAG), and deterministic reasoning engines built for enterprise uptime.',
        fullDescription: 'We build production-grade agentic AI architectures that autonomously coordinate tasks, parse unstructured documents, interface with legacy SQL/ERP systems, and deliver real-time actionable intelligence without hallucinations.',
        icon: 'Bot',
        category: 'Artificial Intelligence',
        features: JSON.stringify(['Custom Multi-Agent Orchestration', 'Enterprise RAG & Knowledge Graphs', 'Deterministic Guardrails & Safety Audits', 'Local & Private Model Deployments']),
        price: 'From $15,000 / Sprint',
        isFeatured: true,
        order: 1,
      },
      {
        slug: 'cloud-platform-engineering',
        name: 'Cloud & Platform Engineering',
        shortDescription: 'Multi-cloud architectures, Kubernetes, serverless platforms, and automated FinOps.',
        description: 'Rock-solid infrastructure design on AWS, GCP, and Azure. Automated CI/CD pipelines, zero-downtime rolling deployments, and predictive cloud cost optimization.',
        fullDescription: 'Transforming chaotic legacy setups into pristine Infrastructure-as-Code. We engineer self-healing Kubernetes clusters, global CDN edges, and resilient multi-region disaster recovery frameworks.',
        icon: 'Cloud',
        category: 'Cloud Infrastructure',
        features: JSON.stringify(['Multi-Region High Availability', 'Kubernetes & Service Meshes', 'Infrastructure as Code (Terraform)', 'Cloud Cost Optimization (FinOps)']),
        price: 'From $12,000 / Project',
        isFeatured: true,
        order: 2,
      },
      {
        slug: 'custom-software-engineering',
        name: 'Custom Software Engineering',
        shortDescription: 'Full-stack web & enterprise SaaS applications built for high concurrency.',
        description: 'Modern architectures powered by Next.js, NestJS, Go, and Rust. Designed with clean modular code, comprehensive test suites, and micro-frontend scalability.',
        fullDescription: 'From greenfield SaaS products to mission-critical business portals. We build blazing fast, accessible, and delight-inducing digital experiences with clean architecture.',
        icon: 'Code',
        category: 'Software Development',
        features: JSON.stringify(['Next.js & React 19 Ecosystem', 'High-Throughput Microservices', 'Real-Time WebSockets & Event Streaming', '100% Type-Safe TypeScript/Rust']),
        price: 'From $20,000 / MVP',
        isFeatured: true,
        order: 3,
      },
      {
        slug: 'cyber-security-compliance',
        name: 'Cyber Security & Compliance',
        shortDescription: 'Zero-trust architecture, automated threat modeling, and SOC2 / HIPAA readiness.',
        description: 'Proactive penetration testing, automated vulnerability remediation, identity management, and rigorous compliance implementation for regulated industries.',
        fullDescription: 'Embedding security into every phase of the development lifecycle (DevSecOps). We protect intellectual property and customer data with cryptographic zero-knowledge systems.',
        icon: 'ShieldCheck',
        category: 'Cyber Security',
        features: JSON.stringify(['Automated DevSecOps Scanning', 'Zero-Trust Identity & Access (IAM)', 'SOC2, HIPAA & ISO27001 Readiness', 'Penetration Testing & Red-Teaming']),
        price: 'From $10,000 / Audit',
        isFeatured: true,
        order: 4,
      },
      {
        slug: 'data-engineering-analytics',
        name: 'Data Engineering & Pipelines',
        shortDescription: 'Real-time telemetry streams, ClickHouse/Snowflake lakes, and BI dashboards.',
        description: 'Scalable ETL pipelines processing millions of events per second with sub-second analytical querying and real-time executive dashboards.',
        fullDescription: 'Consolidating fragmented data silos into unified, lightning-fast analytical engines that give leadership instant operational clarity.',
        icon: 'Database',
        category: 'Data & Analytics',
        features: JSON.stringify(['Real-Time Event Ingestion (Kafka)', 'Columnar Data Warehousing (ClickHouse)', 'Predictive Machine Learning Pipelines', 'Interactive Executive Dashboards']),
        price: 'From $14,000 / Pipeline',
        isFeatured: true,
        order: 5,
      },
      {
        slug: 'managed-sre-24-7',
        name: '24/7 Managed SRE & DevOps',
        shortDescription: 'Continuous monitoring, incident response, SLO guarantees, and proactive maintenance.',
        description: 'Round-the-clock site reliability engineering with guaranteed 15-minute response times, proactive anomaly detection, and automated patch management.',
        fullDescription: 'Your extended engineering team. We manage your cloud operations, security patches, backups, and performance optimizations 24 hours a day, 365 days a year.',
        icon: 'Zap',
        category: 'Operations',
        features: JSON.stringify(['15-Minute Guaranteed SLA', 'Proactive APM & Anomaly Detection', 'Continuous Chaos Engineering', 'Quarterly Architecture Reviews']),
        price: 'From $4,500 / Month',
        isFeatured: true,
        order: 6,
      },
    ],
    skipDuplicates: true,
  });

  // 8. Testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        clientName: 'Sarah Jenkins',
        role: 'Chief Technology Officer',
        company: 'TechCorp Global',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        quote: 'STALCI modernized our entire multi-cloud architecture and delivered StalciOps in record time. Our cloud spending dropped by 38% while our availability hit five nines.',
        rating: 5,
        project: 'StalciOps Cloud Intelligence',
        isFeatured: true,
      },
      {
        clientName: 'Marcus Vance, MD',
        role: 'VP of Digital Medicine',
        company: 'Nexus Health Systems',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        quote: 'The AI triage platform built by STALCI achieved a 98.4% diagnostic concordance in clinical trials. Their focus on HIPAA security and patient empathy was breathtaking.',
        rating: 5,
        project: 'Aegis Medical Triage AI',
        isFeatured: true,
      },
      {
        clientName: 'Alexander Sterling',
        role: 'Head of Quantitative Infrastructure',
        company: 'Nova FinTech Labs',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        quote: 'Finding an engineering partner capable of writing sub-50-microsecond Rust matching engines is nearly impossible. STALCI executed beyond our wildest expectations.',
        rating: 5,
        project: 'Nova Quantum Trading Engine',
        isFeatured: true,
      },
      {
        clientName: 'Elena Rostova',
        role: 'Managing Director',
        company: 'Apex Global Logistics',
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        quote: 'From discovery to global rollout across 18 European transit hubs, STALCI acted like true co-founders. Responsive, hyper-competent, and impeccably reliable.',
        rating: 5,
        project: 'Apex Telemetry Hub',
        isFeatured: true,
      },
    ],
    skipDuplicates: true,
  });

  // 9. Pages
  await prisma.page.createMany({
    data: [
      {
        slug: 'terms',
        title: 'Terms & Conditions — STALCI Enterprise',
        content: `### 1. Acceptance & Contractual Capacity
By accessing the STALCI website or engaging STALCI for professional engineering services, you unconditionally agree to these Terms & Conditions.

### 2. Professional Services & SOW Architecture
All commercial engagements are governed by an overarching Master Services Agreement (MSA) and one or more Statements of Work (SOW).

### 3. Client Obligations & System Access
The client agrees to provide clear functional requirements, access to stakeholders, necessary cloud environments, and credentials.

### 4. Fees, Invoicing & Payment Terms
Fees are billed on a Time & Materials (T&M) or Fixed-Price milestone basis. Invoices are payable within 30 calendar days (Net 30) via SWIFT/ACH wire transfer.

### 5. Intellectual Property & Work-for-Hire
All custom source code and deliverables operate on a Work-for-Hire basis. Upon settlement of invoices, 100% exclusive IP ownership transfers to the client.

### 6. Confidentiality & Non-Disclosure
Each party maintains strict confidentiality of proprietary technical and business data for at least 5 years.

### 7. Data Protection, GDPR & SOC 2
STALCI enforces zero-trust DevSecOps controls, TLS 1.3/AES-256 encryption, and Data Processing Addendums (DPA).

### 8. Warranties & Remedy Period
Deliverables are warranted to materially conform to specifications for 30 days post-handover.

### 9. Limitation of Liability
Liability is capped at the total fees paid under the applicable SOW in the trailing 12 months.

### 10. Governing Law & Legal Inquiries
Governed by California law. For inquiries, contact legal@stalci.com.`,
        published: true,
      },
      {
        slug: 'privacy-policy',
        title: 'Privacy Policy & Data Security — STALCI',
        content: `### 1. Introduction & Global Scope
STALCI Global Technologies Inc. is committed to protecting data privacy, confidentiality, and integrity across all software platforms and consulting engagements.

### 2. Information We Ingest
We collect contact data, project requirements, recruitment data, and network telemetry to optimize performance and prevent security incidents.

### 3. Lawful Basis for Processing (GDPR & CCPA)
Data is processed under contractual necessity, legitimate business interests, legal compliance, and explicit consent.

### 4. Zero-Trust Security & Technical Safeguards
We implement TLS 1.3, AES-256 encryption, FIDO2 hardware MFA, automated SAST/DAST CI/CD scanning, and 24/7 SOC monitoring.

### 5. Sub-Processors & Data Sharing
We do NOT sell, rent, or monetize client data. Sub-processors operate under strict confidentiality DPAs.

### 6. International Transfers & Sovereign AI
Regional data clustering and EU Standard Contractual Clauses (SCCs) guarantee data residency compliance.

### 7. Global Data Subject Rights & DPO Contact
Access, rectification, and erasure rights are fully supported. Contact dpo@stalci.com or privacy@stalci.com.`,
        published: true,
      },
      {
        slug: 'about',
        title: 'About STALCI Global Technologies',
        content: 'STALCI is a global technology and software studio engineering sovereign AI systems, multi-cloud platforms, data pipelines, and cyber resilience for enterprises.',
        published: true,
      },
    ],
    skipDuplicates: true,
  });

  // 9b. Jobs & Careers
  await prisma.job.createMany({
    data: [
      {
        title: 'Staff Distributed Systems Engineer',
        location: 'San Francisco, CA / Hybrid',
        type: 'Full-time',
        description: 'Architect and build ultra-high throughput distributed consensus engines and memory-safe streaming microservices in Go and Rust.',
        requirements: JSON.stringify([
          '7+ years experience in distributed systems, network protocols, and Linux kernel fundamentals',
          'Proficiency with Go, Rust, eBPF, and Apache Kafka',
          'Experience building low-latency financial or cloud telemetry infrastructure',
        ]),
        isActive: true,
      },
      {
        title: 'Principal AI / ML Infrastructure Architect',
        location: 'Remote (US / EU)',
        type: 'Full-time',
        description: 'Lead the architecture of enterprise sovereign AI platforms, agentic LLM pipelines, and fine-tuning clusters on Kubernetes.',
        requirements: JSON.stringify([
          'Deep expertise with PyTorch, vLLM, LangChain, Ray, and Triton Inference Server',
          'Track record of deploying production-grade RAG and agentic workflows at scale',
          'Strong understanding of model safety, quantization, and evaluation benchmarks',
        ]),
        isActive: true,
      },
      {
        title: 'Senior Cloud Platform & SRE Engineer',
        location: 'London, UK / Remote',
        type: 'Full-time',
        description: 'Design multi-cloud Kubernetes clusters, automated GitOps CI/CD pipelines, and zero-trust mesh architectures across AWS, GCP, and Cloudflare.',
        requirements: JSON.stringify([
          '5+ years mastering Kubernetes, Terraform / OpenTofu, and Helm',
          'Experience with Cilium eBPF, Istio, Prometheus, and Grafana Tempo',
          'Strong scripting skills in Go or Python for custom operator development',
        ]),
        isActive: true,
      },
      {
        title: 'Lead Full-Stack Product Engineer',
        location: 'San Francisco, CA / Remote',
        type: 'Full-time',
        description: 'Craft high-performance, accessible enterprise web applications and developer consoles utilizing React 19, TypeScript, and Tailwind CSS.',
        requirements: JSON.stringify([
          '5+ years in modern frontend architectures, design systems, and state management',
          'Strong mastery of Next.js, TanStack Router/Query, WebGL, and Framer Motion',
          'Obsession with 60fps micro-interactions, accessibility, and sub-100ms response times',
        ]),
        isActive: true,
      },
    ],
    skipDuplicates: true,
  });

  // 10. Blogs
  await prisma.blog.createMany({
    data: [
      {
        slug: 'building-deterministic-agentic-llms',
        title: 'Building Deterministic Agentic LLMs for Mission-Critical Production Systems',
        excerpt: 'How we eliminate hallucinations and enforce strict mathematical safety guardrails in enterprise AI agents.',
        content: 'Large Language Models are probabilistic by nature, but enterprise systems demand deterministic reliability. In this article, we outline our dual-loop architecture that pairs cognitive generative agents with formal verification state machines...',
        author: 'Dr. Evelyn Reed, AI Research Lead',
        category: 'Artificial Intelligence',
        readTime: '6 min read',
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80',
        publishedAt: new Date('2026-07-28'),
      },
      {
        slug: 'cutting-cloud-costs-with-ebpf-telemetry',
        title: 'Cutting Multi-Cloud Costs by 38% Using Kernel-Level eBPF Telemetry',
        excerpt: 'A deep dive into how kernel observability uncovers hidden cross-AZ egress charges and CPU idle waste.',
        content: 'Modern cloud providers generate massive bill shocks through subtle network topology traps. By deploying lightweight eBPF probes into Linux host kernels, we map every byte transmitted between microservices...',
        author: 'Jason Zhao, Principal SRE',
        category: 'Cloud Engineering',
        readTime: '8 min read',
        imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
        publishedAt: new Date('2026-08-02'),
      },
    ],
    skipDuplicates: true,
  });

  // 11. Industries
  await prisma.industry.createMany({
    data: [
      { slug: 'fintech-banking', name: 'FinTech & Banking', description: 'Ultra-low latency trading, algorithmic risk models, and PCI-DSS Level 1 compliant digital banking platforms.' },
      { slug: 'healthcare-medtech', name: 'Healthcare & MedTech', description: 'HIPAA-compliant telehealth, clinical AI diagnostic agents, and encrypted electronic health records (EHR).' },
      { slug: 'ecommerce-retail', name: 'E-Commerce & Retail', description: 'High-concurrency headless storefronts, AI product recommendation graphs, and automated inventory sync.' },
      { slug: 'logistics-supply-chain', name: 'Logistics & Supply Chain', description: 'Real-time GPS fleet telemetry, dynamic routing optimization, and automated warehouse dispatch.' },
    ],
    skipDuplicates: true,
  });

  // 12. Products
  await prisma.product.createMany({
    data: [
      { slug: 'stalciops', name: 'StalciOps', tag: 'Cloud FinOps', description: 'Autonomous multi-cloud cost reduction and Kubernetes cluster rightsizing engine.', pricing: 'From $499/mo' },
      { slug: 'stalcishield', name: 'StalciShield', tag: 'Cyber Security', description: 'Continuous Zero-Trust vulnerability posture analyzer and eBPF runtime protector.', pricing: 'From $799/mo' },
      { slug: 'stalciagent', name: 'StalciAgent', tag: 'Agentic AI', description: 'Cognitive agent orchestration layer with deterministic enterprise ERP connectors.', pricing: 'From $1,200/mo' },
    ],
    skipDuplicates: true,
  });

  // 13. Inquiries
  await prisma.inquiry.createMany({
    data: [
      { name: 'David Hoffman', email: 'd.hoffman@zenithscale.com', company: 'Zenith Scale Inc', service: 'AI & Agentic Systems', budget: '$50,000 - $100,000', message: 'We want to build an autonomous customer support and contract analysis AI agent.', status: 'NEW' },
      { name: 'Claire Dubois', email: 'claire@heliosenergy.eu', company: 'Helios Energy', service: 'Cloud & Platform Engineering', budget: '$100,000+', message: 'Migrating 40 on-premise industrial monitoring servers to AWS EKS with zero downtime.', status: 'CONTACTED' },
    ],
    skipDuplicates: true,
  });

  // 14. Admin Account
  await prisma.admin.upsert({
    where: { email: 'admin@stalci.com' },
    update: {},
    create: {
      name: 'Stalci Master Admin',
      email: 'admin@stalci.com',
      passwordHash: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyUIXe/QLu7VlqR5K5h39.zVbFv03Oti', // admin123
    },
  });

  // 15. Notifications
  await prisma.notification.createMany({
    data: [
      { title: 'New High-Value Project Inquiry', message: 'David Hoffman submitted an AI & Agentic Systems inquiry ($50k-$100k budget).', type: 'SUCCESS', isRead: false },
      { title: 'Invoice INV-2026-001 Settled', message: 'TechCorp Global paid $97,650 via Wire Transfer.', type: 'INFO', isRead: false },
      { title: 'Aegis Health Milestone Due', message: 'Milestone 3 review with Dr. Marcus Vance scheduled for Friday.', type: 'WARNING', isRead: false },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Database seeded successfully with enterprise portfolio data!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
