const API_BASE = "http://localhost:3000";

// --- PROJECTS ---
export async function fetchProjects(category?: string, featured?: boolean) {
  try {
    const params = new URLSearchParams();
    if (category && category !== "All") params.append("category", category);
    if (featured !== undefined) params.append("featured", String(featured));
    const url = `${API_BASE}/projects${params.toString() ? `?${params.toString()}` : ""}`;
    const res = await fetch(url);
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.warn("Failed to fetch projects from API, falling back to static data", e);
    return [];
  }
}

export async function fetchFeaturedProjects() {
  try {
    const res = await fetch(`${API_BASE}/projects/featured`);
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.warn("Failed to fetch featured projects from API", e);
    return [];
  }
}

export async function fetchProjectBySlug(slug: string) {
  const res = await fetch(`${API_BASE}/projects/slug/${slug}`);
  if (!res.ok) throw new Error("Failed to fetch project");
  return res.json();
}

// --- TECHNOLOGIES & SKILLS ---
export async function fetchTechnologies(category?: string) {
  try {
    const params = category && category !== "All" ? `?category=${encodeURIComponent(category)}` : "";
    const res = await fetch(`${API_BASE}/cms/technologies${params}`);
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.warn("Failed to fetch technologies from API", e);
    return [];
  }
}

// --- SERVICES ---
export async function fetchServices() {
  try {
    const res = await fetch(`${API_BASE}/cms/services`);
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.warn("Failed to fetch services from API", e);
    return [];
  }
}

export async function fetchServiceBySlug(slug: string) {
  const res = await fetch(`${API_BASE}/cms/services/${slug}`);
  if (!res.ok) throw new Error("Failed to fetch service");
  return res.json();
}

// --- PRODUCTS ---
export async function fetchProducts() {
  try {
    const res = await fetch(`${API_BASE}/cms/products`);
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.warn("Failed to fetch products from API", e);
    return [];
  }
}

export async function fetchProductBySlug(slug: string) {
  const res = await fetch(`${API_BASE}/cms/products/${slug}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

// --- INDUSTRIES ---
export async function fetchIndustries() {
  try {
    const res = await fetch(`${API_BASE}/cms/industries`);
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.warn("Failed to fetch industries from API", e);
    return [];
  }
}

export async function fetchIndustryBySlug(slug: string) {
  const res = await fetch(`${API_BASE}/cms/industries/${slug}`);
  if (!res.ok) throw new Error("Failed to fetch industry");
  return res.json();
}

// --- TESTIMONIALS ---
export async function fetchTestimonials() {
  try {
    const res = await fetch(`${API_BASE}/cms/testimonials`);
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.warn("Failed to fetch testimonials from API", e);
    return [];
  }
}

// --- BLOGS ---
export async function fetchBlogs() {
  try {
    const res = await fetch(`${API_BASE}/cms/blogs`);
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.warn("Failed to fetch blogs from API", e);
    return [];
  }
}

export async function fetchBlogBySlug(slug: string) {
  const res = await fetch(`${API_BASE}/cms/blogs/${slug}`);
  if (!res.ok) throw new Error("Failed to fetch blog");
  return res.json();
}

// --- PAGES (CMS) ---
export async function fetchPages() {
  try {
    const res = await fetch(`${API_BASE}/cms/pages`);
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.warn("Failed to fetch pages from API", e);
    return [];
  }
}

export async function fetchPageBySlug(slug: string) {
  try {
    const res = await fetch(`${API_BASE}/cms/pages/${slug}`);
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.warn(`Failed to fetch page ${slug} from API`, e);
    return null;
  }
}

// --- CAREERS & JOBS ---
export async function fetchJobs() {
  try {
    const res = await fetch(`${API_BASE}/crm/jobs`);
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.warn("Failed to fetch jobs from API", e);
    return [];
  }
}

export async function submitJobApplication(data: {
  jobId: number;
  applicantName: string;
  applicantEmail: string;
  resumeUrl?: string;
}) {
  const res = await fetch(`${API_BASE}/crm/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to submit job application");
  return res.json();
}

// --- SITE CONFIG & STATS ---
export async function fetchSiteConfigMap() {
  try {
    const res = await fetch(`${API_BASE}/cms/config/map`);
    if (!res.ok) return {};
    return res.json();
  } catch (e) {
    console.warn("Failed to fetch site configs", e);
    return {};
  }
}

export async function fetchStats() {
  try {
    const res = await fetch(`${API_BASE}/finance/stats`);
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.warn("Failed to fetch stats", e);
    return null;
  }
}

// --- CRM INQUIRIES & FEEDBACK ---
export async function submitInquiry(data: {
  name: string;
  email: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
}) {
  const res = await fetch(`${API_BASE}/crm/inquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to submit inquiry");
  return res.json();
}

export async function submitFeedback(data: {
  name?: string;
  rating: number;
  comments: string;
}) {
  const res = await fetch(`${API_BASE}/crm/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to submit feedback");
  return res.json();
}

