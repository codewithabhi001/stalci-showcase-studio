/* eslint-disable @typescript-eslint/no-explicit-any */

const API_BASE = 
  import.meta.env.VITE_API_URL || 
  (typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.hostname}:4001`
    : "http://localhost:4001");

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`API Error ${res.status}: ${errorText || res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`[API Call Failed]: ${url}`, err);
    throw err;
  }
}

// --- CMS MODULE ---

export async function fetchSiteConfigMap(): Promise<Record<string, string>> {
  try {
    return await request<Record<string, string>>("/cms/config/map");
  } catch {
    return {};
  }
}

export async function fetchSiteConfigs() {
  return request<any[]>("/cms/config");
}

export async function fetchServices() {
  return request<any[]>("/cms/services");
}

export async function fetchServiceBySlug(slug: string) {
  return request<any>(`/cms/services/${slug}`);
}

export async function fetchTechnologies(category?: string) {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return request<any[]>(`/cms/technologies${query}`);
}

export async function fetchIndustries() {
  return request<any[]>("/cms/industries");
}

export async function fetchIndustryBySlug(slug: string) {
  return request<any>(`/cms/industries/${slug}`);
}

export async function fetchProducts() {
  return request<any[]>("/cms/products");
}

export async function fetchProductBySlug(slug: string) {
  return request<any>(`/cms/products/${slug}`);
}

export async function fetchTestimonials() {
  return request<any[]>("/cms/testimonials");
}

export async function fetchBlogs() {
  return request<any[]>("/cms/blogs");
}

export async function fetchBlogBySlug(slug: string) {
  return request<any>(`/cms/blogs/${slug}`);
}

export async function fetchPageBySlug(slug: string) {
  return request<any>(`/cms/pages/${slug}`);
}

// --- PROJECTS MODULE ---

export async function fetchProjects(category?: string, featured?: boolean) {
  const params = new URLSearchParams();
  if (category) params.append("category", category);
  if (featured !== undefined) params.append("featured", String(featured));
  const query = params.toString() ? `?${params.toString()}` : "";
  return request<any[]>(`/projects${query}`);
}

export async function fetchProjectBySlug(slug: string) {
  return request<any>(`/projects/slug/${slug}`);
}

// --- CRM & CAREERS ---

export async function fetchJobs() {
  return request<any[]>("/crm/jobs");
}

export async function submitJobApplication(data: any) {
  return request<any>("/crm/applications", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function submitInquiry(data: any) {
  return request<any>("/crm/inquiries", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function submitFeedback(data: any) {
  return request<any>("/crm/feedback", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
