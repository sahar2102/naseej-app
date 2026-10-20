import { Controller, Get, Query } from '@nestjs/common';
import { EmergencyService } from './emergency.service';

@Controller('api/v1/emergency')
export class EmergencyController {
  constructor(private readonly emergencyService: EmergencyService) {}

  @Get('nearby')
  async findNearby(
    @Query('lng') lng?: string,
    @Query('lat') lat?: string,
    @Query('radius') radius?: string,
  ) {
    const longitude = lng ? parseFloat(lng) : 10.1815; // Tunis default longitude
    const latitude = lat ? parseFloat(lat) : 36.8065;   // Tunis default latitude
    const radiusKm = radius ? parseFloat(radius) : 10;

    const providers = await this.emergencyService.findNearby(longitude, latitude, radiusKm);
    return {
      notice: this.emergencyService.getEmergencyNotice(),
      providers,
    };
  }

  @Get('notice')
  getNotice() {
    return {
      notice: this.emergencyService.getEmergencyNotice(),
    };
  }
}
