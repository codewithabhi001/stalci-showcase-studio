import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CrmService } from './crm.service';

@Controller('crm')
export class CrmController {
  constructor(private readonly crmService: CrmService) {}

  // --- Jobs ---
  @Get('jobs')
  getJobs() { return this.crmService.getJobs(); }

  @Get('jobs/all')
  getAllJobs() { return this.crmService.getAllJobs(); }

  @Post('jobs')
  createJob(@Body() body: any) { return this.crmService.createJob(body); }

  @Put('jobs/:id')
  updateJob(@Param('id') id: string, @Body() body: any) { return this.crmService.updateJob(+id, body); }

  @Delete('jobs/:id')
  deleteJob(@Param('id') id: string) { return this.crmService.deleteJob(+id); }

  // --- Job Applications ---
  @Get('jobs/:id/applications')
  getJobApplications(@Param('id') id: string) { return this.crmService.getJobApplications(+id); }

  @Get('applications')
  getAllApplications() { return this.crmService.getAllApplications(); }

  @Put('applications/:id')
  updateApplication(@Param('id') id: string, @Body() body: any) { return this.crmService.updateApplication(+id, body); }

  @Delete('applications/:id')
  deleteApplication(@Param('id') id: string) { return this.crmService.deleteApplication(+id); }

  // --- Inquiries ---
  @Get('inquiries')
  getInquiries() { return this.crmService.getInquiries(); }

  @Post('inquiries')
  createInquiry(@Body() body: any) { return this.crmService.createInquiry(body); }

  @Put('inquiries/:id')
  updateInquiry(@Param('id') id: string, @Body() body: any) { return this.crmService.updateInquiry(+id, body); }

  @Delete('inquiries/:id')
  deleteInquiry(@Param('id') id: string) { return this.crmService.deleteInquiry(+id); }

  // --- Feedback ---
  @Get('feedback')
  getFeedbacks() { return this.crmService.getFeedbacks(); }

  @Post('feedback')
  createFeedback(@Body() body: any) { return this.crmService.createFeedback(body); }

  @Delete('feedback/:id')
  deleteFeedback(@Param('id') id: string) { return this.crmService.deleteFeedback(+id); }
}
