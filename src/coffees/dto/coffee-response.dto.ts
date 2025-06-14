import { IsString, IsArray, ArrayNotEmpty, IsNumber,MinLength,MaxLength,IsNotEmpty } from 'class-validator';
export class OrderItemDto {
  name: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export class OrderResponseDto {
@IsString()
@IsNotEmpty()
nome: String

@MinLength(10)
@MaxLength(200)
@IsString()
@IsNotEmpty()
descricao: string;

@IsString()
@IsNotEmpty()
@IsNumber({ maxDecimalPlaces: 2 })
preco: String

@IsString()
@IsNotEmpty()
image_url: string

@IsArray()
@ArrayNotEmpty()
@IsString()
tag: string[];

} 

