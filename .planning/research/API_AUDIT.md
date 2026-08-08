# Frontend API Audit

**Goal:** Identify every piece of data currently hardcoded in the Stalci Showcase Studio frontend to ensure the backend CMS controls 100% of the website.

## Routes & Data Needs
- **Navbar/Footer (__root.tsx)**
  - Needed API: SiteSettings (Social links, contact info, footer text)
- **Home Page (index.tsx)**
  - Needed API: HeroContent, Services, Industries, Testimonials, Stats
- **Blog (log.index.tsx, log..tsx)**
  - Needed API: Blogs (List, Retrieve by slug)
- **Careers (careers.tsx)**
  - Needed API: Jobs (List active roles), JobApplications (Submit form)
- **Industries (industries..tsx)**
  - Needed API: Industries (Retrieve by slug)
- **Products (products..tsx)**
  - Needed API: Products (Retrieve by slug)
- **Services (services..tsx)**
  - Needed API: Services (Retrieve by slug)
- **Static Pages (privacy-policy.tsx, 	erms.tsx)**
  - Needed API: Pages (Retrieve by slug for Terms and Privacy)

## Synthesis: Required Models
To make the entire portfolio fully dynamic, the backend must implement CRUD APIs for:
1. **SiteConfig** (Key-Value store for global settings)
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
