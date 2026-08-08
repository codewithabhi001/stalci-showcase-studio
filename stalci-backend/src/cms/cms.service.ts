import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CmsService {
  constructor(private prisma: PrismaService) {}

  // --- Site Config ---
  getSiteConfigs() { return this.prisma.siteConfig.findMany(); }
  updateSiteConfig(key: string, value: string) {
    return this.prisma.siteConfig.upsert({ where: { key }, update: { value }, create: { key, value } });
  }

  // --- Pages ---
  getPages() { return this.prisma.page.findMany({ orderBy: { createdAt: 'desc' } }); }
  getPageBySlug(slug: string) { return this.prisma.page.findUnique({ where: { slug } }); }
  createPage(data: any) { return this.prisma.page.create({ data }); }
  updatePage(id: number, data: any) { return this.prisma.page.update({ where: { id }, data }); }
  deletePage(id: number) { return this.prisma.page.delete({ where: { id } }); }

  // --- Blogs ---
  getBlogs() { return this.prisma.blog.findMany({ orderBy: { createdAt: 'desc' } }); }
  getBlogBySlug(slug: string) { return this.prisma.blog.findUnique({ where: { slug } }); }
  createBlog(data: any) { return this.prisma.blog.create({ data }); }
  updateBlog(id: number, data: any) { return this.prisma.blog.update({ where: { id }, data }); }
  deleteBlog(id: number) { return this.prisma.blog.delete({ where: { id } }); }

  // --- Industries ---
  getIndustries() { return this.prisma.industry.findMany({ orderBy: { createdAt: 'desc' } }); }
  getIndustryBySlug(slug: string) { return this.prisma.industry.findUnique({ where: { slug } }); }
  createIndustry(data: any) { return this.prisma.industry.create({ data }); }
  updateIndustry(id: number, data: any) { return this.prisma.industry.update({ where: { id }, data }); }
  deleteIndustry(id: number) { return this.prisma.industry.delete({ where: { id } }); }

  // --- Products ---
  getProducts() { return this.prisma.product.findMany({ orderBy: { createdAt: 'desc' } }); }
  getProductBySlug(slug: string) { return this.prisma.product.findUnique({ where: { slug } }); }
  createProduct(data: any) { return this.prisma.product.create({ data }); }
  updateProduct(id: number, data: any) { return this.prisma.product.update({ where: { id }, data }); }
  deleteProduct(id: number) { return this.prisma.product.delete({ where: { id } }); }

  // --- Services ---
  getServices() { return this.prisma.service.findMany({ orderBy: { createdAt: 'desc' } }); }
  getServiceBySlug(slug: string) { return this.prisma.service.findUnique({ where: { slug } }); }
  createService(data: any) { return this.prisma.service.create({ data }); }
  updateService(id: number, data: any) { return this.prisma.service.update({ where: { id }, data }); }
  deleteService(id: number) { return this.prisma.service.delete({ where: { id } }); }

  // --- Testimonials ---
  getTestimonials() { return this.prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } }); }
  createTestimonial(data: any) { return this.prisma.testimonial.create({ data }); }
  updateTestimonial(id: number, data: any) { return this.prisma.testimonial.update({ where: { id }, data }); }
  deleteTestimonial(id: number) { return this.prisma.testimonial.delete({ where: { id } }); }
}
