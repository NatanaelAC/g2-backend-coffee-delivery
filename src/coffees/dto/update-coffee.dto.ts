import { PartialType } from '@nestjs/mapped-types';
import { CofeeDto } from './create-coffee.dto';

export class UpdateCoffeeDto extends PartialType(CofeeDto) {
  tagIds?: string[];
  // adicione outros campos
} 