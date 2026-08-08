import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CrmService {
  constructor(private prisma: PrismaService) {}

  // --- Jobs ---
  getJobs() { return this.prisma.job.findMany({ where: { isActive: true }, orderBy: { createdAt: 'desc' } }); }
  getAllJobs() { return this.prisma.job.findMany({ orderBy: { createdAt: 'desc' }, include: { applications: true } }); }
  createJob(data: any) { return this.prisma.job.create({ data }); }
  updateJob(id: number, data: any) { return this.prisma.job.update({ where: { id }, data }); }
  deleteJob(id: number) { return this.prisma.job.delete({ where: { id } }); }

  // --- Job Applications ---
  getJobApplications(jobId: number) { return this.prisma.jobApplication.findMany({ where: { jobId }, include: { job: true } }); }
  getAllApplications() { return this.prisma.jobApplication.findMany({ orderBy: { createdAt: 'desc' }, include: { job: true } }); }
  updateApplication(id: number, data: any) { return this.prisma.jobApplication.update({ where: { id }, data }); }
  deleteApplication(id: number) { return this.prisma.jobApplication.delete({ where: { id } }); }

  // --- Inquiries ---
  getInquiries() { return this.prisma.inquiry.findMany({ orderBy: { createdAt: 'desc' } }); }
  createInquiry(data: any) { return this.prisma.inquiry.create({ data }); }
  updateInquiry(id: number, data: any) { return this.prisma.inquiry.update({ where: { id }, data }); }
  deleteInquiry(id: number) { return this.prisma.inquiry.delete({ where: { id } }); }

  // --- Feedback ---
  getFeedbacks() { return this.prisma.feedback.findMany({ orderBy: { createdAt: 'desc' } }); }
  createFeedback(data: any) { return this.prisma.feedback.create({ data }); }
  deleteFeedback(id: number) { return this.prisma.feedback.delete({ where: { id } }); }
}
