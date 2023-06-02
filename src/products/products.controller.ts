import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '../product.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProduct(@Body() product: Product): void {
    this.productsService.addProduct(product);
  }

  @Get()
  getAllProducts(): Product[] {
    return this.productsService.getAllProducts();
  }

  @Delete(':id')
  deleteProduct(@Param('id') productId: string): void {
    try {
        this.productsService.deleteProduct(productId);
    } catch (e) {
        console.error(e);
      }
  }
}
