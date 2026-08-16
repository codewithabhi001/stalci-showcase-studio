import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailLoggerService {
  private readonly logger = new Logger('EmailService (Mock)');

  async sendEmail(options: { to: string; subject: string; body?: string; html?: string }) {
    this.logger.log(`\n========================================`);
    this.logger.log(`📧 [MOCK EMAIL SENT TO]: ${options.to}`);
    this.logger.log(`📌 [SUBJECT]: ${options.subject}`);
    if (options.body) this.logger.log(`📝 [BODY]: ${options.body.substring(0, 100)}...`);
    this.logger.log(`========================================\n`);

    return {
      success: true,
      to: options.to,
      messageId: `mock-email-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
  }
}
