import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:password123@localhost:5435/stalci_db?schema=public';
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
    try {
      await this.$executeRawUnsafe('ALTER TABLE "Admin" ADD COLUMN IF NOT EXISTS "refreshToken" TEXT;');
    } catch (err) {
      console.warn('Auto-migration notice (refreshToken column):', err);
    }
  }
}
