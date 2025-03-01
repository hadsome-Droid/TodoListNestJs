import { Module } from '@nestjs/common';
import { TodolistsService } from './todolists.service';
import { TodolistsController } from './todolists.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [TodolistsController],
  providers: [TodolistsService, PrismaService],
})
export class TodolistsModule {}
