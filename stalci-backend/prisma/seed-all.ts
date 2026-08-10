import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:password123@localhost:5433/stalci_db?schema=public';
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding / Updating All Dynamic Pages, Jobs, Blogs, and Configurations...');

  // 1. Pages (Terms, Privacy Policy, About)
  const pages = [
    {
      slug: 'terms',
      title: 'Terms & Conditions — STALCI Enterprise',
      content: `### 1. Acceptance & Contractual Capacity
By accessing the STALCI website, developer APIs, or engaging STALCI for professional engineering services, you unconditionally agree to these Terms & Conditions. If you are entering into this agreement on behalf of an enterprise or entity, you represent and warrant that you hold full corporate authority to bind that entity.

If you do not agree with any provision of these terms, you must immediately terminate access to our digital properties and refrain from utilizing our consulting services.

### 2. Professional Services & SOW Architecture
STALCI specializes in mission-critical software engineering, sovereign AI integration, cloud platform infrastructure, zero-trust cybersecurity, and enterprise systems modernization.

All commercial client engagements are formally governed by an overarching Master Services Agreement (MSA) accompanied by one or more Statements of Work (SOW). The SOW establishes exact deliverables, architectural specifications, sprint timelines, acceptance milestones, fee structures, and service level agreements (SLAs). In any instance of direct conflict between these standard website terms and an executed MSA/SOW, the executed MSA/SOW shall supersede.

### 3. Client Obligations & System Access
Timely and predictable delivery relies on collaborative client partnership. The client agrees to:
- Provide clear functional requirements, architecture constraints, and access to key technical decision-makers.
- Furnish necessary sandbox environments, API keys, third-party vendor licenses, and cloud credentials.
- Review and execute formal acceptance testing within the agreed review window (standard 10 business days).
- Warrant that all client-supplied data, source code, and design assets do not infringe upon any third-party intellectual property.

### 4. Fees, Itemized Invoicing & Payment Terms
Fees are billed either on a Time & Materials (T&M) sprint rate basis or against milestone acceptance for Fixed-Price engagements as specified in the SOW.

Invoices are rendered electronically via the STALCI Billing Console and are due strictly within thirty (30) calendar days from receipt unless alternate terms are specified in an active SOW. Undisputed late balances shall accrue finance interest at 1.5% per month or the legal statutory maximum.

### 5. Intellectual Property & Code Ownership
Work-for-Hire Deliverables: Upon full and final settlement of all invoiced fees for the applicable milestone or project, STALCI unconditionally assigns to the client 100% exclusive worldwide ownership, title, and copyright in the custom source code, architectures, schemas, and design deliverables produced explicitly for the client under the SOW.

STALCI Background IP: STALCI retains all rights in its proprietary pre-existing toolkits, reusable foundational libraries, utility helpers, and boilerplate frameworks. STALCI grants the client a perpetual, irrevocable, royalty-free, non-exclusive license to use, modify, and deploy any incorporated Background IP solely as embedded within the client deliverable.

### 6. Confidentiality & Non-Disclosure
Each party agrees that all technical architectures, source code, proprietary algorithms, financial terms, and strategic roadmaps disclosed during the engagement shall constitute Confidential Information.

Neither party shall disclose or utilize Confidential Information for any purpose outside the scope of the project, applying the same degree of care it uses to protect its own sensitive data (and no less than reasonable standard of care).

### 7. Data Protection, GDPR & SOC 2 Compliance
STALCI enforces rigorous DevSecOps and data protection policies aligned with SOC 2 Type II and ISO 27001 control objectives. Where STALCI processes personal data on the client's behalf, STALCI operates as a Data Processor under a Data Processing Addendum (DPA) incorporating EU Standard Contractual Clauses (SCCs).

All client data in transit and at rest is protected using industry-standard TLS 1.3 and AES-256 encryption. Access to production environments is strictly role-based and governed by hardware MFA.

### 8. Warranties & Remedy Period
STALCI warrants that all engineering services will be executed with elite professional skill, diligence, and sound craftsmanship by qualified specialists. Deliverables are warranted to materially conform to documented acceptance criteria for thirty (30) days post-handover.

STALCI's sole obligation for a verified warranty claim is to re-perform, patch, or correct the non-conforming deliverable at zero additional cost.

Except as explicitly set forth, all services and website contents are provided "as is" without implied warranties of merchantability, fitness for a particular purpose, or uninterrupted third-party cloud uptime.

### 9. Limitation of Liability
To the maximum extent permitted by applicable law, neither party shall be liable for indirect, incidental, consequential, special, or punitive damages, including loss of profits, revenue, or business interruption.

Each party's maximum aggregate cumulative liability arising out of an engagement shall be strictly capped at the total fees paid by the client under the applicable Statement of Work in the twelve (12) months preceding the incident.

### 10. Term, Suspension & Exit Transition
Either party may terminate an active SOW for convenience upon thirty (30) days written notice, or immediately in the event of an uncured material breach following fifteen (15) days written notice. Upon termination, the client shall pay for all work completed and non-cancellable third-party commitments up to the effective termination date.

Upon contract conclusion, STALCI provides full handover assistance, including source code repositories, CI/CD pipelines, architectural documentation, and cloud infrastructure credential transfers.

### 11. Governing Law & Dispute Resolution
These terms and all related client agreements are governed by and construed in accordance with the laws of the State of California, United States, without giving effect to conflicts-of-law principles.

The parties agree to attempt in good faith to resolve any commercial dispute through executive escalation before initiating formal arbitration under AAA rules in San Francisco, California.

### 12. Legal Inquiries & Notices
Formal legal notices, SLA queries, or contractual inquiries should be submitted in writing to STALCI Legal Counsel at legal@stalci.com or addressed to: STALCI Global Technologies Inc., Attn: Legal Operations, 550 Howard Street, Suite 400, San Francisco, CA 94105, USA.`,
      published: true,
    },
    {
      slug: 'privacy-policy',
      title: 'Privacy Policy & Data Security — STALCI',
      content: `### 1. Introduction & Global Scope
STALCI Global Technologies Inc. ("STALCI", "we", "us", or "our") is dedicated to uncompromising data privacy, confidentiality, and integrity across all software platforms, APIs, consulting engagements, and client ecosystems.

This Privacy Policy describes how we collect, process, safeguard, and govern personal and corporate information when you visit our website, submit technical consultation inquiries, interact with client portals, or engage our engineering teams.

### 2. Information We Ingest & Process
We collect information solely to provide elite engineering services, manage commercial relationships, and secure our platforms. This includes:
- Corporate Lead & Contact Data: Name, enterprise email, phone number, company name, and job title provided via inquiries.
- Technical Project Specifications: Architecture briefs, system requirements, sandbox credentials, and technical dependencies provided under NDA.
- Candidate & Talent Information: Resumes, GitHub profiles, portfolio links, and employment history submitted for open engineering roles.
- Telemetry & Security Logs: Anonymized request metadata, IP addresses, browser agents, and access logs used strictly to mitigate cyber threats and maintain platform reliability.

### 3. Lawful Basis & Purposes for Processing
We process data under strict lawful bases established by global privacy frameworks (including GDPR, CCPA/CPRA):
- Contractual Performance: Executing statements of work, architecting client solutions, and providing technical support.
- Legitimate Business Interests: Protecting corporate infrastructure against intrusion, fraud, and Denial of Service (DoS) attacks.
- Legal & Compliance Obligations: Adhering to statutory tax accounting, export controls, and international security governance.
- Explicit Consent: Communicating technical whitepapers, architectural updates, and scheduled interview consultations.

### 4. Sovereign AI & Client Data Confidentiality
Zero Model Training on Client Data: STALCI guarantees that proprietary client source code, database records, and intellectual property are NEVER used to train public or shared Large Language Models (LLMs) or third-party AI systems.

Private Enclaves: Enterprise AI deployments are executed in isolated, VPC-peered private enclaves with strict data boundary policies and zero data retention (ZDR) APIs.

### 5. Zero-Trust Security & Cryptographic Protection
STALCI enforces defense-in-depth cybersecurity controls across all engineering pods:
- Data in Transit: Encrypted using TLS 1.3 with Perfect Forward Secrecy (PFS).
- Data at Rest: Encrypted using AES-256 with rotating hardware cryptographic keys.
- Access Governance: Strict Principle of Least Privilege (PoLP) and mandatory FIDO2 hardware Multi-Factor Authentication (MFA).
- Infrastructure Audit: Continuous automated vulnerability scanning, eBPF telemetry monitoring, and annual third-party penetration testing.

### 6. Third-Party Sub-Processors & Data Transfer
STALCI never sells, monetizes, or leases client personal data to any third party.

We engage only enterprise sub-processors that maintain SOC 2 Type II or ISO 27001 certifications (e.g. AWS, GCP, Cloudflare, PostgreSQL hosting). Cross-border data transfers adhere strictly to Standard Contractual Clauses (SCCs) and adequacy decisions.

### 7. Data Retention & Cryptographic Erasure
We retain corporate lead and project data only for the duration necessary to fulfill our contractual commitments or statutory requirements.

Upon termination of an engagement or upon formal client request, all client-specific data, sandbox databases, and staging assets are permanently and cryptographically purged within thirty (30) calendar days.

### 8. Global Privacy Rights (GDPR / CCPA / CPRA)
Depending on your geographic jurisdiction, you possess enforceable privacy rights:
- Right to Access & Portability: Request a copy of all personal data held by STALCI.
- Right to Rectification: Correct inaccurate or incomplete personal records.
- Right to Erasure ("Right to be Forgotten"): Request permanent deletion of personal information.
- Right to Restriction & Objection: Restrict or object to specific data processing activities.

### 9. Data Protection Officer & Privacy Inquiries
To exercise your statutory privacy rights, submit a data subject access request, or obtain our SOC 2 Type II compliance reports, please contact our Data Protection Office at privacy@stalci.com or mail: STALCI Global Technologies Inc., Attn: Privacy Office, 550 Howard Street, Suite 400, San Francisco, CA 94105, USA.`,
      published: true,
    },
    {
      slug: 'about',
      title: 'About STALCI Global Technologies',
      content: 'STALCI is a global technology and software studio engineering sovereign AI systems, multi-cloud platforms, data pipelines, and cyber resilience for enterprises.',
      published: true,
    },
  ];

  for (const p of pages) {
    await prisma.page.upsert({
      where: { slug: p.slug },
      update: { title: p.title, content: p.content, published: p.published },
      create: p,
    });
  }
  console.log(`✅ Upserted ${pages.length} dynamic CMS Pages.`);

  // 2. Jobs
  const jobsData = [
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
  ];

  // Clear and re-create jobs for clean seeding
  await prisma.job.deleteMany();
  for (const j of jobsData) {
    await prisma.job.create({ data: j });
  }
  console.log(`✅ Seeded ${jobsData.length} open engineering job positions.`);

  // 3. Dynamic Blogs
  const blogsData = [
    {
      slug: 'building-deterministic-agentic-llms',
      title: 'Building Deterministic Agentic LLMs for Mission-Critical Production Systems',
      excerpt: 'How we eliminate hallucinations and enforce strict mathematical safety guardrails in enterprise AI agents.',
      content: `Large Language Models (LLMs) are probabilistic by nature, but enterprise systems demand deterministic reliability. In this article, we outline our dual-loop architecture that pairs cognitive generative agents with formal verification state machines.

### The Problem with Unconstrained LLMs
When deploying LLMs in healthcare triage, algorithmic compliance, or financial settlement pipelines, a 1% hallucination rate is catastrophic. Standard prompt engineering and temperature tuning reduce variance, but cannot provide mathematical execution guarantees.

### The Dual-Loop Verification Pattern
At STALCI, every production agent executes within a sandboxed verification loop:
1. **Cognitive Loop (LLM)**: Parses unstructured human and API inputs into candidate JSON action schemas.
2. **Deterministic Validator (Rust/Wasm Engine)**: Executes strict schema constraints, invariant checks, and business policy rules.
3. **Rollback & Repair**: If the validator flags an invariant breach, the execution context is rejected and repaired before reaching downstream database ledgers.

### Benchmark Results
In stress-testing across 500,000 synthetic clinical triage cases, this dual-loop pattern achieved **100% policy conformance** with a negligible 4.8ms latency overhead.`,
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
      content: `Modern cloud providers generate massive bill shocks through subtle network topology traps. By deploying lightweight eBPF probes into Linux host kernels, we map every byte transmitted between microservices.

### The High Cost of Inter-Zone Egress
Many Kubernetes deployments inadvertently schedule interconnected microservices across different Availability Zones (AZs). While cross-AZ communication is fast, major cloud providers charge up to $0.02 per gigabyte. For data-heavy architectures processing petabytes monthly, this single hidden line-item can exceed $40,000/month.

### Kernel-Level Discovery with eBPF
Traditional APM agents instrument application runtimes, introducing significant CPU overhead. By attaching eBPF programs to kernel socket buffers (\`sock_ops\`), STALCI's telemetry layer inspects TCP flows with zero application code changes and less than 0.5% CPU overhead.

### Automated Topology Scheduling
Our Kubernetes operator pairs eBPF egress metrics with pod affinity topology rules, automatically co-locating chatty services into the same zone while preserving multi-region disaster recovery standby nodes.

### Resulting Impact
Within 60 days of rollout across TechCorp Global's 12,500-node cluster, cross-AZ bandwidth dropped by 78%, delivering a net 38% reduction in total infrastructure expenditure.`,
      author: 'Jason Zhao, Principal SRE',
      category: 'Cloud Engineering',
      readTime: '8 min read',
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
      publishedAt: new Date('2026-08-02'),
    },
    {
      slug: 'zero-trust-mesh-security-in-banking',
      title: 'Architecting Zero-Trust Identity Meshes for Tier-1 Investment Banks',
      excerpt: 'Why perimeter security fails modern hybrid banking and how SPIFFE/SPIRE provides cryptographically verifiable workload identities.',
      content: `Perimeter-based network security is obsolete in modern multi-cloud banking. When workloads span on-premise mainframes, AWS data lakes, and external SaaS gateways, IP-based firewall rules become unmaintainable and insecure.

### The Zero-Trust Paradigm
Zero-Trust architecture enforces a simple principle: **Never trust, always verify.** Every service-to-service call must be mutually authenticated, authorized, and encrypted using ephemeral cryptographic identities.

### Implementing SPIFFE/SPIRE at Scale
We implemented SPIRE (the SPIFFE Runtime Engine) to issue short-lived X.509 SVID certificates to every microservice container. Certificates automatically rotate every 60 minutes, eliminating hardcoded API keys and long-lived secrets.

### Real-World Audit Outcomes
Following independent penetration testing and SOC 2 Type II auditing, the architecture demonstrated zero lateral privilege escalation vectors, reducing audit preparation time from weeks to hours.`,
      author: 'Marcus Sterling, Head of Cyber Security',
      category: 'Cyber Security',
      readTime: '7 min read',
      imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
      publishedAt: new Date('2026-08-08'),
    },
  ];

  for (const b of blogsData) {
    await prisma.blog.upsert({
      where: { slug: b.slug },
      update: b,
      create: b,
    });
  }
  console.log(`✅ Upserted ${blogsData.length} in-depth technical blogs.`);

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
