import { Injectable } from '@nestjs/common';
import { User, UserSession, UserProviderKey } from '@prisma/client';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async getUserById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async createUser(payload: LoginUserDto): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        email: payload.email,
        name: payload.email,
        avatar_url: payload.avatar,
        is_active: true,
        role: 'user',
      },
    });
    await this.prisma.userProvider.create({
      data: {
        user_id: user.id,
        provider: payload.provider,
        provider_user_id: payload.id,
      },
    });
    return user;
  }

  async createSession(user: User): Promise<UserSession | null> {
    return await this.prisma.userSession.create({
      data: {
        user_id: user.id,
        expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      },
    });
  }

  async checkSession(session_id: string): Promise<UserSession | null> {
    return await this.prisma.userSession.findUnique({
      where: {
        id: session_id,
      },
    });
  }

  async createKeyLogin(user: User): Promise<UserProviderKey | null> {
    const key = await this.prisma.userProviderKey.create({
      data: {
        user_id: user.id,
        expires_at: new Date(Date.now() + 1000 * 60), // 60 seconds expiration
      },
    });
    return key;
  }

  async checkKeyLogin(key: string): Promise<UserProviderKey | null> {
    return await this.prisma.userProviderKey.findUnique({
      where: {
        id: key,
      },
    });
  }

  async deleteKeyLogin(key: string): Promise<UserProviderKey | null> {
    return await this.prisma.userProviderKey.delete({
      where: {
        id: key,
      },
    });
  }
}
