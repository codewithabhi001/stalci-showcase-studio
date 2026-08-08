import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const api = axios.create({ baseURL: API_BASE, headers: { "Content-Type": "application/json" } });

// --- CMS ---
export const fetchPages = () => api.get("/cms/pages").then((r) => r.data);
export const createPage = (data: any) => api.post("/cms/pages", data).then((r) => r.data);
export const updatePage = (id: number, data: any) => api.put(`/cms/pages/${id}`, data).then((r) => r.data);
export const deletePage = (id: number) => api.delete(`/cms/pages/${id}`).then((r) => r.data);

export const fetchBlogs = () => api.get("/cms/blogs").then((r) => r.data);
export const createBlog = (data: any) => api.post("/cms/blogs", data).then((r) => r.data);
export const updateBlog = (id: number, data: any) => api.put(`/cms/blogs/${id}`, data).then((r) => r.data);
export const deleteBlog = (id: number) => api.delete(`/cms/blogs/${id}`).then((r) => r.data);

export const fetchIndustries = () => api.get("/cms/industries").then((r) => r.data);
export const createIndustry = (data: any) => api.post("/cms/industries", data).then((r) => r.data);
export const updateIndustry = (id: number, data: any) => api.put(`/cms/industries/${id}`, data).then((r) => r.data);
export const deleteIndustry = (id: number) => api.delete(`/cms/industries/${id}`).then((r) => r.data);

export const fetchProducts = () => api.get("/cms/products").then((r) => r.data);
export const createProduct = (data: any) => api.post("/cms/products", data).then((r) => r.data);
export const updateProduct = (id: number, data: any) => api.put(`/cms/products/${id}`, data).then((r) => r.data);
export const deleteProduct = (id: number) => api.delete(`/cms/products/${id}`).then((r) => r.data);

export const fetchServices = () => api.get("/cms/services").then((r) => r.data);
export const createService = (data: any) => api.post("/cms/services", data).then((r) => r.data);
export const updateService = (id: number, data: any) => api.put(`/cms/services/${id}`, data).then((r) => r.data);
export const deleteService = (id: number) => api.delete(`/cms/services/${id}`).then((r) => r.data);

export const fetchTestimonials = () => api.get("/cms/testimonials").then((r) => r.data);
export const createTestimonial = (data: any) => api.post("/cms/testimonials", data).then((r) => r.data);
export const updateTestimonial = (id: number, data: any) => api.put(`/cms/testimonials/${id}`, data).then((r) => r.data);
export const deleteTestimonial = (id: number) => api.delete(`/cms/testimonials/${id}`).then((r) => r.data);

export const fetchSiteConfig = () => api.get("/cms/config").then((r) => r.data);
export const updateSiteConfig = (key: string, value: string) => api.put(`/cms/config/${key}`, { value }).then((r) => r.data);

// --- CRM ---
export const fetchJobs = () => api.get("/crm/jobs/all").then((r) => r.data);
export const createJob = (data: any) => api.post("/crm/jobs", data).then((r) => r.data);
export const updateJob = (id: number, data: any) => api.put(`/crm/jobs/${id}`, data).then((r) => r.data);
export const deleteJob = (id: number) => api.delete(`/crm/jobs/${id}`).then((r) => r.data);

export const fetchApplications = () => api.get("/crm/applications").then((r) => r.data);
export const updateApplication = (id: number, data: any) => api.put(`/crm/applications/${id}`, data).then((r) => r.data);
export const deleteApplication = (id: number) => api.delete(`/crm/applications/${id}`).then((r) => r.data);

export const fetchInquiries = () => api.get("/crm/inquiries").then((r) => r.data);
export const createInquiry = (data: any) => api.post("/crm/inquiries", data).then((r) => r.data);
export const updateInquiry = (id: number, data: any) => api.put(`/crm/inquiries/${id}`, data).then((r) => r.data);
export const deleteInquiry = (id: number) => api.delete(`/crm/inquiries/${id}`).then((r) => r.data);

export const fetchFeedbacks = () => api.get("/crm/feedback").then((r) => r.data);
export const deleteFeedback = (id: number) => api.delete(`/crm/feedback/${id}`).then((r) => r.data);

// --- Finance ---
export const fetchInvoices = () => api.get("/finance/invoices").then((r) => r.data);
export const createInvoice = (data: any) => api.post("/finance/invoices", data).then((r) => r.data);
export const updateInvoice = (id: number, data: any) => api.put(`/finance/invoices/${id}`, data).then((r) => r.data);
export const deleteInvoice = (id: number) => api.delete(`/finance/invoices/${id}`).then((r) => r.data);

// --- Dashboard Stats ---
export const fetchStats = () => api.get("/finance/stats").then((r) => r.data);
