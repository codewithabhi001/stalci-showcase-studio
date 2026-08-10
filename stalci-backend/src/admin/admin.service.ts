import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AdminService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    // Seed default admin if none exists
    const adminCount = await this.prisma.admin.count();
    if (adminCount === 0) {
      await this.prisma.admin.create({
        data: {
          name: 'Admin User',
          email: 'admin@stalci.com',
          passwordHash: 'hashed_password_mock',
        },
      });
    }

    // Seed some notifications if none exist
    const notifCount = await this.prisma.notification.count();
    if (notifCount === 0) {
      await this.prisma.notification.createMany({
        data: [
          { title: 'New Application', message: 'Pam Beesly applied for Designer', type: 'INFO' },
          { title: 'Invoice Paid', message: 'Invoice #INV-2023 for $12k was paid', type: 'SUCCESS' },
          { title: 'System Alert', message: 'CPU usage exceeded 90%', type: 'WARNING' },
        ],
      });
    }
  }

  async getProfile() {
    return this.prisma.admin.findFirst();
  }

  async updateProfile(data: { name?: string; email?: string; password?: string }) {
    const admin = await this.prisma.admin.findFirst();
    if (!admin) throw new Error('Admin not found');
    
    const updateData: any = {};
    if (data.name) updateData.name = data.name;
    if (data.email) updateData.email = data.email;
    if (data.password) updateData.passwordHash = data.password; // Mock hashing
    
    return this.prisma.admin.update({
      where: { id: admin.id },
      data: updateData,
    });
  }

  async getNotifications() {
    return this.prisma.notification.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async markAllNotificationsRead() {
    return this.prisma.notification.updateMany({
      where: { isRead: false },
      data: { isRead: true },
    });
  }
}
