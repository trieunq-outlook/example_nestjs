import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ProductDto } from './product.dto';

export class CreateProductDto extends PartialType(ProductDto) {
  @ApiProperty({
    readOnly: true,
  })
  unixTime?: number;
}
