import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ProductDto } from './product.dto';

export class UpdateProductDto extends PartialType(ProductDto) {
  @ApiProperty({
    required: true,
  })
  unixTime: number;
}
