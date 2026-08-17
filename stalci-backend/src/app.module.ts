import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CmsModule } from './cms/cms.module';
import { CrmModule } from './crm/crm.module';
import { FinanceModule } from './finance/finance.module';
import { AdminModule } from './admin/admin.module';
import { ProjectsModule } from './projects/projects.module';
import { HrModule } from './hr/hr.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { JwtAuthGuard } from './auth/auth.guard';

@Module({
  imports: [CmsModule, CrmModule, FinanceModule, AdminModule, ProjectsModule, HrModule, AuthModule, UploadModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
