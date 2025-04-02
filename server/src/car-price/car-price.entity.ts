import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('car_prices')
export class CarPrice {
  @PrimaryColumn()
  ID: number;

  @Column('int')
  Price: number;

  @Column('text')
  Levy: string;

  @Column('text')
  Manufacturer: string;

  @Column('text')
  Model: string;

  @Column('int', { name: 'Prod. year' })
  ProdYear: number;

  @Column('text')
  Category: string;

  @Column('text', { name: 'Leather interior' })
  LeatherInterior: string;

  @Column('text', { name: 'Fuel type' })
  FuelType: string;

  @Column('text', { name: 'Engine volume' })
  EngineVolume: string;

  @Column('text')
  Mileage: string;

  @Column('float')
  Cylinders: number;

  @Column('text', { name: 'Gear box type' })
  GearBoxType: string;

  @Column('text', { name: 'Drive wheels' })
  DriveWheels: string;

  @Column('text')
  Doors: string;

  @Column('text')
  Wheel: string;

  @Column('text')
  Color: string;

  @Column('int')
  Airbags: number;
}
