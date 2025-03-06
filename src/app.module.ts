import { Module } from '@nestjs/common';
import { TodolistsModule } from './todolists/todolists.module';
import { TasksModule } from './todolists/tasks/tasks.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TodolistsModule, TasksModule, AuthModule, UsersModule],
  providers: [PrismaService],
})
export class AppModule {}
