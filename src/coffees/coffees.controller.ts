import { Controller, Get, Post, Body, Param, HttpStatus, HttpCode, Query,Delete ,Patch} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CofeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import {  NotFoundException} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  async findAll() {
    return this.coffeesService.findAll();
  }
  @Post('/coffees-create')
  @HttpCode(HttpStatus.CREATED)
 //criar
  async createCofee(@Body() createCafeDto: CofeeDto): Promise<any> {
   
    const cofeeToCreate: CofeeDto = {
        id: createCafeDto.id ? createCafeDto.id.toString() : (new Date().getTime()).toString(),
        nome: createCafeDto.nome,
        tipo: createCafeDto.tipo,
        descricao: createCafeDto.descricao,
        preco: createCafeDto.preco.toString(), 
        tag: createCafeDto.tag,
        date_create: new Date().toISOString(),
        image_url : createCafeDto.image_url
    };
    return await this.coffeesService.create(cofeeToCreate);
  }
  


  //update
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    try {
      const updatedCoffee = await this.coffeesService.update(id, updateCoffeeDto);
      return updatedCoffee;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  //deletar
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)

 
  @Get('search')
  async search(
    @Query('start_date') start_date?: string,
    @Query('end_date') end_date?: string,
    @Query('name') name?: string,
    @Query('tags') tags?: string,
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
  ) {
    const tagsList = tags ? tags.split(',') : [];
    
    return this.coffeesService.searchCoffees({
      start_date: start_date ? new Date(start_date) : undefined,
      end_date: end_date ? new Date(end_date) : undefined,
      name,
      tags: tagsList,
      limit: +limit,
      offset: +offset,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.coffeesService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCoffeeDto: CofeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  // adicionar outro endpoints
} 