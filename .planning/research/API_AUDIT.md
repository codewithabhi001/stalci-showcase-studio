# Frontend API Audit

**Goal:** Identify every piece of data currently hardcoded in the Stalci Showcase Studio frontend to ensure the backend CMS controls 100% of the website.

## Routes & Data Needs
- **Navbar/Footer (__root.tsx)**: SiteSettings (Social links, contact info, footer text)
- **Home Page (index.tsx)**: HeroContent, Services, Industries, Testimonials, Stats
- **Blog (log.index.tsx, log..tsx)**: Blogs (List, Retrieve by slug)
- **Careers (careers.tsx)**: Jobs (List active roles), JobApplications (Submit form)
- **Industries (industries..tsx)**: Industries (Retrieve by slug)
- **Products (products..tsx)**: Products (Retrieve by slug)
- **Services (services..tsx)**: Services (Retrieve by slug)
- **Static Pages (privacy-policy.tsx, 	erms.tsx)**: Pages (Retrieve by slug)

## Synthesis: Required Models Added to Prisma
1. **SiteConfig** (Global settings)
2. **Page** (Terms, Privacy Policy)
3. **Blog** (Posts)
4. **Job** & **JobApplication** (Careers)
5. **Industry**
6. **Product**
7. **Service**
8. **Testimonial**
9. **Inquiry** (Contact Form)
10. **Feedback**
11. **Invoice** (Client Billing)
