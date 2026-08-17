import { createFileRoute } from '@tanstack/react-router';
import { Nav } from '@/components/site/Nav';
import { Footer } from '@/components/site/Footer';
import { useScrollReveal } from '@/lib/animations';
import { Scale, Mail } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchPageBySlug } from '@/lib/api';

const defaultTitle = 'Terms & Conditions — STALCI Enterprise';
const defaultDescription =
  'Comprehensive enterprise terms governing STALCI software engineering, sovereign AI, cloud infrastructure, IP ownership, SLAs and liability.';

export const Route = createFileRoute('/terms')({
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
  component: Terms,
});

interface LegalSection {
  id: string;
  h: string;
  p: string[];
  list?: string[];
}

const defaultSections: LegalSection[] = [
  {
    id: 'acceptance',
    h: '1. Acceptance & Contractual Capacity',
    p: [
      'By accessing the STALCI website, developer APIs, or engaging STALCI for professional engineering services, you unconditionally agree to these Terms & Conditions. If you are entering into this agreement on behalf of an enterprise or entity, you represent and warrant that you hold full corporate authority to bind that entity.',
      'If you do not agree with any provision of these terms, you must immediately terminate access to our digital properties and refrain from utilizing our consulting services.',
    ],
  },
  {
    id: 'services',
    h: '2. Professional Services & SOW Architecture',
    p: [
      'STALCI specializes in mission-critical software engineering, sovereign AI integration, cloud platform infrastructure, zero-trust cybersecurity, and enterprise systems modernization.',
      'All commercial client engagements are formally governed by an overarching Master Services Agreement (MSA) accompanied by one or more Statements of Work (SOW). The SOW establishes exact deliverables, architectural specifications, sprint timelines, acceptance milestones, fee structures, and service level agreements (SLAs). In any instance of direct conflict between these standard website terms and an executed MSA/SOW, the executed MSA/SOW shall supersede.',
    ],
  },
  {
    id: 'client-responsibilities',
    h: '3. Client Obligations & System Access',
    p: ['Timely and predictable delivery relies on collaborative client partnership. The client agrees to:'],
    list: [
      'Provide clear functional requirements, architecture constraints, and access to key technical decision-makers.',
      'Furnish necessary sandbox environments, API keys, third-party vendor licenses, and cloud credentials.',
      'Review and execute formal acceptance testing within the agreed review window (standard 10 business days).',
      'Warrant that all client-supplied data, source code, and design assets do not infringe upon any third-party intellectual property.',
    ],
  },
  {
    id: 'fees-billing',
    h: '4. Fees, Itemized Invoicing & Payment Terms',
    p: [
      'Fees are billed either on a Time & Materials (T&M) sprint rate basis or against milestone acceptance for Fixed-Price engagements as specified in the SOW.',
      'Invoices are rendered electronically via the STALCI Billing Console and are due strictly within thirty (30) calendar days from receipt unless alternate terms are specified in an active SOW. Undisputed late balances shall accrue finance interest at 1.5% per month or the legal statutory maximum.',
    ],
  },
  {
    id: 'intellectual-property',
    h: '5. Intellectual Property & Code Ownership',
    p: [
      'Work-for-Hire Deliverables: Upon full and final settlement of all invoiced fees for the applicable milestone or project, STALCI unconditionally assigns to the client 100% exclusive worldwide ownership, title, and copyright in the custom source code, architectures, schemas, and design deliverables produced explicitly for the client under the SOW.',
      'STALCI Background IP: STALCI retains all rights in its proprietary pre-existing toolkits, reusable foundational libraries, utility helpers, and boilerplate frameworks. STALCI grants the client a perpetual, irrevocable, royalty-free, non-exclusive license to use, modify, and deploy any incorporated Background IP solely as embedded within the client deliverable.',
    ],
  },
  {
    id: 'confidentiality',
    h: '6. Confidentiality & Non-Disclosure',
    p: [
      'Each party agrees that all technical architectures, source code, proprietary algorithms, financial terms, and strategic roadmaps disclosed during the engagement shall constitute Confidential Information.',
      'Neither party shall disclose or utilize Confidential Information for any purpose outside the scope of the project, applying the same degree of care it uses to protect its own sensitive data (and no less than reasonable standard of care).',
    ],
  },
  {
    id: 'security-data',
    h: '7. Data Protection, GDPR & SOC 2 Compliance',
    p: [
      'STALCI enforces rigorous DevSecOps and data protection policies aligned with SOC 2 Type II and ISO 27001 control objectives. Where STALCI processes personal data on the client’s behalf, STALCI operates as a Data Processor under a Data Processing Addendum (DPA) incorporating EU Standard Contractual Clauses (SCCs).',
      'All client data in transit and at rest is protected using industry-standard TLS 1.3 and AES-256 encryption. Access to production environments is strictly role-based and governed by hardware MFA.',
    ],
  },
  {
    id: 'warranties',
    h: '8. Warranties & Remedy Period',
    p: [
      'STALCI warrants that all engineering services will be executed with elite professional skill, diligence, and sound craftsmanship by qualified specialists. Deliverables are warranted to materially conform to documented acceptance criteria for thirty (30) days post-handover.',
      'STALCI’s sole obligation for a verified warranty claim is to re-perform, patch, or correct the non-conforming deliverable at zero additional cost.',
      'Except as explicitly set forth, all services and website contents are provided "as is" without implied warranties of merchantability, fitness for a particular purpose, or uninterrupted third-party cloud uptime.',
    ],
  },
  {
    id: 'liability',
    h: '9. Limitation of Liability',
    p: [
      'To the maximum extent permitted by applicable law, neither party shall be liable for indirect, incidental, consequential, special, or punitive damages, including loss of profits, revenue, or business interruption.',
      'Each party’s maximum aggregate cumulative liability arising out of an engagement shall be strictly capped at the total fees paid by the client under the applicable Statement of Work in the twelve (12) months preceding the incident.',
    ],
  },
  {
    id: 'termination',
    h: '10. Term, Suspension & Exit Transition',
    p: [
      'Either party may terminate an active SOW for convenience upon thirty (30) days written notice, or immediately in the event of an uncured material breach following fifteen (15) days written notice. Upon termination, the client shall pay for all work completed and non-cancellable third-party commitments up to the effective termination date.',
      'Upon contract conclusion, STALCI provides full handover assistance, including source code repositories, CI/CD pipelines, architectural documentation, and cloud infrastructure credential transfers.',
    ],
  },
  {
    id: 'governing-law',
    h: '11. Governing Law & Dispute Resolution',
    p: [
      'These terms and all related client agreements are governed by and construed in accordance with the laws of the State of California, United States, without giving effect to conflicts-of-law principles.',
      'The parties agree to attempt in good faith to resolve any commercial dispute through executive escalation before initiating formal arbitration under AAA rules in San Francisco, California.',
    ],
  },
  {
    id: 'contact',
    h: '12. Legal Inquiries & Notices',
    p: [
      'Formal legal notices, SLA queries, or contractual inquiries should be submitted in writing to STALCI Legal Counsel at legal@stalci.com or addressed to: STALCI Global Technologies Inc., Attn: Legal Operations, 550 Howard Street, Suite 400, San Francisco, CA 94105, USA.',
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

function Terms() {
  const contentRef = useScrollReveal();

  const { data: pageData } = useQuery({
    queryKey: ['cms-page', 'terms'],
    queryFn: () => fetchPageBySlug('terms'),
  });

  const titleText = pageData?.title || 'Terms & Conditions — STALCI Enterprise';
  const sections = parseMarkdownSections(pageData?.content || '');

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Nav solid />

      {/* Header Banner (Dark Section Breaker Style) */}
      <div className="bg-[#090B0E] text-white pt-32 pb-20 border-b border-white/10">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Scale className="h-3.5 w-3.5" />
            Enterprise Master Terms
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            {titleText}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-300 max-w-3xl leading-relaxed">
            The legal and operational framework governing software engineering engagements, sovereign cloud architecture, IP rights, and SLAs delivered by STALCI Global Technologies.
          </p>
          <div className="mt-6 flex items-center gap-4 text-xs text-neutral-400 font-mono">
            <span>Version: 2026.2</span>
            <span>•</span>
            <span>Effective: {pageData?.updatedAt ? new Date(pageData.updatedAt).toLocaleDateString() : 'August 2026'}</span>
            <span>•</span>
            <span>Managed via Backend CMS</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div ref={contentRef} className="space-y-8">
            {sections.map((s) => (
              <div
                key={s.id}
                id={s.id}
                className="rounded-2xl bg-white border border-slate-200/90 shadow-sm p-6 sm:p-9 transition-all hover:border-slate-300"
              >
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5 pb-3 border-b border-slate-200">
                  <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0" />
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
                          <span className="text-blue-600 font-bold mt-0.5">•</span>
                          <span>{li}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}

            {/* Legal Support Card */}
            <div className="rounded-2xl bg-[#090B0E] text-white p-8 sm:p-10 border border-white/15 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-400" />
                  Have Contractual Questions?
                </h3>
                <p className="mt-2 text-sm text-neutral-300 max-w-xl">
                  Our enterprise legal counsel is available to review custom Master Service Agreements (MSAs), security questionnaires, and Data Processing Addendums.
                </p>
              </div>
              <a
                href="mailto:legal@stalci.com"
                className="shrink-0 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 text-sm transition-all shadow-md"
              >
                Contact Legal Team
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
