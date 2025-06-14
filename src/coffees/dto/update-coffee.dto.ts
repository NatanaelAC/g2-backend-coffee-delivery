import { IsString, IsNotEmpty, MinLength, MaxLength, IsNumber, IsPositive, IsUrl, IsArray, ArrayNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCoffeeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(200)
  description: string;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price: number; 

  @IsNotEmpty()
  @IsUrl()
  imageUrl: string; 

  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  tags: string[]; 
}
