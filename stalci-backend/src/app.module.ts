import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CmsModule } from './cms/cms.module';
import { CrmModule } from './crm/crm.module';
import { FinanceModule } from './finance/finance.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [CmsModule, CrmModule, FinanceModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
