import { Test, TestingModule } from '@nestjs/testing';
import { CarPriceService } from './car-price.service';

describe('CarPriceService', () => {
  let service: CarPriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarPriceService],
    }).compile();

    service = module.get<CarPriceService>(CarPriceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
