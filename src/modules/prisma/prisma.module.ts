import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService, PrismaService],
})
export class PrismaModule {}
