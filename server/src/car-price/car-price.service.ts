import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarPrice } from './car-price.entity';

@Injectable()
export class CarPriceService {
  constructor(
    @InjectRepository(CarPrice)
    private readonly repo: Repository<CarPrice>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ ID: id });
  }

  async findByQuery(query: {
    manufacturer?: string;
    model?: string;
    category?: string;
    fuelType?: string;
    gearBoxType?: string;
    driveWheels?: string;
    color?: string;
    yearMin?: number;
    yearMax?: number;
    priceMin?: number;
    priceMax?: number;
  }) {
    const qb = this.repo.createQueryBuilder('car');

    if (query.manufacturer)
      qb.andWhere('car.Manufacturer LIKE :manufacturer', {
        manufacturer: `%${query.manufacturer}%`,
      });

    if (query.model)
      qb.andWhere('car.Model LIKE :model', { model: `%${query.model}%` });

    if (query.category)
      qb.andWhere('car.Category LIKE :category', {
        category: `%${query.category}%`,
      });

    if (query.fuelType)
      qb.andWhere('car."Fuel type" = :fuelType', {
        fuelType: query.fuelType,
      });

    if (query.gearBoxType)
      qb.andWhere('car."Gear box type" = :gearBoxType', {
        gearBoxType: query.gearBoxType,
      });

    if (query.driveWheels)
      qb.andWhere('car."Drive wheels" = :driveWheels', {
        driveWheels: query.driveWheels,
      });

    if (query.color) qb.andWhere('car.Color = :color', { color: query.color });

    if (query.yearMin !== undefined)
      qb.andWhere('"car"."Prod. year" >= :yearMin', { yearMin: query.yearMin });

    if (query.yearMax !== undefined)
      qb.andWhere('"car"."Prod. year" <= :yearMax', { yearMax: query.yearMax });

    if (query.priceMin !== undefined)
      qb.andWhere('car.Price >= :priceMin', { priceMin: query.priceMin });

    if (query.priceMax !== undefined)
      qb.andWhere('car.Price <= :priceMax', { priceMax: query.priceMax });

    return qb.getMany();
  }
}
