import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { Public } from '../auth/auth.guard';

@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  // --- Stats ---
  @Public()
  @Get('stats')
  getStats() {
    return this.financeService.getStats();
  }

  // --- Invoices ---
  @Get('invoices')
  getInvoices(
    @Query('status') status?: string,
    @Query('clientId') clientId?: string,
  ) {
    const cId = clientId ? parseInt(clientId, 10) : undefined;
    return this.financeService.getInvoices(status, cId);
  }

  @Get('invoices/:id')
  getInvoiceById(@Param('id', ParseIntPipe) id: number) {
    return this.financeService.getInvoiceById(id);
  }

  @Post('invoices')
  createInvoice(@Body() data: any) {
    return this.financeService.createInvoice(data);
  }

  @Post('invoices/:id/duplicate')
  duplicateInvoice(@Param('id', ParseIntPipe) id: number) {
    return this.financeService.duplicateInvoice(id);
  }

  @Patch('invoices/:id/status')
  updateInvoiceStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: string,
  ) {
    return this.financeService.updateInvoiceStatus(id, status);
  }

  @Put('invoices/:id')
  updateInvoice(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.financeService.updateInvoice(id, data);
  }

  @Delete('invoices/:id')
  deleteInvoice(@Param('id', ParseIntPipe) id: number) {
    return this.financeService.deleteInvoice(id);
  }

  // --- Templates ---
  @Get('templates')
  getTemplates() {
    return this.financeService.getTemplates();
  }

  @Get('templates/:id')
  getTemplateById(@Param('id', ParseIntPipe) id: number) {
    return this.financeService.getTemplateById(id);
  }

  @Post('templates')
  createTemplate(@Body() data: any) {
    return this.financeService.createTemplate(data);
  }

  @Put('templates/:id')
  updateTemplate(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.financeService.updateTemplate(id, data);
  }

  @Delete('templates/:id')
  deleteTemplate(@Param('id', ParseIntPipe) id: number) {
    return this.financeService.deleteTemplate(id);
  }
}
