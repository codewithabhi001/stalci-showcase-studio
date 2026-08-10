import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CmsService {
  constructor(private prisma: PrismaService) {}

  // --- Site Config ---
  getSiteConfigs() {
    return this.prisma.siteConfig.findMany();
  }

  async getSiteConfigMap() {
    const configs = await this.prisma.siteConfig.findMany();
    return configs.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);
  }

  updateSiteConfig(key: string, value: string) {
    return this.prisma.siteConfig.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }

  // --- Technologies & Skills ---
  getTechnologies(category?: string) {
    const where: any = {};
    if (category && category !== 'All') {
      where.category = category;
    }
    return this.prisma.technology.findMany({
      where,
      orderBy: [{ order: 'asc' }, { proficiency: 'desc' }],
    });
  }

  createTechnology(data: any) {
    return this.prisma.technology.create({
      data: {
        name: data.name,
        category: data.category || 'Frontend',
        icon: data.icon || 'Code',
        proficiency: Number(data.proficiency) || 90,
        isFeatured: data.isFeatured !== undefined ? Boolean(data.isFeatured) : true,
        order: Number(data.order) || 0,
      },
    });
  }

  updateTechnology(id: number, data: any) {
    const updateData: any = { ...data };
    if (data.proficiency !== undefined) updateData.proficiency = Number(data.proficiency);
    if (data.order !== undefined) updateData.order = Number(data.order);
    if (data.isFeatured !== undefined) updateData.isFeatured = Boolean(data.isFeatured);

    return this.prisma.technology.update({
      where: { id },
      data: updateData,
    });
  }

  deleteTechnology(id: number) {
    return this.prisma.technology.delete({ where: { id } });
  }

  // --- Services ---
  getServices() {
    return this.prisma.service.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    });
  }

  getServiceBySlug(slug: string) {
    return this.prisma.service.findUnique({ where: { slug } });
  }

  createService(data: any) {
    const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return this.prisma.service.create({
      data: {
        slug,
        name: data.name,
        shortDescription: data.shortDescription || null,
        description: data.description,
        fullDescription: data.fullDescription || data.description,
        icon: data.icon || 'Code',
        category: data.category || 'Core Services',
        features: typeof data.features === 'string' ? data.features : JSON.stringify(data.features || []),
        price: data.price || null,
        isFeatured: data.isFeatured !== undefined ? Boolean(data.isFeatured) : true,
        order: Number(data.order) || 0,
      },
    });
  }

  updateService(id: number, data: any) {
    const updateData: any = { ...data };
    if (data.order !== undefined) updateData.order = Number(data.order);
    if (data.isFeatured !== undefined) updateData.isFeatured = Boolean(data.isFeatured);
    if (Array.isArray(data.features)) updateData.features = JSON.stringify(data.features);

    return this.prisma.service.update({
      where: { id },
      data: updateData,
    });
  }

  deleteService(id: number) {
    return this.prisma.service.delete({ where: { id } });
  }

  // --- Testimonials ---
  getTestimonials() {
    return this.prisma.testimonial.findMany({
      orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
    });
  }

  createTestimonial(data: any) {
    return this.prisma.testimonial.create({
      data: {
        clientName: data.clientName,
        role: data.role || null,
        company: data.company || null,
        avatarUrl: data.avatarUrl || null,
        quote: data.quote,
        rating: Number(data.rating) || 5,
        project: data.project || null,
        isFeatured: data.isFeatured !== undefined ? Boolean(data.isFeatured) : true,
      },
    });
  }

  updateTestimonial(id: number, data: any) {
    const updateData: any = { ...data };
    if (data.rating !== undefined) updateData.rating = Number(data.rating);
    if (data.isFeatured !== undefined) updateData.isFeatured = Boolean(data.isFeatured);

    return this.prisma.testimonial.update({
      where: { id },
      data: updateData,
    });
  }

  deleteTestimonial(id: number) {
    return this.prisma.testimonial.delete({ where: { id } });
  }

  // --- Pages ---
  getPages() {
    return this.prisma.page.findMany({ orderBy: { createdAt: 'desc' } });
  }

  getPageBySlug(slug: string) {
    return this.prisma.page.findUnique({ where: { slug } });
  }

  createPage(data: any) {
    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return this.prisma.page.create({
      data: {
        slug,
        title: data.title,
        content: data.content,
        published: Boolean(data.published),
      },
    });
  }

  updatePage(id: number, data: any) {
    return this.prisma.page.update({ where: { id }, data });
  }

  deletePage(id: number) {
    return this.prisma.page.delete({ where: { id } });
  }

  // --- Blogs ---
  getBlogs() {
    return this.prisma.blog.findMany({ orderBy: { createdAt: 'desc' } });
  }

  getBlogBySlug(slug: string) {
    return this.prisma.blog.findUnique({ where: { slug } });
  }

  createBlog(data: any) {
    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return this.prisma.blog.create({
      data: {
        slug,
        title: data.title,
        excerpt: data.excerpt || null,
        content: data.content,
        author: data.author || 'STALCI Editorial',
        imageUrl: data.imageUrl || null,
        category: data.category || 'Engineering',
        readTime: data.readTime || '5 min read',
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
      },
    });
  }

  updateBlog(id: number, data: any) {
    const updateData: any = { ...data };
    if (data.publishedAt) updateData.publishedAt = new Date(data.publishedAt);
    return this.prisma.blog.update({ where: { id }, data: updateData });
  }

  deleteBlog(id: number) {
    return this.prisma.blog.delete({ where: { id } });
  }

  // --- Industries ---
  getIndustries() {
    return this.prisma.industry.findMany({ orderBy: { createdAt: 'desc' } });
  }

  getIndustryBySlug(slug: string) {
    return this.prisma.industry.findUnique({ where: { slug } });
  }

  createIndustry(data: any) {
    const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return this.prisma.industry.create({
      data: {
        slug,
        name: data.name,
        description: data.description,
        features: typeof data.features === 'string' ? data.features : JSON.stringify(data.features || []),
        icon: data.icon || null,
      },
    });
  }

  updateIndustry(id: number, data: any) {
    const updateData: any = { ...data };
    if (Array.isArray(data.features)) updateData.features = JSON.stringify(data.features);
    return this.prisma.industry.update({ where: { id }, data: updateData });
  }

  deleteIndustry(id: number) {
    return this.prisma.industry.delete({ where: { id } });
  }

  // --- Products ---
  getProducts() {
    return this.prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
  }

  getProductBySlug(slug: string) {
    return this.prisma.product.findUnique({ where: { slug } });
  }

  createProduct(data: any) {
    const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return this.prisma.product.create({
      data: {
        slug,
        name: data.name,
        tag: data.tag || null,
        description: data.description,
        pricing: data.pricing || null,
        icon: data.icon || null,
        features: typeof data.features === 'string' ? data.features : JSON.stringify(data.features || []),
      },
    });
  }

  updateProduct(id: number, data: any) {
    const updateData: any = { ...data };
    if (Array.isArray(data.features)) updateData.features = JSON.stringify(data.features);
    return this.prisma.product.update({ where: { id }, data: updateData });
  }

  deleteProduct(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}
