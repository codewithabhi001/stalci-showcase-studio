import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CrmService } from './crm.service';

@Controller('crm')
export class CrmController {
  constructor(private readonly crmService: CrmService) {}

  // --- Clients ---
  @Get('clients')
  getClients() {
    return this.crmService.getClients();
  }

  @Get('clients/:id')
  getClientById(@Param('id', ParseIntPipe) id: number) {
    return this.crmService.getClientById(id);
  }

  @Post('clients')
  createClient(@Body() data: any) {
    return this.crmService.createClient(data);
  }

  @Put('clients/:id')
  updateClient(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.crmService.updateClient(id, data);
  }

  @Delete('clients/:id')
  deleteClient(@Param('id', ParseIntPipe) id: number) {
    return this.crmService.deleteClient(id);
  }

  // --- Jobs ---
  @Get('jobs')
  getJobs() {
    return this.crmService.getJobs();
  }

  @Get('jobs/all')
  getAllJobs() {
    return this.crmService.getAllJobs();
  }

  @Post('jobs')
  createJob(@Body() data: any) {
    return this.crmService.createJob(data);
  }

  @Put('jobs/:id')
  updateJob(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.crmService.updateJob(id, data);
  }

  @Delete('jobs/:id')
  deleteJob(@Param('id', ParseIntPipe) id: number) {
    return this.crmService.deleteJob(id);
  }

  // --- Applications ---
  @Get('jobs/:id/applications')
  getJobApplications(@Param('id', ParseIntPipe) id: number) {
    return this.crmService.getJobApplications(id);
  }

  @Get('applications')
  getAllApplications() {
    return this.crmService.getAllApplications();
  }

  @Post('applications')
  createApplication(@Body() data: any) {
    return this.crmService.createApplication(data);
  }

  @Put('applications/:id')
  updateApplication(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.crmService.updateApplication(id, data);
  }

  @Delete('applications/:id')
  deleteApplication(@Param('id', ParseIntPipe) id: number) {
    return this.crmService.deleteApplication(id);
  }

  // --- Inquiries ---
  @Get('inquiries')
  getInquiries() {
    return this.crmService.getInquiries();
  }

  @Post('inquiries')
  createInquiry(@Body() data: any) {
    return this.crmService.createInquiry(data);
  }

  @Put('inquiries/:id')
  updateInquiry(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.crmService.updateInquiry(id, data);
  }

  @Delete('inquiries/:id')
  deleteInquiry(@Param('id', ParseIntPipe) id: number) {
    return this.crmService.deleteInquiry(id);
  }

  // --- Feedback ---
  @Get('feedback')
  getFeedbacks() {
    return this.crmService.getFeedbacks();
  }

  @Post('feedback')
  createFeedback(@Body() data: any) {
    return this.crmService.createFeedback(data);
  }

  @Put('feedback/:id')
  updateFeedback(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.crmService.updateFeedback(id, data);
  }

  @Delete('feedback/:id')
  deleteFeedback(@Param('id', ParseIntPipe) id: number) {
    return this.crmService.deleteFeedback(id);
  }
}
