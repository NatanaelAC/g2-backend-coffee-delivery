import { Controller, Get, Post, Body, Param, HttpStatus, HttpCode, Patch, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddItemDto } from './dto/add-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCart() {
    return this.cartService.getOrCreateCart();
  }

  @Get(':id')
  async getCart(@Param('id') id: string) {
    return this.cartService.getCart(id);
  }

  @Post(':id/items')
  @HttpCode(HttpStatus.CREATED)
  async addItem(@Param('id') cartId: string, @Body() addItemDto: AddItemDto) {
    return this.cartService.addItem(cartId, addItemDto);
  }

  @Patch(':id/items/:coffeeId')
  @HttpCode(HttpStatus.OK)
  async updateItem(
    @Param('id') cartId: string,
    @Param('coffeeId') coffeeId: string,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    return this.cartService.updateItem(cartId, coffeeId, updateItemDto);
  }

  @Delete(':id/items/:coffeeId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeItem(
    @Param('id') cartId: string,
    @Param('coffeeId') coffeeId: string,
  ) {
    await this.cartService.removeItem(cartId, coffeeId);
  }
}
