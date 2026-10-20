import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from './entities/provider.entity';

@Injectable()
export class EmergencyService {
  constructor(
    @InjectRepository(Provider)
    private providerRepo: Repository<Provider>,
  ) {}

  async findNearby(lng: number, lat: number, radiusKm: number = 10) {
    // PostGIS query to find providers within a radius
    return this.providerRepo
      .createQueryBuilder('provider')
      .where('provider.isAvailable = :available', { available: true })
      .andWhere(
        'ST_DistanceSphere(provider.location, ST_MakePoint(:lng, :lat)) <= :radius',
        { lng, lat, radius: radiusKm * 1000 } // radius in meters
      )
      .orderBy('ST_DistanceSphere(provider.location, ST_MakePoint(:lng, :lat))', 'ASC')
      .getMany();
  }
  
  // Notice for all API responses
  getEmergencyNotice() {
    return "In a life-threatening emergency, call the official emergency numbers first (SAMU 190 / Civil Protection 198).";
  }
}
