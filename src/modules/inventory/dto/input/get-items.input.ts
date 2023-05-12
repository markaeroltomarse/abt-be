import { ProductFromEnum } from '@common/data/enums/from.enum';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetItemsInput {
  @IsNotEmpty()
  productId: string;

  @IsOptional()
  @IsInt()
  page?: number;

  @IsOptional()
  @IsInt()
  size?: number;

  @IsOptional()
  @IsEnum(ProductFromEnum)
  from?: ProductFromEnum;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  endDate?: string;
}
