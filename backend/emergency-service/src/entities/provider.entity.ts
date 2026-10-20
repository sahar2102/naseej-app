import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

export enum ProviderType {
  AMBULANCE = 'ambulance',
  VOLUNTEER = 'volunteer',
}

@Entity('providers')
export class Provider {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  phone: string;

  @Column({ type: 'enum', enum: ProviderType })
  type: ProviderType;

  @Column({ default: false })
  isAvailable: boolean;

  @Column({ default: false })
  isVerified: boolean;

  // PostGIS Point: stores [longitude, latitude]
  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true
  })
  location: any;
}
