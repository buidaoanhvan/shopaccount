import { Type } from 'class-transformer';
import { ArrayMinSize, IsNotEmpty, ValidateNested } from 'class-validator';

export class CreateServiceItemDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  day: string;

  @IsNotEmpty()
  price: string;
}

export class CreateServiceDto {
  @IsNotEmpty()
  category_id: string;

  @IsNotEmpty()
  provider: string;

  @IsNotEmpty()
  service_description: string;

  @IsNotEmpty()
  service_name: string;

  @ValidateNested({ each: true })
  @Type(() => CreateServiceItemDto)
  @ArrayMinSize(1, { message: 'Phải có ít nhất 1 service item' })
  items: CreateServiceItemDto[];
}
