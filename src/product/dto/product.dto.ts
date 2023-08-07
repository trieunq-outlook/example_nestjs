import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, IsNumber, Min } from 'class-validator';

export class ProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Product A',
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: 'The description of the product',
    example: 'This is a sample product',
    maxLength: 500,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  description: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 9.99,
    minimum: 0,
    type: 'number',
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'The date and time when the product was created',
    example: new Date(),
    readOnly: true,
  })
  @Exclude()
  createdAt?: Date;

  @ApiProperty({
    description: 'The date and time when the product was last updated',
    example: new Date(),
    readOnly: true,
  })
  @Exclude()
  updatedAt?: Date;

  @ApiProperty({
    description: 'The timestamp and time when the product was last updated',
    default: Date.now(),
    readOnly: true,
  })
  unixTime?: number;
}
