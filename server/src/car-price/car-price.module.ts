import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarPrice } from './car-price.entity';
import { CarPriceService } from './car-price.service';
import { CarPriceController } from './car-price.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CarPrice])],
  controllers: [CarPriceController],
  providers: [CarPriceService],
})
export class CarPriceModule {}
