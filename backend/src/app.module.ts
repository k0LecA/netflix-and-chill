import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './app.catscontroller';
import { TestinisController } from './testinis/testinis.controller';

@Module({
  imports: [],
  controllers: [AppController, CatsController, TestinisController],
  providers: [AppService],
})
export class AppModule {}
