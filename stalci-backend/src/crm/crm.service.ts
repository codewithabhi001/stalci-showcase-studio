import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CrmService {
  constructor(private prisma: PrismaService) {}

  // --- Clients ---
  async getClients() {
    const clients = await this.prisma.client.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        projects: {
          select: {
            id: true,
            title: true,
            status: true,
            progress: true,
            budget: true,
          },
        },
        invoices: {
          select: {
            id: true,
            invoiceNumber: true,
            total: true,
            status: true,
            dueDate: true,
          },
        },
      },
    });

    // Calculate aggregated financial stats per client
    return clients.map((c) => {
      const totalBilled = c.invoices.reduce((acc, inv) => acc + (inv.total || 0), 0);
      const totalPaid = c.invoices.filter((i) => i.status === 'PAID').reduce((acc, inv) => acc + (inv.total || 0), 0);
      const totalPending = c.invoices.filter((i) => i.status === 'PENDING' || i.status === 'SENT').reduce((acc, inv) => acc + (inv.total || 0), 0);
      const activeProjectsCount = c.projects.filter((p) => p.status === 'IN_PROGRESS' || p.status === 'PLANNING' || p.status === 'REVIEW').length;

      return {
        ...c,
        totalBilled,
        totalPaid,
        totalPending,
        activeProjectsCount,
      };
    });
  }

  async getClientById(id: number) {
    const client = await this.prisma.client.findUnique({
      where: { id },
      include: {
        projects: {
          orderBy: { createdAt: 'desc' },
        },
        invoices: {
          include: { items: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    if (!client) throw new NotFoundException(`Client with ID ${id} not found`);
    return client;
  }

  async createClient(data: any) {
    return this.prisma.client.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        address: data.address || null,
        website: data.website || null,
        avatarUrl: data.avatarUrl || null,
        status: data.status || 'ACTIVE',
        notes: data.notes || null,
      },
    });
  }

  async updateClient(id: number, data: any) {
    const updateData: any = { ...data };
    delete updateData.projects;
    delete updateData.invoices;
    delete updateData.totalBilled;
    delete updateData.totalPaid;
    delete updateData.totalPending;
    delete updateData.activeProjectsCount;

    return this.prisma.client.update({
      where: { id },
      data: updateData,
    });
  }

  async deleteClient(id: number) {
    return this.prisma.client.delete({
      where: { id },
    });
  }

  // --- Jobs ---
  getJobs() {
    return this.prisma.job.findMany({ where: { isActive: true }, orderBy: { createdAt: 'desc' } });
  }

  getAllJobs() {
    return this.prisma.job.findMany({ orderBy: { createdAt: 'desc' }, include: { applications: true } });
  }

  createJob(data: any) {
    return this.prisma.job.create({ data });
  }

  updateJob(id: number, data: any) {
    return this.prisma.job.update({ where: { id }, data });
  }

  deleteJob(id: number) {
    return this.prisma.job.delete({ where: { id } });
  }

  // --- Job Applications ---
  getJobApplications(jobId: number) {
    return this.prisma.jobApplication.findMany({ where: { jobId }, include: { job: true } });
  }

  getAllApplications() {
    return this.prisma.jobApplication.findMany({ orderBy: { createdAt: 'desc' }, include: { job: true } });
  }

  async createApplication(data: { jobId: number; applicantName: string; applicantEmail: string; resumeUrl?: string }) {
    const app = await this.prisma.jobApplication.create({
      data: {
        jobId: Number(data.jobId),
        applicantName: data.applicantName,
        applicantEmail: data.applicantEmail,
        resumeUrl: data.resumeUrl || null,
        status: 'NEW',
      },
      include: { job: true },
    });

    // Create real-time admin notification
    await this.prisma.notification.create({
      data: {
        title: 'New Candidate Application',
        message: `${data.applicantName} applied for the position "${app.job?.title || 'Open Role'}"`,
        type: 'INFO',
        isRead: false,
      },
    });

    return app;
  }

  updateApplication(id: number, data: any) {
    return this.prisma.jobApplication.update({ where: { id }, data });
  }

  deleteApplication(id: number) {
    return this.prisma.jobApplication.delete({ where: { id } });
  }

  // --- Inquiries ---
  getInquiries() {
    return this.prisma.inquiry.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async createInquiry(data: any) {
    const inquiry = await this.prisma.inquiry.create({
      data: {
        name: data.name,
        email: data.email,
        company: data.company || null,
        service: data.service || null,
        budget: data.budget || null,
        message: data.message,
        status: data.status || 'NEW',
      },
    });

    // Create real-time admin notification
    await this.prisma.notification.create({
      data: {
        title: 'New High-Value Project Inquiry',
        message: `${data.name} (${data.company || 'Enterprise'}) requested consultation for "${data.service || 'Custom Architecture'}". Budget: ${data.budget || 'Custom'}`,
        type: 'SUCCESS',
        isRead: false,
      },
    });

    return inquiry;
  }

  updateInquiry(id: number, data: any) {
    return this.prisma.inquiry.update({ where: { id }, data });
  }

  deleteInquiry(id: number) {
    return this.prisma.inquiry.delete({ where: { id } });
  }

  // --- Feedback ---
  getFeedbacks() {
    return this.prisma.feedback.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async createFeedback(data: any) {
    const fb = await this.prisma.feedback.create({
      data: {
        name: data.name || 'Anonymous Client',
        rating: Number(data.rating || 5),
        comments: data.comments,
      },
    });

    // Create real-time admin notification
    await this.prisma.notification.create({
      data: {
        title: 'New Client Feedback Rating',
        message: `${fb.name} submitted a ${fb.rating}/5-star rating: "${fb.comments.substring(0, 60)}..."`,
        type: 'INFO',
        isRead: false,
      },
    });

    return fb;
  }

  updateFeedback(id: number, data: any) {
    return this.prisma.feedback.update({
      where: { id: Number(id) },
      data: {
        ...data,
        rating: data.rating !== undefined ? Number(data.rating) : undefined,
      },
    });
  }

  deleteFeedback(id: number) {
    return this.prisma.feedback.delete({ where: { id } });
  }
}
