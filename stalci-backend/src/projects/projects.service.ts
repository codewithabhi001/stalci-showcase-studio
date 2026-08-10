import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async getProjects(category?: string, featured?: boolean) {
    const where: any = {};
    if (category && category !== 'All') {
      where.category = category;
    }
    if (featured !== undefined) {
      where.featured = featured;
    }
    return this.prisma.project.findMany({
      where,
      include: {
        client: {
          select: { id: true, name: true, company: true, avatarUrl: true, email: true },
        },
        invoices: {
          select: { id: true, invoiceNumber: true, total: true, status: true, dueDate: true },
        },
      },
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    });
  }

  async getFeaturedProjects() {
    return this.prisma.project.findMany({
      where: { featured: true },
      include: {
        client: {
          select: { id: true, name: true, company: true, avatarUrl: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 6,
    });
  }

  async getProjectBySlug(slug: string) {
    const project = await this.prisma.project.findUnique({
      where: { slug },
      include: {
        client: true,
        invoices: true,
      },
    });
    if (!project) throw new NotFoundException(`Project with slug ${slug} not found`);
    return project;
  }

  async getProjectById(id: number) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        client: true,
        invoices: {
          include: { items: true },
        },
      },
    });
    if (!project) throw new NotFoundException(`Project with ID ${id} not found`);
    return project;
  }

  async createProject(data: any) {
    // Ensure slug is generated if not provided
    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    return this.prisma.project.create({
      data: {
        title: data.title,
        slug,
        description: data.description,
        fullDescription: data.fullDescription || data.description,
        category: data.category || 'Custom Software',
        clientId: data.clientId ? Number(data.clientId) : null,
        services: typeof data.services === 'string' ? data.services : JSON.stringify(data.services || []),
        technologies: typeof data.technologies === 'string' ? data.technologies : JSON.stringify(data.technologies || []),
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        deadline: data.deadline ? new Date(data.deadline) : null,
        budget: data.budget ? Number(data.budget) : 0,
        status: data.status || 'IN_PROGRESS',
        priority: data.priority || 'HIGH',
        progress: data.progress !== undefined ? Number(data.progress) : 0,
        featured: Boolean(data.featured),
        imageUrl: data.imageUrl || null,
        gallery: typeof data.gallery === 'string' ? data.gallery : JSON.stringify(data.gallery || []),
        liveUrl: data.liveUrl || null,
        githubUrl: data.githubUrl || null,
        metrics: typeof data.metrics === 'string' ? data.metrics : JSON.stringify(data.metrics || []),
        clientFeedback: data.clientFeedback || null,
      },
      include: {
        client: true,
      },
    });
  }

  async updateProject(id: number, data: any) {
    const updateData: any = { ...data };
    if (data.clientId !== undefined) {
      updateData.clientId = data.clientId ? Number(data.clientId) : null;
    }
    if (data.budget !== undefined) {
      updateData.budget = Number(data.budget);
    }
    if (data.progress !== undefined) {
      updateData.progress = Number(data.progress);
    }
    if (data.featured !== undefined) {
      updateData.featured = Boolean(data.featured);
    }
    if (data.startDate) updateData.startDate = new Date(data.startDate);
    if (data.endDate) updateData.endDate = new Date(data.endDate);
    if (data.deadline) updateData.deadline = new Date(data.deadline);
    if (Array.isArray(data.services)) updateData.services = JSON.stringify(data.services);
    if (Array.isArray(data.technologies)) updateData.technologies = JSON.stringify(data.technologies);
    if (Array.isArray(data.gallery)) updateData.gallery = JSON.stringify(data.gallery);
    if (Array.isArray(data.metrics)) updateData.metrics = JSON.stringify(data.metrics);

    // Remove client relation object if passed
    delete updateData.client;
    delete updateData.invoices;

    return this.prisma.project.update({
      where: { id },
      data: updateData,
      include: {
        client: true,
      },
    });
  }

  async deleteProject(id: number) {
    return this.prisma.project.delete({
      where: { id },
    });
  }
}
