import { createFileRoute } from '@tanstack/react-router';
import { Nav } from '@/components/site/Nav';
import { Footer } from '@/components/site/Footer';
import { useScrollReveal } from '@/lib/animations';
import { ShieldCheck, Mail } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchPageBySlug } from '@/lib/api';

const defaultTitle = 'Privacy Policy & Data Security — STALCI Enterprise';
const defaultDescription =
  'STALCI privacy policy detailing our zero-trust data protection frameworks, GDPR/SOC 2 compliance, client data isolation, and cryptographic confidentiality standards.';

export const Route = createFileRoute('/privacy-policy')({
  head: () => ({
    meta: [
      { title: defaultTitle },
      { name: 'description', content: defaultDescription },
      { property: 'og:title', content: defaultTitle },
      { property: 'og:description', content: defaultDescription },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: PrivacyPolicy,
});

interface LegalSection {
  id: string;
  h: string;
  p: string[];
  list?: string[];
}

const defaultSections: LegalSection[] = [
  {
    id: 'introduction',
    h: '1. Introduction & Global Scope',
    p: [
      'STALCI Global Technologies Inc. ("STALCI", "we", "us", or "our") is dedicated to uncompromising data privacy, confidentiality, and integrity across all software platforms, APIs, consulting engagements, and client ecosystems.',
      'This Privacy Policy describes how we collect, process, safeguard, and govern personal and corporate information when you visit our website, submit technical consultation inquiries, interact with client portals, or engage our engineering teams.',
    ],
  },
  {
    id: 'information-collected',
    h: '2. Information We Ingest & Process',
    p: ['We collect information solely to provide elite engineering services, manage commercial relationships, and secure our platforms. This includes:'],
    list: [
      'Corporate Lead & Contact Data: Name, enterprise email, phone number, company name, and job title provided via inquiries.',
      'Technical Project Specifications: Architecture briefs, system requirements, sandbox credentials, and technical dependencies provided under NDA.',
      'Candidate & Talent Information: Resumes, GitHub profiles, portfolio links, and employment history submitted for open engineering roles.',
      'Telemetry & Security Logs: Anonymized request metadata, IP addresses, browser agents, and access logs used strictly to mitigate cyber threats and maintain platform reliability.',
    ],
  },
  {
    id: 'data-use',
    h: '3. Lawful Basis & Purposes for Processing',
    p: ['We process data under strict lawful bases established by global privacy frameworks (including GDPR, CCPA/CPRA):'],
    list: [
      'Contractual Performance: Executing statements of work, architecting client solutions, and providing technical support.',
      'Legitimate Business Interests: Protecting corporate infrastructure against intrusion, fraud, and Denial of Service (DoS) attacks.',
      'Legal & Compliance Obligations: Adhering to statutory tax accounting, export controls, and international security governance.',
      'Explicit Consent: Communicating technical whitepapers, architectural updates, and scheduled interview consultations.',
    ],
  },
  {
    id: 'sovereign-ai',
    h: '4. Sovereign AI & Client Data Confidentiality',
    p: [
      'Zero Model Training on Client Data: STALCI guarantees that proprietary client source code, database records, and intellectual property are NEVER used to train public or shared Large Language Models (LLMs) or third-party AI systems.',
      'Private Enclaves: Enterprise AI deployments are executed in isolated, VPC-peered private enclaves with strict data boundary policies and zero data retention (ZDR) APIs.',
    ],
  },
  {
    id: 'security-standards',
    h: '5. Zero-Trust Security & Cryptographic Protection',
    p: [
      'STALCI enforces defense-in-depth cybersecurity controls across all engineering pods:',
      'Data in Transit: Encrypted using TLS 1.3 with Perfect Forward Secrecy (PFS).',
      'Data at Rest: Encrypted using AES-256 with rotating hardware cryptographic keys.',
      'Access Governance: Strict Principle of Least Privilege (PoLP) and mandatory FIDO2 hardware Multi-Factor Authentication (MFA).',
      'Infrastructure Audit: Continuous automated vulnerability scanning, eBPF telemetry monitoring, and annual third-party penetration testing.',
    ],
  },
  {
    id: 'data-sharing',
    h: '6. Third-Party Sub-Processors & Data Transfer',
    p: [
      'STALCI never sells, monetizes, or leases client personal data to any third party.',
      'We engage only enterprise sub-processors that maintain SOC 2 Type II or ISO 27001 certifications (e.g. AWS, GCP, Cloudflare, PostgreSQL hosting). Cross-border data transfers adhere strictly to Standard Contractual Clauses (SCCs) and adequacy decisions.',
    ],
  },
  {
    id: 'retention',
    h: '7. Data Retention & Cryptographic Erasure',
    p: [
      'We retain corporate lead and project data only for the duration necessary to fulfill our contractual commitments or statutory requirements.',
      'Upon termination of an engagement or upon formal client request, all client-specific data, sandbox databases, and staging assets are permanently and cryptographically purged within thirty (30) calendar days.',
    ],
  },
  {
    id: 'your-rights',
    h: '8. Global Privacy Rights (GDPR / CCPA / CPRA)',
    p: ['Depending on your geographic jurisdiction, you possess enforceable privacy rights:'],
    list: [
      'Right to Access & Portability: Request a copy of all personal data held by STALCI.',
      'Right to Rectification: Correct inaccurate or incomplete personal records.',
      'Right to Erasure ("Right to be Forgotten"): Request permanent deletion of personal information.',
      'Right to Restriction & Objection: Restrict or object to specific data processing activities.',
    ],
  },
  {
    id: 'contact-dpo',
    h: '9. Data Protection Officer & Privacy Inquiries',
    p: [
      'To exercise your statutory privacy rights, submit a data subject access request, or obtain our SOC 2 Type II compliance reports, please contact our Data Protection Office at privacy@stalci.com or mail: STALCI Global Technologies Inc., Attn: Privacy Office, 550 Howard Street, Suite 400, San Francisco, CA 94105, USA.',
    ],
  },
];

// Clean robust markdown parser with zero empty blocks or stray hashes
function parseMarkdownSections(content: string): LegalSection[] {
  if (!content || !content.trim()) return defaultSections;

  const rawSections = content.split(/\n(?=###?\s+|\d+\.\s+)/g);
  const result: LegalSection[] = [];

  rawSections.forEach((raw, idx) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    const lines = trimmed
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0 && l !== '#' && l !== '##' && l !== '###');

    if (lines.length === 0) return;

    let headerLine = lines[0].replace(/^###?\s+/, '').trim();
    if (!headerLine || headerLine === '#' || headerLine === '##' || headerLine === '###') {
      return;
    }

    const paragraphs: string[] = [];
    const listItems: string[] = [];

    lines.slice(1).forEach((line) => {
      const cleanLine = line.trim();
      if (!cleanLine || cleanLine === '#' || cleanLine === '##' || cleanLine === '###') return;

      if (cleanLine.startsWith('- ') || cleanLine.startsWith('* ') || cleanLine.startsWith('• ')) {
        listItems.push(cleanLine.replace(/^[-*•]\s+/, '').trim());
      } else {
        paragraphs.push(cleanLine);
      }
    });

    if (headerLine && (paragraphs.length > 0 || listItems.length > 0)) {
      result.push({
        id: `sec-${idx}`,
        h: headerLine,
        p: paragraphs.length > 0 ? paragraphs : [''],
        list: listItems.length > 0 ? listItems : undefined,
      });
    }
  });

  return result.length > 0 ? result : defaultSections;
}

function PrivacyPolicy() {
  const contentRef = useScrollReveal();

  const { data: pageData } = useQuery({
    queryKey: ['cms-page', 'privacy-policy'],
    queryFn: () => fetchPageBySlug('privacy-policy'),
  });

  const titleText = pageData?.title || 'Privacy Policy & Data Security — STALCI Enterprise';
  const sections = parseMarkdownSections(pageData?.content || '');

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <Nav solid />

      {/* Header Banner */}
      <div className="relative bg-white pt-32 pb-20 sm:pt-36 sm:pb-24 border-b border-slate-200 overflow-hidden">
        <div className="grid-lines-light absolute inset-0 opacity-60 pointer-events-none" />

        <div className="mx-auto max-w-5xl px-5 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            Zero-Trust Governance & Privacy
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
            {pageData?.title || 'Privacy Policy & Data Security'}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Uncompromising cryptographic data isolation, GDPR/SOC 2 compliance standards, and transparent data stewardship across all enterprise engagements.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-500 font-mono border-t border-slate-100 pt-4">
            <span className="text-emerald-700 font-bold">SOC 2 Type II Compliant</span>
            <span>•</span>
            <span>Last Updated: {pageData?.updatedAt ? new Date(pageData.updatedAt).toLocaleDateString() : 'August 2026'}</span>
            <span>•</span>
            <span>Managed via Backend CMS</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div ref={contentRef} className="space-y-8">
            {sections.map((s) => (
              <div
                key={s.id}
                id={s.id}
                className="rounded-3xl bg-white border border-slate-200/90 shadow-2xs p-6 sm:p-9 transition-all hover:border-amber-500/60 hover:shadow-md"
              >
                <h2 className="text-lg sm:text-xl font-bold text-slate-950 flex items-center gap-2.5 pb-3 border-b border-slate-100">
                  <span className="h-2 w-2 rounded-full bg-emerald-600 shrink-0" />
                  <span>{s.h}</span>
                </h2>
                <div className="mt-4 space-y-3.5 text-sm sm:text-[14.5px] leading-relaxed text-slate-700">
                  {s.p.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                  {s.list && (
                    <ul className="mt-3 space-y-2 pl-2">
                      {s.list.map((li, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-700">
                          <span className="text-emerald-600 font-bold mt-0.5">•</span>
                          <span>{li}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}

            {/* DPO Support Card */}
            <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-10 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Mail className="h-5 w-5 text-emerald-400" />
                  Data Protection Office (DPO)
                </h3>
                <p className="mt-2 text-sm text-slate-300 max-w-xl leading-relaxed">
                  For GDPR data subject requests, SOC 2 compliance certifications, or custom DPA signatures, contact our dedicated security team.
                </p>
              </div>
              <a
                href="mailto:privacy@stalci.com"
                className="shrink-0 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-6 py-3 text-xs sm:text-sm transition-all shadow-md cursor-pointer"
              >
                Contact Data Protection Officer
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
