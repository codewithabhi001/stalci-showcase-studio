import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:password123@localhost:5433/stalci_db?schema=public';
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding Database with realistic data...');

  // 1. SiteConfig
  await prisma.siteConfig.createMany({
    data: [
      { key: 'siteName', value: 'Stalci Showcase Studio' },
      { key: 'contactEmail', value: 'hello@stalci.com' },
      { key: 'phone', value: '+1 (555) 123-4567' },
      { key: 'location', value: 'San Francisco, CA' },
      { key: 'social_twitter', value: 'https://twitter.com/stalci' },
      { key: 'social_linkedin', value: 'https://linkedin.com/company/stalci' },
    ],
    skipDuplicates: true,
  });

  // 2. Pages
  await prisma.page.createMany({
    data: [
      { slug: 'about', title: 'About Us', content: 'We are a premier showcase studio crafting digital experiences.', published: true },
      { slug: 'privacy-policy', title: 'Privacy Policy', content: 'Your privacy is important to us...', published: true },
      { slug: 'terms', title: 'Terms of Service', content: 'By using our services, you agree...', published: true },
    ],
    skipDuplicates: true,
  });

  // 3. Blogs
  await prisma.blog.createMany({
    data: [
      { slug: 'future-of-web', title: 'The Future of Web Development in 2027', excerpt: 'How AI is reshaping coding.', content: 'Full article text here...', author: 'Alice Smith', publishedAt: new Date() },
      { slug: 'design-systems', title: 'Mastering Design Systems', excerpt: 'Building cohesive UIs.', content: 'Full article text here...', author: 'Bob Jones', publishedAt: new Date() },
    ],
    skipDuplicates: true,
  });

  // 4. Industries
  await prisma.industry.createMany({
    data: [
      { slug: 'fintech', name: 'Financial Technology', description: 'Empowering digital banking and trading.' },
      { slug: 'healthcare', name: 'Healthcare', description: 'Innovating patient care through technology.' },
      { slug: 'ecommerce', name: 'E-Commerce', description: 'Next-gen retail experiences.' },
    ],
    skipDuplicates: true,
  });

  // 5. Products
  await prisma.product.createMany({
    data: [
      { slug: 'stalci-core', name: 'Stalci Core', description: 'Our enterprise framework.', pricing: '/mo' },
      { slug: 'stalci-analytics', name: 'Stalci Analytics', description: 'Deep insights dashboard.', pricing: '/mo' },
    ],
    skipDuplicates: true,
  });

  // 6. Services
  await prisma.service.createMany({
    data: [
      { slug: 'web-development', name: 'Web Development', description: 'Custom high-performance websites.', icon: 'Code' },
      { slug: 'ui-ux-design', name: 'UI/UX Design', description: 'Stunning user interfaces.', icon: 'Palette' },
      { slug: 'cloud-hosting', name: 'Cloud Hosting', description: 'Scalable infrastructure.', icon: 'Cloud' },
    ],
    skipDuplicates: true,
  });

  // 7. Testimonials
  await prisma.testimonial.createMany({
    data: [
      { clientName: 'Sarah Jenkins', company: 'TechCorp', quote: 'Stalci completely transformed our digital presence.', rating: 5 },
      { clientName: 'David Lee', company: 'Innovate LLC', quote: 'The best agency we have ever worked with.', rating: 5 },
    ],
  });

  // 8. Jobs
  const job = await prisma.job.create({
    data: {
      title: 'Senior Full Stack Engineer',
      location: 'Remote',
      type: 'Full-time',
      description: 'Looking for an expert in Next.js and NestJS.',
      requirements: '5+ years experience, Prisma knowledge.',
    },
  });

  // 9. JobApplications
  await prisma.jobApplication.create({
    data: {
      jobId: job.id,
      applicantName: 'John Developer',
      applicantEmail: 'john.dev@example.com',
      status: 'NEW',
    },
  });

  // 10. Inquiries
  await prisma.inquiry.createMany({
    data: [
      { name: 'Michael Scott', email: 'michael@dundermifflin.com', message: 'I need a new website for paper sales.', status: 'NEW' },
      { name: 'Pam Beesly', email: 'pam@dundermifflin.com', message: 'Do you guys do mural design?', status: 'RESOLVED' },
    ],
  });

  // 11. Feedbacks
  await prisma.feedback.createMany({
    data: [
      { rating: 5, comments: 'Amazing service!' },
      { rating: 4, comments: 'Great, but project was delayed by 2 days.' },
    ],
  });

  // 12. Invoices
  await prisma.invoice.createMany({
    data: [
      { clientName: 'TechCorp', amount: 12500, status: 'PENDING', dueDate: new Date('2026-09-01') },
      { clientName: 'Innovate LLC', amount: 8000, status: 'PAID', dueDate: new Date('2026-07-15') },
    ],
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
