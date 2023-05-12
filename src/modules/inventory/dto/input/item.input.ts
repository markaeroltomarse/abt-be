import { ProductFromEnum } from '@common/data/enums/from.enum';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class ProductItemsInput {
  @IsNotEmpty()
  @IsDateString()
  dateArrived: string;

  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  kilo: number;

  @IsNotEmpty()
  @IsEnum(ProductFromEnum)
  from: ProductFromEnum;

  @IsNotEmpty()
  @IsInt()
  recieptNumber: number;

  @IsNotEmpty()
  @IsString()
  customer: string;
}
