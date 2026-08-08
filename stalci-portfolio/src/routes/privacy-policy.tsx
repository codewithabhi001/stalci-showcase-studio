import { createFileRoute } from '@tanstack/react-router';
import { Nav } from '@/components/site/Nav';
import { Footer } from '@/components/site/Footer';
import { SectionHeading } from '@/components/site/Brand';
import { useScrollReveal } from '@/lib/animations';

const title = 'Privacy Policy — STALCI';
const description =
  'How STALCI collects, uses, stores, shares and protects personal data across our website and enterprise IT services, including GDPR and CCPA rights.';

export const Route = createFileRoute('/privacy-policy')({
  head: () => ({
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: PrivacyPolicy,
});

const sections: { h: string; p: string[]; list?: string[] }[] = [
  {
    h: '1. Introduction and Scope',
    p: [
      'STALCI ("STALCI", "we", "us" or "our") is a global technology company providing software engineering, cloud, data, artificial intelligence and cyber security services. This Privacy Policy explains how we collect, use, disclose, transfer and safeguard personal data when you visit our website, contact us, apply for a role, or engage us as a client or supplier.',
      'This policy applies to all STALCI digital properties and to personal data we process as a data controller. Where we process personal data on behalf of a client as a data processor, the terms of the applicable Data Processing Agreement (DPA) and Master Services Agreement (MSA) take precedence.',
    ],
  },
  {
    h: '2. Information We Collect',
    p: ['We collect the following categories of personal data:'],
    list: [
      'Identity and contact data — name, job title, company, email address, telephone number and postal address you provide through forms, email or calls.',
      'Engagement data — project requirements, budgets, timelines, meeting notes and correspondence relating to a potential or active engagement.',
      'Recruitment data — CVs, portfolios, work history, references and interview notes submitted through our careers channels.',
      'Technical data — IP address, browser type and version, device identifiers, operating system, referring URLs and time-zone settings.',
      'Usage data — pages viewed, time on page, navigation paths, downloads and interactions with our content.',
      'Marketing preferences — your consent status for newsletters and commercial communications.',
    ],
  },
  {
    h: '3. How and Why We Use Your Information',
    p: [
      'We use personal data only where we have a lawful basis to do so. Those bases are: performance of a contract, our legitimate interests in operating and growing a business-to-business technology practice, compliance with a legal obligation, and consent where required.',
    ],
    list: [
      'To respond to enquiries, prepare proposals and deliver contracted services.',
      'To operate, secure, maintain and improve our website and platforms.',
      'To assess job applications and manage recruitment.',
      'To send service notices, security advisories and, with consent, marketing content.',
      'To detect, prevent and investigate fraud, abuse and security incidents.',
      'To meet accounting, tax, regulatory and contractual obligations.',
    ],
  },
  {
    h: '4. Cookies and Similar Technologies',
    p: [
      'We use strictly necessary cookies to operate the site and, where you consent, analytics cookies to understand aggregate usage. Analytics data is used to improve performance and content relevance and is not used to build advertising profiles. You can control cookies through your browser settings; disabling strictly necessary cookies may impair site functionality.',
    ],
  },
  {
    h: '5. Sharing and Disclosure',
    p: [
      'We do not sell, rent or trade personal data. We share personal data only with: (a) vetted sub-processors and service providers who host, secure, analyse or support our systems under written confidentiality and data-protection terms; (b) professional advisers such as auditors and lawyers; (c) authorities where disclosure is legally required; and (d) an acquirer in connection with a merger, acquisition or asset transfer, subject to equivalent protections.',
    ],
  },
  {
    h: '6. International Transfers',
    p: [
      'As a global company, we may transfer personal data outside your country of residence. Where data leaves the European Economic Area or the United Kingdom, we rely on adequacy decisions or Standard Contractual Clauses together with supplementary technical measures such as encryption in transit and at rest.',
    ],
  },
  {
    h: '7. Data Retention',
    p: [
      'We retain personal data only as long as necessary for the purposes described in this policy. Enquiry data is typically retained for 24 months from last contact; client engagement records for the duration of the contract plus the statutory limitation period; recruitment records for 12 months unless you consent to a longer talent-pool retention; and accounting records for the period required by applicable tax law. When retention periods lapse, data is securely deleted or irreversibly anonymised.',
    ],
  },
  {
    h: '8. Security Measures',
    p: [
      'Security is embedded in our engineering practice. We apply encryption in transit and at rest, least-privilege access controls, multi-factor authentication, network segmentation, centralised logging, continuous vulnerability scanning, periodic penetration testing and formal incident-response procedures aligned to ISO 27001 and SOC 2 control objectives. No system is perfectly secure, but we work continually to reduce risk and will notify affected individuals and regulators of a qualifying breach within the timelines the law requires.',
    ],
  },
  {
    h: '9. Your Rights',
    p: [
      'Depending on your jurisdiction, you may have rights to access, rectify, erase, restrict or object to processing, to data portability, to withdraw consent at any time, and to opt out of the sale or sharing of personal information (we do neither). Exercising these rights will never result in discriminatory treatment.',
      'To make a request, email privacy@stalci.com. We may ask for information to verify your identity and will respond within the statutory period, normally 30 days. You may also lodge a complaint with your local supervisory authority.',
    ],
  },
  {
    h: '10. Children',
    p: [
      'Our services are directed to businesses and professionals. We do not knowingly collect personal data from children under 16. If you believe a child has provided us data, contact us and we will delete it promptly.',
    ],
  },
  {
    h: '11. Third-Party Links',
    p: [
      'Our website may link to third-party sites and tools. We are not responsible for their privacy practices and encourage you to review their policies before providing personal data.',
    ],
  },
  {
    h: '12. Changes and Contact',
    p: [
      'We review this policy at least annually and whenever our practices materially change. Updates are published on this page with a revised "last updated" date, and material changes are communicated directly where required.',
      'Questions, requests or complaints: privacy@stalci.com. Data Protection Officer, STALCI, Global Privacy Office.',
    ],
  },
];

function PrivacyPolicy() {
  const contentRef = useScrollReveal();

  return (
    <div className="min-h-screen bg-background">
      <Nav solid />
      <main className="pb-24 pt-28">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <div className="mb-12">
            <SectionHeading
              eyebrow="Legal"
              title="Privacy Policy"
              subtitle="Last updated: August 2026. How STALCI collects, uses and protects personal data."
              align="left"
            />
          </div>

          <div ref={contentRef} className="max-w-none text-ink-soft">
            {sections.map((s) => (
              <section key={s.h}>
                <h2 className="mb-3 mt-9 text-lg font-semibold text-ink">{s.h}</h2>
                {s.p.map((para) => (
                  <p key={para} className="mb-4 text-sm leading-relaxed">
                    {para}
                  </p>
                ))}
                {s.list ? (
                  <ul className="mb-4 space-y-2">
                    {s.list.map((li) => (
                      <li key={li} className="text-sm leading-relaxed">
                        — {li}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
