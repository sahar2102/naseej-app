import { Module } from '@nestjs/common';
import { TransportGateway } from './transport.gateway';
import { TransportController } from './transport.controller';

@Module({
  imports: [],
  controllers: [TransportController],
  providers: [TransportGateway],
})
export class AppModule {}
