import { Controller, Get, Put, Body } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('profile')
  getProfile() {
    return this.adminService.getProfile();
  }

  @Put('profile')
  updateProfile(@Body() body: { name?: string; email?: string; password?: string }) {
    return this.adminService.updateProfile(body);
  }

  @Get('notifications')
  getNotifications() {
    return this.adminService.getNotifications();
  }

  @Put('notifications/read')
  markNotificationsRead() {
    return this.adminService.markAllNotificationsRead();
  }
}
