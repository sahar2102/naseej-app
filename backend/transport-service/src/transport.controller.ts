import { Controller, Get } from '@nestjs/common';

@Controller('api/v1/transport')
export class TransportController {
  @Get('status')
  getStatus() {
    return {
      status: 'ok',
      service: 'transport-service',
      timestamp: new Date().toISOString(),
    };
  }
}
