const API_BASE = "http://localhost:3000";

export async function fetchServices() {
  const res = await fetch(`${API_BASE}/cms/services`);
  if (!res.ok) throw new Error("Failed to fetch services");
  return res.json();
}

export async function fetchServiceBySlug(slug: string) {
  const res = await fetch(`${API_BASE}/cms/services/${slug}`);
  if (!res.ok) throw new Error("Failed to fetch service");
  return res.json();
}

export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/cms/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchProductBySlug(slug: string) {
  const res = await fetch(`${API_BASE}/cms/products/${slug}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export async function fetchIndustries() {
  const res = await fetch(`${API_BASE}/cms/industries`);
  if (!res.ok) throw new Error("Failed to fetch industries");
  return res.json();
}

export async function fetchIndustryBySlug(slug: string) {
  const res = await fetch(`${API_BASE}/cms/industries/${slug}`);
  if (!res.ok) throw new Error("Failed to fetch industry");
  return res.json();
}

export async function fetchTestimonials() {
  const res = await fetch(`${API_BASE}/cms/testimonials`);
  if (!res.ok) throw new Error("Failed to fetch testimonials");
  return res.json();
}

export async function fetchBlogs() {
  const res = await fetch(`${API_BASE}/cms/blogs`);
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
}

export async function fetchBlogBySlug(slug: string) {
  const res = await fetch(`${API_BASE}/cms/blogs/${slug}`);
  if (!res.ok) throw new Error("Failed to fetch blog");
  return res.json();
}

export async function submitInquiry(data: { name: string; email: string; message: string }) {
  const res = await fetch(`${API_BASE}/crm/inquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to submit inquiry");
  return res.json();
}
