import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcryptjs';

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
      { key: 'social_instagram', value: 'https://instagram.com/stalciglobal' },
      { key: 'social_youtube', value: 'https://youtube.com/@stalciglobal' },
      { key: 'social_discord', value: 'https://discord.gg/stalci' },
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

  const clientGRClass = await prisma.client.upsert({
    where: { email: 'ops@grclass.com' },
    update: {},
    create: {
      name: 'GR Class Directorate',
      email: 'ops@grclass.com',
      phone: '+91 22 6800 4500',
      company: 'GR Class Classification Society',
      address: 'Maritime Towers, Mumbai & Global Ports',
      website: 'https://grclass.com',
      avatarUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=150&auto=format&fit=crop&q=80',
      status: 'ACTIVE',
      notes: 'Recognized Organization (RO) maritime classification & statutory survey portal contract.',
    },
  });

  const clientKonvo = await prisma.client.upsert({
    where: { email: 'support@konvoshoes.com' },
    update: {},
    create: {
      name: 'Konvo Footwear Group',
      email: 'support@konvoshoes.com',
      phone: '+91 98200 11223',
      company: 'Konvo Shoes India Ltd.',
      address: 'Industrial Hub, New Delhi, India',
      website: 'https://konvoshoes.com',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      status: 'ACTIVE',
      notes: 'B2B & B2C High Volume Footwear Wholesale & Retail Portal.',
    },
  });

  const clientApniSabha = await prisma.client.upsert({
    where: { email: 'connect@apnisabha.com' },
    update: {},
    create: {
      name: 'ApniSabha Foundation',
      email: 'connect@apnisabha.com',
      phone: '+91 11 4100 8899',
      company: 'ApniSabha Community Manch',
      address: 'Civic Innovation Hub, New Delhi',
      website: 'https://apnisabha.com',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      status: 'ACTIVE',
      notes: 'Digital civic empowerment and transparent community discussion platform.',
    },
  });

  // 3. Projects & Invoices reset
  await prisma.invoiceItem.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.project.deleteMany();

  const projectGRClass = await prisma.project.upsert({
    where: { slug: 'gr-class-maritime-survey-platform' },
    update: {
      featured: true,
      liveUrl: 'https://grclass.com/',
      imageUrl: '/projects/grclass-preview.jpg',
    },
    create: {
      title: 'GR Class — Ship Classification & Statutory Surveys Portal',
      slug: 'gr-class-maritime-survey-platform',
      description: 'Recognized Organization (RO) digital vessel classification, statutory survey tracking, and maritime certification suite.',
      fullDescription: 'Architected and built the enterprise digital infrastructure for GR Class — a Recognized Organization (RO) and Classification Society. The platform handles statutory vessel surveys, fleet compliance tracking, digital ISO certificate issuance, and real-time surveyor dispatch across 120+ global ports worldwide.',
      category: 'Maritime Tech & Cloud',
      clientId: clientGRClass.id,
      services: JSON.stringify(['Custom Software', 'Cloud Architecture', 'Cyber Security & Compliance', 'DevOps & SRE']),
      technologies: JSON.stringify(['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Docker', 'Cloudflare']),
      startDate: new Date('2025-06-15'),
      endDate: new Date('2026-02-10'),
      deadline: new Date('2026-02-10'),
      budget: 280000,
      status: 'COMPLETED',
      priority: 'URGENT',
      progress: 100,
      featured: true,
      imageUrl: '/projects/grclass-preview.jpg',
      gallery: JSON.stringify([
        '/projects/grclass-preview.jpg',
        'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&auto=format&fit=crop&q=80'
      ]),
      liveUrl: 'https://grclass.com/',
      githubUrl: 'https://github.com/stalci/grclass-maritime-portal',
      metrics: JSON.stringify([
        { label: 'Global Ports Covered', value: '120+' },
        { label: 'Certificates Issued', value: '500+' },
        { label: 'ISO Standards Aligned', value: '9001 / 14001' },
        { label: 'Surveyor Dispatch Speed', value: '<15 Mins' }
      ]),
      clientFeedback: 'STALCI delivered a digital classification system that elevated our global maritime compliance operations instantly.',
    },
  });

  const projectKonvo = await prisma.project.upsert({
    where: { slug: 'konvo-shoes-b2b-e-commerce-portal' },
    update: {
      featured: true,
      liveUrl: 'https://konvoshoes.com/',
      imageUrl: '/projects/konvoshoes-preview.jpg',
    },
    create: {
      title: 'Konvo Shoes — B2B & Wholesale Footwear E-Commerce Hub',
      slug: 'konvo-shoes-b2b-e-commerce-portal',
      description: 'High-volume B2B wholesale storefront with GST tax-compliant invoicing, real-time inventory, and express dispatch logistics.',
      fullDescription: 'Engineered the modern B2B storefront and inventory engine for Konvo Shoes, enabling footwear retailers across India to place bulk wholesale orders with automated GST Input Tax Credit (ITC) invoicing, multi-warehouse stock reservation, factory quality verification badges, and instant express dispatch integration.',
      category: 'E-Commerce & Retail Tech',
      clientId: clientKonvo.id,
      services: JSON.stringify(['E-Commerce Solutions', 'Full Stack Development', 'Payment & ERP Integration', 'UI/UX Design']),
      technologies: JSON.stringify(['React', 'Vite', 'TanStack Query', 'Tailwind CSS', 'NestJS', 'PostgreSQL', 'Razorpay UPI']),
      startDate: new Date('2025-09-01'),
      endDate: new Date('2026-04-15'),
      deadline: new Date('2026-04-15'),
      budget: 195000,
      status: 'COMPLETED',
      priority: 'HIGH',
      progress: 100,
      featured: true,
      imageUrl: '/projects/konvoshoes-preview.jpg',
      gallery: JSON.stringify([
        '/projects/konvoshoes-preview.jpg',
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&auto=format&fit=crop&q=80'
      ]),
      liveUrl: 'https://konvoshoes.com/',
      githubUrl: 'https://github.com/stalci/konvoshoes-b2b-platform',
      metrics: JSON.stringify([
        { label: 'Annual GMV Processed', value: '₹15 Cr+' },
        { label: 'Active Retail Partners', value: '10,000+' },
        { label: 'GST Invoice Accuracy', value: '100%' },
        { label: 'Order Dispatch Time', value: 'Same Day' }
      ]),
      clientFeedback: 'STALCI built our complete wholesale engine — handling bulk ordering, GST invoicing and payments flawlessly.',
    },
  });

  const projectApniSabha = await prisma.project.upsert({
    where: { slug: 'apnisabha-civic-community-platform' },
    update: {
      featured: true,
      liveUrl: 'https://apnisabha.com/',
      imageUrl: '/projects/apnisabha-preview.jpg',
    },
    create: {
      title: 'ApniSabha — Digital Civic Engagement & Community Platform',
      slug: 'apnisabha-civic-community-platform',
      description: 'Apna Manch, Apni Awaaz — Real-time community discussion, civic problem-solving, and transparent public collaboration platform.',
      fullDescription: 'Designed and implemented ApniSabha ("Apna Manch, Apni Awaaz"), a digital community engagement platform where citizens raise local issues, participate in verified polls, collaborate on civic improvements, and amplify their voice with complete trust and transparency.',
      category: 'Civic Tech & Community',
      clientId: clientApniSabha.id,
      services: JSON.stringify(['Custom Software', 'AI & Agentic Systems', 'Cloud Engineering', 'UI/UX Design']),
      technologies: JSON.stringify(['React', 'Vite', 'Tailwind CSS', 'Node.js', 'WebSockets', 'PostgreSQL', 'Cloudflare']),
      startDate: new Date('2025-10-10'),
      endDate: new Date('2026-05-20'),
      deadline: new Date('2026-05-20'),
      budget: 175000,
      status: 'COMPLETED',
      priority: 'HIGH',
      progress: 100,
      featured: true,
      imageUrl: '/projects/apnisabha-preview.jpg',
      gallery: JSON.stringify([
        '/projects/apnisabha-preview.jpg',
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80'
      ]),
      liveUrl: 'https://apnisabha.com/',
      githubUrl: 'https://github.com/stalci/apnisabha-community-engine',
      metrics: JSON.stringify([
        { label: 'Active Community Members', value: '250,000+' },
        { label: 'Civic Issues Resolved', value: '85,000+' },
        { label: 'Discussion Engagement', value: '4.8M Posts' },
        { label: 'Platform Uptime', value: '99.9%' }
      ]),
      clientFeedback: 'ApniSabha gives power back to the community. STALCI engineered a fast, secure, and beautiful platform.',
    },
  });

  // 5. Invoices with Line Items for Real Projects
  const invoice1 = await prisma.invoice.create({
    data: {
      invoiceNumber: 'INV-2026-001',
      clientId: clientGRClass.id,
      projectId: projectGRClass.id,
      issueDate: new Date('2026-02-15'),
      dueDate: new Date('2026-03-15'),
      status: 'PAID',
      currency: 'USD',
      subtotal: 140000,
      discount: 0,
      taxRate: 0,
      taxAmount: 0,
      total: 140000,
      notes: 'Final milestone release for GR Class Maritime Survey & Classification Platform.',
      terms: 'Payment received in full via Bank Wire Transfer. Thank you!',
      paymentDetails: 'Wire Transfer Reference: TXN-GR-901824 • HDFC Corporate Banking',
      items: {
        create: [
          { description: 'Vessel Survey Tracking & ISO Digital Certificate Module', quantity: 1, unitPrice: 85000, amount: 85000 },
          { description: 'Real-time Port Surveyor Dispatch & Telemetry System', quantity: 1, unitPrice: 55000, amount: 55000 },
        ],
      },
    },
  });

  const invoice2 = await prisma.invoice.create({
    data: {
      invoiceNumber: 'INV-2026-002',
      clientId: clientKonvo.id,
      projectId: projectKonvo.id,
      issueDate: new Date('2026-04-20'),
      dueDate: new Date('2026-05-20'),
      status: 'PAID',
      currency: 'INR',
      subtotal: 9500000,
      discount: 500000,
      taxRate: 18.0,
      taxAmount: 1620000,
      total: 10620000,
      notes: 'Phase 1 Delivery for Konvo Shoes B2B Wholesale Storefront & GST ITC Invoicing Engine.',
      terms: 'Payment received via HDFC Razorpay B2B Portal.',
      paymentDetails: 'UPI / HDFC NetBanking Reference: RZP-KONVO-2026',
      items: {
        create: [
          { description: 'B2B Wholesale Catalog & Bulk Ordering Engine', quantity: 1, unitPrice: 5000000, amount: 5000000 },
          { description: 'Automated GST Input Tax Credit (ITC) Invoicing Integration', quantity: 1, unitPrice: 4500000, amount: 4500000 },
        ],
      },
    },
  });

  const invoice3 = await prisma.invoice.create({
    data: {
      invoiceNumber: 'INV-2026-003',
      clientId: clientApniSabha.id,
      projectId: projectApniSabha.id,
      issueDate: new Date('2026-05-25'),
      dueDate: new Date('2026-06-25'),
      status: 'PAID',
      currency: 'INR',
      subtotal: 8500000,
      discount: 0,
      taxRate: 18.0,
      taxAmount: 1530000,
      total: 10030000,
      notes: 'Full Platform Delivery: ApniSabha Community & Civic Engagement Manch.',
      terms: 'Payment settled in full. SEPA / NEFT transfer.',
      paymentDetails: 'ICICI Corporate Bank • Ref: APNI-SABHA-01',
      items: {
        create: [
          { description: 'Real-time Community Discussion & Upvote Engine', quantity: 1, unitPrice: 4500000, amount: 4500000 },
          { description: 'Civic Issue Resolution & Verified Polling Suite', quantity: 1, unitPrice: 4000000, amount: 4000000 },
        ],
      },
    },
  });

  // 6. Technologies & Skills
  await prisma.technology.deleteMany();
  await prisma.technology.createMany({
    data: [
      { name: 'React 19 & Next.js 16', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', proficiency: 99, isFeatured: true, order: 1 },
      { name: 'TypeScript & JavaScript', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', proficiency: 99, isFeatured: true, order: 2 },
      { name: 'Tailwind CSS & Radix UI', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', proficiency: 97, isFeatured: true, order: 3 },
      { name: 'Node.js & NestJS', category: 'Backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg', proficiency: 98, isFeatured: true, order: 4 },
      { name: 'Go (Golang)', category: 'Backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg', proficiency: 94, isFeatured: true, order: 5 },
      { name: 'Rust & WebAssembly', category: 'Backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg', proficiency: 91, isFeatured: true, order: 6 },
      { name: 'Python & PyTorch', category: 'AI & Data', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', proficiency: 96, isFeatured: true, order: 7 },
      { name: 'LangChain & Agentic LLMs', category: 'AI & Data', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', proficiency: 95, isFeatured: true, order: 8 },
      { name: 'PostgreSQL & pgvector', category: 'Security & Database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', proficiency: 98, isFeatured: true, order: 9 },
      { name: 'Redis & Apache Kafka', category: 'Security & Database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', proficiency: 94, isFeatured: true, order: 10 },
      { name: 'Kubernetes & Docker', category: 'Cloud & DevOps', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', proficiency: 98, isFeatured: true, order: 11 },
      { name: 'AWS & Cloudflare', category: 'Cloud & DevOps', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', proficiency: 97, isFeatured: true, order: 12 },
      { name: 'Terraform & OpenTofu', category: 'Cloud & DevOps', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg', proficiency: 93, isFeatured: true, order: 13 },
      { name: 'Zero-Trust & eBPF Security', category: 'Security & Database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', proficiency: 95, isFeatured: true, order: 14 },
    ],
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
      {
        title: 'Senior Flutter & Cross-Platform Mobile Engineer',
        location: 'San Francisco, CA / Remote',
        type: 'Full-time',
        description: 'Lead the architecture and mobile UI/UX engineering for high-performance iOS and Android enterprise mobile applications using Flutter, Dart, and native C++ integrations.',
        requirements: JSON.stringify([
          '4+ years building production mobile apps with Flutter & Dart',
          'Experience with BLoC / Riverpod state management and offline-first SQLite synchronization',
          'Familiarity with iOS TestFlight, Google Play Console deployment, and CI/CD pipelines',
        ]),
        isActive: true,
      },
      {
        title: 'Full-Stack Web Architect (Next.js 16 & Node.js)',
        location: 'London, UK / Hybrid',
        type: 'Full-time',
        description: 'Build robust end-to-end cloud applications with Next.js 16, React Server Components, NestJS, and PostgreSQL.',
        requirements: JSON.stringify([
          '5+ years experience building scalable full-stack web platforms',
          'Proficiency with Next.js App Router, Tailwind CSS, Prisma ORM, and REST/GraphQL APIs',
          'Experience designing multi-tenant SaaS systems with strict security RBAC',
        ]),
        isActive: true,
      },
      {
        title: 'Growth & Digital Marketing Manager',
        location: 'San Francisco, CA / Remote',
        type: 'Full-time',
        description: 'Drive B2B demand generation, technical SEO, performance marketing campaigns, and brand position for STALCI global IT services.',
        requirements: JSON.stringify([
          '4+ years managing enterprise B2B growth marketing and lead funnels',
          'Experience with Google Analytics 4, HubSpot, LinkedIn Ads, and technical content marketing',
          'Proven record scaling ARR and pipeline conversion for developer-focused tech services',
        ]),
        isActive: true,
      },
      {
        title: 'Business Development Associate (BDA) & Enterprise Sales',
        location: 'Bengaluru / Hybrid',
        type: 'Full-time',
        description: 'Identify enterprise client opportunities, lead technical consultative discovery calls, and close multi-year software development contracts.',
        requirements: JSON.stringify([
          '3+ years experience in B2B enterprise tech sales and client relationship management',
          'Strong communication, proposal writing, and RFP presentation skills',
          'Ability to work with engineering leads to scope custom software architecture deals',
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
  const defaultAdminHash = await bcrypt.hash('stalci2026', 10);
  await prisma.admin.upsert({
    where: { email: 'admin@stalci.com' },
    update: {},
    create: {
      name: 'Stalci Master Admin',
      email: 'admin@stalci.com',
      passwordHash: defaultAdminHash,
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
