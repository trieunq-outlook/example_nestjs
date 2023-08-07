// src/product/product.service.ts
import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { ProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { decryptStr } from '@/common/encryption';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(Product.name);
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: ProductRepository,
  ) {}

  async getAllProducts(): Promise<ProductDto[]> {
    this.logger.debug('getAllProducts');

    return this.productRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  async getProductById(hash: string): Promise<any> {
    this.logger.debug('getProductById', hash);
    const id = this.getHashId(hash);
    return this.productRepository.findOne({
      where: { id },
    });
  }

  async createProduct(productDto: CreateProductDto): Promise<ProductDto> {
    const product: Product = this.productRepository.create(productDto);

    return this.productRepository.save(product);
  }

  async updateProduct(hash: string, updatedProductDto: UpdateProductDto): Promise<any> {
    // validate unix time is valid
    const { unixTime } = updatedProductDto;
    const updatedAt = typeof unixTime === 'number' ? new Date(unixTime) : null;
    delete updatedProductDto.unixTime;
    const id = this.getHashId(hash);

    // Save the updated product and get the updated object in return
    const { affected } = await this.productRepository.update(
      {
        id,
        updatedAt,
      },
      updatedProductDto,
    );

    if (affected > 0) {
      return await this.productRepository.findOne({ where: { id } });
    } else {
      throw new BadRequestException('Product not update');
    }
  }

  async deleteProduct(hash: string): Promise<void> {
    const result = await this.productRepository.softDelete(this.getHashId(hash));
    if (result.affected === 0) {
      throw new NotFoundException('Product not found');
    }
  }

  private getHashId(hash): number {
    return +decryptStr(hash);
  }

  getHello(): string {
    this.logger.debug('view debug');
    this.logger.warn('warn debug');
    this.logger.log('log debug');
    this.logger.error('error debug');
    return 'hello';
  }
}
