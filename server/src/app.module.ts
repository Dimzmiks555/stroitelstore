import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OneCController } from './one-c/one-c.controller';

@Module({
  imports: [],
  controllers: [AppController, OneCController],
  providers: [AppService],
})
export class AppModule {}
