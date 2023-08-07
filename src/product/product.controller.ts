// src/product/product.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/hello')
  async getHello() {
    return this.productService.getHello();
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiOkResponse({ description: 'List of products', type: ProductDto, isArray: true })
  async getAllProducts(): Promise<ProductDto[]> {
    return this.productService.getAllProducts();
  }

  @Get(':hash')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiOkResponse({ description: 'Product found', type: ProductDto })
  @ApiNotFoundResponse({ description: 'Product not found' })
  async getProductById(@Param('hash') hash: string): Promise<ProductDto> {
    const product = await this.productService.getProductById(hash);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiCreatedResponse({ description: 'Product created', type: CreateProductDto })
  async createProduct(@Body() productDto: CreateProductDto): Promise<ProductDto> {
    return this.productService.createProduct(productDto);
  }

  @Put(':hash')
  @ApiOperation({ summary: 'Update an existing product by ID' })
  @ApiOkResponse({ description: 'Product updated', type: ProductDto })
  @ApiNotFoundResponse({ description: 'Product not found' })
  async updateProduct(@Param('hash') hash: string, @Body() updatedProductDto: UpdateProductDto): Promise<ProductDto> {
    return this.productService.updateProduct(hash, updatedProductDto);
  }

  @Delete(':hash')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiOkResponse({ description: 'Product deleted' })
  @ApiNotFoundResponse({ description: 'Product not found' })
  async deleteProduct(@Param('hash') hash: string): Promise<void> {
    return this.productService.deleteProduct(hash);
  }
}
