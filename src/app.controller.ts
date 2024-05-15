import { Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/search')
  getSearch(@Query('text') text: string) {
    return this.appService.search(text);
  }

  @Post('/add')
  async addDocument(): Promise<string> {
    return await this.appService.addDocument();
  }
}
