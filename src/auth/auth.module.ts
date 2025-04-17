import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleService } from './strategies/google/google.service';
import { UserService } from 'src/user/user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from './strategies/jwt/jwt.service';
import { UserModule } from 'src/user/user.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '5m' },
      }),
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleService, JwtService, UserService],
})
export class AuthModule {}
