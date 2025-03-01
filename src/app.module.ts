import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodolistsModule } from './todolists/todolists.module';

@Module({
  imports: [TodolistsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
