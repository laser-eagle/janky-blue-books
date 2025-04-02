import { Test, TestingModule } from '@nestjs/testing';
import { CarPriceController } from './car-price.controller';

describe('CarPriceController', () => {
  let controller: CarPriceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarPriceController],
    }).compile();

    controller = module.get<CarPriceController>(CarPriceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
