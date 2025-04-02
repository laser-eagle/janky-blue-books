import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarPriceModule } from './car-price/car-price.module';

const CAR_PRICES = __dirname + '/../../data/car_prices.db';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: CAR_PRICES,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    CarPriceModule,
  ],
})
export class AppModule {}
