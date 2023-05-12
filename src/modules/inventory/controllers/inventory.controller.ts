import { GetItemsInput } from '../dto/input/get-items.input';
import { ProductItemsInput } from '../dto/input/item.input';
import { ProductInput } from '../dto/input/product.input';
import { InventoryService } from './../services/inventory.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('products')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('')
  async createProduct(@Body() { name }: ProductInput) {
    const response = await this.inventoryService.createProduct(name);

    return {
      data: response,
    };
  }

  @Post('/get-items')
  async getProductItems(@Body() getItemsInput: GetItemsInput) {
    const response = await this.inventoryService.getProductItems(getItemsInput);

    return {
      data: response,
    };
  }

  @Get('/all')
  async getProducts() {
    const response = await this.inventoryService.getProducts();

    return {
      data: response,
    };
  }

  @Post('/items')
  async createProductItems(@Body() prductItemsInput: ProductItemsInput) {
    const response = await this.inventoryService.createProductItems(
      prductItemsInput,
    );

    return {
      data: response,
    };
  }
}
