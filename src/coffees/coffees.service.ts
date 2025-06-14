
import { PrismaService } from '../prisma/prisma.service';
import { CofeeDto  } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';


export const listaCofess: CofeeDto[] = [
  {
    nome: "Expresso Tradicional",
    tipo: "Quente",
    id: "123",
    descricao: "Um shot de café espresso puro e encorpado.",
    preco: "R$ 5,00",
    tag: ["clássico", "intenso"],
    image_url : "teste.com",
    date_create: new Date("2025-05-30T23:27:50.260Z").toISOString()
  }
]
@Injectable()
export class CoffeesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const coffees = await this.prisma.coffee.findMany({
      include: {
        tags: {
          include: {
            tag: String,
          },
        },
      },
    });

    return coffees.map(coffee => ({
      ...coffee,
      tags: coffee.tag.map(coffeeTag => coffeeTag.tag),
    }));
  }

  async findOne(id: string) {
    const coffee = await this.prisma.coffee.findUnique({
      where: { id },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee com ID ${id} not found`);
    }

    return {
      ...coffee,
      tags: coffee.tags.map(coffeeTag => coffeeTag.tag),
    };
  }
  async create(createCafeDto: CofeeDto): Promise<CofeeDto> {
    return this.createCofee(createCafeDto); 
  }
  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const existingCoffee = await this.prisma.coffee.findUnique({ where: { id } });
    if (!existingCoffee) throw new NotFoundException(`Coffee with ID "${id}" not found.`);

    const { tags, ...coffeeData } = updateCoffeeDto;
    const dataToUpdate: any = { ...coffeeData };

    if (dataToUpdate.price !== undefined && typeof dataToUpdate.price === 'number') {
      dataToUpdate.price = new this.prisma.Decimal(dataToUpdate.price);
    }

    return this.prisma.coffee.update({
      where: { id },
      data: {
        ...dataToUpdate,
        ...(tags && {
         
          coffeeTags: { 
            deleteMany: {}, 
            create: tags.map(tagName => ({ 
              tag: {
                connectOrCreate: {
                  where: { name: tagName },
                  create: { name: tagName },
                },
              },
            })),
          },
        }),
      },
      include: {
        tags: { 
          include: { tag: true },
        },
      },
    });
  }
//criar 
   createCofee(newCofee: CofeeDto): CofeeDto {
    const idExists = listaCofess.some(cofee => cofee.id === newCofee.id);
    if (idExists) {
      throw new ConflictException(`Café com ID "${newCofee.id}" já existe.`);
    }
    listaCofess.push(newCofee);
    return newCofee;}
//remover
  async remove(id: string): Promise<void> {
    const index = listaCofess.findIndex(coffee => coffee.id === id);
    if (index === -1) {
      throw new NotFoundException(`Café com ID "${id}" não encontrado.`);
    }
    listaCofess.splice(index, 1);
  }

  async removeTag(tagId: string): Promise<void> {
  
    throw new Error('Operação de remoção de tag não suportada.');
  }
 

  async searchCoffees(params: {
    start_date?: Date;
    end_date?: Date;
    name?: string;
    tags?: string[];
    limit?: number;
    offset?: number;
  }) {
    const { start_date, end_date, name, tags, limit = 10, offset = 0 } = params;
    return {
      data: [],
      pagination: {
        total: [],
        limit,
        offset,
        hasMore: offset,
      },
    };
  }
}