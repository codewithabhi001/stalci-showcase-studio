import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { FinanceService } from './finance.service';

@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get('invoices')
  getInvoices() { return this.financeService.getInvoices(); }

  @Post('invoices')
  createInvoice(@Body() body: any) { return this.financeService.createInvoice(body); }

  @Put('invoices/:id')
  updateInvoice(@Param('id') id: string, @Body() body: any) { return this.financeService.updateInvoice(+id, body); }

  @Delete('invoices/:id')
  deleteInvoice(@Param('id') id: string) { return this.financeService.deleteInvoice(+id); }

  @Get('stats')
  getStats() { return this.financeService.getStats(); }
}
