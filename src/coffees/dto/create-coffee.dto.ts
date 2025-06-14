import { IsString, IsArray, ArrayNotEmpty, IsDateString,IsOptional } from 'class-validator';


export class CofeeDto {
  @IsString()
  nome: string;

  @IsString()
  tipo: string;

  @IsString() 
  id: string; 

  @IsString()
  descricao: string;

  @IsString() 
  preco: string;

  @IsString()
  image_url: string
  @IsArray()
  @ArrayNotEmpty()
  @IsString()
  tag: string[];

 
  @IsDateString()
  date_create: string;
}