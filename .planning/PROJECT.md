# Project Context

## The Core Value
A fully dynamic, enterprise-grade architecture for a company portfolio, featuring a public frontend, a separate Next.js Admin Panel, and a separate Nest.js backend API to control every aspect of the business.

## What This Is
A 3-part microservice-style architecture:
1. **Public Website (TanStack Start):** The existing portfolio, fully refactored to fetch all dynamic content (Careers, Blog, Services, T&C) from the backend.
2. **Admin Dashboard (Next.js):** A completely separate frontend application for internal staff to manage the company.
3. **Backend API (Nest.js):** The central source of truth handling CMS content, Invoices, Client Inquiries, Feedbacks, Follow-ups, and all standard enterprise features.

## What This Is NOT
- Not a static site anymore. All pages (Blog, Careers, Services, Terms) must be dynamically controlled via the Admin Panel.
- Not a single monolith. We are splitting the Admin Panel (Next.js) and Backend (Nest.js) into separate applications.

## Requirements

### Validated
- ? Existing Public Website built with TanStack Start + Vite
- ? Hero section needs logo fix and mobile layout adjustments

### Active
- [ ] Initialize NestJS Backend (/backend)
- [ ] Initialize Next.js Admin Panel (/admin-panel)
- [ ] Backend: Build CMS APIs for Pages (Blog, Careers, Services, Terms & Conditions)
- [ ] Backend: Build CRM APIs (Client Inquiries, Feedback, Follow-ups)
- [ ] Backend: Build Finance APIs (Invoicing)
- [ ] Admin Panel: Build UI to manage all CMS, CRM, and Finance features
- [ ] Public Website: Connect all static content to dynamic backend APIs
- [ ] Public Website: Fix Hero section logo and mobile layout

### Out of Scope
- TBD

## Key Decisions
| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js for Admin | Requested by user for a separate, robust dashboard | Pending |
| Nest.js for Backend | Requested by user for scalable, enterprise-like backend | Pending |
| Dynamic Content | All pages must be controlled from the backend | Pending |

---
*Last updated: 2026-08-08 after initialization*
