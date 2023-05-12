import { PrismaService } from '@modules/prisma/services/prisma.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ProductItemsInput } from '../dto/input/item.input';
import { ItemDestinationEnum, ItemEntity } from '@prisma/client';
import { GetItemsInput } from '../dto/input/get-items.input';

@Injectable()
export class InventoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async createProduct(productName: string) {
    const productExist = await this.prismaService.productEntity.findFirst({
      where: { name: productName },
    });

    if (productExist) {
      throw new BadRequestException('Product name already exist.');
    }

    return this.prismaService.productEntity
      .create({
        data: {
          name: productName,
        },
      })
      .catch((error) => {
        console.log(error);
        throw new UnprocessableEntityException(
          'Something wrong crating products.',
        );
      });
  }

  async getProducts() {
    return this.prismaService.productEntity.findMany({
      select: {
        name: true,
        id: true,
      },
    });
  }

  async getProductItems(getItemsInput: GetItemsInput) {
    console.log(getItemsInput);
    const product = await this.prismaService.productEntity
      .findFirst({
        where: { id: getItemsInput.productId },
      })
      .catch((error) => {
        console.log(error);
        throw new UnprocessableEntityException('Product not found.');
      });

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    const items: ItemEntity[] = await this.prismaService.itemEntity.findMany({
      take: getItemsInput?.size && getItemsInput.size,
      skip:
        getItemsInput?.page &&
        getItemsInput.size &&
        (getItemsInput.page - 1) * getItemsInput.size,
      where: {
        productId: product.id,
        from: getItemsInput?.from,
        customer: {
          contains: getItemsInput?.search,
          mode: 'insensitive', // optional: case-insensitive search
        },
        AND: [
          {
            dateArrived: {
              gte: getItemsInput?.startDate,
            },
          },
          {
            dateArrived: {
              lte: getItemsInput?.endDate,
            },
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const totalSize = await this.prismaService.itemEntity.count({
      where: {
        productId: product.id,
      },
    });

    const data = await this.getTotalQuantityAndKilo(product.id);

    return {
      ...product,
      items: items,
      data,
      totalSize,
    };
  }

  async createProductItems(productItemsInput: ProductItemsInput) {
    const totalKilo = await this.getTotalQuantityAndKilo(
      productItemsInput.productId,
    );

    if (
      productItemsInput.from === 'OUT' &&
      productItemsInput.kilo > totalKilo.totalKilo
    ) {
      throw new BadRequestException('Not enough kilos.');
    }

    const ORisExist = await this.prismaService.itemEntity.findFirst({
      where: { recieptNumber: productItemsInput.recieptNumber },
    });

    if (ORisExist) {
      throw new BadRequestException('Receipt number already exist.');
    }

    return this.prismaService.itemEntity.create({
      data: productItemsInput,
    });
  }

  async getTotalQuantityAndKilo(productId: string): Promise<{
    totalQuantity: number;
    totalKilo: number;
  }> {
    const resultIN = await this.prismaService.itemEntity.aggregate({
      where: {
        productId: productId,
        from: 'IN',
      },
      _sum: {
        quantity: true,
        kilo: true,
      },
    });

    const resultOUT = await this.prismaService.itemEntity.aggregate({
      where: {
        productId: productId,
        from: 'OUT',
      },
      _sum: {
        quantity: true,
        kilo: true,
      },
    });

    return {
      totalQuantity: resultIN._sum.quantity - resultOUT._sum.quantity ?? 0,
      totalKilo: resultIN._sum.kilo - resultOUT._sum.kilo ?? 0,
    };
  }
}
