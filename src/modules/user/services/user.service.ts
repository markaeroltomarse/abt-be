import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginInput } from '../dto/input/login.input';
import { PrismaService } from '@modules/prisma/services/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from '@common/environment';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginInput: LoginInput) {
    const user = await this.prismaService.userEntity.findFirst({
      where: {
        email: loginInput.email,
        password: loginInput.password,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid login, please try again.');
    }
    // Create a token that will handle in Front End. for security
    const token = this.jwtService.sign(
      { id: user.id },
      {
        secret: JWT_SECRET,
      },
    );

    return {
      token,
    };
  }

  async create(loginInput: LoginInput) {
    const userExist = await this.prismaService.userEntity.findFirst({
      where: {
        email: loginInput.email,
      },
    });

    if (userExist) {
      throw new BadRequestException('Please try again.');
    }

    return this.prismaService.userEntity.create({
      data: {
        ...loginInput,
        type: 'admin',
      },
    });
  }

  // async secureLogin(loginInput: AdminLoginInput) {
  //     const admin = await this.prismaService.adminEntity.findFirst({
  //       where: {
  //         email: loginInput.email,
  //       },
  //     });

  //     // Check if invalid login
  //     if (
  //       !admin ||
  //       !GeneratorProvider.validateHash(loginInput.password, admin.password) //  Decrypt password and check if match
  //     ) {
  //       throw new BadRequestException('Invalid credentials. Please try again.');
  //     }

  //     // Create a token that will handle in Front End. for security
  //     const token = this.jwtService.sign(
  //       { id: admin.id },
  //       {
  //         secret: JWT_SECRET,
  //       },
  //     );

  //     return {
  //       admin,
  //       token,
  //     };
  //   }
}
