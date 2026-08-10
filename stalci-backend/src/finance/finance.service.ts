import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FinanceService {
  constructor(private prisma: PrismaService) {}

  // --- Invoices ---
  async getInvoices(status?: string, clientId?: number) {
    const where: any = {};
    if (status && status !== 'ALL') {
      where.status = status;
    }
    if (clientId) {
      where.clientId = Number(clientId);
    }

    return this.prisma.invoice.findMany({
      where,
      include: {
        client: true,
        project: true,
        template: true,
        items: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getInvoiceById(id: number) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id },
      include: {
        client: true,
        project: true,
        template: true,
        items: true,
      },
    });
    if (!invoice) throw new NotFoundException(`Invoice with ID ${id} not found`);
    return invoice;
  }

  async createInvoice(data: any) {
    // Generate invoiceNumber if not provided
    const count = await this.prisma.invoice.count();
    const invoiceNumber = data.invoiceNumber || `INV-${new Date().getFullYear()}-${String(count + 1).padStart(3, '0')}`;

    // Calculate item amounts and subtotals
    const rawItems = Array.isArray(data.items) ? data.items : [];
    const items = rawItems.map((item: any) => {
      const quantity = Number(item.quantity) || 1;
      const unitPrice = Number(item.unitPrice) || 0;
      const amount = Number(item.amount) || quantity * unitPrice;
      return {
        description: item.description || 'Service/Item',
        quantity,
        unitPrice,
        amount,
      };
    });

    const calculatedSubtotal = items.reduce((acc: number, it: any) => acc + (it.amount || 0), 0);
    const subtotal = data.subtotal !== undefined ? Number(data.subtotal) : calculatedSubtotal;
    const discount = Number(data.discount) || 0;
    const taxRate = Number(data.taxRate) || 0;
    const taxAmount = data.taxAmount !== undefined ? Number(data.taxAmount) : (subtotal - discount) * (taxRate / 100);
    const total = data.total !== undefined ? Number(data.total) : subtotal - discount + taxAmount;

    return this.prisma.invoice.create({
      data: {
        invoiceNumber,
        clientId: Number(data.clientId),
        projectId: data.projectId ? Number(data.projectId) : null,
        templateId: data.templateId ? Number(data.templateId) : null,
        issueDate: data.issueDate ? new Date(data.issueDate) : new Date(),
        dueDate: data.dueDate ? new Date(data.dueDate) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: data.status || 'PENDING',
        currency: data.currency || 'USD',
        subtotal,
        discount,
        taxRate,
        taxAmount,
        total,
        notes: data.notes || null,
        terms: data.terms || null,
        paymentDetails: data.paymentDetails || null,
        items: {
          create: items,
        },
      },
      include: {
        client: true,
        project: true,
        template: true,
        items: true,
      },
    });
  }

  async updateInvoice(id: number, data: any) {
    const updatePayload: any = {};
    if (data.invoiceNumber) updatePayload.invoiceNumber = data.invoiceNumber;
    if (data.clientId) updatePayload.clientId = Number(data.clientId);
    if (data.projectId !== undefined) updatePayload.projectId = data.projectId ? Number(data.projectId) : null;
    if (data.templateId !== undefined) updatePayload.templateId = data.templateId ? Number(data.templateId) : null;
    if (data.issueDate) updatePayload.issueDate = new Date(data.issueDate);
    if (data.dueDate) updatePayload.dueDate = new Date(data.dueDate);
    if (data.status) updatePayload.status = data.status;
    if (data.currency) updatePayload.currency = data.currency;
    if (data.notes !== undefined) updatePayload.notes = data.notes;
    if (data.terms !== undefined) updatePayload.terms = data.terms;
    if (data.paymentDetails !== undefined) updatePayload.paymentDetails = data.paymentDetails;

    // Handle items and recalculate totals if items are sent
    if (Array.isArray(data.items)) {
      const items = data.items.map((item: any) => {
        const quantity = Number(item.quantity) || 1;
        const unitPrice = Number(item.unitPrice) || 0;
        const amount = Number(item.amount) || quantity * unitPrice;
        return {
          description: item.description || 'Service/Item',
          quantity,
          unitPrice,
          amount,
        };
      });

      const subtotal = items.reduce((acc: number, it: any) => acc + (it.amount || 0), 0);
      const discount = data.discount !== undefined ? Number(data.discount) : 0;
      const taxRate = data.taxRate !== undefined ? Number(data.taxRate) : 0;
      const taxAmount = (subtotal - discount) * (taxRate / 100);
      const total = subtotal - discount + taxAmount;

      updatePayload.subtotal = subtotal;
      updatePayload.discount = discount;
      updatePayload.taxRate = taxRate;
      updatePayload.taxAmount = taxAmount;
      updatePayload.total = total;

      // Replace items in transaction
      await this.prisma.invoiceItem.deleteMany({ where: { invoiceId: id } });
      updatePayload.items = {
        create: items,
      };
    } else {
      if (data.subtotal !== undefined) updatePayload.subtotal = Number(data.subtotal);
      if (data.discount !== undefined) updatePayload.discount = Number(data.discount);
      if (data.taxRate !== undefined) updatePayload.taxRate = Number(data.taxRate);
      if (data.taxAmount !== undefined) updatePayload.taxAmount = Number(data.taxAmount);
      if (data.total !== undefined) updatePayload.total = Number(data.total);
    }

    return this.prisma.invoice.update({
      where: { id },
      data: updatePayload,
      include: {
        client: true,
        project: true,
        template: true,
        items: true,
      },
    });
  }

  async duplicateInvoice(id: number) {
    const original = await this.getInvoiceById(id);
    const count = await this.prisma.invoice.count();
    const invoiceNumber = `INV-${new Date().getFullYear()}-${String(count + 1).padStart(3, '0')}`;

    return this.prisma.invoice.create({
      data: {
        invoiceNumber,
        clientId: original.clientId,
        projectId: original.projectId,
        templateId: original.templateId,
        issueDate: new Date(),
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: 'DRAFT',
        currency: original.currency,
        subtotal: original.subtotal,
        discount: original.discount,
        taxRate: original.taxRate,
        taxAmount: original.taxAmount,
        total: original.total,
        notes: original.notes,
        terms: original.terms,
        paymentDetails: original.paymentDetails,
        items: {
          create: original.items.map((item) => ({
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            amount: item.amount,
          })),
        },
      },
      include: {
        client: true,
        project: true,
        template: true,
        items: true,
      },
    });
  }

  async updateInvoiceStatus(id: number, status: string) {
    const inv = await this.prisma.invoice.update({
      where: { id },
      data: { status },
      include: { client: true, items: true },
    });

    if (status === "PAID") {
      await this.prisma.notification.create({
        data: {
          title: "Invoice Settlement Received",
          message: `Payment of $${Number(inv.total).toLocaleString()} received for Invoice ${inv.invoiceNumber} from ${inv.client?.company || inv.client?.name || "Client"}.`,
          type: "SUCCESS",
          isRead: false,
        },
      });
    }

    return inv;
  }

  async deleteInvoice(id: number) {
    return this.prisma.invoice.delete({ where: { id } });
  }

  // --- Templates ---
  async getTemplates() {
    return this.prisma.invoiceTemplate.findMany({
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'asc' }],
    });
  }

  async getTemplateById(id: number) {
    const template = await this.prisma.invoiceTemplate.findUnique({ where: { id } });
    if (!template) throw new NotFoundException(`Template with ID ${id} not found`);
    return template;
  }

  async createTemplate(data: any) {
    const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return this.prisma.invoiceTemplate.create({
      data: {
        name: data.name,
        slug,
        description: data.description || null,
        layoutType: data.layoutType || 'MODERN',
        primaryColor: data.primaryColor || '#D89B5B',
        headerText: data.headerText || 'INVOICE',
        footerNotes: data.footerNotes || null,
        customCss: data.customCss || null,
        isDefault: Boolean(data.isDefault),
        isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
      },
    });
  }

  async updateTemplate(id: number, data: any) {
    return this.prisma.invoiceTemplate.update({
      where: { id },
      data,
    });
  }

  async deleteTemplate(id: number) {
    return this.prisma.invoiceTemplate.delete({ where: { id } });
  }

  // --- Comprehensive Stats ---
  async getStats() {
    const [
      totalInquiries,
      activeJobs,
      pendingInvoicesAgg,
      paidInvoicesAgg,
      totalInvoicesCount,
      totalClients,
      activeProjectsCount,
      totalProjectsCount,
      totalBlogs,
      totalPages,
      totalServices,
      totalTechnologies,
    ] = await Promise.all([
      this.prisma.inquiry.count(),
      this.prisma.job.count({ where: { isActive: true } }),
      this.prisma.invoice.aggregate({ where: { status: { in: ['PENDING', 'SENT'] } }, _sum: { total: true } }),
      this.prisma.invoice.aggregate({ where: { status: 'PAID' }, _sum: { total: true } }),
      this.prisma.invoice.count(),
      this.prisma.client.count(),
      this.prisma.project.count({ where: { status: { in: ['IN_PROGRESS', 'PLANNING', 'REVIEW'] } } }),
      this.prisma.project.count(),
      this.prisma.blog.count(),
      this.prisma.page.count(),
      this.prisma.service.count(),
      this.prisma.technology.count(),
    ]);

    const revenueTrend = [
      { month: 'Jan', value: 45000 },
      { month: 'Feb', value: 58000 },
      { month: 'Mar', value: 150000 },
      { month: 'Apr', value: 72000 },
      { month: 'May', value: 89000 },
      { month: 'Jun', value: 97650 },
      { month: 'Jul', value: 105000 },
      { month: 'Aug', value: 57120 },
    ];

    return {
      totalInquiries,
      activeJobs,
      pendingAmount: pendingInvoicesAgg._sum.total || 0,
      paidAmount: paidInvoicesAgg._sum.total || 0,
      totalInvoicesCount,
      totalClients,
      activeProjectsCount,
      totalProjectsCount,
      totalBlogs,
      totalPages,
      totalServices,
      totalTechnologies,
      revenueTrend,
      revenueGrowth: 24.8,
    };
  }
}
