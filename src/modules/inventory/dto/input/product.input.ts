import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ProductInput {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;
}
