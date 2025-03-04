import { Module } from '@nestjs/common';
import { TodolistsModule } from './todolists/todolists.module';
import { TasksModule } from './todolists/tasks/tasks.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [TodolistsModule, TasksModule],
  providers: [PrismaService],
})
export class AppModule {}
