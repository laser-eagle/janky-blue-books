import {
  Controller,
  Get,
  Param,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { CarPriceService } from './car-price.service';
import { FindCarQueryDto } from './dto/find-car-query.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('car-prices')
export class CarPriceController {
  constructor(private readonly service: CarPriceService) {}

  @Get()
  @ApiOperation({ operationId: 'findAll', tags: ['carPrices'] })
  findAll() {
    return this.service.findAll();
  }

  @Get('search')
  @ApiOperation({ operationId: 'search', tags: ['carPrices'] })
  search(@Query() query: FindCarQueryDto) {
    return this.service.findByQuery(query);
  }

  @Get(':id')
  @ApiOperation({ operationId: 'findOne', tags: ['carPrices'] })
  findOne(@Param('id') id: string) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      throw new BadRequestException('Invalid ID parameter');
    }
    return this.service.findOne(parsedId);
  }
}
