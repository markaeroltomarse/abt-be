import { PrismaService } from './../../../modules/prisma/services/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { JWT_SECRET } from '@common/environment';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prismaService: PrismaService) {
    super({
      secretOrKey: JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload) {
    try {
      const customer = await this.prismaService.userEntity.findFirst({
        where: {
          id: payload.id,
        },
      });

      if (!customer) throw new UnauthorizedException();

      return customer;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
