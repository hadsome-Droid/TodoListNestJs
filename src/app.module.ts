import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { TodolistsModule } from './todolists/todolists.module';
import { TasksModule } from './todolists/tasks/tasks.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [TodolistsModule, TasksModule],
  providers: [PrismaService],
})
export class AppModule {}
