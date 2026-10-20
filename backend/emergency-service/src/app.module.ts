import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { EmergencyService } from './emergency.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Provider],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Provider]),
  ],
  providers: [EmergencyService],
})
export class AppModule {}
