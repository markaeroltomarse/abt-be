import { Module } from '@nestjs/common';
import { InventoryModule } from './inventory/inventory.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { JwtStrategy } from '@common/auth/strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JWT_SECRET } from '@common/environment';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: JWT_SECRET,
        signOptions: {
          expiresIn: '7d',
        },
      }),
    }),
    PrismaModule,
    UserModule,
    InventoryModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
