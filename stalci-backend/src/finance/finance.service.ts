import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FinanceService {
  constructor(private prisma: PrismaService) {}

  getInvoices() { return this.prisma.invoice.findMany({ orderBy: { createdAt: 'desc' } }); }
  createInvoice(data: any) {
    return this.prisma.invoice.create({ data: { ...data, dueDate: new Date(data.dueDate) } });
  }
  updateInvoice(id: number, data: any) {
    if (data.dueDate) data.dueDate = new Date(data.dueDate);
    return this.prisma.invoice.update({ where: { id }, data });
  }
  deleteInvoice(id: number) { return this.prisma.invoice.delete({ where: { id } }); }

  async getStats() {
    const [totalInquiries, activeJobs, pendingInvoices, totalBlogs, totalPages, totalServices] = await Promise.all([
      this.prisma.inquiry.count(),
      this.prisma.job.count({ where: { isActive: true } }),
      this.prisma.invoice.aggregate({ where: { status: 'PENDING' }, _sum: { amount: true } }),
      this.prisma.blog.count(),
      this.prisma.page.count(),
      this.prisma.service.count(),
    ]);
    return {
      totalInquiries,
      activeJobs,
      pendingAmount: pendingInvoices._sum.amount || 0,
      totalBlogs,
      totalPages,
      totalServices,
    };
  }
}
