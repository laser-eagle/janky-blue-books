export class FindCarQueryDto {
  manufacturer?: string;
  model?: string;
  category?: string;
  fuelType?: string;
  gearBoxType?: string;
  driveWheels?: string;
  color?: string;
  leatherInterior?: string;
  wheel?: string;
  doors?: string;
  engineVolume?: string;
  cylinders?: number;
  airbags?: number;
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
}
