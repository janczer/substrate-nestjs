import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    const data = await this.appService.getSimpleData();

    return `
      Chain: ${data.chain}<br/>
      Node name: ${data.nodeName}<br/>
      Node version: ${data.nodeVersion}<br/>
      Number of latest block: ${data.headerNumber}<br/>
      Now: ${new Date(Number(data.now.toString())).toISOString()}<br />
      Balance: ${data.balance}
    `;
  }
}
