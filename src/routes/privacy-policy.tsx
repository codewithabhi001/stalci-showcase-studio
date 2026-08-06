import { createFileRoute } from '@tanstack/react-router';
import { SectionHeading } from '@/components/site/Brand';
import { useScrollReveal } from '@/lib/animations';

export const Route = createFileRoute('/privacy-policy')({
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  const contentRef = useScrollReveal();

  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <div className="mb-14">
          <SectionHeading
            eyebrow="Legal"
            title="Privacy Policy"
            subtitle="Last updated: August 2026. This Privacy Policy describes how STALCI collects, uses, and protects your information."
          />
        </div>

        <div ref={contentRef} className="prose prose-sm sm:prose-base prose-neutral dark:prose-invert max-w-none text-ink-soft">
          <h3 className="text-xl font-semibold text-ink mt-8 mb-4">1. Information We Collect</h3>
          <p className="mb-6">
            We collect information that you provide directly to us, such as when you request a consultation, fill out a contact form, or communicate with us. This may include your name, email address, phone number, company name, and project details. We also automatically collect certain technical data when you visit our website, such as IP addresses, browser types, and usage patterns to improve our digital platforms.
          </p>

          <h3 className="text-xl font-semibold text-ink mt-8 mb-4">2. How We Use Your Information</h3>
          <p className="mb-6">
            STALCI utilizes your information to provide, maintain, and improve our enterprise IT services. This includes responding to your inquiries, processing transactions, sending technical notices, and providing customer support. We may also use the information to analyze trends, administer our website, and ensure compliance with our legal obligations.
          </p>

          <h3 className="text-xl font-semibold text-ink mt-8 mb-4">3. Data Security</h3>
          <p className="mb-6">
            We implement robust, enterprise-grade security measures designed to protect your personal data from unauthorized access, alteration, disclosure, or destruction. While no internet transmission is entirely secure, we leverage industry-standard encryption, firewalls, and strict access controls in accordance with global security compliance frameworks (e.g., ISO 27001, SOC 2).
          </p>

          <h3 className="text-xl font-semibold text-ink mt-8 mb-4">4. Sharing of Information</h3>
          <p className="mb-6">
            We do not sell, trade, or rent your personal information to third parties. We may share your data with trusted subcontractors and service providers who assist us in operating our business and delivering our services, provided they are bound by strict confidentiality agreements. We may also disclose information if required by law or to protect our legal rights.
          </p>

          <h3 className="text-xl font-semibold text-ink mt-8 mb-4">5. Your Rights and Choices</h3>
          <p className="mb-6">
            Depending on your jurisdiction (such as under the GDPR or CCPA), you may have the right to access, correct, delete, or restrict the processing of your personal data. To exercise any of these rights, or if you have questions regarding our privacy practices, please contact our Data Protection Officer at privacy@stalci.com.
          </p>

          <h3 className="text-xl font-semibold text-ink mt-8 mb-4">6. Changes to this Policy</h3>
          <p className="mb-6">
            We may periodically update this Privacy Policy to reflect changes in our practices or regulatory requirements. We will notify you of any material changes by posting the updated policy on this page and updating the "Last updated" date.
          </p>
        </div>
      </div>
    </div>
  );
}
