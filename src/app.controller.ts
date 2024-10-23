import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('add-text')
  async addText(@Body() body: { text: string }) {
    return await this.appService.addText(body.text);
  }

  @Post('query')
  async getTexts(@Body() body: { query: string }) {
    return await this.appService.getText(body.query);
  }
}
